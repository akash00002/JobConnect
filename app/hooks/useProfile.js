// hooks/useProfile.js
import { useEffect, useState } from "react";
import { onboardingService } from "../services/OnboardingService";

export function useProfile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  async function fetchProfile() {
    try {
      const data = await onboardingService.getProfile();
      setProfile(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }

  async function updateProfile(updates) {
    try {
      await onboardingService.updateCandidateProfile(updates);
      await fetchProfile();
    } catch (err) {
      setError(err);
    }
  }
  return { profile, loading, error, updateProfile, refetch: fetchProfile };
}
