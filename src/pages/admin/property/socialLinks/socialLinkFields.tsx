import {
  Datagrid,
  EditButton,
  ListContextProvider,
  TextField,
  useList,
  useListContext,
} from "react-admin";

export const SocialLinksField = () => {
  const { data } = useListContext();

  const listContext = useList({ data });

  return (
    <ListContextProvider value={listContext}>
      <Datagrid bulkActionButtons={false}>
        <TextField source="name" />
        <TextField source="url" />
        <EditButton resource="properties_social_links" />
      </Datagrid>
    </ListContextProvider>
  );
};
