package mate.academy.backend.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import java.util.Set;

public record GiftUpsertRequest(
        @NotBlank String name,
        String description,
        @Min(0) int priceCents,
        String photoUrl,
        @Min(0) int stockQuantity,
        Set<@NotBlank String> tags
) {
}

