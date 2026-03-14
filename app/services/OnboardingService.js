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
  console.log("Uploading image URI:", uri);
  const fileName = `${folder}/${Date.now()}.jpg`;
  const base64 = await FileSystem.readAsStringAsync(uri, {
    encoding: "base64",
  });
  console.log("Base64 length:", base64.length);
  const arrayBuffer = Uint8Array.from(atob(base64), (c) => c.charCodeAt(0));
  const { error } = await supabase.storage
    .from(bucket)
    .upload(fileName, arrayBuffer, { contentType: "image/jpeg" });
  if (error) {
    console.log("Storage upload error:", error.message);
    throw error;
  }
  const publicUrl = supabase.storage.from(bucket).getPublicUrl(fileName)
    .data.publicUrl;
  console.log("Uploaded public URL:", publicUrl);
  return publicUrl;
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
        headquarters: formData.headquarters,
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

  // ─── Update function ───────────────────────────────────────────────────────────────

  async updateCandidateProfile(updates) {
    const user = await getUser();

    // upload photo if it's a new local file
    const photoUrl = updates.profilePhoto
      ? await maybeUploadImage(updates.profilePhoto, "avatars", "public")
      : undefined;

    // upload resume if it's a new local file
    const resumeUrl = updates.resume?.uri
      ? await uploadFile(
          updates.resume.uri,
          "resumes",
          `public/${Date.now()}_${updates.resume.name.replace(/[^a-zA-Z0-9._-]/g, "_")}`,
        )
      : undefined;

    // only update profiles table if relevant fields are passed
    const profileUpdates = {
      ...(updates.name !== undefined && { name: updates.name }),
      ...(photoUrl !== undefined && { profile_photo: photoUrl }),
      ...(updates.aboutMe !== undefined && { about_me: updates.aboutMe }),
      updated_at: new Date(),
    };

    const { error: profileError } = await supabase
      .from("profiles")
      .update(profileUpdates)
      .eq("id", user.id);
    if (profileError) throw profileError;

    // only update candidate_profiles table if relevant fields are passed
    const candidateUpdates = {
      ...(updates.currentCity !== undefined && {
        current_city: updates.currentCity,
      }),
      ...(updates.postalCode !== undefined && {
        postal_code: updates.postalCode,
      }),
      ...(updates.desiredJobTitle !== undefined && {
        desired_job_title: updates.desiredJobTitle,
      }),
      ...(updates.workExperience !== undefined && {
        work_experience: updates.workExperience,
      }),
      ...(updates.education !== undefined && { education: updates.education }),
      ...(updates.skills !== undefined && { skills: updates.skills }),
      ...(updates.portfolioLinks !== undefined && {
        portfolio_links: updates.portfolioLinks,
      }),
      ...(resumeUrl !== undefined && { resume: resumeUrl }),
    };

    // only call if there's something to update
    if (Object.keys(candidateUpdates).length > 0) {
      const { error: candidateError } = await supabase
        .from("candidate_profiles")
        .update(candidateUpdates)
        .eq("id", user.id);
      if (candidateError) throw candidateError;
    }

    return { success: true, photoUrl };
  },
  async updateRecruiterProfile(updates) {
    const user = await getUser();

    const companyLogoUrl = updates.companyLogo
      ? await maybeUploadImage(
          updates.companyLogo,
          "company-assets",
          "companyLogo",
        )
      : undefined;

    const coverImageUrl = updates.coverImage
      ? await maybeUploadImage(
          updates.coverImage,
          "company-assets",
          "companyCoverImage",
        )
      : undefined;

    const photoUrl = updates.profilePhoto
      ? await maybeUploadImage(updates.profilePhoto, "avatars", "public")
      : undefined;

    // only update profiles table if relevant fields are passed
    const profileUpdates = {
      ...(updates.name !== undefined && { name: updates.name }),
      ...(photoUrl !== undefined && { profile_photo: photoUrl }),
      ...(updates.jobTitle !== undefined && { job_title: updates.jobTitle }),
      updated_at: new Date(),
    };

    const { error: profileError } = await supabase
      .from("profiles")
      .update(profileUpdates)
      .eq("id", user.id);
    if (profileError) throw profileError;

    // only update recruiter_profiles table if relevant fields are passed
    const recruiterUpdates = {
      ...(updates.companyName !== undefined && {
        company_name: updates.companyName,
      }),
      ...(updates.companyWebsite !== undefined && {
        company_website: updates.companyWebsite,
      }),
      ...(updates.industry !== undefined && { industry: updates.industry }),
      ...(updates.companySize !== undefined && {
        company_size: updates.companySize,
      }),
      ...(updates.companyDescription !== undefined && {
        company_description: updates.companyDescription,
      }),
      ...(updates.headquarters !== undefined && {
        headquarters: updates.headquarters,
        company_location: updates.headquarters,
      }),
      ...(updates.linkedinUrl !== undefined && {
        linkedin_url: updates.linkedinUrl,
      }),
      ...(updates.twitterHandle !== undefined && {
        twitter_handle: updates.twitterHandle,
      }),
      ...(updates.jobTitle !== undefined && { job_title: updates.jobTitle }),
      ...(updates.workPhone !== undefined && { work_phone: updates.workPhone }),
      ...(companyLogoUrl !== undefined && { company_logo: companyLogoUrl }),
      ...(coverImageUrl !== undefined && { cover_image: coverImageUrl }),
    };

    if (Object.keys(recruiterUpdates).length > 0) {
      const { error: recruiterError } = await supabase
        .from("recruiter_profiles")
        .update(recruiterUpdates)
        .eq("id", user.id);
      if (recruiterError) throw recruiterError;
    }

    return { success: true, companyLogoUrl, coverImageUrl };
  },
};
