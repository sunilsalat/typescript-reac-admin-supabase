import icon from "@mui/icons-material/Restaurant";
import { restaurantCreate } from "./createRestaurant";
import { listRestaurant } from "./listRestaurant";
import { restaurantEdit } from "./editRestaurant";

export default {
  create: restaurantCreate,
  list: listRestaurant,
  edit: restaurantEdit,
  icon: icon,
  recordRepresentation: "name",
  options: { label: "Restaurant" },
};
