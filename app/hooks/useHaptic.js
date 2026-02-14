import * as Haptics from "expo-haptics";
import { ENABLE_HAPTICS } from "../components/config/appConfig";

export const useHaptics = () => {
  if (!ENABLE_HAPTICS) {
    return {
      impact: async () => {},
      success: async () => {},
      error: async () => {},
    };
  }

  const impact = async () => {
    try {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } catch {}
  };

  const success = async () => {
    try {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } catch {}
  };

  const error = async () => {
    try {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    } catch {}
  };

  return { impact, success, error };
};
