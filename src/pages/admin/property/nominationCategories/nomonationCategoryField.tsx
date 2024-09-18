import {
  Datagrid,
  EditButton,
  ListContextProvider,
  ReferenceField,
  SingleFieldList,
  TextField,
  useList,
  useListContext,
} from "react-admin";

export const NominationCategoriesField = () => {
  const { data } = useListContext();

  console.log({ data });

  const listContext = useList({ data });

  return (
    <ListContextProvider value={listContext}>
      <SingleFieldList>
        <ReferenceField
          source="nomination_category_id"
          reference="nomination_categories"
        />
      </SingleFieldList>
    </ListContextProvider>
  );
};
