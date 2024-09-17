import { supabase } from "../supabase";

export const allContinents = async () => {
  try {
    let { data, error } = await supabase
      .from("continents")
      .select("*")
      .range(0, 9);
    return { data, error };
  } catch (error) {
    console.log({ error });
  }
};

export const readContinent = async (id: string) => {
  try {
    let { data, error } = await supabase
      .from("continents")
      .select("*")
      .eq("id", id);
    return { data, error };
  } catch (error) {
    console.log({ error });
  }
};
