import { Pressable, Text, View } from "react-native";
import { useAppTheme } from "../../utils/theme";

const COMPANY_SIZES = ["1-10", "11-50", "51-200", "201-500", "500+"];

export default function CompanySizeButton({ companySize, updateFormData }) {
  const { colors } = useAppTheme();
  return (
    <View className="mb-5">
      <Text
        className="text-lg font-medium ml-1 mb-2"
        style={{ color: colors.text }}
      >
        Company Size
      </Text>
      <View className="flex-row flex-wrap gap-2">
        {COMPANY_SIZES.map((size) => {
          const isSelected = companySize === size;
          return (
            <Pressable
              key={size}
              onPress={() => updateFormData("companySize", size)}
              className="px-7 py-3 rounded-3xl border"
              style={{
                backgroundColor: isSelected
                  ? colors.brandSecondary
                  : colors.surface,
                borderColor: isSelected
                  ? colors.brandSecondary
                  : colors.neutral300,
              }}
              onChangeText={companySize}
            >
              <Text
                className="font-medium text-base"
                style={{
                  color: isSelected ? "#fff" : colors.text,
                }}
              >
                {size}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
