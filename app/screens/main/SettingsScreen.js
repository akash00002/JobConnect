import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAuth } from "../../context/AuthContext";
import { useProfile } from "../../context/ProfileContext";
import Toast from "../../features/toast/Toast";
import { onboardingService } from "../../services/OnboardingService";
import { useAppTheme } from "../../utils/theme";

export default function Settings({ navigation }) {
  const { colors, isDark } = useAppTheme();
  const { logout, userRole } = useAuth();
  const { profile, refetch, updateProfile } = useProfile();
  const insets = useSafeAreaInsets();

  const isRecruiter = userRole === "recruiter";
  const recruiter = profile?.recruiter_profiles;

  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [companyLogo, setCompanyLogo] = useState(null);
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingLocation, setIsEditingLocation] = useState(false);
  const [toast, setToast] = useState({
    visible: false,
    message: "",
    type: "success",
  });

  const accentColor = isRecruiter ? colors.brandSecondary : colors.brandPrimary;

  function showToast(message, type = "success") {
    setToast({ visible: true, message, type });
  }

  useEffect(() => {
    if (profile) {
      setName(profile.name || "");
      if (isRecruiter) {
        setLocation(recruiter?.company_location || "");
        setCompanyLogo(recruiter?.company_logo || null);
      } else {
        setLocation(profile.candidate_profiles?.current_city || "");
      }
    }
  }, [profile]);

  async function handleSaveName() {
    setIsEditingName(false);
    try {
      await updateProfile({ name });
      showToast("Name updated successfully");
    } catch {
      showToast("Failed to update name", "error");
    }
  }

  async function handleSaveLocation() {
    setIsEditingLocation(false);
    try {
      await updateProfile(
        isRecruiter ? { headquarters: location } : { currentCity: location },
      );
      showToast("Location updated successfully");
    } catch {
      showToast("Failed to update location", "error");
    }
  }

  async function handlePickLogo() {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) return;
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });
    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setCompanyLogo(uri);
      setUploadingLogo(true);
      try {
        await onboardingService.updateRecruiterProfile({ companyLogo: uri });
        showToast("Company logo updated");
        await refetch();
      } catch {
        showToast("Failed to update logo", "error");
      } finally {
        setUploadingLogo(false);
      }
    }
  }

  async function handleLogout() {
    try {
      await logout();
    } catch {
      showToast("Failed to logout", "error");
    }
  }

  return (
    <View
      className="flex-1"
      style={{ backgroundColor: colors.background, paddingTop: insets.top }}
    >
      <Toast
        visible={toast.visible}
        message={toast.message}
        type={toast.type}
        onHide={() => setToast((t) => ({ ...t, visible: false }))}
      />

      {/* Header */}
      <View className="flex-row items-center px-4 py-3 gap-3">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="w-9 h-9 rounded-full items-center justify-center"
          style={{
            backgroundColor: isDark ? colors.neutral800 : colors.neutral100,
          }}
        >
          <Ionicons name="arrow-back" size={20} color={colors.text} />
        </TouchableOpacity>
        <Text className="text-xl font-bold" style={{ color: colors.text }}>
          Settings
        </Text>
      </View>

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ padding: 16, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Section Label */}
        <Text
          className="text-xs font-semibold mb-2 ml-1 tracking-widest uppercase"
          style={{ color: colors.textSecondary }}
        >
          Profile
        </Text>

        {/* Profile Card */}
        <View
          className="rounded-2xl border overflow-hidden mb-6"
          style={{
            backgroundColor: colors.surface,
            borderColor: isDark ? colors.neutral700 : colors.neutral100,
          }}
        >
          {/* Name Row */}
          <View
            className="flex-row items-center px-4 py-3.5"
            style={{
              borderBottomWidth: 1,
              borderBottomColor: isDark ? colors.neutral700 : colors.neutral100,
            }}
          >
            <View
              className="w-9 h-9 rounded-xl items-center justify-center mr-3"
              style={{ backgroundColor: `${accentColor}15` }}
            >
              <Ionicons name="person-outline" size={18} color={accentColor} />
            </View>
            <View className="flex-1">
              <Text
                className="text-xs mb-0.5"
                style={{ color: colors.textSecondary }}
              >
                Full Name
              </Text>
              {isEditingName ? (
                <TextInput
                  value={name}
                  onChangeText={setName}
                  autoFocus
                  className="text-base font-medium p-0"
                  style={{ color: colors.text }}
                  placeholderTextColor={colors.neutral400}
                />
              ) : (
                <Text
                  className="text-base font-medium"
                  style={{ color: colors.text }}
                >
                  {name || "Add your name"}
                </Text>
              )}
            </View>
            <TouchableOpacity
              onPress={
                isEditingName ? handleSaveName : () => setIsEditingName(true)
              }
            >
              {isEditingName ? (
                <Text
                  className="text-sm font-semibold"
                  style={{ color: accentColor }}
                >
                  Save
                </Text>
              ) : (
                <Ionicons
                  name="pencil-outline"
                  size={18}
                  color={colors.neutral400}
                />
              )}
            </TouchableOpacity>
          </View>

          {/* Location Row */}
          <View
            className="flex-row items-center px-4 py-3.5"
            style={{
              borderBottomWidth: isRecruiter ? 1 : 0,
              borderBottomColor: isDark ? colors.neutral700 : colors.neutral100,
            }}
          >
            <View
              className="w-9 h-9 rounded-xl items-center justify-center mr-3"
              style={{ backgroundColor: `${accentColor}15` }}
            >
              <Ionicons name="location-outline" size={18} color={accentColor} />
            </View>
            <View className="flex-1">
              <Text
                className="text-xs mb-0.5"
                style={{ color: colors.textSecondary }}
              >
                {isRecruiter ? "Company Location" : "Location"}
              </Text>
              {isEditingLocation ? (
                <TextInput
                  value={location}
                  onChangeText={setLocation}
                  autoFocus
                  className="text-base font-medium p-0"
                  style={{ color: colors.text }}
                  placeholderTextColor={colors.neutral400}
                />
              ) : (
                <Text
                  className="text-base font-medium"
                  style={{ color: colors.text }}
                >
                  {location || "Add location"}
                </Text>
              )}
            </View>
            <TouchableOpacity
              onPress={
                isEditingLocation
                  ? handleSaveLocation
                  : () => setIsEditingLocation(true)
              }
            >
              {isEditingLocation ? (
                <Text
                  className="text-sm font-semibold"
                  style={{ color: accentColor }}
                >
                  Save
                </Text>
              ) : (
                <Ionicons
                  name="pencil-outline"
                  size={18}
                  color={colors.neutral400}
                />
              )}
            </TouchableOpacity>
          </View>

          {/* Company Logo Row - recruiter only */}
          {isRecruiter && (
            <TouchableOpacity
              onPress={handlePickLogo}
              className="flex-row items-center px-4 py-3.5"
            >
              <View
                className="w-9 h-9 rounded-xl items-center justify-center mr-3"
                style={{ backgroundColor: `${accentColor}15` }}
              >
                <Ionicons
                  name="business-outline"
                  size={18}
                  color={accentColor}
                />
              </View>
              <View className="flex-1">
                <Text
                  className="text-xs mb-0.5"
                  style={{ color: colors.textSecondary }}
                >
                  Company Logo
                </Text>
                <Text
                  className="text-base font-medium"
                  style={{ color: colors.text }}
                >
                  {uploadingLogo ? "Uploading..." : "Tap to change"}
                </Text>
              </View>
              {companyLogo ? (
                <View
                  className="w-9 h-9 rounded-lg overflow-hidden border"
                  style={{
                    borderColor: isDark ? colors.neutral700 : colors.neutral200,
                  }}
                >
                  <Image
                    source={{ uri: companyLogo }}
                    className="w-full h-full"
                    resizeMode="cover"
                  />
                </View>
              ) : (
                <Ionicons
                  name="chevron-forward"
                  size={18}
                  color={colors.neutral400}
                />
              )}
            </TouchableOpacity>
          )}
        </View>

        {/* Account Section Label */}
        <Text
          className="text-xs font-semibold mb-2 ml-1 tracking-widest uppercase"
          style={{ color: colors.textSecondary }}
        >
          Account
        </Text>

        {/* Account Card */}
        <View
          className="rounded-2xl border overflow-hidden"
          style={{
            backgroundColor: colors.surface,
            borderColor: isDark ? colors.neutral700 : colors.neutral100,
          }}
        >
          <TouchableOpacity
            onPress={handleLogout}
            className="flex-row items-center px-4 py-3.5"
          >
            <View className="w-9 h-9 rounded-xl items-center justify-center mr-3 bg-red-500/10">
              <Ionicons name="log-out-outline" size={18} color="#ef4444" />
            </View>
            <Text className="flex-1 text-base font-medium text-red-500">
              Logout
            </Text>
            <Ionicons
              name="chevron-forward"
              size={18}
              color={colors.neutral400}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
