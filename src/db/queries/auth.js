import { supabase } from "../supabase";

export const signIn = async ({ email, password }) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    return { data, error };
  } catch (error) {
    console.log({ error });
  }
};

export const signUp = async ({ email, password, name, role }) => {
  try {
    console.log({ email, password, role });
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: "doe",
          age: 27,
          role: role,
        },
      },
    });

    return { data, error };
  } catch (error) {
    console.log({ error });
  }
};
