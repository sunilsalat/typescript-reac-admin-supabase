import { Grid } from "@mui/material";
import {
  AutocompleteArrayInput,
  ReferenceArrayInput,
  SelectArrayInput,
  TextInput,
} from "react-admin";

export const PaymentInfo = () => (
  <Grid>
    <SelectArrayInput
      label="Accepted Payment Method"
      source="accepted_payment_method"
      choices={[
        { id: "admin", name: "Master Card" },
        { id: "u001", name: "Visa Card" },
        { id: "u002", name: "Cash" },
      ]}
    />
    <ReferenceArrayInput source="currencies_accepted" reference="currencies">
      <AutocompleteArrayInput
        filterToQuery={(searchText: string) => ({
          "name@ilike": `%${searchText}%`,
        })}
      />
    </ReferenceArrayInput>
    <TextInput label="Price Range" source="price_range" />
  </Grid>
);
