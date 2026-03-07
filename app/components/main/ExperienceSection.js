import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useAppTheme } from "../../utils/theme";
import ExperienceCard from "../onboarding/ExperienceCard";
import ExperienceForm from "../onboarding/ExperienceForm";

export default function ExperienceSection({
  // data
  items,
  onSave,
  // section config
  title = "Experience",
  emptyText = "No items added yet",
  iconName = "briefcase-outline",
  // form config
  fieldOneLabel,
  fieldOnePlaceholder,
  fieldOneIcon,
  fieldTwoLabel,
  fieldTwoPlaceholder,
  fieldTwoIcon,
  checkboxLabel,
  addButtonTitle,
  saveButtonTitle,
  // map item fields to/from form fields
  mapToForm, // (item) => { fieldOne, fieldTwo, startDate, endDate, isPresent }
  mapFromForm, // (formData) => item object
  listMarginBottom = -16,
}) {
  const { colors, isDark } = useAppTheme();
  const [editingIndex, setEditingIndex] = useState(null);
  const [isAdding, setIsAdding] = useState(false);

  function handleEditPress(index) {
    setIsAdding(false);
    setEditingIndex(index === editingIndex ? null : index);
  }

  function handleAddPress() {
    setEditingIndex(null);
    setIsAdding((prev) => !prev);
  }

  function handleDelete(index) {
    const updated = [...(items || [])];
    updated.splice(index, 1);
    onSave?.(updated);
  }

  function handleSave(formData, index) {
    const mapped = mapFromForm(formData);
    const updated = [...(items || [])];
    if (index !== null && index !== undefined) {
      updated[index] = mapped;
    } else {
      updated.push(mapped);
    }
    onSave?.(updated);
    setEditingIndex(null);
    setIsAdding(false);
  }

  function normalizeItem(item) {
    return {
      ...item,
      // map display fields so ExperienceCard always gets jobTitle/companyName
      jobTitle: item.jobTitle || item.degree || item.fieldOne || "",
      companyName: item.companyName || item.institution || item.fieldTwo || "",
      startDate: item.startDate ? new Date(item.startDate) : null,
      endDate: item.endDate ? new Date(item.endDate) : null,
    };
  }

  return (
    <View style={{ width: "100%", marginBottom: listMarginBottom }}>
      <View className="gap-1">
        {/* Header */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text className="text-xl font-bold" style={{ color: colors.text }}>
            {title}
          </Text>
          <TouchableOpacity
            onPress={handleAddPress}
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 4,
              paddingHorizontal: 12,
              paddingVertical: 8,
              borderRadius: 18,
            }}
          >
            <Ionicons
              name={isAdding ? "close" : "add"}
              size={20}
              color={colors.brandPrimary}
            />
            <Text
              style={{
                color: colors.brandPrimary,
                fontSize: 14,
                fontWeight: "500",
              }}
            >
              {isAdding ? "Cancel" : "Add"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Add Form */}
        {isAdding && (
          <ExperienceForm
            fieldOneLabel={fieldOneLabel}
            fieldOnePlaceholder={fieldOnePlaceholder}
            fieldOneIcon={fieldOneIcon}
            fieldTwoLabel={fieldTwoLabel}
            fieldTwoPlaceholder={fieldTwoPlaceholder}
            fieldTwoIcon={fieldTwoIcon}
            checkboxLabel={checkboxLabel}
            buttonTitle={addButtonTitle}
            initialData={null}
            onSave={(formData) => handleSave(formData, null)}
          />
        )}

        {/* List */}
        <View style={{ width: "100%", gap: 4 }}>
          {items?.length > 0 ? (
            items.map((item, index) => (
              <View key={index} style={{ width: "100%" }}>
                <ExperienceCard
                  experience={normalizeItem(item)}
                  iconName={iconName}
                  onEdit={() => handleEditPress(index)}
                  onDelete={() => handleDelete(index)}
                />

                {/* Inline Edit Form */}
                {editingIndex === index && (
                  <View style={{ marginTop: 8, marginBottom: 8 }}>
                    <ExperienceForm
                      fieldOneLabel={fieldOneLabel}
                      fieldOnePlaceholder={fieldOnePlaceholder}
                      fieldOneIcon={fieldOneIcon}
                      fieldTwoLabel={fieldTwoLabel}
                      fieldTwoPlaceholder={fieldTwoPlaceholder}
                      fieldTwoIcon={fieldTwoIcon}
                      checkboxLabel={checkboxLabel}
                      buttonTitle={saveButtonTitle}
                      initialData={mapToForm(normalizeItem(item))}
                      onSave={(formData) => handleSave(formData, index)}
                    />
                  </View>
                )}
              </View>
            ))
          ) : (
            <View
              style={{
                padding: 16,
                borderRadius: 12,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: colors.surface,
                borderWidth: 1,
                borderColor: isDark ? colors.neutral700 : colors.neutral100,
                minHeight: 80,
                width: "100%",
              }}
            >
              <Text style={{ color: colors.textSecondary }}>{emptyText}</Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
}
