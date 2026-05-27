package mate.academy.backend.dto;

import jakarta.validation.constraints.AssertTrue;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import mate.academy.backend.model.DeliveryType;
import mate.academy.backend.model.PaymentMethod;

public record CreateOrderRequest(
        @NotBlank(message = "Full name is required")
        @Size(min = 2, max = 255, message = "Full name must be between 2 and 255 characters")
        @Pattern(
                regexp = "^[a-zA-Zа-яА-ЯіІїЇєЄґҐʼ'\\-\\s]+$",
                message = "Full name can only contain letters, spaces, hyphens and apostrophes"
        )
        String recipientFullName,

        @NotBlank(message = "Phone is required")
        @Pattern(
                regexp = "^\\+?[0-9]{10,15}$",
                message = "Phone must contain 10-15 digits, optionally starting with +"
        )
        String recipientPhone,

        @NotBlank(message = "Email is required")
        @Email(message = "Email must be valid")
        @Size(max = 255)
        String recipientEmail,

        @NotNull(message = "Delivery type is required")
        DeliveryType deliveryType,

        String npCityRef,
        String npCityName,
        String npWarehouseRef,
        String npWarehouseName,

        String courierAddress,

        @NotNull(message = "Payment method is required")
        PaymentMethod paymentMethod,

        Boolean rememberAddress
) {
    @AssertTrue(message = "City and warehouse are required for Nova Poshta delivery")
    public boolean isNovaPoshtaDeliveryValid() {
        if (deliveryType == null || deliveryType == DeliveryType.COURIER) {
            return true;
        }
        return isNotBlank(npCityRef)
                && isNotBlank(npCityName)
                && isNotBlank(npWarehouseRef)
                && isNotBlank(npWarehouseName);
    }

    @AssertTrue(message = "Courier address is required for courier delivery")
    public boolean isCourierDeliveryValid() {
        if (deliveryType != DeliveryType.COURIER) {
            return true;
        }
        return isNotBlank(courierAddress);
    }

    public boolean shouldRememberAddress() {
        return Boolean.TRUE.equals(rememberAddress);
    }

    private static boolean isNotBlank(String value) {
        return value != null && !value.isBlank();
    }
}
