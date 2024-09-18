import React from "react";
import {
  SimpleForm,
  TextInput,
  CreateProps,
  ReferenceInput,
  Edit,
} from "react-admin";

export const BookingLinksEdit: React.FC<CreateProps> = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="type" />
      <TextInput source="vale" />
      <ReferenceInput source="entity_id" reference="properties" disabled />
    </SimpleForm>
  </Edit>
);
