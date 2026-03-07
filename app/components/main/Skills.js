import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useAppTheme } from "../../utils/theme";
import SkillsInput from "../onboarding/SkillsInput";

export default function Skills({ skills = [], onSave }) {
  const { colors } = useAppTheme();
  const [isEditing, setIsEditing] = useState(false);
  const [localSkills, setLocalSkills] = useState([]);

  useEffect(() => {
    if (skills) setLocalSkills(skills);
  }, [skills]);

  async function handleSave() {
    setIsEditing(false);
    await onSave?.(localSkills);
  }

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
            Skills
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
            <SkillsInput
              skills={localSkills}
              onChange={(updated) => setLocalSkills(updated)}
              showTitle={false}
            />
          ) : (
            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
              {localSkills.length > 0 ? (
                localSkills.map((skill, index) => (
                  <View
                    key={index}
                    style={{
                      paddingHorizontal: 20,
                      paddingVertical: 8,
                      borderRadius: 999,
                      backgroundColor: `${colors.brandPrimary}15`,
                      borderWidth: 1,
                      borderColor: `${colors.brandPrimary}20`,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: "500",
                        color: colors.brandPrimary,
                      }}
                    >
                      {skill}
                    </Text>
                  </View>
                ))
              ) : (
                <Text style={{ color: colors.textSecondary }}>
                  No skills added yet
                </Text>
              )}
            </View>
          )}
        </View>
      </View>
    </View>
  );
}
