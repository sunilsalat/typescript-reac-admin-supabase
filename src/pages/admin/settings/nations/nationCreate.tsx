import { Create, CreateProps, SimpleForm, TextInput } from "react-admin";
import { JSX } from "react/jsx-runtime";

export const nationCreate = (
  props: JSX.IntrinsicAttributes & CreateProps<any, Error, any>
) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="name" />
      <TextInput source="code" />
      <TextInput source="continent_codes" />
      <TextInput source="region_codes" />
      <TextInput source="locale" />
    </SimpleForm>
  </Create>
);
