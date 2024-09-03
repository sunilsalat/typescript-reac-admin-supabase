import {
  CreateButton,
  DatagridConfigurable,
  ExportButton,
  List,
  ReferenceField,
  SearchInput,
  SelectColumnsButton,
  TextField,
  TopToolbar,
} from "react-admin";

export const laptopList = () => (
  <List
    filters={[<SearchInput source="name" alwaysOn />]}
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
      <TextField source="price" />
      <TextField source="cpu" />
      <TextField source="ram" />
      <ReferenceField source="currency_id" reference="currencies" />
    </DatagridConfigurable>
  </List>
);
