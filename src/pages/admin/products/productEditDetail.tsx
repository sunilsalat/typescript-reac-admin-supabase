import {
  AutocompleteInput,
  NumberInput,
  ReferenceInput,
  required,
  TextInput,
} from "react-admin";
import { InputAdornment, Grid } from "@mui/material";

const req = [required()];

export const ProductEditDetails = () => (
  <Grid container columnSpacing={2}>
    <Grid item xs={12} sm={8}>
      <TextInput source="name" validate={req} />
    </Grid>
    <Grid item xs={12} sm={8}>
      <TextInput source="type" validate={req} />
    </Grid>
    <Grid item xs={0} sm={4}></Grid>
    <Grid item xs={12} sm={4}>
      <NumberInput
        source="price"
        InputProps={{
          startAdornment: <InputAdornment position="start">€</InputAdornment>,
        }}
        validate={req}
      />
    </Grid>{" "}
    <Grid item xs={12} sm={4}>
      <NumberInput
        source="sale_price"
        InputProps={{
          startAdornment: <InputAdornment position="start">€</InputAdornment>,
        }}
        validate={req}
      />
    </Grid>
    <Grid item xs={12} sm={4}>
      <NumberInput source="discount" validate={req} />
    </Grid>
    <Grid item xs={12} sm={4}>
      <ReferenceInput source="currency_id" reference="currencies">
        <AutocompleteInput
          filterToQuery={(searchText: string) => ({
            "name@ilike": `%${searchText}%`,
          })}
        />
      </ReferenceInput>
    </Grid>
  </Grid>
);
