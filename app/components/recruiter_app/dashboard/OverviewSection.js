import { ScrollView, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import StatCard from "./StatCard";
import { useAppTheme } from "../../../utils/theme";

export default function OverviewSection() {
  const { colors } = useAppTheme();

  return (
    <View className="pt-5">
      <Text
        className="px-4 text-base font-bold mb-3"
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
          iconBgColor="#EEF3FD"
          iconColor="#135bec"
          value={12}
          label="Active Jobs"
          badge={
            <View className="flex-row items-center gap-0.5 px-2 py-1 rounded-full bg-green-50">
              <Ionicons name="trending-up" size={12} color="#16a34a" />
              <Text className="text-[10px] font-bold text-green-600">+2</Text>
            </View>
          }
        />

        <StatCard
          icon="people-outline"
          iconBgColor="#f5f3ff"
          iconColor="#7c3aed"
          value={48}
          label="Total Applicants"
          badge={
            <View className="px-2 py-1 rounded-full bg-green-50">
              <Text className="text-[10px] font-bold text-green-600">
                +5 New
              </Text>
            </View>
          }
        />

        <StatCard
          icon="mail-outline"
          iconBgColor="#fff7ed"
          iconColor="#ea580c"
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
