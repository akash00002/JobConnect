import { Pressable, Text, View } from "react-native";
import { useAppTheme } from "../../../utils/theme";
import ActivityItem from "./ActivityItem";

export default function RecentActivitySection({ onViewAll }) {
  const { colors } = useAppTheme();

  return (
    <View className="px-4 mt-5">
      <View className="flex-row items-center justify-between mb-3">
        <Text
          className="text-base font-bold"
          style={{ color: colors.text, letterSpacing: -0.3 }}
        >
          Recent Activity
        </Text>
        <Pressable onPress={onViewAll}>
          <Text
            className="text-sm font-medium"
            style={{ color: colors.brandPrimary }}
          >
            View all
          </Text>
        </Pressable>
      </View>

      <View
        className="rounded-2xl overflow-hidden"
        style={{
          backgroundColor: colors.surface,
          borderWidth: 1,
          borderColor: colors.neutral200,
        }}
      >
        <ActivityItem
          avatarUri="https://ui-avatars.com/api/?name=Jane+Smith&size=80&background=e0e7ff&color=3730a3&bold=true"
          badgeBgColor="#3b82f6"
          badgeIcon="person-add"
          title={
            <Text style={{ color: colors.text }}>
              <Text style={{ fontWeight: "700" }}>Jane Smith</Text>
              <Text style={{ fontWeight: "500" }}> applied for </Text>
              <Text style={{ fontWeight: "600", color: colors.brandPrimary }}>
                UX Designer
              </Text>
            </Text>
          }
          subtitle="2 minutes ago"
        />

        <ActivityItem
          avatarUri="https://ui-avatars.com/api/?name=Mark+Johnson&size=80&background=fef3c7&color=92400e&bold=true"
          badgeBgColor="#f97316"
          badgeIcon="mail"
          title={
            <Text style={{ color: colors.text }}>
              <Text style={{ fontWeight: "500" }}>New message from </Text>
              <Text style={{ fontWeight: "700" }}>Mark Johnson</Text>
            </Text>
          }
          subtitle="1 hour ago"
        />

        <ActivityItem
          isWarning
          title={
            <Text style={{ color: colors.text }}>
              <Text style={{ fontWeight: "700" }}>Frontend Role</Text>
              <Text style={{ fontWeight: "500" }}> expires in 2 days</Text>
            </Text>
          }
          subtitle="Review listing"
          isLast
        />
      </View>
    </View>
  );
}
