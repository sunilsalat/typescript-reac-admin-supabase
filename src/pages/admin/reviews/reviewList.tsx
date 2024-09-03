import {
  BooleanField,
  CreateButton,
  DatagridConfigurable,
  DateField,
  ExportButton,
  List,
  NumberField,
  ReferenceField,
  SearchInput,
  SelectColumnsButton,
  TextField,
  TopToolbar,
} from "react-admin";

export const reviewList = () => {
  return (
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
        <TextField source="entity_type" />
        <ReferenceField source="entity_id" reference="products" />
        <ReferenceField source="profile_id" reference="profiles" />
        <TextField source="reviewer_name" />
        <TextField source="reviewer_email" />
        <TextField source="reviewer_note" />
        <NumberField source="overall_rating" />
        <BooleanField source="verified" />
        <TextField source="unique_id" />
        <DateField source="created_at" />
      </DatagridConfigurable>
    </List>
  );
};
