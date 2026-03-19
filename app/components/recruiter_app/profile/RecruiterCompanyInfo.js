import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useAppTheme } from "../../../utils/theme";
import TitleInput from "../../common/TitleInput";

function InfoRow({ icon, label, value }) {
  const { colors } = useAppTheme();
  if (!value) return null;
  return (
    <View className="flex-row items-center" style={{ gap: 12 }}>
      <View
        className="w-9 h-9 rounded-lg items-center justify-center"
        style={{ backgroundColor: `${colors.brandSecondary}15` }}
      >
        <Ionicons name={icon} size={18} color={colors.brandSecondary} />
      </View>
      <View className="flex-1">
        <Text
          className="text-xs mb-0.5"
          style={{ color: colors.textSecondary }}
        >
          {label}
        </Text>
        <Text className="text-sm font-medium" style={{ color: colors.text }}>
          {value}
        </Text>
      </View>
    </View>
  );
}

export default function RecruiterCompanyInfo({ recruiter, onSave }) {
  const { colors, isDark } = useAppTheme();
  const [isEditing, setIsEditing] = useState(false);
  const [companyName, setCompanyName] = useState(recruiter?.company_name || "");
  const [industry, setIndustry] = useState(recruiter?.industry || "");
  const [companySize, setCompanySize] = useState(recruiter?.company_size || "");
  const [headquarters, setHeadquarters] = useState(
    recruiter?.headquarters || "",
  );
  const [website, setWebsite] = useState(recruiter?.company_website || "");

  async function handleSave() {
    setIsEditing(false);
    await onSave({
      companyName,
      industry,
      companySize,
      headquarters,
      companyWebsite: website,
    });
  }

  return (
    <View style={{ width: "100%" }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text className="text-xl font-bold" style={{ color: colors.text }}>
          Company Info
        </Text>
        <TouchableOpacity
          onPress={isEditing ? handleSave : () => setIsEditing(true)}
          className="flex-row items-center gap-1 px-3 py-2 rounded-full"
        >
          <Ionicons
            name={isEditing ? "checkmark-sharp" : "pencil-sharp"}
            size={18}
            color={colors.brandSecondary}
          />
          <Text
            className="text-sm font-medium"
            style={{ color: colors.brandSecondary }}
          >
            {isEditing ? "Save" : "Edit"}
          </Text>
        </TouchableOpacity>
      </View>

      <View
        className="w-full p-4 rounded-2xl border mt-2"
        style={{
          backgroundColor: colors.surface,
          borderColor: isEditing
            ? colors.brandSecondary
            : isDark
              ? colors.neutral700
              : colors.neutral100,
        }}
      >
        {isEditing ? (
          <View style={{ gap: 4 }}>
            <TitleInput
              placeholder="Company Name"
              iconName="business-outline"
              value={companyName}
              onChangeText={setCompanyName}
              variant="recruiter"
            />
            <TitleInput
              placeholder="Industry"
              iconName="briefcase-outline"
              value={industry}
              onChangeText={setIndustry}
              variant="recruiter"
            />
            <TitleInput
              placeholder="Company Size (e.g. 50-100)"
              iconName="people-outline"
              value={companySize}
              onChangeText={setCompanySize}
              variant="recruiter"
            />
            <TitleInput
              placeholder="Headquarters"
              iconName="location-outline"
              value={headquarters}
              onChangeText={setHeadquarters}
              variant="recruiter"
            />
            <TitleInput
              placeholder="Company Website"
              iconName="link"
              value={website}
              onChangeText={setWebsite}
              variant="recruiter"
            />
          </View>
        ) : (
          <View style={{ gap: 12 }}>
            <InfoRow
              icon="business-outline"
              label="Company"
              value={companyName}
            />
            <InfoRow
              icon="briefcase-outline"
              label="Industry"
              value={industry}
            />
            <InfoRow icon="people-outline" label="Size" value={companySize} />
            <InfoRow
              icon="location-outline"
              label="Headquarters"
              value={headquarters}
            />
            <InfoRow icon="link" label="Website" value={website} />
          </View>
        )}
      </View>
    </View>
  );
}
