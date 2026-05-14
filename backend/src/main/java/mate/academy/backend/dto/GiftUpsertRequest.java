package mate.academy.backend.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import java.util.Set;
import mate.academy.backend.model.GiftAudience;

public record GiftUpsertRequest(
        @NotBlank String name,
        String description,
        @Min(0) int priceCents,
        String photoUrl,
        @Min(0) int stockQuantity,
        @Min(0) Integer minAge,
        @Min(0) Integer maxAge,
        @NotEmpty Set<GiftAudience> targetAudiences,
        Set<@NotBlank String> tags
) {
}

