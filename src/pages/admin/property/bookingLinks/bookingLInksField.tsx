import {
  Datagrid,
  EditButton,
  ListContextProvider,
  TextField,
  useGetMany,
  useList,
  useListContext,
} from "react-admin";

export const BookingLinksField = () => {
  const { data } = useListContext();

  const listContext = useList({ data });

  return (
    <ListContextProvider value={listContext}>
      <Datagrid bulkActionButtons={false}>
        <TextField source="type" />
        <TextField source="value" />
        <EditButton resource="properties_booking_links" />
      </Datagrid>
    </ListContextProvider>
  );
};
