import { createContext, useContext, useMemo, useState } from "react";

const OnboardingContext = createContext();

export function OnboardingProvider({ children }) {
  const [formData, setFormData] = useState({
    //Candidate Step1
    currentCity: "",
    postalCode: "",
    desiredJobTitle: "",
    //Candidate Step2
    workExperience: [],
    education: [],
    //Candidate Step3
    skills: [],
    portfolioLinks: [],
    //Candidate Step4
    profilePhoto: null, // ✅ Changed from [] to null (single photo)
    resume: "",
    aboutMe: "",

    //Recruiter Step1
    companyWebsite: "",
    industry: "",
    companySize: "",
    companyDescription: "",

    //Recruiter Step2
    companyLogo: null,
    coverImage: null,
    headquarters: "",
    linkedinUrl: "",
    twitterHandle: "",

    //Recruiter Step3
    jobTitle: "",
    workPhone: "",
    businessVerificationDocument: null,
  });

  const updateFormData = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const updateMultipleFields = (fields) => {
    setFormData((prev) => ({ ...prev, ...fields }));
  };

  const addWorkExperience = (experience) => {
    setFormData((prev) => ({
      ...prev,
      workExperience: [...prev.workExperience, experience],
    }));
  };

  const updateWorkExperience = (index, updatedExperience) => {
    setFormData((prev) => ({
      ...prev,
      workExperience: prev.workExperience.map((exp, i) =>
        i === index ? updatedExperience : exp,
      ),
    }));
  };

  const removeWorkExperience = (index, experience) => {
    setFormData((prev) => ({
      ...prev,
      workExperience: prev.workExperience.filter((_, i) => i !== index),
    }));
  };

  const addEducation = (education) => {
    setFormData((prev) => ({
      ...prev,
      education: [...prev.education, education],
    }));
  };

  const updateEducation = (index, updatedEducation) => {
    setFormData((prev) => ({
      ...prev,
      education: prev.education.map((edu, i) =>
        i === index ? updatedEducation : edu,
      ),
    }));
  };

  const removeEducation = (index) => {
    setFormData((prev) => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index),
    }));
  };

  const getCandidateProgress = useMemo(() => {
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

  const getRecruiterProgress = useMemo(() => {
    const allFields = [
      formData.companyWebsite,
      formData.industry,
      formData.companySize,
      formData.companyDescription,
      formData.companyLogo,
      formData.coverImage,
      formData.headquarters,
      formData.linkedinUrl,
      formData.twitterHandle,
      formData.jobTitle,
      formData.workPhone,
      formData.businessVerificationDocument,
    ];

    const totalFields = allFields.length;

    const filledFields = allFields.filter((field) => {
      if (Array.isArray(field)) {
        return field.length > 0;
      }
      return field && field.toString().trim() !== "";
    }).length;

    return { filledFields, totalFields };
  }, [formData]);

  return (
    <OnboardingContext.Provider
      value={{
        formData,
        updateFormData,
        updateMultipleFields,
        addWorkExperience,
        updateWorkExperience,
        removeWorkExperience,
        addEducation,
        updateEducation,
        removeEducation,
        getCandidateProgress,
        getRecruiterProgress,
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
