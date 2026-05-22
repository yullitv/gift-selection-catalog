package mate.academy.backend.mapper;

import java.util.List;
import mate.academy.backend.dto.CartDto;
import mate.academy.backend.dto.CartItemDto;
import mate.academy.backend.model.CartItem;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

@Mapper(componentModel = "spring")
public interface CartMapper {

    @Mapping(target = "giftId", source = "gift.id")
    @Mapping(target = "name", source = "gift.name")
    @Mapping(target = "photoUrl", source = "gift.photoUrl")
    @Mapping(target = "priceCents", source = "gift.priceCents")
    @Mapping(target = "subtotalCents", source = ".", qualifiedByName = "subtotalCents")
    CartItemDto toItemDto(CartItem item);

    default CartDto toCartDto(List<CartItem> items) {
        List<CartItemDto> itemDtos = items.stream().map(this::toItemDto).toList();
        int totalItems = items.stream().mapToInt(CartItem::getQuantity).sum();
        int totalPriceCents = itemDtos.stream().mapToInt(CartItemDto::subtotalCents).sum();
        return new CartDto(itemDtos, totalItems, totalPriceCents);
    }

    @Named("subtotalCents")
    default int subtotalCents(CartItem item) {
        return item.getGift().getPriceCents() * item.getQuantity();
    }
}
