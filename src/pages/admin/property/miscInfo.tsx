import { Grid } from "@mui/material";
import {
  BooleanInput,
  NumberInput,
  ReferenceInput,
  TextInput,
} from "react-admin";

export const MiscInfo = () => {
  return (
    <Grid>
      <TextInput
        label="Global Location Number"
        source="global_location_number"
      />
      <TextInput label="Star Ratings" source="star_rating" />
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
