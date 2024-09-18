import {
  Datagrid,
  EditButton,
  ListContextProvider,
  ReferenceField,
  TextField,
  useGetMany,
  useList,
  useListContext,
} from "react-admin";

export const AddressField = () => {
  const { data } = useListContext();
  const ids = data?.map((i) => i.address_id);
  const { data: addressData, isPending }: any = useGetMany("addresses", {
    ids: ids,
  });

  const listContext = useList({ data: addressData, isPending });

  return (
    <ListContextProvider value={listContext}>
      <Datagrid bulkActionButtons={false}>
        <TextField source="street" />
        <TextField source="city" />
        <TextField source="state" />
        <ReferenceField source="country_id" reference="countries" />
        <TextField source="postal_code" />
        <TextField source="address_type" />
        <EditButton resource="addresses" />
      </Datagrid>
    </ListContextProvider>
  );
};
