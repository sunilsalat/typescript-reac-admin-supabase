import {
  Create,
  CreateProps,
  getRecordFromLocation,
  ReferenceInput,
  SimpleForm,
  TextInput,
  useNotify,
  useRedirect,
} from "react-admin";
import { useLocation } from "react-router-dom";
import { JSX } from "react/jsx-runtime";

const filterToQuery = (searchText: string) => ({
  "name@ilike": `%${searchText}%`,
});

export const groupedProductCreate = (
  props: JSX.IntrinsicAttributes & CreateProps<any, Error, any>
) => {
  const notify = useNotify();
  const redirect = useRedirect();
  const location = useLocation();

  const onSuccess = (_: any) => {
    const record = getRecordFromLocation(location);
    console.log({ record });
    notify("Related product added");
    if (record && record.group_id) {
      redirect(`/admin/products/${record.group_id}/4`);
    } else {
      redirect(`/reviews`);
    }
  };

  return (
    <Create {...props} mutationOptions={{ onSuccess }}>
      <SimpleForm>
        <ReferenceInput
          source="group_id"
          reference="products"
          filterToQuery={filterToQuery}
        />
        <ReferenceInput
          source="product_id"
          reference="products"
          filterToQuery={filterToQuery}
        />

        <TextInput label="Quantity" source="quantity" />
      </SimpleForm>
    </Create>
  );
};
