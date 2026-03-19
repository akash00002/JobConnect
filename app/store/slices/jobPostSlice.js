import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { supabase } from "../../services/api";

// Map snake_case from Supabase to camelCase for the app
const mapPost = (p) => ({
  ...p,
  workMode: p.work_mode,
  jobType: p.job_type,
  salaryMin: p.salary_min,
  salaryMax: p.salary_max,
  newApplicants: p.new_applicants,
});

export const fetchJobPosts = createAsyncThunk(
  "jobPosts/fetchAll",
  async (_, { rejectWithValue }) => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const { data, error } = await supabase
      .from("job_posts")
      .select("*")
      .eq("recruiter_id", user.id)
      .order("created_at", { ascending: false });
    if (error) return rejectWithValue(error.message);
    return data.map(mapPost);
  },
);

export const createJobPost = createAsyncThunk(
  "jobPosts/create",
  async (form, { rejectWithValue }) => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const { data, error } = await supabase
      .from("job_posts")
      .insert({
        recruiter_id: user.id,
        title: form.title,
        category: form.category,
        work_mode: form.workMode, // ✅ read camelCase, send snake_case
        job_type: form.jobType, // ✅ read camelCase, send snake_case
        location: form.location,
        salary_min: form.salaryMin ? Number(form.salaryMin) : null,
        salary_max: form.salaryMax ? Number(form.salaryMax) : null,
        description: form.description,
        responsibilities: form.responsibilities,
        requirements: form.requirements,
      })
      .select()
      .single();
    if (error) return rejectWithValue(error.message);
    return mapPost(data); // ✅ map before storing
  },
);

export const updateJobPost = createAsyncThunk(
  "jobPosts/update",
  async ({ id, ...form }, { rejectWithValue }) => {
    const { data, error } = await supabase
      .from("job_posts")
      .update({
        title: form.title,
        category: form.category,
        work_mode: form.workMode, // ✅ fixed — was form.work_mode
        job_type: form.jobType, // ✅ fixed — was form.job_type
        location: form.location,
        salary_min: form.salaryMin ? Number(form.salaryMin) : null, // ✅ fixed — was form.salary_min
        salary_max: form.salaryMax ? Number(form.salaryMax) : null, // ✅ fixed — was form.salaryMax inconsistency
        description: form.description,
        responsibilities: form.responsibilities,
        requirements: form.requirements,
      })
      .eq("id", id)
      .select()
      .single();
    if (error) return rejectWithValue(error.message);
    return mapPost(data); // ✅ map before storing
  },
);

export const deleteJobPost = createAsyncThunk(
  "jobPosts/delete",
  async (id, { rejectWithValue }) => {
    const { error } = await supabase.from("job_posts").delete().eq("id", id);
    if (error) return rejectWithValue(error.message);
    return id;
  },
);

export const toggleJobStatus = createAsyncThunk(
  "jobPosts/toggleStatus",
  async ({ id, currentStatus }, { rejectWithValue }) => {
    const newStatus = currentStatus === "active" ? "closed" : "active";
    const { data, error } = await supabase
      .from("job_posts")
      .update({ status: newStatus })
      .eq("id", id)
      .select()
      .single();
    if (error) return rejectWithValue(error.message);
    return mapPost(data); // ✅ map before storing
  },
);

const jobPostsSlice = createSlice({
  name: "jobPosts",
  initialState: {
    posts: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchJobPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchJobPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createJobPost.fulfilled, (state, action) => {
        state.posts.unshift(action.payload);
      })
      .addCase(updateJobPost.fulfilled, (state, action) => {
        const index = state.posts.findIndex((p) => p.id === action.payload.id);
        if (index !== -1) state.posts[index] = action.payload;
      })
      .addCase(deleteJobPost.fulfilled, (state, action) => {
        state.posts = state.posts.filter((p) => p.id !== action.payload);
      })
      .addCase(toggleJobStatus.fulfilled, (state, action) => {
        const index = state.posts.findIndex((p) => p.id === action.payload.id);
        if (index !== -1) state.posts[index] = action.payload;
      });
  },
});

export default jobPostsSlice.reducer;
