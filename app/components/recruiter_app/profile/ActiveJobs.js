import { Text, TouchableOpacity, View } from "react-native";
import { useAppTheme } from "../../../utils/theme";
import JobCard from "./JobCard";

export default function ActiveJobs() {
  const { colors } = useAppTheme();
  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 12,
        }}
      >
        <Text className="text-xl font-bold" style={{ color: colors.text }}>
          Active Jobs
        </Text>
        <TouchableOpacity>
          <Text
            className="text-sm font-bold"
            style={{ color: colors.brandSecondary }}
          >
            See all
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{ gap: 10 }}>
        <JobCard
          title="Senior UX Designer"
          type="Full-time"
          location="Remote"
          newCount="12"
          newCountColor="green"
        />
        <JobCard
          title="React Native Developer"
          type="Contract"
          location="San Francisco"
          newCount="4"
          newCountColor="blue"
        />
      </View>
    </View>
  );
}
