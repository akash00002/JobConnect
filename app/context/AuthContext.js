import { createContext, useContext, useEffect, useState } from "react";
import { authService } from "../services/authService";

const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check authentication on app load
  useEffect(() => {
    checkAuth();
  }, []);

  async function checkAuth() {
    try {
      const authenticated = await authService.isAuthenticated();
      setIsAuthenticated(authenticated);
      if (authenticated) {
        const userData = await authService.getCurrentUser();
        const role = await authService.getUserRole();
        setUser(userData);
        setUserRole(role);
      }
    } catch (error) {
      console.error("Auth check error: ", error);
    } finally {
      setLoading(false);
    }
  }

  // Candidate Login
  async function candidateLogin(email, password) {
    const result = await authService.candidateLogin(email, password);
    if (result.success) {
      setUser(result.data.user);
      setUserRole("candidate");
      setIsAuthenticated(true);
    }
    return result;
  }

  // Candidate SignUp
  async function candidateSignUp(userData) {
    const result = await authService.candidateSignUp(userData);
    if (result.success) {
      setUser(result.data.user);
      setUserRole("candidate");
      setIsAuthenticated(true);
    }
    return result;
  }

  // Recruiter Login
  async function recruiterLogin(email, password) {
    const result = await authService.recruiterLogin(email, password);
    if (result.success) {
      setUser(result.data.user);
      setUserRole("recruiter");
      setIsAuthenticated(true);
    }
    return result;
  }

  // Recruiter SignUp
  async function recruiterSignUp(userData) {
    const result = await authService.recruiterSignUp(userData);
    if (result.success) {
      setUser(result.data.user);
      setUserRole("recruiter");
      setIsAuthenticated(true);
    }
    return result;
  }

  async function logout() {
    await authService.logout();
    setUser(null);
    setUserRole(null);
    setIsAuthenticated(false);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        userRole,
        isAuthenticated,
        loading,
        candidateLogin,
        candidateSignUp,
        recruiterLogin,
        recruiterSignUp,
        logout,
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
