import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";
import "react-native-url-polyfill/auto";

const supabaseUrl = "https://wistprzwjknjygvlhseo.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indpc3Rwcnp3amtuanlndmxoc2VvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzExODM4NTgsImV4cCI6MjA4Njc1OTg1OH0.ZaSRS_xktykNcYnkrqeUnBKLd3xx-WQhQhBoSR07o00";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
