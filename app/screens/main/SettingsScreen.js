import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAuth } from "../../context/AuthContext";
import Toast from "../../features/toast/Toast";
import { useProfile } from "../../hooks/useProfile";
import { useAppTheme } from "../../utils/theme";

export default function Settings({ navigation }) {
  const { colors, isDark } = useAppTheme();
  const { logout } = useAuth();
  const { profile, updateProfile } = useProfile();
  const insets = useSafeAreaInsets();

  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingLocation, setIsEditingLocation] = useState(false);

  const [toast, setToast] = useState({
    visible: false,
    message: "",
    type: "success",
  });

  function showToast(message, type = "success") {
    setToast({ visible: true, message, type });
  }

  useEffect(() => {
    if (profile) {
      setName(profile.name || "");
      setLocation(profile.candidate_profiles?.current_city || "");
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
      await updateProfile({ currentCity: location });
      showToast("Location updated successfully");
    } catch {
      showToast("Failed to update location", "error");
    }
  }

  async function handleLogout() {
    try {
      await logout();
    } catch {
      showToast("Failed to logout", "error");
    }
  }

  const sectionLabelStyle = {
    fontSize: 12,
    fontWeight: "600",
    color: colors.textSecondary,
    marginBottom: 8,
    marginLeft: 4,
    letterSpacing: 1,
  };

  const cardStyle = {
    backgroundColor: colors.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: isDark ? colors.neutral700 : colors.neutral100,
    overflow: "hidden",
  };

  const iconBoxStyle = {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: `${colors.brandPrimary}15`,
    marginRight: 12,
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background,
        paddingTop: insets.top,
      }}
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
          style={{
            width: 36,
            height: 36,
            borderRadius: 18,
            alignItems: "center",
            justifyContent: "center",
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
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: 16, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Section */}
        <Text style={sectionLabelStyle}>PROFILE</Text>

        <View style={{ ...cardStyle, marginBottom: 24 }}>
          {/* Name Row */}
          <View
            className="flex-row items-center px-4 py-3.5"
            style={{
              borderBottomWidth: 1,
              borderBottomColor: isDark ? colors.neutral700 : colors.neutral100,
            }}
          >
            <View style={iconBoxStyle}>
              <Ionicons
                name="person-outline"
                size={18}
                color={colors.brandPrimary}
              />
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
                  style={{
                    fontSize: 15,
                    fontWeight: "500",
                    color: colors.text,
                  }}
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
                  style={{ color: colors.brandPrimary }}
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
          <View className="flex-row items-center px-4 py-3.5">
            <View style={iconBoxStyle}>
              <Ionicons
                name="location-outline"
                size={18}
                color={colors.brandPrimary}
              />
            </View>
            <View className="flex-1">
              <Text
                className="text-xs mb-0.5"
                style={{ color: colors.textSecondary }}
              >
                Location
              </Text>
              {isEditingLocation ? (
                <TextInput
                  value={location}
                  onChangeText={setLocation}
                  autoFocus
                  style={{
                    fontSize: 15,
                    fontWeight: "500",
                    color: colors.text,
                  }}
                  placeholderTextColor={colors.neutral400}
                />
              ) : (
                <Text
                  className="text-base font-medium"
                  style={{ color: colors.text }}
                >
                  {location || "Add your location"}
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
                  style={{ color: colors.brandPrimary }}
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
        </View>

        {/* Account Section */}
        <Text style={sectionLabelStyle}>ACCOUNT</Text>

        <View style={cardStyle}>
          <TouchableOpacity
            onPress={handleLogout}
            className="flex-row items-center px-4 py-3.5"
          >
            <View
              style={{
                width: 36,
                height: 36,
                borderRadius: 10,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#ef444415",
                marginRight: 12,
              }}
            >
              <Ionicons name="log-out-outline" size={18} color="#ef4444" />
            </View>
            <Text
              className="flex-1 text-base font-medium"
              style={{ color: "#ef4444" }}
            >
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
