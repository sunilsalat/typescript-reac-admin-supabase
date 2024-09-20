import { height, maxHeight } from "@mui/system";
import {
  BulkDeleteButton,
  Button,
  CreateButton,
  DatagridConfigurable,
  DateField,
  EmailField,
  ExportButton,
  List,
  NumberField,
  ReferenceField,
  SearchInput,
  SelectColumnsButton,
  TextField,
  TopToolbar,
  useListContext,
  useNotify,
  useRecordContext,
  useRefresh,
  useUnselectAll,
  useUpdateMany,
} from "react-admin";
import { Visibility } from "@mui/icons-material";

const CustomButton = () => {
  const { selectedIds } = useListContext();
  const refresh = useRefresh();
  const notify = useNotify();
  const unselectAll = useUnselectAll("hotel");
  const [updateMany, { isPending }] = useUpdateMany();

  const handleClick = () => {
    updateMany(
      "featured_properties",
      { ids: selectedIds, data: { views: 0 } },
      {
        onSuccess: () => {
          notify("Hotel made featured");
          unselectAll();
        },
        onError: () => {
          notify("Error: Hotel not updated", { type: "error" });
          refresh();
        },
      }
    );
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

export const listHotel = () => {
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
        <TextField source="checkin_time" />
        <TextField source="checkout_time" />
        <NumberField source="number_of_rooms" />
        <DateField source="created_at" />
      </DatagridConfigurable>
    </List>
  );
};
