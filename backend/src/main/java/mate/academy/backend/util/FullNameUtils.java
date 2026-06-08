package mate.academy.backend.util;

public final class FullNameUtils {
    private FullNameUtils() {
    }

    public static String[] split(String fullName) {
        if (fullName == null || fullName.isBlank()) {
            return new String[]{"", ""};
        }
        String trimmed = fullName.trim();
        int space = trimmed.indexOf(' ');
        if (space < 0) {
            return new String[]{trimmed, ""};
        }
        return new String[]{
                trimmed.substring(0, space),
                trimmed.substring(space + 1).trim()
        };
    }

    public static String join(String firstName, String lastName) {
        return firstName.trim() + " " + lastName.trim();
    }
}
