import React from "react";
import {
  SimpleForm,
  TextInput,
  CreateProps,
  ReferenceInput,
  Edit,
} from "react-admin";

export const SocialLinksEdit: React.FC<CreateProps> = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="name" />
      <TextInput source="url" />
      <ReferenceInput source="property_id" reference="properties" disabled />
    </SimpleForm>
  </Edit>
);
