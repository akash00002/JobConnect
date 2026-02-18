import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "./api";

const saveAuthData = async (token, user, role) => {
  await AsyncStorage.multiSet([
    ["authToken", token],
    ["userData", JSON.stringify(user)],
    ["userRole", role], // Add userRole
  ]);
};

export const authService = {
  candidateLogin: async (email, password) => {
    try {
      const response = await api.post("/auth/candidateLogin", {
        email,
        password,
      });
      const { token, user } = response.data;
      await saveAuthData(token, user, "candidate"); // Pass role
      return { success: true, data: { token, user } };
    } catch (error) {
      return {
        success: false,
        error:
          error.response?.data?.message || "Login failed. Please try again.",
      };
    }
  },

  candidateSignUp: async (userData) => {
    try {
      const response = await api.post("/auth/candidateSignUp", userData);
      const { token, user } = response.data;
      await saveAuthData(token, user, "candidate"); // Pass role
      return { success: true, data: { token, user } };
    } catch (error) {
      return {
        success: false,
        error:
          error.response?.data?.message || "Sign Up failed. Please try again.",
      };
    }
  },

  recruiterLogin: async (email, password) => {
    try {
      const response = await api.post("/auth/recruiterLogin", {
        email,
        password,
      });
      const { token, user } = response.data;
      await saveAuthData(token, user, "recruiter"); // Pass role
      return { success: true, data: { token, user } };
    } catch (error) {
      return {
        success: false,
        error:
          error.response?.data?.message || "Login failed. Please try again.",
      };
    }
  },

  recruiterSignUp: async (userData) => {
    try {
      const response = await api.post("/auth/recruiterSignUp", userData);
      const { token, user } = response.data;
      await saveAuthData(token, user, "recruiter"); // Pass role
      return { success: true, data: { token, user } };
    } catch (error) {
      return {
        success: false,
        error:
          error.response?.data?.message || "Sign Up failed. Please try again.",
      };
    }
  },

  logout: async () => {
    try {
      await AsyncStorage.multiRemove(["authToken", "userData", "userRole"]); // Remove userRole too
      return { success: true };
    } catch (error) {
      return { success: false, error: "Logout failed" };
    }
  },

  getCurrentUser: async () => {
    try {
      const userData = await AsyncStorage.getItem("userData");
      return userData ? JSON.parse(userData) : null;
    } catch {
      return null;
    }
  },

  getUserRole: async () => {
    try {
      const role = await AsyncStorage.getItem("userRole");
      return role || null;
    } catch {
      return null;
    }
  },

  isAuthenticated: async () => {
    try {
      const token = await AsyncStorage.getItem("authToken");
      return !!token;
    } catch {
      return false;
    }
  },

  forgotPassword: async (email) => {
    try {
      const response = await api.post("/auth/forgot-password", { email });
      return { success: true, message: response.data.message };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || "Failed to send reset email.",
      };
    }
  },

  resetPassword: async (resetToken, newPassword) => {
    try {
      const response = await api.post("/auth/reset-password", {
        token: resetToken,
        password: newPassword,
      });
      return { success: true, message: response.data.message };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || "Failed to reset password.",
      };
    }
  },
};
