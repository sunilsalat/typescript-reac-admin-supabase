import {
  AutocompleteArrayInput,
  AutocompleteInput,
  FormDataConsumer,
  NumberInput,
  ReferenceArrayInput,
  ReferenceInput,
  required,
  SelectInput,
  TextInput,
} from "react-admin";
import { InputAdornment, Grid } from "@mui/material";

const req = [required()];

export const ProductEditDetails = () => (
  <Grid container columnSpacing={2}>
    <Grid item xs={12} sm={8}>
      <TextInput label="Product Name" source="name" validate={req} />
    </Grid>
    <Grid item xs={12} sm={8}>
      <SelectInput
        source="type"
        choices={["SIMPLE", "GROUPED"]}
        validate={req}
      />
    </Grid>
    {/* <Grid item xs={12} sm={8}>
      <FormDataConsumer<{ type: string }>>
        {({ formData, ...rest }) =>
          formData.type && formData.type === "GROUPED" ? (
            <ReferenceArrayInput
              label="Select Products"
              source="product_ids"
              reference="products"
              {...rest}
            >
              <AutocompleteArrayInput
                filterToQuery={(searchText: string) => ({
                  "name@ilike": `%${searchText}%`,
                })}
              />
            </ReferenceArrayInput>
          ) : null
        }
      </FormDataConsumer>
    </Grid> */}
    <Grid item xs={0} sm={4}></Grid>
    <Grid item xs={12} sm={4}>
      <NumberInput source="price" validate={req} />
    </Grid>{" "}
    <Grid item xs={12} sm={4}>
      <NumberInput
        source="sale_price"
        InputProps={
          {
            // startAdornment: <InputAdornment position="start">€</InputAdornment>,
          }
        }
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
