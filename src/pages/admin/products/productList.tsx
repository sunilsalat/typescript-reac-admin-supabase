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

export const productList = () => (
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
      <TextField source="unique_id" />
      <TextField source="name" />
      <TextField source="description" />
      <TextField source="type" />
      <NumberField source="price" />
      <NumberField source="sale_price" />
      <NumberField source="discount" />
      <ReferenceField source="currency_id" reference="currencies" />
    </DatagridConfigurable>
  </List>
);
