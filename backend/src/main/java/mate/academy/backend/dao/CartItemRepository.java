package mate.academy.backend.dao;

import java.util.List;
import java.util.Optional;
import mate.academy.backend.model.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {

    Optional<CartItem> findByUser_IdAndGift_Id(Long userId, Long giftId);

    @Query("""
            SELECT ci FROM CartItem ci
            JOIN FETCH ci.gift
            WHERE ci.user.id = :userId
            ORDER BY ci.updatedAt DESC
            """)
    List<CartItem> findAllByUser_IdWithGift(@Param("userId") Long userId);

    void deleteByUser_IdAndGift_Id(Long userId, Long giftId);

    void deleteAllByUser_Id(Long userId);
}
