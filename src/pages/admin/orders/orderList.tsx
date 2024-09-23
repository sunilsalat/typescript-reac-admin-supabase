import {
  CreateButton,
  DatagridConfigurable,
  ExportButton,
  List,
  NumberField,
  ReferenceField,
  SearchInput,
  SelectColumnsButton,
  TextField,
  TopToolbar,
} from "react-admin";

export const orderList = () => (
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
      <TextField source="name" />
    </DatagridConfigurable>
  </List>
);
