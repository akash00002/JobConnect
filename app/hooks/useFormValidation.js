import { useState } from "react";

export const useFormValidation = () => {
  const [errors, setErrors] = useState({});

  const validateName = (name) => {
    if (!name) return "Full name is required";
    if (name.trim().length < 2) return "Name must be at least 2 characters";
    return "";
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return "Email is required";
    if (!emailRegex.test(email)) return "Please enter a valid email";
    return "";
  };

  const validatePassword = (password) => {
    if (!password) return "Password is required";
    if (password.length < 8) return "Password must be at least 8 characters";
    if (!/[A-Z]/.test(password))
      return "Password must contain at least one uppercase letter";
    if (!/[a-z]/.test(password))
      return "Password must contain at least one lowercase letter";
    if (!/[0-9]/.test(password))
      return "Password must contain at least one number";
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password))
      return "Password must contain at least one special character";
    return "";
  };

  const validateConfirmPassword = (password, confirmPassword) => {
    if (!confirmPassword) return "Please confirm your password";
    if (password !== confirmPassword) return "Passwords do not match";
    return "";
  };

  const validateCompanyName = (companyName) => {
    if (!companyName) return "Company name is required";
    if (companyName.trim().length < 2)
      return "Company name must be at least 2 characters";
    return "";
  };

  const validatePhoneNumber = (phone) => {
    const phoneRegex = /^[0-9]{10}$/;
    if (!phone) return "Phone number is required";
    if (!phoneRegex.test(phone))
      return "Please enter a valid 10-digit phone number";
    return "";
  };

  const clearError = (field) => {
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const clearAllErrors = () => {
    setErrors({});
  };

  return {
    errors,
    setErrors,
    validateName,
    validateEmail,
    validatePassword,
    validateConfirmPassword,
    validateCompanyName,
    validatePhoneNumber,
    clearError,
    clearAllErrors,
  };
};
