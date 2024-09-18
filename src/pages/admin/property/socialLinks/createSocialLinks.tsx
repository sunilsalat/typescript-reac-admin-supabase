import React from "react";
import {
  Create,
  SimpleForm,
  TextInput,
  CreateProps,
  ReferenceInput,
} from "react-admin";

export const SocialLinksCreate: React.FC<CreateProps> = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="name" />
      <TextInput source="url" />
      <ReferenceInput source="property_id" reference="properties" disabled />
    </SimpleForm>
  </Create>
);
