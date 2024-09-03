import {
  Create,
  CreateProps,
  ReferenceInput,
  SimpleForm,
  TextInput,
} from "react-admin";
import { JSX } from "react/jsx-runtime";

export const bookCreate = (
  props: JSX.IntrinsicAttributes & CreateProps<any, Error, any>
) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="name" />
      <TextInput source="price" />
      <TextInput source="author" />
      <TextInput source="sold_times" />
      <ReferenceInput
        source="currency_id"
        reference="currencies"
        filterToQuery={(searchText: string) => ({ name: searchText })}
      />
    </SimpleForm>
  </Create>
);
