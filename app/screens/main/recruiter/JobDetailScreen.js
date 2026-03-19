import { Ionicons } from "@expo/vector-icons";
import { useEffect } from "react";
import { Alert, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import JobDetailBottomBar from "../../../components/recruiter_app/jobs/JobDetailBottomBar";
import JobDetailHeader from "../../../components/recruiter_app/jobs/JobDetailHeader";
import JobDetailMetrics from "../../../components/recruiter_app/jobs/JobDetailMetrics";
import JobDetailSectionCard from "../../../components/recruiter_app/jobs/JobDetailSectionCard";
import JobDetailTitleCard from "../../../components/recruiter_app/jobs/JobDetailTitleCard";
import {
  deleteJobPost,
  toggleJobStatus,
} from "../../../store/slices/jobPostSlice";
import { useAppTheme } from "../../../utils/theme";

export default function JobDetailScreen({ navigation, route }) {
  const { colors } = useAppTheme();
  const dispatch = useDispatch();
  const jobId = route.params?.job?.id;
  const job = useSelector((state) =>
    state.jobPosts.posts.find((p) => p.id === jobId),
  );

  useEffect(() => {
    if (!job) navigation.goBack();
  }, [job, navigation]);

  if (!job) return null;

  const newApplicants = job.newApplicants ?? job.new_applicants ?? 0;
  const totalApplicants = job.applicants ?? 0;

  const handleEdit = () => navigation.navigate("PostJob", { job });

  const handleDelete = () => {
    Alert.alert(
      "Delete Job",
      `Are you sure you want to delete "${job.title}"?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            await dispatch(deleteJobPost(job.id));
            navigation.goBack();
          },
        },
      ],
    );
  };

  const handleToggleStatus = () => {
    dispatch(toggleJobStatus({ id: job.id, currentStatus: job.status }));
  };

  return (
    <SafeAreaView
      className="flex-1"
      style={{ backgroundColor: colors.surface }}
      edges={["top"]}
    >
      <View className="flex-1" style={{ backgroundColor: colors.background }}>
        <JobDetailHeader
          job={job}
          onBack={() => navigation.goBack()}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onToggleStatus={handleToggleStatus}
        />

        <ScrollView
          className="flex-1"
          contentContainerStyle={{ padding: 16, paddingBottom: 120 }}
          showsVerticalScrollIndicator={false}
        >
          <JobDetailTitleCard job={job} />

          <JobDetailMetrics
            totalApplicants={totalApplicants}
            newApplicants={newApplicants}
          />

          {/* Description */}
          {job.description && (
            <JobDetailSectionCard
              icon="document-text-outline"
              title="Job Description"
            >
              <Text
                className="text-sm leading-6"
                style={{ color: colors.textSecondary }}
              >
                {job.description}
              </Text>
            </JobDetailSectionCard>
          )}

          {/* Responsibilities */}
          {job.responsibilities?.length > 0 && (
            <JobDetailSectionCard
              icon="list-outline"
              title="Key Responsibilities"
            >
              {job.responsibilities.map((item, index) => (
                <View key={index} className="flex-row items-start gap-2.5 mb-3">
                  <View
                    className="w-2 h-2 rounded-full mt-1.5 shrink-0"
                    style={{ backgroundColor: colors.brandSecondary }}
                  />
                  <Text
                    className="flex-1 text-sm leading-5"
                    style={{ color: colors.textSecondary }}
                  >
                    {item}
                  </Text>
                </View>
              ))}
            </JobDetailSectionCard>
          )}

          {/* Requirements */}
          {job.requirements?.length > 0 && (
            <JobDetailSectionCard
              icon="checkmark-circle-outline"
              title="Requirements"
            >
              {job.requirements.map((item, index) => (
                <View key={index} className="flex-row items-start gap-2.5 mb-3">
                  <Ionicons
                    name="checkmark-circle"
                    size={18}
                    color={colors.brandSecondary}
                    style={{ marginTop: 1, flexShrink: 0 }}
                  />
                  <Text
                    className="flex-1 text-sm leading-5"
                    style={{ color: colors.textSecondary }}
                  >
                    {item}
                  </Text>
                </View>
              ))}
            </JobDetailSectionCard>
          )}
        </ScrollView>

        <JobDetailBottomBar
          totalApplicants={totalApplicants}
          newApplicants={newApplicants}
          onReviewApplicants={() =>
            navigation.navigate("Applicants", { jobId: job.id })
          }
        />
      </View>
    </SafeAreaView>
  );
}
