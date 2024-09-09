import { Box } from "@mui/material";
import {
  DateInput,
  Edit,
  Pagination,
  ReferenceManyCount,
  ReferenceManyField,
  TabbedForm,
  TextInput,
} from "react-admin";
import GridList from "../products/gridList";
import CreateRelatedMediaButton from "../../../components/createRelatedMedia";

export const pressReleasesEdit = () => {
  return (
    <Edit>
      <TabbedForm warnWhenUnsavedChanges>
        <TabbedForm.Tab
          label="images"
          sx={{ maxWidth: "60em" }}
          count={
            <ReferenceManyCount
              reference="resources_media"
              target="entity_id"
              sx={{ lineHeight: "inherit" }}
            />
          }
        >
          <ReferenceManyField
            reference="resources_media"
            target="entity_id"
            pagination={<Pagination />}
          >
            <Box display="flex">
              <Box>
                <GridList />
              </Box>
            </Box>
            <CreateRelatedMediaButton
              entity_type="press_releases"
              image_tag="press_release_image"
            />
          </ReferenceManyField>
        </TabbedForm.Tab>
        <TabbedForm.Tab label="info">
          <TextInput source="title" />
          <TextInput source="description" />
          <DateInput source="date" />
          <TextInput source="slug" />
          <TextInput source="unique_id" />
          <DateInput disabled source="created_at" />
        </TabbedForm.Tab>
      </TabbedForm>
    </Edit>
  );
};
