import { EditGuesser, ListGuesser } from "react-admin";
import { createAddress } from "./createAddress";

export default {
  create: createAddress,
  edit: EditGuesser,
  list: ListGuesser,
};
