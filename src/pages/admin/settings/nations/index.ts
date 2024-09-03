import Icon from "@mui/icons-material/Settings";
import { nationList } from "./nationList";
import { nationEdit } from "./nationEdit";
import { nationCreate } from "./nationCreate";

export default {
  list: nationList,
  edit: nationEdit,
  create: nationCreate,
  icon: Icon,
  recordRepresentation: "name",
  options: { label: "Nations" },
};
