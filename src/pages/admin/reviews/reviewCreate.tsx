import {
  BooleanInput,
  Create,
  CreateProps,
  DateInput,
  FormDataConsumer,
  getRecordFromLocation,
  NumberInput,
  ReferenceInput,
  required,
  SelectInput,
  SimpleForm,
  TextInput,
  useNotify,
  useRedirect,
} from "react-admin";
import { JSX } from "react/jsx-runtime";
import CustomerReferenceField from "../users/customerReferenceField";
import { useLocation } from "react-router-dom";

const ets: { id: string; name: string }[] = [
  { id: "products", name: "products" },
  { id: "spa", name: "spa" },
  { id: "restaurant", name: "restaurant" },
  { id: "hotel", name: "hotel" },
];

const findItem = (id: string): string => {
  const item = ets.find((item) => item.id === id);
  return item ? item.name : "products";
};

export const reviewCreate = (
  props: JSX.IntrinsicAttributes & CreateProps<any, Error, any>
) => {
  const notify = useNotify();
  const redirect = useRedirect();
  const location = useLocation();

  const onSuccess = (_: any) => {
    const record = getRecordFromLocation(location);
    notify("Review added.");
    if (record && record.entity_id) {
      redirect(`/admin/products/${record.entity_id}/3`);
    } else {
      redirect(`/reviews`);
    }
  };
  return (
    <Create {...props} mutationOptions={{ onSuccess }}>
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
