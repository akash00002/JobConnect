import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useAppTheme } from "../../utils/theme";
import TitleInput from "../common/TitleInput";

export default function SkillsInput({
  skills = [],
  onChange,
  showTitle = true,
}) {
  const { colors } = useAppTheme();
  const [skillInput, setSkillInput] = useState("");

  function handleAddSkill() {
    if (!skillInput?.trim()) return;
    if (skills.length >= 10) return;
    if (skills.includes(skillInput.trim())) return;
    onChange?.([...skills, skillInput.trim()]);
    setSkillInput("");
  }

  function handleRemoveSkill(index) {
    onChange?.(skills.filter((_, i) => i !== index));
  }

  return (
    <View>
      <TitleInput
        title={showTitle ? "Professional Skills" : undefined}
        subTitle={"Add at least 5 skills to improve your visibility"}
        placeholder="Add a skill (e.g. Figma)"
        iconName="search"
        value={skillInput}
        onChangeText={setSkillInput}
      >
        <TouchableOpacity
          onPress={handleAddSkill}
          disabled={skills.length >= 10}
        >
          <Ionicons
            name="add-sharp"
            size={22}
            color={
              skills.length >= 10 ? colors.neutral400 : colors.brandPrimary
            }
          />
        </TouchableOpacity>
      </TitleInput>

      {skills.length > 0 && (
        <View className="flex-row flex-wrap gap-2 mb-6">
          {skills.map((skill, index) => (
            <View
              key={index}
              className="flex-row items-center gap-3 justify-center rounded-xl px-3 py-1 h-10"
              style={{ backgroundColor: colors.neutral200 }}
            >
              <Text
                className="text-base font-semibold"
                style={{ color: colors.brandPrimary }}
              >
                {String(skill)}
              </Text>
              <TouchableOpacity onPress={() => handleRemoveSkill(index)}>
                <Ionicons
                  name="close-sharp"
                  color={colors.brandPrimary}
                  size={16}
                />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}
