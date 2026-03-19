import { useEffect, useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import DashboardHeader from "../../../components/recruiter_app/dashboard/DashboardHeader";
import OverviewSection from "../../../components/recruiter_app/dashboard/OverviewSection";
import QuickActionsSection from "../../../components/recruiter_app/dashboard/QuickActionsSection";
import RecentActivitySection from "../../../components/recruiter_app/dashboard/RecentActivitySection";
import { useProfile } from "../../../context/ProfileContext";
import { fetchJobPosts } from "../../../store/slices/jobPostSlice";
import { useAppTheme } from "../../../utils/theme";

export default function RecruiterDashboard({ navigation }) {
  const { profile } = useProfile();
  const { colors, isDark } = useAppTheme();
  const [activeTab, setActiveTab] = useState("dashboard");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchJobPosts());
  }, [dispatch]);

  const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    profile?.name || "Alex Johnson",
  )}&size=200&background=135bec&color=fff&bold=true`;

  return (
    <SafeAreaView
      className="flex-1"
      style={{ backgroundColor: colors.surface }}
      edges={["top"]}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        className="flex-1"
        style={{ backgroundColor: colors.background }}
      >
        <DashboardHeader
          name={profile?.name || "Loading name..."}
          avatarUrl={profile?.profile_photo || avatarUrl}
          onNotificationPress={() => {}}
          navigation={navigation}
        />
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ paddingBottom: 120 }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <OverviewSection />
          <QuickActionsSection
            navigation={navigation}
            onSchedule={() => {}}
            onReviewApps={() => {}}
          />
          <RecentActivitySection onViewAll={() => {}} />
        </ScrollView>
        {/* <FAB onPress={() => {}} /> */}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
