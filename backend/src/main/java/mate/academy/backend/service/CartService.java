package mate.academy.backend.service;

import mate.academy.backend.common.error.BadRequestException;
import mate.academy.backend.common.error.NotFoundException;
import mate.academy.backend.dao.CartItemRepository;
import mate.academy.backend.dao.GiftRepository;
import mate.academy.backend.dao.UserRepository;
import mate.academy.backend.dto.AddCartItemRequest;
import mate.academy.backend.dto.CartDto;
import mate.academy.backend.dto.UpdateCartItemQuantityRequest;
import mate.academy.backend.mapper.CartMapper;
import mate.academy.backend.model.CartItem;
import mate.academy.backend.model.Gift;
import mate.academy.backend.model.User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class CartService {
    private final CartItemRepository cartItemRepository;
    private final GiftRepository giftRepository;
    private final UserRepository userRepository;
    private final CartMapper cartMapper;

    public CartService(
            CartItemRepository cartItemRepository,
            GiftRepository giftRepository,
            UserRepository userRepository,
            CartMapper cartMapper
    ) {
        this.cartItemRepository = cartItemRepository;
        this.giftRepository = giftRepository;
        this.userRepository = userRepository;
        this.cartMapper = cartMapper;
    }

    @Transactional(readOnly = true)
    public CartDto getCart(Long userId) {
        return cartMapper.toCartDto(cartItemRepository.findAllByUser_IdWithGift(userId));
    }

    @Transactional
    public CartDto addItem(Long userId, AddCartItemRequest request) {
        Gift gift = giftRepository.findById(request.giftId())
                .orElseThrow(NotFoundException::gift);

        cartItemRepository.findByUser_IdAndGift_Id(userId, request.giftId())
                .ifPresentOrElse(
                        existing -> {
                            int newQuantity = existing.getQuantity() + request.quantity();
                            validateStock(gift, newQuantity);
                            existing.setQuantity(newQuantity);
                        },
                        () -> {
                            validateStock(gift, request.quantity());
                            User user = userRepository.getReferenceById(userId);
                            CartItem item = new CartItem();
                            item.setUser(user);
                            item.setGift(gift);
                            item.setQuantity(request.quantity());
                            cartItemRepository.save(item);
                        }
                );

        return getCart(userId);
    }

    @Transactional
    public CartDto updateItemQuantity(Long userId, Long giftId, UpdateCartItemQuantityRequest request) {
        Gift gift = giftRepository.findById(giftId)
                .orElseThrow(NotFoundException::gift);
        validateStock(gift, request.quantity());

        CartItem item = cartItemRepository.findByUser_IdAndGift_Id(userId, giftId)
                .orElseThrow(() -> new BadRequestException("Cart item not found"));
        item.setQuantity(request.quantity());

        return getCart(userId);
    }

    @Transactional
    public CartDto removeItem(Long userId, Long giftId) {
        if (cartItemRepository.findByUser_IdAndGift_Id(userId, giftId).isEmpty()) {
            throw new BadRequestException("Cart item not found");
        }
        cartItemRepository.deleteByUser_IdAndGift_Id(userId, giftId);
        return getCart(userId);
    }

    @Transactional
    public void clearCart(Long userId) {
        cartItemRepository.deleteAllByUser_Id(userId);
    }

    private void validateStock(Gift gift, int quantity) {
        if (quantity <= 0) {
            throw new BadRequestException("Quantity must be greater than zero");
        }
        if (quantity > gift.getStockQuantity()) {
            throw new BadRequestException("Not enough stock available");
        }
    }
}
