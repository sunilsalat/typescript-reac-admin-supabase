import {
  BulkDeleteButton,
  Button,
  CreateButton,
  DatagridConfigurable,
  EmailField,
  ExportButton,
  List,
  NumberField,
  ReferenceField,
  SearchInput,
  SelectColumnsButton,
  TextField,
  TopToolbar,
  useCreate,
  useListContext,
  useNotify,
  useRefresh,
  useUnselectAll,
} from "react-admin";
import { Visibility } from "@mui/icons-material";

const CustomButton = () => {
  const { selectedIds } = useListContext();
  const refresh = useRefresh();
  const notify = useNotify();
  const unselectAll = useUnselectAll("spa");
  const [create, { isPending }] = useCreate();

  const handleClick = () => {
    try {
      if (selectedIds && selectedIds.length > 1) {
        notify("Multiple spas cannot be featured!", { type: "error" });
        return;
      }
      create("featured_properties", {
        data: { property_id: selectedIds[0], property_type: "spa" },
      });
      notify("Spa made featured");
      unselectAll();
    } catch (error) {
      notify("Error: Spa not updated", { type: "error" });
      refresh();
    }
  };

  return (
    <Button label="Make Featured" onClick={handleClick} disabled={isPending}>
      <Visibility />
    </Button>
  );
};

const BulkActionButtons = () => (
  <>
    <CustomButton />
    <BulkDeleteButton />
  </>
);

export const listSpa = () => {
  return (
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
        <ReferenceField source="organization_id" reference="organizations" />
        <TextField source="name" />
        <TextField source="legal_name" />
        <TextField source="tagline" />
        <TextField source="price_range" />
        <EmailField source="email" />
        <TextField source="visibility" />
        <TextField source="slug" />
        <NumberField source="number_of_treatment_rooms" />
      </DatagridConfigurable>
    </List>
  );
};
