import {
  BooleanInput,
  Create,
  CreateProps,
  DateInput,
  FormDataConsumer,
  NumberInput,
  ReferenceInput,
  required,
  SelectInput,
  SimpleForm,
  TextInput,
} from "react-admin";
import { JSX } from "react/jsx-runtime";
import CustomerReferenceField from "../users/customerReferenceField";

const ets: { id: string; name: string }[] = [
  { id: "1", name: "products" },
  { id: "2", name: "spa" },
  { id: "3", name: "restaurant" },
  { id: "4", name: "hotel" },
];

const findItem = (id: string): string => {
  const item = ets.find((item) => item.id === id);
  return item ? item.name : "products";
};

export const reviewCreate = (
  props: JSX.IntrinsicAttributes & CreateProps<any, Error, any>
) => {
  return (
    <Create {...props}>
      <SimpleForm>
        <SelectInput source="entity_type" choices={ets} validate={required()} />
        <FormDataConsumer<{ entity_type: string }>>
          {({ formData, ...rest }) => (
            <ReferenceInput
              source="entity_id"
              reference={
                formData.entity_type
                  ? findItem(formData.entity_type)
                  : "products"
              }
              {...rest}
            />
          )}
        </FormDataConsumer>
        {/* <ReferenceInput source="profile_id" reference="profiles" /> */}
        <TextInput source="reviewer_name" validate={required()} />
        <TextInput source="reviewer_email" validate={required()} />
        <TextInput source="reviewer_note" validate={required()} />
        <NumberInput source="overall_rating" />
        <BooleanInput source="verified" />
        <TextInput source="verification_code" />
        <TextInput source="unique_id" />
        <DateInput source="created_at" />
      </SimpleForm>
    </Create>
  );
};
