import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://mlklnfeqqzyntwystzmv.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1sa2xuZmVxcXp5bnR3eXN0em12Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTE2MTMzMDAsImV4cCI6MjAwNzE4OTMwMH0.9ZFMuT4Q8Wnrx86dKimPGUda7ZINGYEYgnT4lQaqTgI";

export const supabase = createClient(supabaseUrl, supabaseKey);
