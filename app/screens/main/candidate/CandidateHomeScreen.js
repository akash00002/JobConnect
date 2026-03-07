import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function CandidateHomeScreen() {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        {Array.from({ length: 20 }, (_, i) => (
          <View key={i} style={styles.card}>
            <Text style={styles.title}>Card {i + 1}</Text>
            <Text style={styles.subtitle}>
              This is a test card to check scrolling
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f6f6f8",
  },
  scroll: {
    padding: 16,
    gap: 12,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#0f172a",
  },
  subtitle: {
    fontSize: 13,
    color: "#94a3b8",
    marginTop: 4,
  },
});
