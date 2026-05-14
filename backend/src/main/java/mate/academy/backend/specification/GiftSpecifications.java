package mate.academy.backend.specification;

import java.util.Collection;
import mate.academy.backend.model.Gift;
import mate.academy.backend.model.GiftAudience;
import org.springframework.data.jpa.domain.Specification;

public class GiftSpecifications {
    private GiftSpecifications() {
    }

    public static Specification<Gift> textSearch(String q) {
        return (root, query, cb) -> {
            if (q == null || q.isBlank()) {
                return cb.conjunction();
            }

            query.distinct(true);

            String like = "%" + q.trim().toLowerCase() + "%";

            var tagsJoin = root.join("tags", jakarta.persistence.criteria.JoinType.LEFT);

            return cb.or(
                    cb.like(cb.lower(root.get("name")), like),
                    cb.like(cb.lower(root.get("description")), like),
                    cb.like(cb.lower(tagsJoin.get("name")), like)
            );
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

    public static Specification<Gift> inStock() {
        return (root, query, cb) ->
                cb.greaterThan(root.get("stockQuantity"), 0);
    }
}