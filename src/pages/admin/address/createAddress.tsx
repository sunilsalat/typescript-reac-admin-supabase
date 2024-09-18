import {
  Create,
  CreateProps,
  ReferenceInput,
  SimpleForm,
  TextInput,
  useCreate,
  useDataProvider,
  useNotify,
  useRecordContext,
  useRedirect,
} from "react-admin";
import { useLocation, useNavigate } from "react-router-dom";
import { JSX } from "react/jsx-runtime";

export const createAddress = (
  props: JSX.IntrinsicAttributes & CreateProps<any, Error, any>
) => {
  const notify = useNotify();
  const redirect = useRedirect();
  const location = useLocation();
  const navigate = useNavigate();
  const record = useRecordContext();
  const dataProvider = useDataProvider();

  const handleSubmit = async (data: any) => {
    const entity_id = data.entity_id;
    const entity_type = data.entity_type;

    try {
      if (!data || !entity_id || !entity_type) {
        throw new Error("Missing required fields.");
      }

      // create address entry
      delete data.entity_id;
      delete data.entity_type;
      const { data: addressData } = await dataProvider.create("addresses", {
        data: data,
      });

      if (!addressData) {
        throw new Error("Can not create address");
      }

      let resources_address = {
        entity_type: entity_type,
        entity_id: entity_id,
        address_id: addressData.id,
      };

      // create address_resource entry
      await dataProvider.create("resources_address", {
        data: resources_address,
      });

      redirect(`/admin/${data.entity_type}/${data.entity_id}/3`);
    } catch (error: any) {
      notify(`Error: ${error.message}`, { type: "warning" });
    }
  };

  return (
    <Create {...props}>
      <SimpleForm onSubmit={handleSubmit}>
        <TextInput source="address_type" />
        <TextInput source="street" />
        <TextInput source="city" />
        <TextInput source="state" />
        <TextInput source="postal_code" />
        <TextInput source="location" />
        <ReferenceInput source="country_id" reference="countries" />
        <TextInput source="meta.notes" />
      </SimpleForm>
    </Create>
  );
};
