import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import api, { logoutUser } from "../../../services/api"; // Import the api and helper we created

const HomeScreen = ({ navigation }) => {
  const [user, setUser] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    try {
      setLoading(true);

      // 1. Retrieve the user we saved during login
      const storedUser = await AsyncStorage.getItem("userData");
      const parsedUser = storedUser ? JSON.parse(storedUser) : null;
      setUser(parsedUser);

      // 2. Decide where to get data (Real API vs. Dummy Data)
      if (parsedUser?.email === "akash@gmail.com") {
        console.log("⚡ Loading Dummy Dashboard Data");
        // Simulate network delay for realism
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Hardcoded data for the demo user
        setData([
          { id: 1, title: "Project Alpha", status: "Active" },
          { id: 2, title: "Q3 Report", status: "Pending" },
          { id: 3, title: "Client Meeting", status: "Completed" },
        ]);
      } else {
        // 3. Real User: Make an actual API call
        // The interceptor will automatically attach the valid token
        const response = await api.get("/dashboard-items");
        setData(response.data);
      }
    } catch (error) {
      console.error("Failed to load dashboard:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await logoutUser();
    // Reset navigation stack to prevent going back to Home
    navigation.reset({
      index: 0,
      routes: [{ name: "Login" }],
    });
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={{ marginTop: 10 }}>Loading Dashboard...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.welcomeText}>
          Hello, {user?.name || "User"}! 👋
        </Text>
        <Text style={styles.subText}>Email: {user?.email}</Text>
      </View>

      {/* Content Section */}
      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Your Tasks</Text>

        <FlatList
          data={data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardStatus}>{item.status}</Text>
            </View>
          )}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No data available.</Text>
          }
        />
      </View>

      {/* Footer / Logout */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 20,
    paddingTop: 50,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  subText: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  content: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
    color: "#444",
  },
  card: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // Shadow for iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    // Elevation for Android
    elevation: 3,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "500",
  },
  cardStatus: {
    fontSize: 14,
    color: "#007BFF",
  },
  emptyText: {
    textAlign: "center",
    marginTop: 20,
    color: "#999",
  },
  logoutButton: {
    backgroundColor: "#ff4444",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  logoutText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default HomeScreen;
