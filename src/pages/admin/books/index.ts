import ProductIcon from "@mui/icons-material/Label";
import { bookCreate } from "./bookCreate";
import { bookEdit } from "./bookEdit";
import { bookList } from "./bookList";

export default {
  list: bookList,
  edit: bookEdit,
  create: bookCreate,
  icon: ProductIcon,
  recordRepresentation: "name",
  options: { label: "Books" },
};
