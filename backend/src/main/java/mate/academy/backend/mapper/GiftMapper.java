package mate.academy.backend.mapper;

import java.util.Set;
import java.util.stream.Collectors;
import mate.academy.backend.dto.GiftDto;
import mate.academy.backend.dto.GiftUpsertRequest;
import mate.academy.backend.model.Gift;
import mate.academy.backend.model.Tag;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.Named;

@Mapper(componentModel = "spring")
public interface GiftMapper {

    @Mapping(target = "tags", source = "tags", qualifiedByName = "tagsToStrings")
    GiftDto toDto(Gift gift);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "tags", ignore = true)
    @Mapping(target = "events", ignore = true)
    Gift toEntity(GiftUpsertRequest request);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "tags", ignore = true)
    @Mapping(target = "events", ignore = true)
    void updateEntity(GiftUpsertRequest request, @MappingTarget Gift gift);

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
