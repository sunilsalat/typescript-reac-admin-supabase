import icon from "@mui/icons-material/Spa";
import { spaCreate } from "./createSpa";
import { listSpa } from "./listSpa";
import { spaEdit } from "./editSpa";

export default {
  create: spaCreate,
  list: listSpa,
  edit: spaEdit,
  icon: icon,
  recordRepresentation: "name",
  options: { label: "Spa" },
};
