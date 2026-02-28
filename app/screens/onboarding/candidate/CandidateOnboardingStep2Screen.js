import { useMemo, useState } from "react";
import { Text, View } from "react-native";
import AddNewButton from "../../../components/onboarding/AddNewButton";
import ExperienceCard from "../../../components/onboarding/ExperienceCard";
import ExperienceForm from "../../../components/onboarding/ExperienceForm";
import OnboardingContainer from "../../../components/onboarding/OnboardingContainer";
import { useOnboarding } from "../../../context/OnboardingContext";
import { useAppTheme } from "../../../utils/theme";

export default function OnboardingStep2Screen({ navigation }) {
  const { colors } = useAppTheme();
  const {
    formData,
    addWorkExperience,
    updateWorkExperience,
    removeWorkExperience,
    addEducation,
    updateEducation,
    removeEducation,
  } = useOnboarding();

  const [showWorkForm, setShowWorkForm] = useState(
    formData.workExperience.length === 0,
  );
  const [editingWorkIndex, setEditingWorkIndex] = useState(null);

  const [showEducationForm, setShowEducationForm] = useState(
    formData.education.length === 0,
  );
  const [editingEducationIndex, setEditingEducationIndex] = useState(null);

  const hasExperience = formData.workExperience.length > 0 ? "filled" : "";
  const hasEducation = formData.education.length > 0 ? "filled" : "";
  const fields = useMemo(
    () => [hasExperience, hasEducation],
    [hasExperience, hasEducation],
  );

  const showWorkAddButton = formData.workExperience.length > 0 && !showWorkForm;
  const showEducationAddButton =
    formData.education.length > 0 && !showEducationForm;

  // Work Experience handlers
  const handleSaveWork = (data) => {
    const workExperience = {
      jobTitle: data.fieldOne,
      companyName: data.fieldTwo,
      startDate: data.startDate,
      endDate: data.endDate,
      isPresent: data.isPresent,
    };

    if (editingWorkIndex !== null) {
      updateWorkExperience(editingWorkIndex, workExperience);
      setEditingWorkIndex(null);
    } else {
      addWorkExperience(workExperience);
    }

    setShowWorkForm(false);
    // ✅ collapse education form too if education already has items
    if (formData.education.length > 0) {
      setShowEducationForm(false);
    }
  };

  const handleEditWork = (index) => {
    setEditingWorkIndex(index);
    setShowWorkForm(true);
  };

  const handleDeleteWork = (index) => {
    removeWorkExperience(index);
    setEditingWorkIndex(null);
    if (formData.workExperience.length <= 1) {
      setShowWorkForm(true);
    }
  };

  const handleAddNewWork = () => {
    setEditingWorkIndex(null);
    setShowWorkForm(true);
  };

  // Education handlers
  const handleSaveEducation = (data) => {
    const education = {
      degree: data.fieldOne,
      institution: data.fieldTwo,
      startDate: data.startDate,
      endDate: data.endDate,
      isPresent: data.isPresent,
    };

    if (editingEducationIndex !== null) {
      updateEducation(editingEducationIndex, education);
      setEditingEducationIndex(null);
    } else {
      addEducation(education);
    }

    setShowEducationForm(false);
  };

  const handleEditEducation = (index) => {
    setEditingEducationIndex(index);
    setShowEducationForm(true);
  };

  const handleDeleteEducation = (index) => {
    removeEducation(index);
    setEditingEducationIndex(null);
    if (formData.education.length <= 1) {
      setShowEducationForm(true);
    }
  };

  const handleAddNewEducation = () => {
    setEditingEducationIndex(null);
    setShowEducationForm(true);
  };

  return (
    <OnboardingContainer
      currentStep={2}
      totalSteps={4}
      fields={fields}
      navigation={navigation}
      nextScreen={"CandidateOnboardingStep3"}
      text="Share your professional background to help us find the best opportunities for you"
    >
      {/* Work Experience Section */}
      <Text
        className="text-lg font-medium mb-2 ml-1"
        style={{ color: colors.text }}
      >
        Work Experience
      </Text>

      {formData.workExperience.length > 0 && (
        <View>
          {formData.workExperience.map((exp, index) => (
            <ExperienceCard
              key={index}
              iconName="briefcase"
              experience={{
                jobTitle: exp.jobTitle,
                companyName: exp.companyName,
                startDate: exp.startDate,
                endDate: exp.endDate,
                isPresent: exp.isPresent,
              }}
              onEdit={() => handleEditWork(index)}
              onDelete={() => handleDeleteWork(index)}
            />
          ))}
          {showWorkAddButton && (
            <AddNewButton
              onPress={handleAddNewWork}
              title="Add New Experience"
            />
          )}
        </View>
      )}

      {showWorkForm && (
        <ExperienceForm
          fieldOneLabel="JOB TITLE"
          fieldOnePlaceholder="e.g. Software Engineer"
          fieldOneIcon="briefcase"
          fieldTwoLabel="COMPANY NAME"
          fieldTwoPlaceholder="e.g. Google"
          fieldTwoIcon="business"
          checkboxLabel="I currently work here"
          buttonTitle="Add Experience"
          key={editingWorkIndex ?? "new-work"}
          onSave={handleSaveWork}
          initialData={
            editingWorkIndex !== null
              ? {
                  fieldOne: formData.workExperience[editingWorkIndex]?.jobTitle,
                  fieldTwo:
                    formData.workExperience[editingWorkIndex]?.companyName,
                  startDate:
                    formData.workExperience[editingWorkIndex]?.startDate,
                  endDate: formData.workExperience[editingWorkIndex]?.endDate,
                  isPresent:
                    formData.workExperience[editingWorkIndex]?.isPresent,
                }
              : null
          }
        />
      )}

      {/* Education Section */}
      <Text
        className="text-lg font-medium mb-2 ml-1 mt-4"
        style={{ color: colors.text }}
      >
        Education
      </Text>

      {formData.education.length > 0 && (
        <View>
          {formData.education.map((edu, index) => (
            <ExperienceCard
              key={index}
              iconName="book"
              experience={{
                jobTitle: edu.degree,
                companyName: edu.institution,
                startDate: edu.startDate,
                endDate: edu.endDate,
                isPresent: edu.isPresent,
              }}
              onEdit={() => handleEditEducation(index)}
              onDelete={() => handleDeleteEducation(index)}
            />
          ))}
          {showEducationAddButton && (
            <AddNewButton
              onPress={handleAddNewEducation}
              title="Add New Education"
            />
          )}
        </View>
      )}

      {showEducationForm && (
        <ExperienceForm
          fieldOneLabel="DEGREE"
          fieldOnePlaceholder="e.g. Bachelor's CS"
          fieldOneIcon="school"
          fieldTwoLabel="INSTITUTION"
          fieldTwoPlaceholder="e.g. Stanford University"
          fieldTwoIcon="book"
          checkboxLabel="I am currently studying here"
          buttonTitle="Add Education"
          key={editingEducationIndex ?? "new-education"}
          onSave={handleSaveEducation}
          initialData={
            editingEducationIndex !== null
              ? {
                  fieldOne: formData.education[editingEducationIndex]?.degree,
                  fieldTwo:
                    formData.education[editingEducationIndex]?.institution,
                  startDate:
                    formData.education[editingEducationIndex]?.startDate,
                  endDate: formData.education[editingEducationIndex]?.endDate,
                  isPresent:
                    formData.education[editingEducationIndex]?.isPresent,
                }
              : null
          }
        />
      )}
    </OnboardingContainer>
  );
}
