import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Modal, Pressable, ScrollView, Text, View } from "react-native";
import { useAppTheme } from "../../../utils/theme";

const OPTIONS = [
  { label: "Design & Creative", value: "design" },
  { label: "Engineering", value: "engineering" },
  { label: "Marketing", value: "marketing" },
  { label: "Product Management", value: "product" },
  { label: "Sales", value: "sales" },
  { label: "Finance", value: "finance" },
];

export default function AppSelect({ value, onChange, placeholder }) {
  const { colors } = useAppTheme();
  const [open, setOpen] = useState(false);

  const selected = OPTIONS.find((o) => o.value === value);

  return (
    <>
      <Pressable
        onPress={() => setOpen(true)}
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          height: 52,
          borderRadius: 12,
          borderWidth: 1.5,
          borderColor: open ? colors.brandPrimary : colors.neutral200,
          backgroundColor: colors.surface,
          paddingHorizontal: 14,
        }}
      >
        <Text
          style={{
            fontSize: 15,
            color: selected ? colors.text : colors.neutral400,
          }}
        >
          {selected ? selected.label : placeholder || "Select an option"}
        </Text>
        <Ionicons
          name={open ? "chevron-up" : "chevron-down"}
          size={18}
          color={colors.neutral400}
        />
      </Pressable>

      <Modal visible={open} transparent animationType="fade">
        <Pressable
          style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.4)" }}
          onPress={() => setOpen(false)}
        >
          <View
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              backgroundColor: colors.surface,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              paddingTop: 12,
              paddingBottom: 40,
            }}
          >
            {/* Handle */}
            <View
              style={{
                width: 36,
                height: 4,
                borderRadius: 2,
                backgroundColor: colors.neutral300,
                alignSelf: "center",
                marginBottom: 16,
              }}
            />
            <Text
              style={{
                fontSize: 16,
                fontWeight: "700",
                color: colors.text,
                paddingHorizontal: 20,
                marginBottom: 12,
              }}
            >
              Select Category
            </Text>
            <ScrollView>
              {OPTIONS.map((option) => {
                const isSelected = value === option.value;
                return (
                  <Pressable
                    key={option.value}
                    onPress={() => {
                      onChange(option.value);
                      setOpen(false);
                    }}
                    style={({ pressed }) => ({
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      paddingHorizontal: 20,
                      paddingVertical: 16,
                      backgroundColor: pressed
                        ? colors.neutral100
                        : "transparent",
                    })}
                  >
                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight: isSelected ? "600" : "400",
                        color: isSelected ? colors.brandPrimary : colors.text,
                      }}
                    >
                      {option.label}
                    </Text>
                    {isSelected && (
                      <Ionicons
                        name="checkmark"
                        size={18}
                        color={colors.brandPrimary}
                      />
                    )}
                  </Pressable>
                );
              })}
            </ScrollView>
          </View>
        </Pressable>
      </Modal>
    </>
  );
}
