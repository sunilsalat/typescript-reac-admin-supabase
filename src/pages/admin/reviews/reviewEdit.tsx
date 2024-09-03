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

const filterToQuery = (searchText: string) => ({ name: `%${searchText}%` });

export const reviewEdit = () => {
  const record = useRecordContext();
  console.log({ record });
  return (
    <Edit>
      <SimpleForm>
        <TextInput source="entity_type" />
        <TextInput source="entity_id" disabled />
        <ReferenceInput source="profile_id" reference="record.entity_type" />
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
