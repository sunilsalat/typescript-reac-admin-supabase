import icon from "@mui/icons-material/Hotel";
import { hotelCreate } from "./createHotel";
import { EditGuesser } from "react-admin";
import { listHotel } from "./listHotel";

export default {
  create: hotelCreate,
  list: listHotel,
  edit: EditGuesser,
  icon: icon,
  recordRepresentation: "name",
  options: { label: "Hotel" },
};
