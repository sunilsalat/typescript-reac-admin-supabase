import { productList } from "./productList";
import { productCreate } from "./productCreate";
import { productEdit } from "./productEdit";
import ProductIcon from "@mui/icons-material/Inventory";

export default {
  list: productList,
  edit: productEdit,
  create: productCreate,
  icon: ProductIcon,
  recordRepresentation: "name",
  options: { label: "Products" },
};
