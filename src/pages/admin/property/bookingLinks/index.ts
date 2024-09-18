import icon from "@mui/icons-material/Image";
import { BookingLinksCreate } from "./createBookingLinks";
import { EditGuesser } from "react-admin";
import { boolingLinksList } from "./listBookingLinks";

export default {
  create: BookingLinksCreate,
  list: boolingLinksList,
  edit: EditGuesser,
  icon: icon,
};
