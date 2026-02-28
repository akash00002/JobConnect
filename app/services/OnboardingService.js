import * as FileSystem from "expo-file-system/legacy";
import { supabase } from "./api";

// ─── Helpers ───────────────────────────────────────────────────────────────

async function getUser() {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("No user found");
  return user;
}

async function uploadImage(uri, bucket, folder) {
  const fileName = `${folder}/${Date.now()}.jpg`;
  const base64 = await FileSystem.readAsStringAsync(uri, {
    encoding: "base64",
  });
  const arrayBuffer = Uint8Array.from(atob(base64), (c) => c.charCodeAt(0));
  const { error } = await supabase.storage
    .from(bucket)
    .upload(fileName, arrayBuffer, { contentType: "image/jpeg" });
  if (error) throw error;
  return supabase.storage.from(bucket).getPublicUrl(fileName).data.publicUrl;
}

async function uploadFile(uri, bucket, fileName) {
  const arrayBuffer = await fetch(uri).then((r) => r.arrayBuffer());
  const { error } = await supabase.storage
    .from(bucket)
    .upload(fileName, arrayBuffer, { upsert: true });
  if (error) throw error;
  return supabase.storage.from(bucket).getPublicUrl(fileName).data.publicUrl;
}

async function maybeUploadImage(value, bucket, folder) {
  return value?.startsWith("file://")
    ? uploadImage(value, bucket, folder)
    : value;
}

// ─── Service ───────────────────────────────────────────────────────────────

export const onboardingService = {
  async saveCandidateProfile(formData) {
    const user = await getUser();

    const [photoUrl, resumeUrl] = await Promise.all([
      maybeUploadImage(formData.profilePhoto, "avatars", "public"),
      formData.resume?.uri
        ? uploadFile(
            formData.resume.uri,
            "resumes",
            `public/${Date.now()}_${formData.resume.name.replace(/[^a-zA-Z0-9._-]/g, "_")}`,
          )
        : null,
    ]);

    const { error: profileError } = await supabase
      .from("profiles")
      .update({
        name: formData.name,
        profile_photo: photoUrl,
        about_me: formData.aboutMe,
        updated_at: new Date(),
      })
      .eq("id", user.id);
    if (profileError) throw profileError;

    const { error: candidateError } = await supabase
      .from("candidate_profiles")
      .update({
        current_city: formData.currentCity,
        postal_code: formData.postalCode,
        desired_job_title: formData.desiredJobTitle,
        work_experience: formData.workExperience,
        education: formData.education,
        skills: formData.skills,
        portfolio_links: formData.portfolioLinks,
        resume: resumeUrl,
      })
      .eq("id", user.id);
    if (candidateError) throw candidateError;

    return { success: true };
  },

  async saveRecruiterProfile(formData) {
    const user = await getUser();

    const [companyLogoUrl, coverImageUrl, verificationDocUrl] =
      await Promise.all([
        maybeUploadImage(formData.companyLogo, "company-assets", "companyLogo"),
        maybeUploadImage(
          formData.coverImage,
          "company-assets",
          "companyCoverImage",
        ),
        formData.businessVerificationDocument?.uri?.startsWith("file://")
          ? uploadFile(
              formData.businessVerificationDocument.uri,
              "verification-docs",
              `docs/${Date.now()}.pdf`,
            )
          : formData.businessVerificationDocument,
      ]);

    const { error: profileError } = await supabase
      .from("profiles")
      .update({
        name: formData.name,
        about_me: formData.aboutMe,
        updated_at: new Date(),
      })
      .eq("id", user.id);
    if (profileError) throw profileError;

    const { error: recruiterError } = await supabase
      .from("recruiter_profiles")
      .update({
        company_name: formData.companyName,
        company_size: formData.companySize,
        industry: formData.industry,
        company_website: formData.companyWebsite,
        company_logo: companyLogoUrl,
        cover_image: coverImageUrl,
        company_location: formData.headquarters,
        company_description: formData.companyDescription,
        linkedin_url: formData.linkedinUrl,
        twitter_handle: formData.twitterHandle,
        job_title: formData.jobTitle,
        work_phone: formData.workPhone,
        business_verification_document: verificationDocUrl,
      })
      .eq("id", user.id);
    if (recruiterError) throw recruiterError;

    return { success: true };
  },

  async getProfile() {
    const user = await getUser();
    const { data, error } = await supabase
      .from("profiles")
      .select("*, candidate_profiles(*), recruiter_profiles(*)")
      .eq("id", user.id)
      .single();
    if (error) throw error;
    return data;
  },
};
