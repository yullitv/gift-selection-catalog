package mate.academy.backend.service;

import java.util.List;
import java.util.NoSuchElementException;
import mate.academy.backend.dao.CartItemRepository;
import mate.academy.backend.dao.GiftRepository;
import mate.academy.backend.dao.OrderRepository;
import mate.academy.backend.dao.UserRepository;
import mate.academy.backend.dto.OrderDetailsDto;
import mate.academy.backend.dto.OrderSummaryDto;
import mate.academy.backend.dto.UpdateOrderStatusRequest;
import mate.academy.backend.mapper.OrderMapper;
import mate.academy.backend.model.CartItem;
import mate.academy.backend.model.Gift;
import mate.academy.backend.model.Order;
import mate.academy.backend.model.OrderItem;
import mate.academy.backend.model.OrderStatus;
import mate.academy.backend.model.User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class OrderService {
    private final OrderRepository orderRepository;
    private final CartItemRepository cartItemRepository;
    private final UserRepository userRepository;
    private final GiftRepository giftRepository;
    private final OrderMapper orderMapper;

    public OrderService(
            OrderRepository orderRepository,
            CartItemRepository cartItemRepository,
            UserRepository userRepository,
            GiftRepository giftRepository,
            OrderMapper orderMapper
    ) {
        this.orderRepository = orderRepository;
        this.cartItemRepository = cartItemRepository;
        this.userRepository = userRepository;
        this.giftRepository = giftRepository;
        this.orderMapper = orderMapper;
    }

    @Transactional(readOnly = true)
    public List<OrderSummaryDto> listOrders(Long userId) {
        return orderMapper.toSummaryDtos(orderRepository.findByUser_IdOrderByCreatedAtDesc(userId));
    }

    @Transactional(readOnly = true)
    public OrderDetailsDto getOrder(Long userId, Long orderId) {
        Order order = orderRepository.findByIdAndUser_IdWithItems(orderId, userId)
                .orElseThrow(() -> new NoSuchElementException("Order not found"));
        return orderMapper.toDetailsDto(order);
    }

    @Transactional
    public OrderDetailsDto checkout(Long userId) {
        List<CartItem> cartItems = cartItemRepository.findAllByUser_IdWithGift(userId);
        if (cartItems.isEmpty()) {
            throw new IllegalArgumentException("Cart is empty");
        }

        User user = userRepository.getReferenceById(userId);
        Order order = new Order();
        order.setUser(user);
        order.setStatus(OrderStatus.PENDING_PAYMENT);

        int totalCents = 0;
        for (CartItem cartItem : cartItems) {
            Gift gift = cartItem.getGift();
            validateStock(gift, cartItem.getQuantity());

            OrderItem orderItem = new OrderItem();
            orderItem.setOrder(order);
            orderItem.setGift(gift);
            orderItem.setGiftName(gift.getName());
            orderItem.setPhotoUrl(resolvePhotoUrl(gift));
            orderItem.setQuantity(cartItem.getQuantity());
            orderItem.setPriceCents(gift.getPriceCents());
            order.getItems().add(orderItem);

            gift.setStockQuantity(gift.getStockQuantity() - cartItem.getQuantity());
            giftRepository.save(gift);

            totalCents += gift.getPriceCents() * cartItem.getQuantity();
        }

        order.setTotalCents(totalCents);
        Order saved = orderRepository.save(order);
        cartItemRepository.deleteAllByUser_Id(userId);

        return orderRepository.findByIdAndUser_IdWithItems(saved.getId(), userId)
                .map(orderMapper::toDetailsDto)
                .orElseThrow(() -> new IllegalStateException("Order was not persisted"));
    }

    @Transactional
    public OrderSummaryDto updateStatus(Long orderId, UpdateOrderStatusRequest request) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new NoSuchElementException("Order not found"));
        order.setStatus(request.status());
        return orderMapper.toSummaryDto(order);
    }

    private void validateStock(Gift gift, int quantity) {
        if (quantity > gift.getStockQuantity()) {
            throw new IllegalArgumentException("Not enough stock available for gift: " + gift.getName());
        }
    }

    private String resolvePhotoUrl(Gift gift) {
        if (gift.getPhotoUrl() != null && !gift.getPhotoUrl().isBlank()) {
            return gift.getPhotoUrl();
        }
        return gift.getImages().stream()
                .filter(img -> img.isPrimary())
                .findFirst()
                .or(() -> gift.getImages().stream().findFirst())
                .map(img -> img.getImageUrl())
                .orElse(null);
    }
}
