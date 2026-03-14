import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Linking, Text, TouchableOpacity, View } from "react-native";
import { useAppTheme } from "../../utils/theme";
import TitleInput from "../common/TitleInput";

const LINKS_CONFIG = [
  {
    key: "linkedin",
    icon: "logo-linkedin",
    placeholder: "LinkedIn Profile URL",
    label: "LinkedIn",
    color: "#0077b5",
  },
  {
    key: "github",
    icon: "logo-github",
    placeholder: "GitHub Profile URL",
    label: "GitHub",
    color: "#333",
  },
  {
    key: "website",
    icon: "link",
    placeholder: "Personal Website URL",
    label: "Website",
    color: "#135bec",
  },
];

export default function PortfolioLinks({
  portfolioLinks = [],
  onSave,
  variant = "candidate",
}) {
  const { colors, isDark } = useAppTheme();
  const [isEditing, setIsEditing] = useState(false);
  const [linkedin, setLinkedin] = useState("");
  const [github, setGithub] = useState("");
  const [website, setWebsite] = useState("");

  const accentColor =
    variant === "recruiter" ? colors.brandSecondary : colors.brandPrimary;

  useEffect(() => {
    if (portfolioLinks) {
      setLinkedin(portfolioLinks[0] || "");
      setGithub(portfolioLinks[1] || "");
      setWebsite(portfolioLinks[2] || "");
    }
  }, [portfolioLinks]);

  async function handleSave() {
    setIsEditing(false);
    await onSave?.([linkedin, github, website]);
  }

  async function handleOpenLink(url) {
    if (!url) return;
    const fullUrl = url.startsWith("http") ? url : `https://${url}`;
    await Linking.openURL(fullUrl);
  }

  const links = [
    { ...LINKS_CONFIG[0], value: linkedin, onChange: setLinkedin },
    { ...LINKS_CONFIG[1], value: github, onChange: setGithub },
    { ...LINKS_CONFIG[2], value: website, onChange: setWebsite },
  ];

  const hasAnyLink = linkedin || github || website;

  return (
    <View className="w-full">
      <View className="gap-1">
        {/* Header */}
        <View className="flex-row items-center justify-between">
          <Text className="text-xl font-bold" style={{ color: colors.text }}>
            Links
          </Text>

          {isEditing ? (
            <TouchableOpacity
              onPress={handleSave}
              className="flex-row items-center gap-1 px-3 py-2 rounded-[18px]"
            >
              <Ionicons name="checkmark-sharp" size={20} color={accentColor} />
              <Text
                className="text-sm font-medium"
                style={{ color: accentColor }}
              >
                Save
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => setIsEditing(true)}
              className="flex-row items-center gap-1 px-3 py-2 rounded-[18px]"
            >
              <Ionicons name="pencil-sharp" size={20} color={accentColor} />
              <Text
                className="text-sm font-medium"
                style={{ color: accentColor }}
              >
                Edit
              </Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Box */}
        <View className="w-full p-4">
          {isEditing ? (
            /* Edit mode - inputs */
            <View className="gap-2">
              {links.map((link) => (
                <TitleInput
                  key={link.key}
                  placeholder={link.placeholder}
                  iconName={link.icon}
                  value={link.value}
                  onChangeText={link.onChange}
                />
              ))}
            </View>
          ) : (
            /* View mode - show links */
            <View className="gap-5">
              {hasAnyLink ? (
                links.map((link) =>
                  link.value ? (
                    <TouchableOpacity
                      key={link.key}
                      onPress={() => handleOpenLink(link.value)}
                      className="flex-row items-center gap-3"
                    >
                      <View
                        className={`w-9 h-9 rounded-lg items-center justify-center ${
                          isDark ? "bg-neutral-700" : "bg-neutral-100"
                        }`}
                      >
                        <Ionicons
                          name={link.icon}
                          size={20}
                          color={link.color}
                        />
                      </View>

                      <View className="flex-1">
                        <Text
                          className="text-xs mb-0.5"
                          style={{ color: colors.textSecondary }}
                        >
                          {link.label}
                        </Text>
                        <Text
                          className="text-sm font-medium"
                          style={{ color: accentColor }}
                          numberOfLines={1}
                        >
                          {link.value}
                        </Text>
                      </View>

                      <Ionicons
                        name="open-outline"
                        size={16}
                        color={colors.neutral400}
                      />
                    </TouchableOpacity>
                  ) : null,
                )
              ) : (
                <Text style={{ color: colors.textSecondary }}>
                  No links added yet
                </Text>
              )}
            </View>
          )}
        </View>
      </View>
    </View>
  );
}
