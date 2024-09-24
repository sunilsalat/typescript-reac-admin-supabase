import { createClient } from "@supabase/supabase-js";

// export const supabaseUrl = "https://mtpgcgbizsrkxzsllsij.supabase.co";
// export const anon =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im10cGdjZ2JpenNya3h6c2xsc2lqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjY2NTgwMTAsImV4cCI6MjA0MjIzNDAxMH0.wqzgAFxBC0pgV6Ebh7_udrkJzl0iLBE2LZzGZ-PEWKM";

export const supabaseUrl = "http://127.0.0.1:54321";
export const anon =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0";

const supabase = createClient(supabaseUrl, anon);

export { supabase };
