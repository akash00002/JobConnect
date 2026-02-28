import { Ionicons } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";
import { useState } from "react";
import { Text, View } from "react-native";
import { useOnboarding } from "../../context/OnboardingContext";
import { useAppTheme } from "../../utils/theme";
import TitleInput from "./TitleInput";
import TouchableScale from "./TouchableScale";

export default function DocumentUpload({
  title = "Resume / CV",
  uploadLabel = "Upload Resume",
  fileTypes = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ],
  fileTypeLabel = "PDF, DOC, DOCX (MAX 1MB)",
  maxSizeMB = 1,
  formDataKey = "resume",
  variant,
  optional = false,
}) {
  const { colors } = useAppTheme();
  const { formData, updateFormData } = useOnboarding();
  const [document, setDocument] = useState(formData[formDataKey] || null);
  const [error, setError] = useState("");

  async function handlePickDocument() {
    const result = await DocumentPicker.getDocumentAsync({
      type: fileTypes,
      copyToCacheDirectory: true,
    });

    if (!result.canceled) {
      const file = result.assets[0];
      if (file.size > maxSizeMB * 1024 * 1024) {
        setError(`File size must be less than ${maxSizeMB}MB`);
        return;
      }
      setError("");
      setDocument(file);
      updateFormData(formDataKey, file);
    }
  }

  function handleRemoveDocument() {
    setDocument(null);
    setError("");
    updateFormData(formDataKey, null);
  }

  return (
    <>
      {/* Title row with optional tag */}
      <View className="flex-row items-center justify-between ml-1 mb-2">
        <Text className="text-lg font-medium" style={{ color: colors.text }}>
          {title}
        </Text>
        {optional && (
          <View
            className="px-2 py-0.5 rounded-full"
            style={{ backgroundColor: colors.neutral200 }}
          >
            <Text
              className="text-xs font-medium"
              style={{ color: colors.neutral500 }}
            >
              Optional
            </Text>
          </View>
        )}
      </View>

      <TitleInput variant="upload">
        {document ? (
          <View className="w-full px-4 gap-3">
            <View
              className="flex-row items-center gap-3 p-4 rounded-2xl w-full"
              style={{ backgroundColor: colors.surface }}
            >
              <View
                className="h-14 w-14 rounded-2xl items-center justify-center"
                style={{
                  backgroundColor:
                    variant === "recruiter"
                      ? colors.brandSecondary + "15"
                      : colors.brandPrimary + "15",
                }}
              >
                <Ionicons
                  name="document-text"
                  size={28}
                  color={
                    variant === "recruiter"
                      ? colors.brandSecondary
                      : colors.brandPrimary
                  }
                />
              </View>
              <View className="flex-1">
                <Text
                  className="text-base font-semibold"
                  style={{ color: colors.text }}
                  numberOfLines={1}
                >
                  {document.name}
                </Text>
                <Text
                  className="text-sm mt-1"
                  style={{ color: colors.textSecondary }}
                >
                  {document.size
                    ? `${(document.size / 1024).toFixed(1)} KB`
                    : ""}
                </Text>
              </View>
            </View>

            <TouchableScale
              onPress={handleRemoveDocument}
              className="flex-row items-center justify-center gap-2"
            >
              <Ionicons name="trash-outline" size={16} color={colors.error} />
              <Text className="text-sm" style={{ color: colors.error }}>
                Remove
              </Text>
            </TouchableScale>
          </View>
        ) : (
          <>
            <TouchableScale
              onPress={handlePickDocument}
              className="h-20 w-16 rounded-full items-center justify-center"
              style={{ backgroundColor: colors.surface }}
            >
              <Ionicons
                name="cloud-upload"
                size={26}
                color={
                  variant === "recruiter"
                    ? colors.brandSecondary
                    : colors.brandPrimary
                }
              />
            </TouchableScale>
            <Text
              className="text-xl font-normal"
              style={{ color: colors.text }}
            >
              {uploadLabel}
            </Text>
            <Text className="text-sm" style={{ color: colors.textSecondary }}>
              {fileTypeLabel}
            </Text>
          </>
        )}
      </TitleInput>

      {error ? (
        <View className="flex-row items-center -mt-3 px-1">
          <Ionicons name="alert-circle" size={14} color={colors.error} />
          <Text className="text-xs ml-1" style={{ color: colors.error }}>
            {error}
          </Text>
        </View>
      ) : null}
    </>
  );
}
