import icon from "@mui/icons-material/Hotel";
import { hotelCreate } from "./createHotel";
import { listHotel } from "./listHotel";
import { hotelEdit } from "./editHotel";

export default {
  create: hotelCreate,
  list: listHotel,
  edit: hotelEdit,
  icon: icon,
  recordRepresentation: "name",
  options: { label: "Hotel" },
};
