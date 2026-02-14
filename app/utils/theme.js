// utils/theme.js
import { useColorScheme } from "react-native";

export const useAppTheme = () => {
  const scheme = useColorScheme();
  const isDark = scheme === "dark";

  return {
    colors: {
      // Background colors
      background: isDark ? "#101622" : "#f6f6f8",
      surface: isDark ? "#1a2235" : "#ffffff",

      // Text colors (derived from neutral)
      text: isDark ? "#ffffff" : "#0f172a",
      textSecondary: isDark ? "#94a3b8" : "#64748b",

      // Brand colors
      brandPrimary: "#135bec",
      brandSecondary: "#4f46e5",

      // Neutral colors
      neutral50: "#fafaf9",
      neutral100: "#f5f5f4",
      neutral200: "#e2e8f0",
      neutral300: "#d1d5db",
      neutral400: "#94a3b8",
      neutral500: "#64748b",
      neutral600: "#475569",
      neutral700: "#334155",
      neutral800: "#1e293b",
      neutral900: "#0f172a",

      // Error
      error: "#ef4444",
    },
    isDark,
    scheme,
  };
};
