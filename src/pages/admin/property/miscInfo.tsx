import { Grid } from "@mui/material";
import {
  BooleanInput,
  NumberInput,
  ReferenceInput,
  required,
  TextInput,
  useRecordContext,
} from "react-admin";

const req = [required()];

export const MiscInfo = () => {
  const record = useRecordContext();
  return (
    <Grid>
      <TextInput
        label="Global Location Number"
        source="global_location_number"
        validate={req}
      />
      <TextInput label="Star Ratings" source="star_rating" validate={req} />
      <ReferenceInput
        label="Parent Organization"
        source="organization_id"
        reference="organizations"
      />
      <NumberInput
        label="Maximum Attendee Capacity"
        source="maximum_attendee_capacity"
      />
      <BooleanInput source="visibility" options={{}} />
    </Grid>
  );
};
