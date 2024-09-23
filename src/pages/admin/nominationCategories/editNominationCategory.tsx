import {
  Edit,
  ReferenceInput,
  required,
  SelectInput,
  SimpleForm,
  TextInput,
  useRecordContext,
} from "react-admin";

const Title = () => {
  const record = useRecordContext();
  return record ? <span>Order "{record.name}"</span> : null;
};

export const editNominationCategory = (props: any) => {
  return (
    <Edit title={<Title />} {...props}>
      <SimpleForm>
        <TextInput source="name" validate={req} />
        <ReferenceInput source="parent_id" reference="nomination_categories">
          <SelectInput source="name" disabled={true} />
        </ReferenceInput>
        <SelectInput
          source="for_resource_type"
          choices={["hotel", "restaurant", "spa"]}
          disabled
        />
      </SimpleForm>
    </Edit>
  );
};

const req = [required()];
