import Icon from "@mui/icons-material/Newspaper";
import { pressReleasesList } from "./prList";
import { PressReleasesCreate } from "./prCreate";
import { pressReleasesEdit } from "./prEdit";

export default {
  list: pressReleasesList,
  create: PressReleasesCreate,
  edit: pressReleasesEdit,
  icon: Icon,
};
