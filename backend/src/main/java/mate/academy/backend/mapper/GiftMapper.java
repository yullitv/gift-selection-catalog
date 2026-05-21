package mate.academy.backend.mapper;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import mate.academy.backend.dto.GiftDto;
import mate.academy.backend.dto.GiftUpsertRequest;
import mate.academy.backend.model.Gift;
import mate.academy.backend.model.GiftImage;
import mate.academy.backend.model.Tag;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.Named;

@Mapper(componentModel = "spring")
public interface GiftMapper {

    @Mapping(target = "tags", source = "tags", qualifiedByName = "tagsToStrings")
    @Mapping(target = "primaryImageUrl", source = ".", qualifiedByName = "primaryImageUrl")
    @Mapping(target = "imageUrls", source = ".", qualifiedByName = "imageUrls")
    GiftDto toDto(Gift gift);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "tags", ignore = true)
    @Mapping(target = "events", ignore = true)
    @Mapping(target = "targetAudiences", ignore = true)
    @Mapping(target = "images", ignore = true)
    Gift toEntity(GiftUpsertRequest request);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "tags", ignore = true)
    @Mapping(target = "events", ignore = true)
    @Mapping(target = "targetAudiences", ignore = true)
    @Mapping(target = "images", ignore = true)
    void updateEntity(GiftUpsertRequest request, @MappingTarget Gift gift);

    @Named("primaryImageUrl")
    default String primaryImageUrl(Gift gift) {
        if (gift.getImages() != null && !gift.getImages().isEmpty()) {
            return gift.getImages().stream()
                    .filter(GiftImage::isPrimary)
                    .findFirst()
                    .map(GiftImage::getImageUrl)
                    .orElseGet(() -> gift.getImages().get(0).getImageUrl());
        }
        return gift.getPhotoUrl();
    }

    @Named("imageUrls")
    default List<String> imageUrls(Gift gift) {
        if (gift.getImages() != null && !gift.getImages().isEmpty()) {
            return gift.getImages().stream()
                    .map(GiftImage::getImageUrl)
                    .toList();
        }
        if (gift.getPhotoUrl() != null && !gift.getPhotoUrl().isBlank()) {
            return List.of(gift.getPhotoUrl());
        }
        return List.of();
    }

    @Named("tagsToStrings")
    default Set<String> tagsToStrings(Set<Tag> tags) {
        if (tags == null) {
            return Set.of();
        }
        return tags.stream()
                .map(Tag::getName)
                .collect(Collectors.toSet());
    }
}
