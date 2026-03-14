import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { onboardingService } from "../services/OnboardingService";

const ProfileContext = createContext(null);

export function ProfileProvider({ children }) {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const fetchProfile = useCallback(async () => {
    try {
      setLoading(true);
      const data = await onboardingService.getProfile();
      setProfile(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  async function updateProfile(updates) {
    try {
      await onboardingService.updateCandidateProfile(updates);
      await fetchProfile();
    } catch (err) {
      setError(err);
    }
  }

  return (
    <ProfileContext.Provider
      value={{ profile, loading, error, updateProfile, refetch: fetchProfile }}
    >
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const context = useContext(ProfileContext);
  if (!context)
    throw new Error("useProfile must be used within ProfileProvider");
  return context;
}
