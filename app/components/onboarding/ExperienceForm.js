import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
import {
  Modal,
  Platform,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import { useAppTheme } from "../../utils/theme";
import AddExpButton from "./AddExpButton";

export default function ExperienceForm({
  fieldOneLabel,
  fieldOnePlaceholder,
  fieldOneIcon,
  fieldTwoLabel,
  fieldTwoPlaceholder,
  fieldTwoIcon,
  checkboxLabel,
  onSave,
  buttonTitle,
  initialData = null,
}) {
  const { colors, isDark } = useAppTheme();
  const [focusedField, setFocusedField] = useState(null);

  // Form states
  const [fieldOne, setFieldOne] = useState(initialData?.fieldOne || "");
  const [fieldTwo, setFieldTwo] = useState(initialData?.fieldTwo || "");
  const [startDate, setStartDate] = useState(initialData?.startDate || null);
  const [endDate, setEndDate] = useState(initialData?.endDate || null);
  const [isPresent, setIsPresent] = useState(initialData?.isPresent || false);
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  const hasError = false;

  const formatDate = (date) => {
    if (!date) return "";
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${month}/${year}`;
  };

  const getBorderColor = () => {
    if (hasError) return colors.error;
    if (focusedField) return colors.brandPrimary;
    return isDark ? colors.neutral700 : colors.neutral200;
  };

  const getFieldColor = (fieldName) => {
    if (focusedField === fieldName) return colors.brandPrimary;
    return colors.neutral500;
  };

  const getLabelColor = (fieldName) => {
    if (focusedField === fieldName) return colors.brandPrimary;
    return colors.textSecondary;
  };

  const getBottomBorderColor = (fieldName) => {
    if (focusedField === fieldName) return colors.brandPrimary;
    return isDark ? colors.neutral700 : colors.neutral200;
  };

  const handleStartDateChange = (event, selectedDate) => {
    if (Platform.OS === "android") {
      setShowStartPicker(false);
      setFocusedField(null); // ✅ Reset focused field
    }
    if (selectedDate) {
      setStartDate(selectedDate);
    }
  };

  const handleEndDateChange = (event, selectedDate) => {
    if (Platform.OS === "android") {
      setShowEndPicker(false);
      setFocusedField(null); // ✅ Reset focused field
    }
    if (selectedDate) {
      setEndDate(selectedDate);
      setIsPresent(false);
    }
  };

  const handlePresentToggle = () => {
    setIsPresent(!isPresent);
    if (!isPresent) {
      setEndDate(null);
    }
  };

  const handleOpenEndPicker = () => {
    setShowStartPicker(false);
    setShowEndPicker(true);
    setFocusedField("endDate"); // ✅ Set focused field
  };

  const handleOpenStartPicker = () => {
    setShowEndPicker(false);
    setShowStartPicker(true);
    setFocusedField("startDate"); // ✅ Set focused field
  };

  const handleSave = () => {
    if (!fieldOne || !fieldTwo || !startDate) {
      return;
    }

    const formData = {
      fieldOne,
      fieldTwo,
      startDate,
      endDate: isPresent ? null : endDate,
      isPresent,
    };

    onSave(formData);

    // Reset
    setFieldOne("");
    setFieldTwo("");
    setStartDate(null);
    setEndDate(null);
    setIsPresent(false);
    setFocusedField(null);
  };

  return (
    <View className="mb-5">
      <View
        className="rounded-2xl border px-8 py-6"
        style={{
          backgroundColor: colors.surface,
          borderColor: getBorderColor(),
        }}
      >
        {/* Field One */}
        <Text
          className="text-sm font-semibold mb-4"
          style={{ color: getLabelColor("fieldOne") }}
        >
          {fieldOneLabel}
        </Text>

        <View
          className="flex-row items-center mb-6 pb-2"
          style={{
            borderBottomWidth: 1,
            borderBottomColor: getBottomBorderColor("fieldOne"),
          }}
        >
          <Ionicons
            name={fieldOneIcon}
            size={20}
            color={getFieldColor("fieldOne")}
          />
          <TextInput
            placeholder={fieldOnePlaceholder}
            placeholderTextColor={colors.textSecondary}
            value={fieldOne}
            onChangeText={setFieldOne}
            onFocus={() => setFocusedField("fieldOne")}
            onBlur={() => setFocusedField(null)}
            style={{
              flex: 1,
              fontSize: 16,
              color: colors.text,
              marginLeft: 8,
              paddingVertical: Platform.OS === "ios" ? 8 : 6,
            }}
          />
        </View>

        {/* Field Two */}
        <Text
          className="text-sm font-semibold mb-4"
          style={{ color: getLabelColor("fieldTwo") }}
        >
          {fieldTwoLabel}
        </Text>

        <View
          className="flex-row items-center mb-6 pb-2"
          style={{
            borderBottomWidth: 1,
            borderBottomColor: getBottomBorderColor("fieldTwo"),
          }}
        >
          <Ionicons
            name={fieldTwoIcon}
            size={20}
            color={getFieldColor("fieldTwo")}
          />
          <TextInput
            placeholder={fieldTwoPlaceholder}
            placeholderTextColor={colors.textSecondary}
            value={fieldTwo}
            onChangeText={setFieldTwo}
            onFocus={() => setFocusedField("fieldTwo")}
            onBlur={() => setFocusedField(null)}
            style={{
              flex: 1,
              fontSize: 16,
              color: colors.text,
              marginLeft: 8,
              paddingVertical: Platform.OS === "ios" ? 8 : 6,
            }}
          />
        </View>

        {/* Date Section */}
        <View className="flex-row justify-between gap-20 mb-4">
          {/* Start Date */}
          <View className="flex-1">
            <Text
              className="text-sm font-semibold mb-2"
              style={{ color: getLabelColor("startDate") }}
            >
              START DATE
            </Text>
            <Pressable
              onPress={handleOpenStartPicker}
              className="pb-2"
              style={{
                borderBottomWidth: 1,
                borderBottomColor: getBottomBorderColor("startDate"),
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  color: startDate ? colors.text : colors.textSecondary,
                  paddingVertical: Platform.OS === "ios" ? 8 : 6,
                }}
              >
                {startDate ? formatDate(startDate) : "MM / YYYY"}
              </Text>
            </Pressable>
          </View>

          {/* End Date */}
          <View className="flex-1">
            <Text
              className="text-sm font-semibold mb-2"
              style={{ color: getLabelColor("endDate") }}
            >
              END DATE
            </Text>
            {!isPresent ? (
              <Pressable
                onPress={handleOpenEndPicker}
                className="pb-2"
                style={{
                  borderBottomWidth: 1,
                  borderBottomColor: getBottomBorderColor("endDate"),
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    color: endDate ? colors.text : colors.textSecondary,
                    paddingVertical: Platform.OS === "ios" ? 8 : 6,
                  }}
                >
                  {endDate ? formatDate(endDate) : "MM / YYYY"}
                </Text>
              </Pressable>
            ) : (
              <View
                className="pb-2"
                style={{
                  borderBottomWidth: 1,
                  borderBottomColor: isDark
                    ? colors.neutral700
                    : colors.neutral200,
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    color: colors.brandPrimary,
                    paddingVertical: Platform.OS === "ios" ? 8 : 6,
                    fontWeight: "600",
                  }}
                >
                  Present
                </Text>
              </View>
            )}
          </View>
        </View>

        {/* Present Checkbox */}
        <Pressable
          onPress={handlePresentToggle}
          className="flex-row mt-2 items-center"
        >
          <View
            className="w-5 h-5 rounded-md border mr-2 items-center justify-center"
            style={{
              backgroundColor: isPresent ? colors.brandPrimary : "transparent",
              borderColor: isPresent ? colors.brandPrimary : colors.neutral500,
            }}
          >
            {isPresent && (
              <Ionicons name="checkmark-sharp" size={16} color="#fff" />
            )}
          </View>
          <Text className="text-sm" style={{ color: colors.text }}>
            {checkboxLabel}
          </Text>
        </Pressable>
        <AddExpButton buttonTitle={buttonTitle} onPress={handleSave} />
      </View>

      {/* Android Pickers */}
      {showStartPicker && Platform.OS === "android" && (
        <DateTimePicker
          value={startDate || new Date()}
          mode="date"
          display="default"
          onChange={handleStartDateChange}
          maximumDate={new Date()}
        />
      )}

      {showEndPicker && Platform.OS === "android" && !isPresent && (
        <DateTimePicker
          value={endDate || new Date()}
          mode="date"
          display="default"
          onChange={handleEndDateChange}
          minimumDate={startDate}
          maximumDate={new Date()}
        />
      )}

      {/* iOS Start Date Modal */}
      {Platform.OS === "ios" && (
        <Modal visible={showStartPicker} transparent animationType="slide">
          <Pressable
            className="flex-1"
            onPress={() => {
              setShowStartPicker(false);
              setFocusedField(null); // ✅ Reset focused field
            }}
          />
          <View style={{ backgroundColor: colors.surface }}>
            <Pressable
              onPress={() => {
                setShowStartPicker(false);
                setFocusedField(null); // ✅ Reset focused field
              }}
              className="items-end px-4 pt-3"
            >
              <Text
                style={{
                  color: colors.brandPrimary,
                  fontWeight: "600",
                  fontSize: 16,
                }}
              >
                Done
              </Text>
            </Pressable>
            <DateTimePicker
              value={startDate || new Date()}
              mode="date"
              display="spinner"
              onChange={handleStartDateChange}
              maximumDate={new Date()}
            />
          </View>
        </Modal>
      )}

      {/* iOS End Date Modal */}
      {Platform.OS === "ios" && (
        <Modal
          visible={showEndPicker && !isPresent}
          transparent
          animationType="slide"
        >
          <Pressable
            className="flex-1"
            onPress={() => {
              setShowEndPicker(false);
              setFocusedField(null); // ✅ Reset focused field
            }}
          />
          <View style={{ backgroundColor: colors.surface }}>
            <Pressable
              onPress={() => {
                setShowEndPicker(false);
                setFocusedField(null); // ✅ Reset focused field
              }}
              className="items-end px-4 pt-3"
            >
              <Text
                style={{
                  color: colors.brandPrimary,
                  fontWeight: "600",
                  fontSize: 16,
                }}
              >
                Done
              </Text>
            </Pressable>
            <DateTimePicker
              value={endDate || new Date()}
              mode="date"
              display="spinner"
              onChange={handleEndDateChange}
              minimumDate={startDate}
              maximumDate={new Date()}
            />
          </View>
        </Modal>
      )}
    </View>
  );
}
