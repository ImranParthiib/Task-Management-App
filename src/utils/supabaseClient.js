import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

console.log('Supabase URL:', supabaseUrl);
console.log('Supabase Anon Key:', supabaseAnonKey ? 'Present' : 'Missing');

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Supabase URL or Anon Key is missing. Check your .env file.");
  throw new Error("Supabase configuration is incomplete.");
}

try {
  new URL(supabaseUrl); // This will throw an error if the URL is invalid
} catch {
  console.error("Invalid Supabase URL:", supabaseUrl);
  throw new Error("Invalid Supabase URL. Check your .env file.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

console.log("Supabase client created successfully");
