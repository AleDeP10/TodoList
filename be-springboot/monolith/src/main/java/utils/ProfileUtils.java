package utils;

public class ProfileUtils {

    private ProfileUtils() {
        // Utility class: no instantiation
    }

    public static boolean isPostgres() {
        return !isTestProfile();
    }

    public static boolean isTestProfile() {
        String activeProfile = System.getProperty("spring.profiles.active", "");
        return "test".equalsIgnoreCase(activeProfile);
    }
}
