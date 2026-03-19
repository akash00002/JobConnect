import { Text, View } from "react-native";
import { useAppTheme } from "../../../utils/theme";
import ActionButton from "./ActionButton";

export default function QuickActionsSection({
  navigation,
  onSchedule,
  onReviewApps,
}) {
  const { colors } = useAppTheme();

  return (
    <View style={{ paddingHorizontal: 16, marginTop: 20 }}>
      <Text
        className="text-xl font-bold mb-3"
        style={{ letterSpacing: -0.3, color: colors.text }}
      >
        Quick Actions
      </Text>

      <View style={{ flexDirection: "row", gap: 10 }}>
        <ActionButton
          icon="add"
          label="Post Job"
          primary
          onPress={() => navigation.navigate("PostJob")}
        />
        <ActionButton
          icon="calendar-outline"
          label="Schedule"
          iconBgColor={colors.blueAccentBg}
          iconColor={colors.blueAccentText}
          onPress={onSchedule}
        />
        <ActionButton
          icon="document-text-outline"
          label="Review Apps"
          iconBgColor={colors.purpleAccentBg}
          iconColor={colors.purpleAccentText}
          onPress={onReviewApps}
        />
      </View>
    </View>
  );
}
