package mate.academy.backend.dao;

import java.util.List;
import java.util.Optional;
import mate.academy.backend.model.WishlistItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface WishlistRepository extends JpaRepository<WishlistItem, Long> {

    @Query("""
            SELECT w FROM WishlistItem w
            JOIN FETCH w.gift
            WHERE w.user.id = :userId
            ORDER BY w.createdAt DESC
            """)
    List<WishlistItem> findAllByUserIdWithGift(@Param("userId") Long userId);

    @Query("""
            SELECT w FROM WishlistItem w
            JOIN FETCH w.gift
            WHERE w.user.shareToken = :shareToken
            ORDER BY w.createdAt DESC
            """)
    List<WishlistItem> findAllByShareTokenWithGift(@Param("shareToken") String shareToken);

    Optional<WishlistItem> findByUser_IdAndGift_Id(Long userId, Long giftId);

    boolean existsByUser_IdAndGift_Id(Long userId, Long giftId);
}
