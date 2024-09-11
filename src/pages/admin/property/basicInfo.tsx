import { Grid } from "@mui/material";
import { RichTextInput } from "ra-input-rich-text";
import { required, TextInput } from "react-admin";

const req = [required()];

export const BasicInfo = () => (
  <Grid>
    <TextInput source="name" validate={req} />
    <TextInput source="legal_name" validate={req} />
    <TextInput source="tagline" validate={req} />
    <TextInput source="email" validate={req} />
    <TextInput source="telephone" validate={req} />
    <TextInput source="contact_type" validate={req} />
    <TextInput
      source="property_type"
      defaultValue="hotel"
      sx={{ display: "none" }}
      validate={req}
    />
    <RichTextInput source="basic_info_description" label="description" />
  </Grid>
);
