import { supabaseAuthProvider, SupabaseAuthProviderOptions } from "ra-supabase";
import { supabase } from "../database/supabase";
import { User } from "@supabase/supabase-js";

const authProviderOptions: SupabaseAuthProviderOptions = {
  getIdentity: async (user: User): Promise<any> => {
    const { data, error } = await supabase
      .from("profile")
      .select("name, email")
      .eq("email", user.email)
      .single();

    if (!data || error) {
      throw new Error("Failed to authenticate user");
    }

    return {
      fullName: `${data.name}`,
      email: `${data.email}`,
    };
  },
};

export const authProvider = supabaseAuthProvider(supabase, authProviderOptions);
