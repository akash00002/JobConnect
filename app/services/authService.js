import AsyncStorage from "@react-native-async-storage/async-storage";
import { supabase } from "./api";

const saveUserRole = async (role) => {
  await AsyncStorage.setItem("userRole", role);
};

export const authService = {
  // ✅ Candidate Login
  candidateLogin: async (email, password) => {
    // Step 1: Sign in
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return { success: false, error: error.message };
    }

    // Step 2: Check role BEFORE allowing access
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", data.user.id)
      .single();

    // Step 3: If no profile found, sign out and reject
    if (profileError || !profile) {
      await supabase.auth.signOut();
      return {
        success: false,
        error: "Profile not found. Please sign up first.",
      };
    }

    // Step 4: If wrong role, sign out and reject
    if (profile.role !== "candidate") {
      await supabase.auth.signOut();
      return {
        success: false,
        error: "Access denied. Please use the Recruiter login instead.",
      };
    }

    // Step 5: Role confirmed, save and allow access
    await saveUserRole("candidate");
    return {
      success: true,
      data: { user: data.user, session: data.session },
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

    if (data.user) {
      const { error: profileError } = await supabase.from("profiles").upsert([
        {
          id: data.user.id,
          email: email,
          role: "candidate",
          ...profileData,
        },
      ]);

      if (profileError) {
        console.error("Profile insert failed:", profileError.message);
        return {
          success: false,
          error: "Signup failed. Could not save profile.",
        };
      }
    }

    await saveUserRole("candidate");
    return {
      success: true,
      data: { user: data.user },
    };
  },

  // ✅ Recruiter Login
  recruiterLogin: async (email, password) => {
    // Step 1: Sign in
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return { success: false, error: error.message };
    }

    // Step 2: Check role BEFORE allowing access
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", data.user.id)
      .single();

    // Step 3: If no profile found, sign out and reject
    if (profileError || !profile) {
      await supabase.auth.signOut();
      return {
        success: false,
        error: "Profile not found. Please sign up first.",
      };
    }

    // Step 4: If wrong role, sign out and reject
    if (profile.role !== "recruiter") {
      await supabase.auth.signOut();
      return {
        success: false,
        error: "Access denied. Please use the Candidate login instead.",
      };
    }

    // Step 5: Role confirmed, save and allow access
    await saveUserRole("recruiter");
    return {
      success: true,
      data: { user: data.user, session: data.session },
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
      const { error: profileError } = await supabase.from("profiles").upsert([
        {
          id: data.user.id,
          email: email,
          role: "recruiter",
          ...profileData,
        },
      ]);

      if (profileError) {
        console.error("Profile insert failed:", profileError.message);
        return {
          success: false,
          error: "Signup failed. Could not save profile.",
        };
      }
    }

    await saveUserRole("recruiter");
    return {
      success: true,
      data: { user: data.user },
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

  // ✅ Get User Role from AsyncStorage
  getUserRole: async () => {
    try {
      const role = await AsyncStorage.getItem("userRole");
      return role || null;
    } catch {
      return null;
    }
  },

  // ✅ Get User Role from Database (more reliable)
  getUserRoleFromDB: async () => {
    try {
      const { data: authData } = await supabase.auth.getUser();
      if (!authData?.user) return null;

      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", authData.user.id)
        .single();

      return profile?.role || null;
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
