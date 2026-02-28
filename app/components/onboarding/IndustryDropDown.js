import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { useAppTheme } from "../../utils/theme";

const INDUSTRIES = [
  "Technology",
  "Healthcare",
  "Finance & Banking",
  "Education",
  "Retail & E-commerce",
  "Manufacturing",
  "Media & Entertainment",
  "Real Estate",
  "Transportation & Logistics",
  "Marketing & Advertising",
  "Legal",
  "Non-Profit",
  "Government",
  "Energy & Utilities",
  "Pharmaceuticals",
  "Telecommunications",
  "Other",
];

export default function IndustryDropDown({ industry, updateFormData }) {
  const [showIndustryList, setShowIndustryList] = useState(false);
  const { colors, isDark } = useAppTheme();

  return (
    <View className="mb-5">
      <Text
        className="text-lg font-medium ml-1 mb-2"
        style={{ color: colors.text }}
      >
        Industry
      </Text>

      {/* Trigger */}
      <Pressable
        onPress={() => setShowIndustryList(!showIndustryList)}
        className="flex-row items-center justify-between px-4 py-4 rounded-2xl border"
        style={{
          backgroundColor: colors.surface,
          borderColor: isDark ? colors.neutral600 : colors.neutral300,
        }}
      >
        <View className="flex-row items-center gap-3">
          <Ionicons name="business" size={20} color={colors.neutral400} />
          <Text
            style={{
              color: industry ? colors.text : colors.neutral400,
              fontSize: 15,
            }}
          >
            {industry || "Select an industry"}
          </Text>
        </View>
        <Ionicons
          name={showIndustryList ? "chevron-up" : "chevron-down"}
          size={20}
          color={colors.neutral400}
        />
      </Pressable>

      {/* Inline Scrollable List */}
      {showIndustryList && (
        <View
          className="mt-2 rounded-2xl border overflow-hidden"
          style={{
            borderColor: isDark ? colors.neutral600 : colors.neutral300,
            backgroundColor: colors.surface,
            maxHeight: 220, // 👈 fixed height
          }}
        >
          <ScrollView
            nestedScrollEnabled={true} // 👈 important since it's inside another ScrollView
            // showsVerticalScrollIndicator={false}
          >
            {INDUSTRIES.map((item, index) => {
              const isSelected = industry === item;
              return (
                <Pressable
                  key={item}
                  onPress={() => {
                    updateFormData("industry", item);
                    setShowIndustryList(false);
                  }}
                  className="flex-row items-center justify-between px-4 py-3.5"
                  style={{
                    backgroundColor: isSelected
                      ? colors.brandSecondary + "15"
                      : "transparent",
                    borderTopWidth: index === 0 ? 0 : 1,
                    borderTopColor: isDark
                      ? colors.neutral700
                      : colors.neutral200,
                  }}
                >
                  <Text
                    style={{
                      color: isSelected ? colors.brandSecondary : colors.text,
                      fontWeight: isSelected ? "600" : "400",
                      fontSize: 15,
                    }}
                  >
                    {item}
                  </Text>
                  {isSelected && (
                    <Ionicons
                      name="checkmark"
                      size={18}
                      color={colors.brandSecondary}
                    />
                  )}
                </Pressable>
              );
            })}
          </ScrollView>
        </View>
      )}
    </View>
  );
}
