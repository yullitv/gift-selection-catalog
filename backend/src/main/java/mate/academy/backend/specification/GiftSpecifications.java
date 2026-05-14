package mate.academy.backend.specification;

import java.util.Collection;
import mate.academy.backend.model.Gift;
import mate.academy.backend.model.GiftAudience;
import org.springframework.data.jpa.domain.Specification;

public class GiftSpecifications {
    private GiftSpecifications() {
    }

    public static Specification<Gift> nameLike(String q) {
        return (root, query, cb) -> {
            if (q == null || q.isBlank()) {
                return cb.conjunction();
            }

            String like = "%" + q.trim().toLowerCase() + "%";
            return cb.like(cb.lower(root.get("name")), like);
        };
    }

    public static Specification<Gift> priceGte(Integer priceMinCents) {
        return (root, query, cb) -> {
            if (priceMinCents == null) {
                return cb.conjunction();
            }

            return cb.greaterThanOrEqualTo(root.get("priceCents"), priceMinCents);
        };
    }

    public static Specification<Gift> priceLte(Integer priceMaxCents) {
        return (root, query, cb) -> {
            if (priceMaxCents == null) {
                return cb.conjunction();
            }

            return cb.lessThanOrEqualTo(root.get("priceCents"), priceMaxCents);
        };
    }

    public static Specification<Gift> fitsAge(Integer age) {
        return (root, query, cb) -> {
            if (age == null) {
                return cb.conjunction();
            }

            return cb.and(
                    cb.or(
                            cb.isNull(root.get("minAge")),
                            cb.lessThanOrEqualTo(root.get("minAge"), age)
                    ),
                    cb.or(
                            cb.isNull(root.get("maxAge")),
                            cb.greaterThanOrEqualTo(root.get("maxAge"), age)
                    )
            );
        };
    }

    public static Specification<Gift> hasAnyTargetAudience(Collection<GiftAudience> audiences) {
        return (root, query, cb) -> {
            if (audiences == null || audiences.isEmpty()) {
                return cb.conjunction();
            }

            query.distinct(true);
            var join = root.join("targetAudiences");
            return join.in(audiences);
        };
    }

    public static Specification<Gift> hasAnyTags(Collection<String> tags) {
        return (root, query, cb) -> {
            if (tags == null || tags.isEmpty()) {
                return cb.conjunction();
            }

            query.distinct(true);
            var join = root.join("tags");
            return join.get("name").in(tags);
        };
    }
}