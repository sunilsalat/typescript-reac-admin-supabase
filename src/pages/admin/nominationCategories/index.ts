import icon from "@mui/icons-material/Category";
import { listNominationCategory } from "./listNominationCategory";
import { editNominationCategory } from "./editNominationCategory";
import { createNominationCategory } from "./createNominationCategory copy";

export default {
  list: listNominationCategory,
  edit: editNominationCategory,
  create: createNominationCategory,
  icon: icon,
  recordRepresentation: "name",
  options: { label: "Nomination Categories" },
};
