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

export default function PortfolioLinks({ portfolioLinks = [], onSave }) {
  const { colors, isDark } = useAppTheme();
  const [isEditing, setIsEditing] = useState(false);
  const [linkedin, setLinkedin] = useState("");
  const [github, setGithub] = useState("");
  const [website, setWebsite] = useState("");

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
    <View style={{ width: "100%" }}>
      <View className="gap-1">
        {/* Header */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text className="text-xl font-bold" style={{ color: colors.text }}>
            Links
          </Text>
          {isEditing ? (
            <TouchableOpacity
              onPress={handleSave}
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 4,
                paddingHorizontal: 12,
                paddingVertical: 8,
                borderRadius: 18,
              }}
            >
              <Ionicons
                name="checkmark-sharp"
                size={20}
                color={colors.brandPrimary}
              />
              <Text
                style={{
                  color: colors.brandPrimary,
                  fontSize: 14,
                  fontWeight: "500",
                }}
              >
                Save
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => setIsEditing(true)}
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 4,
                paddingHorizontal: 12,
                paddingVertical: 8,
                borderRadius: 18,
              }}
            >
              <Ionicons
                name="pencil-sharp"
                size={20}
                color={colors.brandPrimary}
              />
              <Text
                style={{
                  color: colors.brandPrimary,
                  fontSize: 14,
                  fontWeight: "500",
                }}
              >
                Edit
              </Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Box */}
        <View
          style={{
            width: "100%",
            padding: 16,
          }}
        >
          {isEditing ? (
            /* Edit mode - inputs */
            <View style={{ gap: 8 }}>
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
            <View style={{ gap: 20 }}>
              {hasAnyLink ? (
                links.map((link) =>
                  link.value ? (
                    <TouchableOpacity
                      key={link.key}
                      onPress={() => handleOpenLink(link.value)}
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 12,
                      }}
                    >
                      <View
                        style={{
                          width: 36,
                          height: 36,
                          borderRadius: 8,
                          alignItems: "center",
                          justifyContent: "center",
                          backgroundColor: isDark
                            ? colors.neutral700
                            : colors.neutral100,
                        }}
                      >
                        <Ionicons
                          name={link.icon}
                          size={20}
                          color={link.color}
                        />
                      </View>
                      <View style={{ flex: 1 }}>
                        <Text
                          style={{
                            fontSize: 12,
                            color: colors.textSecondary,
                            marginBottom: 2,
                          }}
                        >
                          {link.label}
                        </Text>
                        <Text
                          style={{
                            fontSize: 14,
                            fontWeight: "500",
                            color: colors.brandPrimary,
                          }}
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
