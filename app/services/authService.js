import AsyncStorage from "@react-native-async-storage/async-storage";
import { supabase } from "./api"; // your new supabase client

const saveUserRole = async (role) => {
  await AsyncStorage.setItem("userRole", role);
};

export const authService = {
  // ✅ Candidate Login
  candidateLogin: async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return { success: false, error: error.message };
    }

    await saveUserRole("candidate");

    return {
      success: true,
      data: {
        user: data.user,
        session: data.session,
      },
    };
  },

  // ✅ Candidate Signup
  candidateSignUp: async (userData) => {
    const { email, password, ...profileData } = userData;

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      return { success: false, error: error.message };
    }

    // Optional: insert extra profile data into "profiles" table
    if (data.user) {
      await supabase.from("profiles").insert([
        {
          id: data.user.id,
          role: "candidate",
          ...profileData,
        },
      ]);
    }

    await saveUserRole("candidate");

    return {
      success: true,
      data: {
        user: data.user,
      },
    };
  },

  // ✅ Recruiter Login
  recruiterLogin: async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return { success: false, error: error.message };
    }

    await saveUserRole("recruiter");

    return {
      success: true,
      data: {
        user: data.user,
        session: data.session,
      },
    };
  },

  // ✅ Recruiter Signup
  recruiterSignUp: async (userData) => {
    const { email, password, ...profileData } = userData;

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      return { success: false, error: error.message };
    }

    if (data.user) {
      await supabase.from("profiles").insert([
        {
          id: data.user.id,
          role: "recruiter",
          ...profileData,
        },
      ]);
    }

    await saveUserRole("recruiter");

    return {
      success: true,
      data: {
        user: data.user,
      },
    };
  },

  // ✅ Logout
  logout: async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      return { success: false, error: error.message };
    }

    await AsyncStorage.removeItem("userRole");

    return { success: true };
  },

  // ✅ Get Current User
  getCurrentUser: async () => {
    const { data } = await supabase.auth.getUser();
    return data?.user || null;
  },

  // ✅ Get User Role
  getUserRole: async () => {
    try {
      const role = await AsyncStorage.getItem("userRole");
      return role || null;
    } catch {
      return null;
    }
  },

  // ✅ Is Authenticated
  isAuthenticated: async () => {
    const { data } = await supabase.auth.getSession();
    return !!data.session;
  },

  // ✅ Forgot Password
  forgotPassword: async (email) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email);

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, message: "Password reset email sent." };
  },

  // ✅ Reset Password (after email link)
  resetPassword: async (newPassword) => {
    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, message: "Password updated successfully." };
  },
};
