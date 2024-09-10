import { Box } from "@mui/material";
import { RichTextInput } from "ra-input-rich-text";
import {
  ArrayInput,
  AutocompleteArrayInput,
  CreateProps,
  Edit,
  Pagination,
  ReferenceArrayInput,
  ReferenceInput,
  ReferenceManyCount,
  ReferenceManyField,
  required,
  SelectArrayInput,
  SimpleFormIterator,
  TabbedForm,
  TextInput,
} from "react-admin";
import { JSX } from "react/jsx-runtime";
import GridList from "../../products/gridList";
import CreateRelatedMediaButton from "../../../../components/createRelatedMedia";

const req = [required()];

export const hotelEdit = (
  props: JSX.IntrinsicAttributes & CreateProps<any, Error, any>
) => (
  <Edit {...props}>
    {/* images */}
    <TabbedForm>
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
            entity_type="hotel"
            image_tag="hotel_image"
          />
        </ReferenceManyField>
      </TabbedForm.Tab>

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
        <TextInput label="Star Ratings" source="star_rating" />
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
            { id: "Master Card", name: "Master Card" },
            { id: "Visa Card", name: "Visa Card" },
            { id: "Cash", name: "Cash" },
          ]}
        />
        <ReferenceArrayInput
          source="currencies_accepted"
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
  </Edit>
);
