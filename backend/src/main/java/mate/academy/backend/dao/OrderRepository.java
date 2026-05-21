package mate.academy.backend.dao;

import java.util.List;
import java.util.Optional;
import mate.academy.backend.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface OrderRepository extends JpaRepository<Order, Long> {

    List<Order> findByUser_IdOrderByCreatedAtDesc(Long userId);

    @Query("""
            SELECT o FROM Order o
            LEFT JOIN FETCH o.items i
            JOIN FETCH i.gift
            WHERE o.id = :orderId AND o.user.id = :userId
            """)
    Optional<Order> findByIdAndUser_IdWithItems(@Param("orderId") Long orderId, @Param("userId") Long userId);

    Optional<Order> findById(Long id);
}
