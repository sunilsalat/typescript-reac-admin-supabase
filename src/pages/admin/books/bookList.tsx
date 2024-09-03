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

export const bookList = () => (
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
      <TextField source="author" />
      <TextField source="sold_times" />
      <TextField source="price" />
      <ReferenceField source="currency_id" reference="currencies" />
    </DatagridConfigurable>
  </List>
);
