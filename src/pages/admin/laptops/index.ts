import ProductIcon from "@mui/icons-material/Collections";
import { laptopList } from "./laptopList";
import { laptopCreate } from "./laptopCreate";
import { laptopEdit } from "./laptopEdit";

export default {
  list: laptopList,
  edit: laptopEdit,
  create: laptopCreate,
  icon: ProductIcon,
  recordRepresentation: "name",
  options: { label: "Laptops" },
};
