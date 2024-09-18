import React from "react";
import {
  Create,
  SimpleForm,
  TextInput,
  CreateProps,
  ReferenceInput,
} from "react-admin";

export const BookingLinksCreate: React.FC<CreateProps> = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="type" />
      <TextInput source="value" />
      <ReferenceInput source="property_id" reference="properties" disabled />
    </SimpleForm>
  </Create>
);
