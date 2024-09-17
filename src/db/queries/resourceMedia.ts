import { supabase } from "../supabase";

interface AdjustPositionsParams {
  dragged_id: number;

  new_position: number;
}

export const callAdjustPositionsFunction = async (
  params: AdjustPositionsParams
) => {
  const { dragged_id, new_position } = params;
  const { data, error } = await supabase.rpc(
    "adjust_resourcemedia_positions_on_update",
    {
      dragged_id,
      new_position,
    }
  );

  if (error) {
    console.error("Error calling adjust_positions_function:", error);
  } else {
    console.log("Function call result:", data);
    return data;
  }
};
