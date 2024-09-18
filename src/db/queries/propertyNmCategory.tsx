import { supabase } from "../supabase";

export const insertPnmCategories = async (
  property_id: string,
  pnm_categories: any[]
) => {
  let pnmc = pnm_categories.map((i: any) => {
    return { property_id, nomination_category_id: i };
  });
  const { data, error } = await supabase
    .from("properties_nomination_categories")
    .insert(pnmc)
    .select("*");

  if (!data || error) {
    throw new Error("Can not create nomination category!");
  }

  return data;
};
