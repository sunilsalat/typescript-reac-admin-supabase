import { Grid } from "@mui/material";
import { RichTextInput } from "ra-input-rich-text";
import { ArrayInput, SimpleFormIterator, TextInput } from "react-admin";

export const AmenityFeature = () => (
  <Grid>
    <ArrayInput source="amenity_feature" label="amenties">
      <SimpleFormIterator disableReordering inline sx={{ width: 200 }}>
        <TextInput source="" hiddenLabel helperText={false} />
      </SimpleFormIterator>
    </ArrayInput>

    <RichTextInput source="description" label="Amenity Feature Description" />
  </Grid>
);
