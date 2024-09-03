import {
  Edit,
  NumberInput,
  ReferenceInput,
  SimpleForm,
  TextInput,
} from "react-admin";

export const laptopEdit = () => (
  <Edit mutationMode="pessimistic">
    <SimpleForm warnWhenUnsavedChanges>
      <TextInput source="name" />
      <NumberInput source="price" />
      <TextInput source="ram" />
      <TextInput source="cpu" />
      <ReferenceInput source="currency_id" reference="currencies" />
    </SimpleForm>
  </Edit>
);
