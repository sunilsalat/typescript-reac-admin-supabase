import React from "react";
import {
  Create,
  DateInput,
  SimpleForm,
  TextInput,
  CreateProps,
} from "react-admin";

export const PressReleasesCreate: React.FC<CreateProps> = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="title" />
      <TextInput source="description" />
      <DateInput source="date" />
    </SimpleForm>
  </Create>
);
