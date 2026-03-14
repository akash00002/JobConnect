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
        style={{
          fontSize: 16,
          fontWeight: "700",
          marginBottom: 12,
          letterSpacing: -0.3,
          color: colors.text,
        }}
      >
        Quick Actions
      </Text>

      <View style={{ flexDirection: "row", gap: 10 }}>
        <ActionButton
          icon="add"
          label="Post Job"
          iconBgColor=""
          iconColor=""
          primary
          onPress={() => navigation.navigate("PostJob")}
        />
        <ActionButton
          icon="calendar-outline"
          label="Schedule"
          iconBgColor="#dbeafe"
          iconColor="#1d4ed8"
          onPress={onSchedule}
        />
        <ActionButton
          icon="document-text-outline"
          label="Review Apps"
          iconBgColor="#ede9fe"
          iconColor="#5b21b6"
          onPress={onReviewApps}
        />
      </View>
    </View>
  );
}
