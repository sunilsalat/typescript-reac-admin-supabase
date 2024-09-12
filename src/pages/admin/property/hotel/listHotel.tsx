import { height, maxHeight } from "@mui/system";
import {
  CreateButton,
  DatagridConfigurable,
  DateField,
  EmailField,
  ExportButton,
  List,
  NumberField,
  ReferenceField,
  SearchInput,
  SelectColumnsButton,
  TextField,
  TopToolbar,
} from "react-admin";

export const listHotel = () => (
  <List
    filters={[<SearchInput source="name@ilike" alwaysOn />]}
    actions={
      <TopToolbar>
        <SelectColumnsButton />
        <CreateButton />
        <ExportButton />
      </TopToolbar>
    }
  >
    <DatagridConfigurable>
      <ReferenceField source="organization_id" reference="organizations" />
      <TextField source="name" />
      <TextField source="legal_name" />
      <TextField source="tagline" />
      <TextField source="price_range" />
      <TextField source="description" sx={{ maxHeight: "1" }} />
      <EmailField source="email" />
      <TextField source="visibility" />
      <TextField source="slug" />
      <TextField source="checkin_time" />
      <TextField source="checkout_time" />
      <NumberField source="number_of_rooms" />
      <DateField source="created_at" />
    </DatagridConfigurable>
  </List>
);
