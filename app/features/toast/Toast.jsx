import { Ionicons } from "@expo/vector-icons";
import { useEffect } from "react";
import { Animated, Text } from "react-native";

const Toast = ({
  visible,
  message,
  type = "error",
  onHide,
  duration = 3000,
}) => {
  const slideAnim = new Animated.Value(-100);

  useEffect(() => {
    if (visible) {
      // Slide in
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
        tension: 50,
        friction: 7,
      }).start();

      // Auto hide after duration
      const timer = setTimeout(() => {
        hideToast();
      }, duration);

      return () => clearTimeout(timer);
    } else {
      slideAnim.setValue(-100);
    }
  }, [visible]);

  const hideToast = () => {
    Animated.timing(slideAnim, {
      toValue: -100,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      onHide?.();
    });
  };

  if (!visible) return null;

  const config = {
    error: {
      bg: "bg-red-500",
      icon: "alert-circle",
      iconColor: "#ffffff",
    },
    success: {
      bg: "bg-green-500",
      icon: "checkmark-circle",
      iconColor: "#ffffff",
    },
    warning: {
      bg: "bg-orange-500",
      icon: "warning",
      iconColor: "#ffffff",
    },
    info: {
      bg: "bg-blue-500",
      icon: "information-circle",
      iconColor: "#ffffff",
    },
  };

  const style = config[type] || config.error;

  return (
    <Animated.View
      style={{
        transform: [{ translateY: slideAnim }],
        position: "absolute",
        top: 60,
        left: 20,
        right: 20,
        zIndex: 9999,
      }}
      className={`${style.bg} rounded-2xl px-4 py-4 shadow-lg flex-row items-center`}
    >
      <Ionicons name={style.icon} size={24} color={style.iconColor} />
      <Text className="text-white text-base font-medium flex-1 ml-3">
        {message}
      </Text>
    </Animated.View>
  );
};

export default Toast;
