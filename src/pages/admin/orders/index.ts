import ProductIcon from "@mui/icons-material/Shop";
import { orderList } from "./orderList";
import { orderEdit } from "./orderEdit";

export default {
  list: orderList,
  edit: orderEdit,
  icon: ProductIcon,
  recordRepresentation: "name",
  options: { label: "Orders" },
};
