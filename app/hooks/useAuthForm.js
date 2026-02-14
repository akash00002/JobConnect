// hooks/useAuthForm.js
import { useState } from "react";
import { useHaptics } from "./useHaptic";
import { useToast } from "../features/toast/ToastContext";
import { useFormValidation } from "./useFormValidation";

export const useAuthForm = () => {
  const { showToast } = useToast();
  const { impact } = useHaptics();
  const validation = useFormValidation();

  const [isLoading, setIsLoading] = useState(false);

  // Common social login handlers
  const handleGoogleLogin = () => {
    showToast("Coming Soon! Google login will be available soon");
    impact();
  };

  const handleAppleLogin = () => {
    showToast("Coming Soon! Apple login will be available soon");
    impact();
  };

  return {
    ...validation,
    isLoading,
    setIsLoading,
    handleGoogleLogin,
    handleAppleLogin,
  };
};
