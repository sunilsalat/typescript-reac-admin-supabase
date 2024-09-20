import { supabase } from "../supabase";

export const upsertPnmCategories = async (
  property_id: string,
  pnm_categories: any[]
) => {
  let pnmc = pnm_categories.map((i: any) => {
    return { property_id, nomination_category_id: i };
  });

  const { data, error } = await supabase
    .from("properties_nomination_categories")
    .upsert(pnmc, {
      onConflict: "property_id, nomination_category_id",
      ignoreDuplicates: true,
    })
    .select();

  if (!data || error) {
    throw new Error("Can not create nomination category!");
  }

  return data;
};

// await supabase
//   .from("properties_nomination_categories")
//   .delete()
//   .or(
//     pnmc
//       .map(
//         (record) =>
//           `id.eq.${record.property_id},nomination_category_id.eq.${record.nomination_category_id}`
//       )
//       .join(",")
//   );
