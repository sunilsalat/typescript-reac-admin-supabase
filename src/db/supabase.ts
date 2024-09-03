import { createClient } from "@supabase/supabase-js";

// const supabaseUrl = "https://fliohkkqivofrkobyyjf.supabase.co";
// const supabaseKey =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZsaW9oa2txaXZvZnJrb2J5eWpmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjMwOTM3NjIsImV4cCI6MjAzODY2OTc2Mn0.4T-dweL_6V8WIKgA2CPUsB91z4rU9jzVE4lQuNfT7fo";

export const supabaseUrl = "http://127.0.0.1:54321";
export const anon =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0";

const supabase = createClient(supabaseUrl, anon);

export { supabase };
