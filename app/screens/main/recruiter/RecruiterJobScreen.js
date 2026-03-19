import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import JobCard from "../../../components/recruiter_app/jobs/JobCard";
import JobsEmptyState from "../../../components/recruiter_app/jobs/JobsEmptyState";
import JobsErrorState from "../../../components/recruiter_app/jobs/JobsErrorState";
import JobsHeader from "../../../components/recruiter_app/jobs/JobsHeader";
import JobsSearchBar from "../../../components/recruiter_app/jobs/JobsSearchBar";
import JobsTabs from "../../../components/recruiter_app/jobs/JobsTabs";
import { fetchJobPosts } from "../../../store/slices/jobPostSlice";
import { useAppTheme } from "../../../utils/theme";

export default function JobsScreen({ navigation }) {
  const { colors } = useAppTheme();
  const [activeTab, setActiveTab] = useState("active");
  const [search, setSearch] = useState("");

  const dispatch = useDispatch();
  const { posts, loading, error } = useSelector((state) => state.jobPosts);

  useEffect(() => {
    dispatch(fetchJobPosts());
  }, [dispatch]);

  const filtered = posts.filter((p) => {
    const matchesTab = p.status === activeTab;
    const matchesSearch =
      !search ||
      p.title?.toLowerCase().includes(search.toLowerCase()) ||
      p.location?.toLowerCase().includes(search.toLowerCase()) ||
      p.category?.toLowerCase().includes(search.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const counts = {
    active: posts.filter((p) => p.status === "active").length,
    closed: posts.filter((p) => p.status === "closed").length,
  };

  return (
    <SafeAreaView
      className="flex-1"
      style={{ backgroundColor: colors.surface }}
      edges={["top"]}
    >
      <JobsHeader onPostJob={() => navigation.navigate("PostJob")} />

      <JobsSearchBar value={search} onChangeText={setSearch} />

      <JobsTabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
        counts={counts}
      />

      {loading && (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color={colors.brandSecondary} />
        </View>
      )}

      {!loading && error && (
        <JobsErrorState
          error={error}
          onRetry={() => dispatch(fetchJobPosts())}
        />
      )}

      {!loading && !error && (
        <FlatList
          data={filtered}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 16, paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
          style={{ backgroundColor: colors.background }}
          keyboardShouldPersistTaps="handled"
          renderItem={({ item }) => (
            <JobCard
              job={item}
              onPress={() =>
                navigation.navigate("JobDetailScreen", { job: item })
              }
              onEdit={() => navigation.navigate("PostJob", { job: item })}
              onViewApplicants={() =>
                navigation.navigate("Applicants", { jobId: item.id })
              }
              navigation={navigation}
            />
          )}
          ListEmptyComponent={
            <JobsEmptyState
              search={search}
              activeTab={activeTab}
              onPostJob={() => navigation.navigate("PostJob")}
            />
          }
        />
      )}
    </SafeAreaView>
  );
}
