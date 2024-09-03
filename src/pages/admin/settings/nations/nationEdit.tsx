import { Edit, SimpleForm, TextInput } from "react-admin";

const filterToQuery = (searchText: string) => ({ name: `%${searchText}%` });

export const nationEdit = () => (
  <Edit mutationMode="pessimistic">
    <SimpleForm warnWhenUnsavedChanges>
      <TextInput source="name" />
      <TextInput source="code" />
      <TextInput source="continent_codes" />
      <TextInput source="region_codes" />
      <TextInput source="locale" />
    </SimpleForm>
  </Edit>
);
