import { createContext, useContext, useEffect, useRef, useState } from "react";
import { supabase } from "../services/api";
import { authService } from "../services/authService";

const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isNewUser, setIsNewUser] = useState(false);

  // 🔑 This flag blocks onAuthStateChange from running during manual login
  const isManualAuth = useRef(false);

  // useEffect(() => {
  //   checkInitialSession();

  //   const { data: listener } = supabase.auth.onAuthStateChange(
  //     async (event, session) => {
  //       // ✅ Skip if we're doing manual login/signup (role check handles it)
  //       console.log(
  //         "AUTH STATE CHANGE:",
  //         event,
  //         "isManualAuth:",
  //         isManualAuth.current,
  //       );

  //       if (isManualAuth.current) return;

  //       if (session?.user) {
  //         setUser(session.user);
  //         setIsAuthenticated(true);
  //         const role = await authService.getUserRole();
  //         setUserRole(role);
  //       } else {
  //         setUser(null);
  //         setUserRole(null);
  //         setIsAuthenticated(false);
  //         setIsNewUser(false);
  //       }

  //       setLoading(false);
  //     },
  //   );

  //   return () => {
  //     listener.subscription.unsubscribe();
  //   };
  // }, []);

  useEffect(() => {
    checkInitialSession();

    const { data: listener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        // Only handle sign out here, login functions handle sign in
        if (event === "SIGNED_OUT") {
          setUser(null);
          setUserRole(null);
          setIsAuthenticated(false);
          setIsNewUser(false);
          setLoading(false);
        }
      },
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  async function checkInitialSession() {
    const { data } = await supabase.auth.getSession();
    if (data.session?.user) {
      setUser(data.session.user);
      setIsAuthenticated(true);
      setIsNewUser(false);
      const role = await authService.getUserRole();
      setUserRole(role);
    }
    setLoading(false);
  }

  // ✅ Candidate Login
  async function candidateLogin(email, password) {
    isManualAuth.current = true; // 🚫 block listener
    try {
      const result = await authService.candidateLogin(email, password);
      if (result.success) {
        setUser(result.data.user);
        setUserRole("candidate");
        setIsAuthenticated(true); // ✅ only set true after role confirmed
        setIsNewUser(false);
      }
      return result;
    } finally {
      isManualAuth.current = false; // ✅ always unblock listener
    }
  }

  // ✅ Candidate Signup
  async function candidateSignUp(userData) {
    isManualAuth.current = true;
    try {
      const result = await authService.candidateSignUp(userData);
      if (result.success) {
        setUser(result.data.user);
        setUserRole("candidate");
        setIsAuthenticated(true);
        setIsNewUser(true);
      }
      return result;
    } finally {
      isManualAuth.current = false;
    }
  }

  // ✅ Recruiter Login
  async function recruiterLogin(email, password) {
    isManualAuth.current = true;
    try {
      const result = await authService.recruiterLogin(email, password);
      if (result.success) {
        setUser(result.data.user);
        setUserRole("recruiter");
        setIsAuthenticated(true); // ✅ only set true after role confirmed
        setIsNewUser(false);
      }
      return result;
    } finally {
      isManualAuth.current = false;
    }
  }

  // ✅ Recruiter Signup
  async function recruiterSignUp(userData) {
    isManualAuth.current = true;
    try {
      const result = await authService.recruiterSignUp(userData);
      if (result.success) {
        setUser(result.data.user);
        setUserRole("recruiter");
        setIsAuthenticated(true);
        setIsNewUser(true);
      }
      return result;
    } finally {
      isManualAuth.current = false;
    }
  }

  async function logout() {
    await authService.logout();
    setUser(null);
    setUserRole(null);
    setIsAuthenticated(false);
    setIsNewUser(false);
  }

  function completeOnboarding() {
    setIsNewUser(false);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        userRole,
        isAuthenticated,
        isNewUser,
        loading,
        candidateLogin,
        candidateSignUp,
        recruiterLogin,
        recruiterSignUp,
        logout,
        completeOnboarding,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
