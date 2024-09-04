import { RichTextInput } from "ra-input-rich-text";
import {
  ArrayInput,
  AutocompleteArrayInput,
  Create,
  CreateProps,
  ReferenceArrayInput,
  ReferenceInput,
  required,
  SelectArrayInput,
  SimpleFormIterator,
  TabbedForm,
  TextInput,
} from "react-admin";
import { JSX } from "react/jsx-runtime";

const req = [required()];

export const hotelCreate = (
  props: JSX.IntrinsicAttributes & CreateProps<any, Error, any>
) => (
  <Create {...props}>
    <TabbedForm>
      {/* basic info */}
      <TabbedForm.Tab label="basic info" sx={{ maxWidth: "40em" }}>
        <TextInput source="name" validate={req} />
        <TextInput source="legal_name" validate={req} />
        <TextInput source="tagline" validate={req} />
        <RichTextInput source="description" label="" />{" "}
      </TabbedForm.Tab>

      {/* misc_info */}
      <TabbedForm.Tab label="misc info">
        <TextInput
          label="Global Location Number"
          source="global_location_number"
          validate={req}
        />
        <TextInput label="Start Ratings" source="star_rating" validate={req} />
        <ReferenceInput
          label="Parent Organization"
          source="organization_id"
          reference="organizations"
        />
      </TabbedForm.Tab>

      {/* amenity feature */}
      <TabbedForm.Tab label="Amenity Feature">
        <ArrayInput source="amenity_feature">
          <SimpleFormIterator disableReordering inline sx={{ width: 200 }}>
            <TextInput source="" hiddenLabel helperText={false} />
          </SimpleFormIterator>
        </ArrayInput>

        <RichTextInput
          source="description"
          label="Amenity Feature Description"
        />

        {/* Payment Info */}
      </TabbedForm.Tab>
      <TabbedForm.Tab label="Payment Info">
        <SelectArrayInput
          label="Accepted Payment Method"
          source="accepted_payment_method"
          choices={[
            { id: "admin", name: "Master Card" },
            { id: "u001", name: "Visa Card" },
            { id: "u002", name: "Cash" },
          ]}
        />
        <ReferenceArrayInput
          source="accepted_currencies"
          reference="currencies"
        >
          <AutocompleteArrayInput
            filterToQuery={(searchText: string) => ({
              "name@ilike": `%${searchText}%`,
            })}
          />
        </ReferenceArrayInput>
        <TextInput label="Price Range" source="price_range" />
      </TabbedForm.Tab>
    </TabbedForm>
  </Create>
);
