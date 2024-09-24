import { supabaseDataProvider } from "ra-supabase";
import { anon, supabase, supabaseUrl } from "../database/supabase";

const dataProvider = supabaseDataProvider({
  instanceUrl: supabaseUrl,
  apiKey: anon,
  supabaseClient: supabase,
});

export { dataProvider };
