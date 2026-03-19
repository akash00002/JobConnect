import { Ionicons } from "@expo/vector-icons";
import { ScrollView, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { useAppTheme } from "../../../utils/theme";
import StatCard from "./StatCard";

export default function OverviewSection() {
  const { colors } = useAppTheme();

  const activeCount = useSelector(
    (state) => state.jobPosts.posts.filter((p) => p.status === "active").length,
  );

  return (
    <View className="pt-5">
      <Text
        className="px-4 text-xl font-bold mb-3"
        style={{ color: colors.text, letterSpacing: -0.3 }}
      >
        Overview
      </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 4 }}
      >
        <StatCard
          icon="briefcase-outline"
          iconBgColor={colors.brandPrimaryBg}
          iconColor={colors.brandPrimary}
          value={activeCount || "-"}
          label="Active Jobs"
          badge={
            <View
              className="flex-row items-center gap-0.5 px-2 py-1 rounded-full"
              style={{ backgroundColor: colors.successBg }}
            >
              <Ionicons
                name="trending-up"
                size={12}
                color={colors.successIcon}
              />
              <Text
                className="text-[10px] font-bold"
                style={{ color: colors.successText }}
              >
                +2
              </Text>
            </View>
          }
        />

        <StatCard
          icon="people-outline"
          iconBgColor={colors.purpleBg}
          iconColor={colors.purpleIcon}
          value={48}
          label="Total Applicants"
          badge={
            <View
              className="px-2 py-1 rounded-full"
              style={{ backgroundColor: colors.successBg }}
            >
              <Text
                className="text-[10px] font-bold"
                style={{ color: colors.successText }}
              >
                +5 New
              </Text>
            </View>
          }
        />

        <StatCard
          icon="mail-outline"
          iconBgColor={colors.orangeBg}
          iconColor={colors.orangeIcon}
          value={5}
          label="Unread Messages"
          badge={
            <Text
              className="text-[11px] font-semibold"
              style={{ color: colors.brandPrimary }}
            >
              Read now
            </Text>
          }
        />
      </ScrollView>
    </View>
  );
}
