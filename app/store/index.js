import { configureStore } from "@reduxjs/toolkit";
import jobPostsReducer from "./slices/jobPostSlice";

export const store = configureStore({
  reducer: {
    jobPosts: jobPostsReducer,
  },
});
