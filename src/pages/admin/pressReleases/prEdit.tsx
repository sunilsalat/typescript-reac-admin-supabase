import { DateInput, Edit, SimpleForm, TextInput } from "react-admin";

export const pressReleasesEdit = () => (
  <Edit>
    <SimpleForm warnWhenUnsavedChanges>
      <TextInput disabled source="id" />
      <TextInput source="title" />
      <TextInput source="description" />
      <DateInput source="date" />
      <TextInput source="slug" />
      <TextInput source="unique_id" />
      <DateInput disabled source="created_at" />
      <DateInput disabled source="updated_at" />
      <DateInput disabled source="deleted_at" />
    </SimpleForm>
  </Edit>
);
