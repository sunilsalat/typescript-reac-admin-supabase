import { Grid } from "@mui/material";
import {
  BooleanInput,
  ReferenceOneField,
  required,
  TextInput,
  useRecordContext,
} from "react-admin";

const req = [required()];

export const PropertySetting = () => {
  const record = useRecordContext();
  if (!record) return null;
  return (
    <Grid>
      <ReferenceOneField
        target="property_id"
        reference="properties_settings"
        resource="properties_settings"
      >
        <TextInput label="REVIEW EMAIL" source="review_email" validate={req} />
        <BooleanInput
          label="IS FONT BLACK"
          source="is_font_color_black"
          validate={req}
        />

        <BooleanInput
          label="IS OVERLAY MASK"
          source="overlay_mask"
          validate={req}
        />

        <BooleanInput
          label="IS FONT COLOR BLACK"
          source="is_font_color_black"
          validate={req}
        />
      </ReferenceOneField>
    </Grid>
  );
};
