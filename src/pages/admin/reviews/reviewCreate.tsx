import {
  BooleanInput,
  Create,
  CreateProps,
  DateInput,
  NumberInput,
  ReferenceInput,
  SelectInput,
  SimpleForm,
  TextInput,
} from "react-admin";
import { JSX } from "react/jsx-runtime";

export const reviewCreate = (
  props: JSX.IntrinsicAttributes & CreateProps<any, Error, any>
) => (
  <Create {...props}>
    <SimpleForm>
      <SelectInput
        source="entity_type"
        choices={[
          { id: "tech", name: "products" },
          { id: "lifestyle", name: "spa" },
          { id: "people", name: "restaurant" },
          { id: "people", name: "hotel" },
        ]}
      />
      <ReferenceInput source="profile_id" reference="profiles" />
      <TextInput source="reviewer_name" />
      <TextInput source="reviewer_email" />
      <TextInput source="reviewer_note" />
      <NumberInput source="overall_rating" />
      <BooleanInput source="verified" />
      <TextInput source="verification_code" />
      <TextInput source="unique_id" />
      <DateInput source="created_at" />
    </SimpleForm>
  </Create>
);
