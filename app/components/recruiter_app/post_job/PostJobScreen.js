import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useAppTheme } from "../../../utils/theme";
import AppInput from "./AppInput";
import AppSelect from "./AppSelect";
import FormField from "./FormField";
import PostJobHeader from "./PostJobHeader";
import SectionHeader from "./SectionHeader";

export default function PostJobScreen({ navigation }) {
  const { colors } = useAppTheme();

  const [form, setForm] = useState({
    title: "",
    category: "",
    location: "",
    salaryMin: "",
    salaryMax: "",
    description: "",
  });

  const set = (key) => (val) => setForm((prev) => ({ ...prev, [key]: val }));

  const descLength = form.description.length;

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: colors.background }}
      edges={["top"]}
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={0}
      >
        {/* Header */}
        <PostJobHeader onBack={() => navigation?.goBack()} />

        {/* Scrollable Form */}
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ padding: 20, paddingBottom: 120 }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* ── Essentials ── */}
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

          {/* ── Details ── */}
          <SectionHeader title="Details" />

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

          {/* ── Job Description ── */}
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

        {/* Bottom Action Bar */}
        <View
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            flexDirection: "row",
            alignItems: "center",
            gap: 12,
            padding: 16,
            paddingBottom: Platform.OS === "ios" ? 32 : 16,
            backgroundColor: colors.surface,
            borderTopWidth: 1,
            borderTopColor: colors.neutral200,
          }}
        >
          {/* Preview button */}
          <Pressable
            style={({ pressed }) => ({
              width: 52,
              height: 52,
              borderRadius: 14,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: pressed ? colors.neutral200 : colors.neutral100,
            })}
          >
            <Ionicons name="eye-outline" size={22} color={colors.text} />
          </Pressable>

          {/* Publish button */}
          <Pressable
            style={({ pressed }) => ({
              flex: 1,
              height: 52,
              borderRadius: 14,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              backgroundColor: colors.brandPrimary,
              opacity: pressed ? 0.85 : 1,
              shadowColor: colors.brandPrimary,
              shadowOpacity: 0.35,
              shadowRadius: 10,
              shadowOffset: { width: 0, height: 4 },
              elevation: 6,
            })}
          >
            <Text style={{ fontSize: 16, fontWeight: "700", color: "#fff" }}>
              Publish Job
            </Text>
            <Ionicons name="arrow-forward" size={18} color="#fff" />
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
