import { Ionicons } from "@expo/vector-icons";
import { useRef, useState } from "react";
import { Modal, Pressable, Text, TouchableOpacity, View } from "react-native";
import { useAppTheme } from "../../../utils/theme";

export default function JobDetailHeader({
  job,
  onBack,
  onEdit,
  onDelete,
  onToggleStatus,
}) {
  const { colors, isDark } = useAppTheme();
  const [menuVisible, setMenuVisible] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ top: 0, right: 16 });
  const menuButtonRef = useRef(null);

  const isActive = job.status === "active";

  const openMenu = () => {
    menuButtonRef.current?.measureInWindow((x, y, width, height) => {
      setMenuPosition({ top: y + height + 4, right: 16 });
      setMenuVisible(true);
    });
  };

  return (
    <>
      <View
        className="flex-row items-center justify-between px-2 py-2 border-b"
        style={{
          backgroundColor: colors.surface,
          borderBottomColor: colors.neutral200,
        }}
      >
        <View className="flex-row items-center gap-3">
          <Pressable
            onPress={onBack}
            className="w-10 h-10 rounded-full items-center justify-center active:bg-neutral-100"
          >
            <Ionicons name="arrow-back" size={22} color={colors.text} />
          </Pressable>
          <Text
            className="text-xl font-semibold"
            style={{ color: colors.text }}
          >
            Job Details
          </Text>
        </View>

        <Pressable
          ref={menuButtonRef}
          onPress={openMenu}
          className="w-10 h-10 rounded-full items-center justify-center active:bg-neutral-100"
        >
          <Ionicons name="ellipsis-vertical" size={22} color={colors.text} />
        </Pressable>
      </View>

      {/* Dropdown Modal */}
      <Modal
        visible={menuVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setMenuVisible(false)}
      >
        <Pressable className="flex-1" onPress={() => setMenuVisible(false)}>
          <View
            className="absolute rounded-2xl overflow-hidden border"
            style={{
              top: menuPosition.top,
              right: menuPosition.right,
              backgroundColor: colors.surface,
              borderColor: isDark ? colors.neutral700 : colors.neutral200,
              minWidth: 200,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.15,
              shadowRadius: 12,
              elevation: 8,
            }}
          >
            {/* Toggle Status */}
            <TouchableOpacity
              onPress={() => {
                setMenuVisible(false);
                onToggleStatus();
              }}
              className="flex-row items-center gap-3 px-4 py-3.5 border-b"
              style={{
                borderBottomColor: isDark
                  ? colors.neutral700
                  : colors.neutral100,
              }}
            >
              <Ionicons
                name={isActive ? "pause-circle-outline" : "play-circle-outline"}
                size={20}
                color={
                  isActive ? (colors.warning ?? "#f59e0b") : colors.successIcon
                }
              />
              <Text className="text-sm" style={{ color: colors.text }}>
                {isActive ? "Close Job" : "Reopen Job"}
              </Text>
            </TouchableOpacity>

            {/* Edit */}
            <TouchableOpacity
              onPress={() => {
                setMenuVisible(false);
                onEdit();
              }}
              className="flex-row items-center gap-3 px-4 py-3.5 border-b"
              style={{
                borderBottomColor: isDark
                  ? colors.neutral700
                  : colors.neutral100,
              }}
            >
              <Ionicons name="create-outline" size={20} color={colors.text} />
              <Text className="text-sm" style={{ color: colors.text }}>
                Edit Job
              </Text>
            </TouchableOpacity>

            {/* Delete */}
            <TouchableOpacity
              onPress={() => {
                setMenuVisible(false);
                onDelete();
              }}
              className="flex-row items-center gap-3 px-4 py-3.5"
            >
              <Ionicons name="trash-outline" size={20} color={colors.error} />
              <Text className="text-sm" style={{ color: colors.error }}>
                Delete Job
              </Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>
    </>
  );
}
