import {
  Create,
  CreateProps,
  ReferenceInput,
  SimpleForm,
  TextInput,
} from "react-admin";
import { JSX } from "react/jsx-runtime";

export const laptopCreate = (
  props: JSX.IntrinsicAttributes & CreateProps<any, Error, any>
) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="name" />
      <TextInput source="price" />
      <TextInput source="ram" />
      <TextInput source="cpu" />
      <ReferenceInput source="currency_id" reference="currencies" />
    </SimpleForm>
  </Create>
);
