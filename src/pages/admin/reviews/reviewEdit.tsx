import {
  BooleanInput,
  DateInput,
  Edit,
  NumberInput,
  ReferenceInput,
  SimpleForm,
  TextInput,
  useRecordContext,
} from "react-admin";
import CustomerReferenceField from "../users/customerReferenceField";

const filterToQuery = (searchText: string) => ({ name: `%${searchText}%` });

export const reviewEdit = () => {
  const record = useRecordContext();
  return (
    <Edit>
      <SimpleForm>
        <TextInput source="entity_type" />
        <ReferenceInput source="entity_id" reference="products" disabled />
        {/* <CustomerReferenceField source="profile_id" /> */}
        <TextInput source="reviewer_name" />
        <TextInput source="reviewer_email" />
        <TextInput source="reviewer_note" />
        <NumberInput source="overall_rating" />
        <BooleanInput source="verified" />
        <TextInput source="verification_code" />
        <TextInput source="unique_id" />
        <DateInput source="created_at" />
      </SimpleForm>
    </Edit>
  );
};
