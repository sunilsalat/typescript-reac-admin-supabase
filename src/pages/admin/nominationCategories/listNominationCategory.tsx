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

export const listNominationCategory = () => (
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
      <ReferenceField source="parent_id" reference="nomination_categories" />
      <TextField source="name" />
      <TextField source="for_resource_type" />
    </DatagridConfigurable>
  </List>
);
