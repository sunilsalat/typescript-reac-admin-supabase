import {
  Button,
  CreateButton,
  DatagridConfigurable,
  ExportButton,
  List,
  ReferenceField,
  SearchInput,
  SelectColumnsButton,
  TextField,
  TopToolbar,
  useListContext,
  useNotify,
  useRefresh,
  useUnselectAll,
} from "react-admin";
import { Delete } from "@mui/icons-material";
import { supabase } from "../../../database/supabase";

const DeleteNominationCategory = () => {
  const { selectedIds } = useListContext();
  const refresh = useRefresh();
  const notify = useNotify();
  const unselectAll = useUnselectAll("hotel");

  const handleClick = async () => {
    try {
      if (selectedIds && selectedIds.length > 1) {
        notify("Multiple records cannot be deleted!", { type: "error" });
        return;
      }
      await supabase.rpc("delete_node", { node_id: selectedIds[0] });
      unselectAll();
      notify("Deleted nomination category");
      refresh();
    } catch (error) {
      notify("Error: Could not deleted", { type: "error" });
      refresh();
    }
  };

  return (
    <Button label="DELETE" onClick={handleClick}>
      <Delete />
    </Button>
  );
};

const DeleteNominationCategoryWithChild = () => {
  const { selectedIds } = useListContext();
  const refresh = useRefresh();
  const notify = useNotify();
  const unselectAll = useUnselectAll("hotel");

  const handleClick = async () => {
    try {
      if (selectedIds && selectedIds.length > 1) {
        notify("Multiple records cannot be deleted!", { type: "error" });
        return;
      }
      await supabase.rpc("cut_off_branch", { node_id: selectedIds[0] });
      unselectAll();
      notify("Deleted nomination category and its descendents");
      refresh();
    } catch (error) {
      notify("Error: Could not deleted", { type: "error" });
      refresh();
    }
  };

  return (
    <Button label="DELETE BRANCH" onClick={handleClick}>
      <Delete />
    </Button>
  );
};

const BulkActionButtons = () => (
  <>
    <DeleteNominationCategory />
    <DeleteNominationCategoryWithChild />
  </>
);

export const listNominationCategory = () => (
  <List
    filters={[<SearchInput source="name@ilike" alwaysOn />]}
    actions={
      <TopToolbar>
        <SelectColumnsButton />
        <CreateButton />
        <ExportButton />
      </TopToolbar>
    }
  >
    <DatagridConfigurable bulkActionButtons={<BulkActionButtons />}>
      <ReferenceField source="parent_id" reference="nomination_categories" />
      <TextField source="name" />
      <TextField source="for_resource_type" />
    </DatagridConfigurable>
  </List>
);
