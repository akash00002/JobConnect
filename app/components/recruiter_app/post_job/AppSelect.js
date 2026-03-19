import { Ionicons } from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";
import {
  Animated,
  Modal,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import {
  GestureHandlerRootView,
  PanGestureHandler,
  State,
} from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAppTheme } from "../../../utils/theme";

const OPTIONS = [
  {
    label: "Design & Creative",
    value: "design",
    subtitle: "UI/UX, Product, Branding",
    icon: "color-palette-outline",
  },
  {
    label: "Engineering",
    value: "engineering",
    subtitle: "Software, DevOps, QA",
    icon: "code-slash-outline",
  },
  {
    label: "Marketing",
    value: "marketing",
    subtitle: "Growth, SEO, Content",
    icon: "megaphone-outline",
  },
  {
    label: "Product Management",
    value: "product",
    subtitle: "Roadmaps, Strategy, Data",
    icon: "cube-outline",
  },
  {
    label: "Sales",
    value: "sales",
    subtitle: "Account Exec, BDR, SDR",
    icon: "cash-outline",
  },
  {
    label: "Finance",
    value: "finance",
    subtitle: "Accounting, FP&A, Audit",
    icon: "bar-chart-outline",
  },
  {
    label: "Customer Success",
    value: "customer_success",
    subtitle: "Support, Retention, Ops",
    icon: "headset-outline",
  },
  {
    label: "Human Resources",
    value: "hr",
    subtitle: "Recruiting, L&D, Culture",
    icon: "people-outline",
  },
  {
    label: "Other",
    value: "other",
    subtitle: "Something else entirely",
    icon: "ellipsis-horizontal-circle-outline",
  },
];

export default function AppSelect({ value, onChange, placeholder }) {
  const { colors, isDark } = useAppTheme();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(value || "");
  const [otherText, setOtherText] = useState("");
  const insets = useSafeAreaInsets();
  const translateY = useRef(new Animated.Value(800)).current;

  useEffect(() => {
    if (value) setSelected(value);
  }, [value]);

  useEffect(() => {
    if (open) {
      translateY.setValue(800);
      Animated.spring(translateY, {
        toValue: 0,
        useNativeDriver: true,
        bounciness: 4,
      }).start();
    }
  }, [open]);

  const selectedOption = OPTIONS.find((o) => o.value === selected);
  const displayLabel =
    selected === "other" && otherText
      ? otherText
      : selectedOption?.label || null;
  const canConfirm =
    selected && (selected !== "other" || otherText.trim().length > 0);

  const filtered = OPTIONS.filter(
    (o) =>
      o.label.toLowerCase().includes(search.toLowerCase()) ||
      o.subtitle.toLowerCase().includes(search.toLowerCase()),
  );

  const handleConfirm = () => {
    if (!canConfirm) return;
    onChange(selected === "other" ? otherText.trim() : selected);
    setOpen(false);
    setSearch("");
  };

  const handleClose = () => {
    Animated.timing(translateY, {
      toValue: 800,
      duration: 250,
      useNativeDriver: true,
    }).start(() => {
      setOpen(false);
      setSearch("");
      translateY.setValue(800);
    });
  };

  const onGestureEvent = Animated.event(
    [{ nativeEvent: { translationY: translateY } }],
    { useNativeDriver: true },
  );

  const onHandlerStateChange = ({ nativeEvent }) => {
    if (nativeEvent.state === State.END) {
      if (nativeEvent.translationY > 100 || nativeEvent.velocityY > 500) {
        handleClose();
      } else {
        Animated.spring(translateY, {
          toValue: 0,
          useNativeDriver: true,
          tension: 100,
          friction: 10,
        }).start();
      }
    }
  };

  return (
    <>
      {/* Trigger */}
      <Pressable
        onPress={() => setOpen(true)}
        style={{
          borderWidth: 1.5,
          borderColor: open
            ? colors.brandSecondary
            : isDark
              ? colors.neutral700
              : colors.neutral200,
          backgroundColor: colors.surface,
        }}
        className="flex-row items-center justify-between h-14 rounded-xl px-4"
      >
        <Text
          style={{ color: displayLabel ? colors.text : colors.neutral400 }}
          className="text-base"
        >
          {displayLabel || placeholder || "Select a category"}
        </Text>
        <Ionicons
          name={open ? "chevron-up" : "chevron-down"}
          size={18}
          color={colors.neutral400}
        />
      </Pressable>

      {/* Modal */}
      <Modal visible={open} transparent animationType="none">
        <GestureHandlerRootView style={{ flex: 1, justifyContent: "flex-end" }}>
          {/* Backdrop */}
          <Pressable
            onPress={handleClose}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0,0,0,0.45)",
            }}
          />

          {/* Sheet */}
          <PanGestureHandler
            onGestureEvent={onGestureEvent}
            onHandlerStateChange={onHandlerStateChange}
            activeOffsetY={10} // only activate after 10px downward
            failOffsetY={-10} // fail if scrolling up
          >
            <Animated.View
              style={{
                transform: [
                  {
                    translateY: translateY.interpolate({
                      inputRange: [0, 800],
                      outputRange: [0, 800],
                      extrapolateLeft: "clamp", // prevent going above 0
                    }),
                  },
                ],
                backgroundColor: colors.surface,
                borderTopLeftRadius: 24,
                borderTopRightRadius: 24,
                maxHeight: "88%",
                paddingBottom: insets.bottom,
              }}
            >
              {/* Handle */}
              <View className="items-center py-3">
                <View
                  className="rounded-full"
                  style={{
                    width: 36,
                    height: 4,
                    backgroundColor: colors.neutral300,
                  }}
                />
              </View>

              {/* Header */}
              <View className="flex-row items-center justify-between px-5 pb-3">
                <Text
                  className="text-lg font-bold"
                  style={{ color: colors.text }}
                >
                  Select Job Category
                </Text>
                <Pressable
                  onPress={handleClose}
                  className="w-8 h-8 rounded-full items-center justify-center"
                  style={{ backgroundColor: colors.neutral100 }}
                >
                  <Ionicons
                    name="close"
                    size={18}
                    color={colors.textSecondary}
                  />
                </Pressable>
              </View>

              {/* Search */}
              <View className="px-4 pb-4">
                <View
                  className="flex-row items-center rounded-xl px-3 h-11"
                  style={{ backgroundColor: colors.neutral100, gap: 8 }}
                >
                  <Ionicons
                    name="search-outline"
                    size={18}
                    color={colors.neutral400}
                  />
                  <TextInput
                    value={search}
                    onChangeText={setSearch}
                    placeholder="Search categories..."
                    placeholderTextColor={colors.neutral400}
                    className="flex-1 text-sm"
                    style={{ color: colors.text }}
                  />
                  {search.length > 0 && (
                    <Pressable onPress={() => setSearch("")}>
                      <Ionicons
                        name="close-circle"
                        size={18}
                        color={colors.neutral400}
                      />
                    </Pressable>
                  )}
                </View>
              </View>

              {/* Options */}
              <ScrollView
                bounces={false}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                  paddingHorizontal: 12,
                  paddingBottom: 8,
                }}
              >
                {filtered.map((option) => {
                  const isSelected = selected === option.value;
                  return (
                    <Pressable
                      key={option.value}
                      onPress={() => setSelected(option.value)}
                      className="rounded-2xl mb-4"
                      style={({ pressed }) => ({
                        backgroundColor: isSelected
                          ? colors.brandSecondary + "15"
                          : pressed
                            ? colors.neutral100
                            : "transparent",
                        borderWidth: 1.5,
                        borderColor: isSelected
                          ? colors.brandSecondary + "50"
                          : "transparent",
                        padding: 12,
                      })}
                    >
                      <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
                        <View
                          className="rounded-xl items-center justify-center"
                          style={{
                            width: 42,
                            height: 42,
                            flexShrink: 0,
                            backgroundColor: isSelected
                              ? colors.brandSecondary
                              : colors.neutral100,
                          }}
                        >
                          <Ionicons
                            name={option.icon}
                            size={20}
                            color={isSelected ? "#fff" : colors.neutral500}
                          />
                        </View>

                        <View style={{ flex: 1, marginLeft: 12 }}>
                          <Text
                            style={{
                              fontSize: 15,
                              fontWeight: isSelected ? "600" : "500",
                              color: isSelected
                                ? colors.brandSecondary
                                : colors.text,
                            }}
                          >
                            {option.label}
                          </Text>
                          <Text
                            style={{
                              fontSize: 12,
                              marginTop: 2,
                              color: isSelected
                                ? colors.brandSecondary + "99"
                                : colors.textSecondary,
                            }}
                          >
                            {option.subtitle}
                          </Text>
                        </View>

                        {isSelected && (
                          <Ionicons
                            name="checkmark-circle"
                            size={22}
                            color={colors.brandSecondary}
                          />
                        )}
                      </View>
                    </Pressable>
                  );
                })}

                {selected === "other" && (
                  <TextInput
                    value={otherText}
                    onChangeText={setOtherText}
                    placeholder="Type your category..."
                    placeholderTextColor={colors.neutral400}
                    autoFocus
                    className="h-14 rounded-xl px-4 text-base mx-0.5 mt-1"
                    style={{
                      borderWidth: 1.5,
                      borderColor: colors.brandSecondary,
                      backgroundColor: colors.surface,
                      color: colors.text,
                    }}
                  />
                )}
              </ScrollView>

              {/* Footer */}
              <View
                className="px-4 pt-4 pb-2"
                style={{
                  borderTopWidth: 1,
                  borderTopColor: isDark
                    ? colors.neutral700
                    : colors.neutral200,
                }}
              >
                <Pressable
                  onPress={handleConfirm}
                  className="h-14 rounded-2xl items-center justify-center"
                  style={({ pressed }) => ({
                    backgroundColor: canConfirm
                      ? colors.brandSecondary
                      : colors.neutral200,
                    opacity: pressed && canConfirm ? 0.85 : 1,
                  })}
                >
                  <Text
                    className="text-base font-bold"
                    style={{
                      color: canConfirm
                        ? colors.brandSecondary
                        : colors.neutral400,
                    }}
                  >
                    Confirm Selection
                  </Text>
                </Pressable>
              </View>
            </Animated.View>
          </PanGestureHandler>
        </GestureHandlerRootView>
      </Modal>
    </>
  );
}
