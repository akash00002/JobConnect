import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, Text, TouchableOpacity, View } from "react-native";
import { useAppTheme } from "../../utils/theme"; // ✅ Adjust path as needed
import TermsModal from "./TermsModal";

export default function TermsCheckbox({
  checked,
  onCheck,
  isRecruiter = false,
}) {
  const { colors, isDark } = useAppTheme(); // ✅ Add this
  const [showModal, setShowModal] = useState(false);

  function handleCheckBoxPress() {
    if (!checked) {
      // If not checked, show modal to accept it first
      setShowModal(true);
    } else {
      // If already checked, allow unchecking
      onCheck(false);
    }
  }

  function handleAccept() {
    onCheck(true);
    setShowModal(false);
  }

  function handleDecline() {
    onCheck(false);
    setShowModal(false);
  }

  return (
    <>
      <View className="flex-row items-center mb-3 ml-1">
        <View className="relative flex items-center">
          <Pressable
            className="h-5 w-5 rounded-md border transition-all"
            style={{
              backgroundColor: checked
                ? isRecruiter
                  ? colors.brandSecondary
                  : colors.brandPrimary
                : colors.surface,
              borderColor: checked
                ? isRecruiter
                  ? colors.brandSecondary
                  : colors.brandPrimary
                : isDark
                  ? colors.neutral600
                  : colors.neutral300,
            }}
            onPress={handleCheckBoxPress}
          >
            {checked && (
              <View className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <Ionicons name="checkmark-sharp" size={16} color="#fff" />
              </View>
            )}
          </Pressable>
        </View>

        <Pressable className="flex-row">
          <Text
            className="text-sm ml-2"
            style={{ color: colors.textSecondary }}
          >
            I agree to the{" "}
          </Text>
          <TouchableOpacity
            onPress={() => setShowModal(true)}
            activeOpacity={0.7}
          >
            <Text
              className="font-medium text-sm"
              style={{
                color: isRecruiter
                  ? colors.brandSecondary
                  : colors.brandPrimary,
              }}
            >
              Terms & Conditions
            </Text>
          </TouchableOpacity>
        </Pressable>
      </View>

      <TermsModal
        visible={showModal}
        onClose={() => setShowModal(false)}
        onAccept={handleAccept}
        onDecline={handleDecline}
        isRecruiter={isRecruiter}
      />
    </>
  );
}
