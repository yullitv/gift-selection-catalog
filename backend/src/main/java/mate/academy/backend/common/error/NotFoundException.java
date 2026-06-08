package mate.academy.backend.common.error;

import org.springframework.http.HttpStatus;

public class NotFoundException extends ApiException {
    public NotFoundException(ErrorCode code, String message) {
        super(code, HttpStatus.NOT_FOUND, message);
    }

    public static NotFoundException gift() {
        return new NotFoundException(ErrorCode.GIFT_NOT_FOUND, "Gift not found");
    }

    public static NotFoundException order() {
        return new NotFoundException(ErrorCode.ORDER_NOT_FOUND, "Order not found");
    }

    public static NotFoundException user() {
        return new NotFoundException(ErrorCode.USER_NOT_FOUND, "User not found");
    }

    public static NotFoundException wishlistItem() {
        return new NotFoundException(ErrorCode.WISHLIST_ITEM_NOT_FOUND, "Wishlist item not found");
    }

    public static NotFoundException generic() {
        return new NotFoundException(ErrorCode.NOT_FOUND, "Requested resource not found");
    }
}
