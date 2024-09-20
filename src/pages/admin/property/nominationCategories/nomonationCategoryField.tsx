import { Grid, IconButton } from "@mui/material";
import {
  ChipField,
  ListContextProvider,
  ReferenceField,
  SingleFieldList,
  useDelete,
  useList,
  useListContext,
  WithRecord,
} from "react-admin";

import CancelIcon from "@mui/icons-material/Cancel";

export const NominationCategoriesField = () => {
  const { data } = useListContext();
  const [deleteOne] = useDelete();
  const listContext = useList({ data });

  const handleDelete = (record: any) => {
    deleteOne("properties_nomination_categories", {
      id: record.id,
      previousData: record,
    });
  };

  return (
    <ListContextProvider value={listContext}>
      <SingleFieldList linkType={false}>
        <ReferenceField
          source="nomination_category_id"
          reference="nomination_categories"
        >
          <ChipField source="name" />
        </ReferenceField>
        <WithRecord
          label=""
          render={(record) => (
            <IconButton
              onClick={(e) => {
                e?.preventDefault();
                handleDelete(record);
              }}
              size="small"
              aria-label="delete"
            >
              <CancelIcon />
            </IconButton>
          )}
        />
      </SingleFieldList>
    </ListContextProvider>
  );
};
