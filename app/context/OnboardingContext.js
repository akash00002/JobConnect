import { createContext, useContext, useMemo, useState } from "react";

const OnboardingContext = createContext();

export function OnboardingProvider({ children }) {
  const [formData, setFormData] = useState({
    //Step1
    currentCity: "",
    postalCode: "",
    desiredJobTitle: "",
    //Step2
    workExperience: [],
    education: [],
    //Step3
    skills: [],
    portfolioLinks: [],
    //Step4
    profilePhoto: null, // ✅ Changed from [] to null (single photo)
    resume: "",
    aboutMe: "",
  });

  const updateFormData = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const updateMultipleFields = (fields) => {
    setFormData((prev) => ({ ...prev, ...fields }));
  };

  const getTotalProgress = useMemo(() => {
    const allFields = [
      // Step 1
      formData.currentCity,
      formData.postalCode,
      formData.desiredJobTitle,
      //Step 2
      formData.workExperience,
      formData.education,
      //Step 3
      formData.skills,
      formData.portfolioLinks,
      //Step 4
      formData.profilePhoto,
      formData.resume,
      formData.aboutMe,
    ];

    const totalFields = allFields.length;

    // ✅ FIXED: Moved .length outside the filter
    const filledFields = allFields.filter((field) => {
      // Handle arrays
      if (Array.isArray(field)) {
        return field.length > 0;
      }
      // Handle strings and other values
      return field && field.toString().trim() !== "";
    }).length; // ✅ .length goes here!

    return { filledFields, totalFields };
  }, [formData]);

  return (
    <OnboardingContext.Provider
      value={{
        formData,
        updateFormData,
        updateMultipleFields,
        getTotalProgress,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
}

export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error("useOnboarding must be used within OnboardingProvider");
  }
  return context;
};
