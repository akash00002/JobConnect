import * as FileSystem from "expo-file-system/legacy";
import { supabase } from "./api";

export const onboardingService = {
  async uploadPhoto(uri) {
    const fileName = `public/${Date.now()}.jpg`;

    const base64 = await FileSystem.readAsStringAsync(uri, {
      encoding: "base64",
    });

    const arrayBuffer = Uint8Array.from(atob(base64), (c) => c.charCodeAt(0));

    const { error } = await supabase.storage
      .from("avatars")
      .upload(fileName, arrayBuffer, {
        contentType: "image/jpeg",
      });

    if (error) throw error;

    const { data } = supabase.storage.from("avatars").getPublicUrl(fileName);

    return data.publicUrl;
  },

  async uploadResume(uri, name) {
    const safeName = `public/${Date.now()}_${name.replace(/[^a-zA-Z0-9._-]/g, "_")}`;

    const response = await fetch(uri);
    const arrayBuffer = await response.arrayBuffer();
    console.log("resume size:", arrayBuffer.byteLength); // should not be 0

    const { error } = await supabase.storage
      .from("resumes")
      .upload(safeName, arrayBuffer, {
        contentType: "application/pdf",
        upsert: true,
      });

    if (error) throw error;

    const { data } = supabase.storage.from("resumes").getPublicUrl(safeName);

    return data.publicUrl;
  },

  async saveProfile(formData) {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) throw new Error("No user found");

    // Upload photo if it's a local file
    let photoUrl = formData.profilePhoto;
    if (photoUrl && photoUrl.startsWith("file://")) {
      photoUrl = await this.uploadPhoto(photoUrl);
    }

    // Upload resume if it's a local file
    let resumeUrl = null;
    if (formData.resume?.uri) {
      resumeUrl = await this.uploadResume(
        formData.resume.uri,
        formData.resume.name,
      );
    }

    const { error } = await supabase.from("profiles").upsert({
      id: user.id,
      current_city: formData.currentCity,
      postal_code: formData.postalCode,
      desired_job_title: formData.desiredJobTitle,
      work_experience: formData.workExperience,
      education: formData.education,
      skills: formData.skills,
      portfolio_links: formData.portfolioLinks,
      profile_photo: photoUrl,
      resume: resumeUrl,
      about_me: formData.aboutMe,
      updated_at: new Date(),
    });

    if (error) throw error;
    return { success: true };
  },
};
