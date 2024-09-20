import { Grid, IconButton, TextField } from "@mui/material";
import {
  ChipField,
  Datagrid,
  Labeled,
  ListContextProvider,
  NumberField,
  ReferenceField,
  SelectField,
  SingleFieldList,
  useDelete,
  useList,
  useListContext,
  WithRecord,
} from "react-admin";

import CancelIcon from "@mui/icons-material/Cancel";

export const WinnerField = () => {
  const { data } = useListContext();
  const [deleteOne] = useDelete();
  const listContext = useList({ data });

  const handleDelete = (record: any) => {
    deleteOne("properties_winners", {
      id: record.id,
      previousData: record,
    });
  };

  return (
    <ListContextProvider value={listContext}>
      <Datagrid>
        <NumberField source="property_name" />
        <NumberField source="nomination_category_name" />
        <NumberField source="winning_year" />
        <Labeled label="Winner Type">
          <WithRecord
            render={(record) =>
              record.winner_type !== "global" ? (
                <ReferenceField
                  source="winner_type_id"
                  reference={`${record.winner_type}s`}
                />
              ) : (
                "global"
              )
            }
          />
        </Labeled>
      </Datagrid>
    </ListContextProvider>
  );
};
