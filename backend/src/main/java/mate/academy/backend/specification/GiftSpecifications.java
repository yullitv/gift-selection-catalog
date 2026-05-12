package mate.academy.backend.specification;

import java.util.Collection;
import mate.academy.backend.model.Gift;
import org.springframework.data.jpa.domain.Specification;

public class GiftSpecifications {
    private GiftSpecifications() {
    }

    public static Specification<Gift> nameLike(String q) {
        if (q == null || q.isBlank()) {
            return null;
        }
        String like = "%" + q.toLowerCase() + "%";
        return (root, query, cb) -> cb.like(cb.lower(root.get("name")), like);
    }

    public static Specification<Gift> priceGte(Integer priceMinCents) {
        if (priceMinCents == null) {
            return null;
        }
        return (root, query, cb) -> cb.greaterThanOrEqualTo(root.get("priceCents"), priceMinCents);
    }

    public static Specification<Gift> priceLte(Integer priceMaxCents) {
        if (priceMaxCents == null) {
            return null;
        }
        return (root, query, cb) -> cb.lessThanOrEqualTo(root.get("priceCents"), priceMaxCents);
    }

    public static Specification<Gift> fitsAge(Integer age) {
        if (age == null) {
            return null;
        }
        return (root, query, cb) -> cb.and(
                cb.or(cb.isNull(root.get("minAge")), cb.lessThanOrEqualTo(root.get("minAge"), age)),
                cb.or(cb.isNull(root.get("maxAge")), cb.greaterThanOrEqualTo(root.get("maxAge"), age))
        );
    }

    public static Specification<Gift> hasAnyTags(Collection<String> tags) {
        if (tags == null || tags.isEmpty()) {
            return null;
        }
        return (root, query, cb) -> {
            query.distinct(true);
            var join = root.join("tags");
            return join.get("name").in(tags);
        };
    }
}

