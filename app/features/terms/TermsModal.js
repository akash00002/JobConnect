import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { useEffect, useRef, useState } from "react";
import {
  Animated,
  Modal,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import Button from "../../components/common/Button";
import TERMSDATA from "../../data/terms.json";
import { useAppTheme } from "../../utils/theme";
import BulletList from "./BulletList";
import TermsContent from "./TermsContent";
import TermsHeader from "./TermsHeader";

export default function TermsModal({
  visible,
  onClose,
  onAccept,
  onDecline,
  isRecruiter = false,
}) {
  const { colors, isDark } = useAppTheme();
  const slideAnim = useRef(new Animated.Value(0)).current;
  const [modalVisible, setModalVisible] = useState(visible);
  const [hasScrolledToBottom, setHasScrolledToBottom] = useState(false);

  useEffect(() => {
    if (visible) {
      setModalVisible(true);
      setHasScrolledToBottom(false);
      Animated.timing(slideAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setModalVisible(false);
      });
    }
  }, [visible]);

  const handleScroll = ({ nativeEvent }) => {
    const { layoutMeasurement, contentOffset, contentSize } = nativeEvent;
    const paddingToBottom = 20;
    const isAtBottom =
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom;

    if (isAtBottom && !hasScrolledToBottom) {
      setHasScrolledToBottom(true);
    }
  };

  const handleClose = () => {
    onClose();
  };

  const handleAccept = () => {
    if (hasScrolledToBottom) {
      onAccept();
    }
  };

  const handleDecline = () => {
    onDecline();
  };

  return (
    <Modal
      visible={modalVisible}
      transparent
      animationType="fade"
      onRequestClose={handleClose}
    >
      {/* FULL SCREEN BLUR */}
      <BlurView intensity={35} tint="dark" style={{ flex: 1 }}>
        <Pressable className="flex-1" onPress={handleClose} />

        {/* BOTTOM MODAL SHEET */}
        <Animated.View
          className="absolute bottom-0 w-full rounded-t-3xl overflow-hidden"
          style={{
            height: "85%",
            backgroundColor: isDark ? colors.surface : colors.neutral50,
            transform: [
              {
                translateY: slideAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1000, 0],
                }),
              },
            ],
          }}
        >
          {/* Header */}
          <View
            className="flex-row items-center justify-between px-6 py-8"
            style={{
              borderBottomWidth: 1,
              borderBottomColor: isDark ? colors.neutral800 : colors.neutral100,
            }}
          >
            <Text className="text-2xl font-bold" style={{ color: colors.text }}>
              Terms & Conditions
            </Text>
            <Pressable
              className="w-10 h-10 items-center justify-center rounded-full"
              style={({ pressed }) => ({
                backgroundColor: pressed
                  ? isDark
                    ? colors.neutral800
                    : colors.neutral100
                  : "transparent",
              })}
              onPress={handleClose}
            >
              <Ionicons name="close" size={26} color={colors.neutral500} />
            </Pressable>
          </View>

          {/* Scrollable Content */}
          <ScrollView
            className="flex-1 px-6 py-6 pb-32"
            onScroll={handleScroll}
            scrollEventThrottle={16}
          >
            <TermsContent>{TERMSDATA.intro}</TermsContent>
            {TERMSDATA.sections.map((section) => (
              <View key={section.id}>
                <TermsHeader>
                  {section.id}. {section.title}
                </TermsHeader>
                <TermsContent>{section.content}</TermsContent>
                {section.bullets && <BulletList items={section.bullets} />}
              </View>
            ))}
          </ScrollView>

          {/* Footer */}
          <View
            className="gap-2 items-center px-6 pb-8 pt-4"
            style={{
              borderTopWidth: 2,
              borderTopColor: isDark ? colors.neutral800 : colors.neutral100,
            }}
          >
            <View className="flex-row items-center justify-center">
              <MaterialIcons
                name="keyboard-double-arrow-down"
                size={20}
                color={colors.neutral500}
              />
              <Text className="ml-1" style={{ color: colors.neutral500 }}>
                PLEASE SCROLL TO THE BOTTOM TO ACCEPT
              </Text>
            </View>
            {isRecruiter ? (
              <Button
                title="Accept"
                onPress={handleAccept}
                disabled={!hasScrolledToBottom}
                variant="recruiter"
              />
            ) : (
              <Button
                title="Accept"
                onPress={handleAccept}
                disabled={!hasScrolledToBottom}
              />
            )}
            <Button
              title="Decline"
              variant="secondary"
              onPress={handleDecline}
            />
          </View>
        </Animated.View>
      </BlurView>
    </Modal>
  );
}
