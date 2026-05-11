package mate.academy.backend.mapper;

import java.util.Set;
import java.util.stream.Collectors;
import mate.academy.backend.dto.GiftDto;
import mate.academy.backend.model.Gift;
import mate.academy.backend.model.Tag;

public class GiftMapper {
    private GiftMapper() {
    }

    public static GiftDto toDto(Gift g) {
        Set<String> tags = g.getTags().stream()
                .map(Tag::getName)
                .collect(Collectors.toSet());
        return new GiftDto(
                g.getId(),
                g.getName(),
                g.getDescription(),
                g.getPriceCents(),
                g.getPhotoUrl(),
                g.getStockQuantity(),
                tags
        );
    }
}

