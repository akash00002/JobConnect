import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";

import {
  createJobPost,
  updateJobPost,
} from "../../../store/slices/jobPostSlice";
import { useAppTheme } from "../../../utils/theme";
import AuthButton from "../../common/Button";
import AppInput from "./AppInput";
import AppSelect from "./AppSelect";
import BulletPointInput from "./BulletPointInput";
import FormField from "./FormField";
import JobTypeSelector from "./JobTypeSelector";
import PostJobHeader from "./PostJobHeader";
import SectionHeader from "./SectionHeader";
import WorkModeSelector from "./WorkModeSelector";

export default function PostJobScreen({ navigation, route }) {
  const { colors, isDark } = useAppTheme();
  const dispatch = useDispatch();
  const editJob = route.params?.job;

  const [form, setForm] = useState({
    title: editJob?.title || "",
    category: editJob?.category || "",
    workMode: editJob?.workMode || "",
    jobType: editJob?.jobType || "",
    location: editJob?.location || "",
    salaryMin: editJob?.salaryMin?.toString() || "",
    salaryMax: editJob?.salaryMax?.toString() || "",
    responsibilities: editJob?.responsibilities || [],
    requirements: editJob?.requirements || [],
    description: editJob?.description || "",
  });

  const [loading, setLoading] = useState(false);

  const set = (key) => (val) => setForm((prev) => ({ ...prev, [key]: val }));

  const descLength = form.description.length;

  // ✅ fixed — async + await + check fulfilled
  const handlePublish = async () => {
    setLoading(true);
    try {
      if (editJob) {
        const result = await dispatch(
          updateJobPost({ id: editJob.id, ...form }),
        );
        if (updateJobPost.fulfilled.match(result)) navigation.goBack();
      } else {
        const result = await dispatch(createJobPost(form));
        if (createJobPost.fulfilled.match(result)) navigation.goBack();
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: colors.surface }}
      edges={["top"]}
    >
      <View style={{ flex: 1, backgroundColor: colors.background }}>
        <PostJobHeader
          title={editJob ? "Edit Job Post" : "Post a Job"}
          onBack={() => navigation?.goBack()}
        />

        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          keyboardVerticalOffset={0}
        >
          <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={{ padding: 20, paddingBottom: 20 }}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <SectionHeader title="Essentials" first />

            <FormField label="Job Title">
              <AppInput
                placeholder="e.g. Senior Product Designer"
                value={form.title}
                onChangeText={set("title")}
              />
            </FormField>

            <FormField label="Category">
              <AppSelect
                value={form.category}
                onChange={set("category")}
                placeholder="Select a category"
              />
            </FormField>

            <SectionHeader title="Details" />

            <FormField label="Work Mode">
              <WorkModeSelector
                value={form.workMode}
                onChange={set("workMode")}
              />
            </FormField>

            <FormField label="Job Type">
              <JobTypeSelector value={form.jobType} onChange={set("jobType")} />
            </FormField>

            <FormField label="Location">
              <AppInput
                placeholder="e.g. San Francisco, CA or Remote"
                value={form.location}
                onChangeText={set("location")}
                leftIcon={
                  <Ionicons
                    name="location-outline"
                    size={18}
                    color={colors.neutral400}
                  />
                }
              />
            </FormField>

            <FormField label="Salary Range (Annual)">
              <View style={{ flexDirection: "row", gap: 12 }}>
                <View style={{ flex: 1 }}>
                  <AppInput
                    placeholder="Min"
                    value={form.salaryMin}
                    onChangeText={set("salaryMin")}
                    keyboardType="numeric"
                    prefix={
                      <Text
                        style={{
                          fontSize: 15,
                          fontWeight: "500",
                          color: colors.neutral400,
                        }}
                      >
                        $
                      </Text>
                    }
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <AppInput
                    placeholder="Max"
                    value={form.salaryMax}
                    onChangeText={set("salaryMax")}
                    keyboardType="numeric"
                    prefix={
                      <Text
                        style={{
                          fontSize: 15,
                          fontWeight: "500",
                          color: colors.neutral400,
                        }}
                      >
                        $
                      </Text>
                    }
                  />
                </View>
              </View>
            </FormField>

            <SectionHeader title="Role Details" />

            <FormField label="Key Responsibilities">
              <BulletPointInput
                points={form.responsibilities}
                onChange={set("responsibilities")}
                placeholder="e.g. Lead design system development..."
              />
            </FormField>

            <FormField label="Requirements">
              <BulletPointInput
                points={form.requirements}
                onChange={set("requirements")}
                placeholder="e.g. 3+ years of experience in..."
              />
            </FormField>

            <SectionHeader title="Job Description" />

            <FormField label="Description">
              <View>
                <AppInput
                  placeholder="Describe the role, responsibilities, and requirements..."
                  value={form.description}
                  onChangeText={set("description")}
                  multiline
                  numberOfLines={6}
                  maxLength={2000}
                />
                <Text
                  style={{
                    fontSize: 11,
                    color: colors.neutral400,
                    textAlign: "right",
                    marginTop: 6,
                  }}
                >
                  {descLength}/2000
                </Text>
              </View>
            </FormField>
          </ScrollView>
        </KeyboardAvoidingView>

        <View
          style={{
            paddingBottom: Platform.OS === "ios" ? 24 : 18,
            borderTopWidth: 1,
            borderTopColor: isDark ? colors.neutral700 : colors.neutral200,
            backgroundColor: colors.surface,
          }}
          className="items-center pt-4 px-10"
        >
          <AuthButton
            title={
              loading
                ? editJob
                  ? "Updating..."
                  : "Publishing..."
                : editJob
                  ? "Update Job"
                  : "Publish Job"
            }
            variant="recruiter"
            iconName="arrow-forward"
            onPress={handlePublish}
            loading={loading}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
