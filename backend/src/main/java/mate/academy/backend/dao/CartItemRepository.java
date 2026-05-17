package mate.academy.backend.dao;

import java.util.List;
import java.util.Optional;
import mate.academy.backend.model.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {
    Optional<CartItem> findByUserIdAndGiftId(Long userId, Long giftId);

    List<CartItem> findAllByUserId(Long userId);

    void deleteByUserIdAndGiftId(Long userId, Long giftId);

    void deleteAllByUserId(Long userId);
}
