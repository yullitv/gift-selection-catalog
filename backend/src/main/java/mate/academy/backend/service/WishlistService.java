package mate.academy.backend.service;

import java.util.List;
import mate.academy.backend.common.error.ConflictException;
import mate.academy.backend.common.error.NotFoundException;
import mate.academy.backend.dao.GiftRepository;
import mate.academy.backend.dao.UserRepository;
import mate.academy.backend.dao.WishlistRepository;
import mate.academy.backend.dto.AddWishlistItemRequest;
import mate.academy.backend.dto.WishlistItemDto;
import mate.academy.backend.model.Gift;
import mate.academy.backend.model.User;
import mate.academy.backend.model.WishlistItem;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class WishlistService {

    private final WishlistRepository wishlistRepository;
    private final GiftRepository giftRepository;
    private final UserRepository userRepository;

    public WishlistService(
            WishlistRepository wishlistRepository,
            GiftRepository giftRepository,
            UserRepository userRepository
    ) {
        this.wishlistRepository = wishlistRepository;
        this.giftRepository = giftRepository;
        this.userRepository = userRepository;
    }

    @Transactional(readOnly = true)
    public List<WishlistItemDto> getWishlist(Long userId) {
        return wishlistRepository.findAllByUserIdWithGift(userId)
                .stream()
                .map(this::toDto)
                .toList();
    }

    @Transactional
    public List<WishlistItemDto> addItem(Long userId, AddWishlistItemRequest request) {
        if (!giftRepository.existsById(request.giftId())) {
            throw NotFoundException.gift();
        }
        if (wishlistRepository.existsByUser_IdAndGift_Id(userId, request.giftId())) {
            throw ConflictException.wishlistItemAlreadyExists();
        }

        Gift gift = giftRepository.getReferenceById(request.giftId());
        User user = userRepository.getReferenceById(userId);

        WishlistItem item = new WishlistItem();
        item.setUser(user);
        item.setGift(gift);
        wishlistRepository.save(item);

        return getWishlist(userId);
    }

    @Transactional
    public List<WishlistItemDto> removeItem(Long userId, Long wishlistItemId) {
        WishlistItem item = wishlistRepository.findById(wishlistItemId)
                .orElseThrow(NotFoundException::wishlistItem);

        if (!item.getUser().getId().equals(userId)) {
            throw NotFoundException.wishlistItem();
        }

        wishlistRepository.delete(item);
        return getWishlist(userId);
    }

    @Transactional(readOnly = true)
    public List<WishlistItemDto> getPublicWishlist(String shareToken) {
        return wishlistRepository.findAllByShareTokenWithGift(shareToken)
                .stream()
                .map(this::toDto)
                .toList();
    }

    private WishlistItemDto toDto(WishlistItem item) {
        Gift gift = item.getGift();
        return new WishlistItemDto(
                item.getId(),
                gift.getId(),
                gift.getName(),
                gift.getPriceCents(),
                resolveImageUrl(gift),
                item.getCreatedAt()
        );
    }

    private String resolveImageUrl(Gift gift) {
        return gift.getPhotoUrl();
    }
}
