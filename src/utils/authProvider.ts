import { supabaseAuthProvider, SupabaseAuthProviderOptions } from "ra-supabase";
import { supabase } from "../db/supabase";
import { User } from "@supabase/supabase-js";

const authProviderOptions: SupabaseAuthProviderOptions = {
  getIdentity: async (user: User): Promise<any> => {
    const { data, error } = await supabase
      .from("profile")
      .select("id, first_name, last_name")
      .match({ email: user.email })
      .single();

    if (!data || error) {
      throw new Error("Failed to authenticate user");
    }

    return {
      id: data.id,
      fullName: `${data.first_name} ${data.last_name}`,
    };
  },
};

export const authProvider = supabaseAuthProvider(supabase, authProviderOptions);
