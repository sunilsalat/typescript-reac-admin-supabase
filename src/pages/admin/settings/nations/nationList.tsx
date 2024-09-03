import {
  CreateButton,
  DatagridConfigurable,
  ExportButton,
  List,
  SearchInput,
  SelectColumnsButton,
  TextField,
  TopToolbar,
} from "react-admin";

export const nationList = () => (
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
      <TextField source="code" />
      <TextField source="continent_codes" />
      <TextField source="region_codes" />
      <TextField source="locale" />
    </DatagridConfigurable>
  </List>
);
