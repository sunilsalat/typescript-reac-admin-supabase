import { Box } from "@mui/material";
import { RichTextInput } from "ra-input-rich-text";
import {
  CreateProps,
  Edit,
  Pagination,
  ReferenceManyCount,
  ReferenceManyField,
  required,
  TabbedForm,
} from "react-admin";
import { JSX } from "react/jsx-runtime";
import GridList from "../../products/gridList";
import CreateRelatedMediaButton from "../../../../components/createRelatedMedia";
import { BasicInfo } from "../basicInfo";
import { MiscInfo } from "../miscInfo";
import { AmenityFeature } from "../amenityFeature";
import { PaymentInfo } from "../paymentInfo";
import { AddressField } from "../../address/addressField";
import CreateRelatedAddresButton from "../../../../components/createRelatedAddress";

const req = [required()];

export const hotelEdit = (
  props: JSX.IntrinsicAttributes & CreateProps<any, Error, any>
) => {
  return (
    <Edit {...props}>
      <TabbedForm>
        {/* basic info */}
        <TabbedForm.Tab label="basic info" sx={{ maxWidth: "40em" }}>
          <BasicInfo />
          <ReferenceManyField
            reference="resources_media"
            target="entity_id"
            filter={{ media_type: "basic_info_image", "deleted_at@is": null }}
            perPage={1}
          >
            <Box display="flex">
              <Box>
                <GridList />
              </Box>
            </Box>
            <CreateRelatedMediaButton
              button_title="Add Info Image"
              entity_type="hotel"
              image_tag="basic_info_image"
              select_multiple="false"
            />
          </ReferenceManyField>
        </TabbedForm.Tab>

        {/* hotel description */}
        <TabbedForm.Tab label="hotel description">
          <RichTextInput source="description" label="Hotel Description" />
          <ReferenceManyField
            reference="resources_media"
            target="entity_id"
            filter={{
              media_type: "hotel_description_image",
              "deleted_at@is": null,
            }}
            perPage={1}
          >
            <Box display="flex">
              <Box>
                <GridList />
              </Box>
            </Box>
            <CreateRelatedMediaButton
              button_title="Add Hotel Description Image"
              entity_type="hotel"
              image_tag="hotel_description_image"
              select_multiple="false"
            />
          </ReferenceManyField>
        </TabbedForm.Tab>

        {/* hotel contact */}
        <TabbedForm.Tab label="Address">
          <ReferenceManyField
            target="entity_id"
            reference="resources_address"
            filter={{ entity_type: "hotel", "deleted_at@is": null }}
          >
            <AddressField />
            <CreateRelatedAddresButton
              button_title="Create Hotel Address"
              entity_type="hotel"
            />
          </ReferenceManyField>
        </TabbedForm.Tab>

        {/* misc_info */}
        <TabbedForm.Tab label="misc info">
          <MiscInfo />
        </TabbedForm.Tab>

        {/* amenity feature */}
        <TabbedForm.Tab label="Amenity Feature">
          <AmenityFeature />
          <ReferenceManyField
            reference="resources_media"
            target="entity_id"
            filter={{ media_type: "amenity_image", "deleted_at@is": null }}
            perPage={1}
          >
            <Box display="flex">
              <Box>
                <GridList />
              </Box>
            </Box>
            <CreateRelatedMediaButton
              button_title="Add Amenity Image"
              entity_type="hotel"
              image_tag="amenity_image"
              select_multiple="false"
            />
          </ReferenceManyField>
        </TabbedForm.Tab>

        {/* Payment Info */}
        <TabbedForm.Tab label="Payment Info">
          <PaymentInfo />
        </TabbedForm.Tab>

        {/* Featured hotel images */}
        <TabbedForm.Tab
          label="Featured Images"
          sx={{ maxWidth: "60em" }}
          count={
            <ReferenceManyCount
              reference="resources_media"
              target="entity_id"
              sx={{ lineHeight: "inherit" }}
              filter={{ media_type: "featured_image", "deleted_at@is": null }}
            />
          }
        >
          <ReferenceManyField
            reference="resources_media"
            target="entity_id"
            pagination={<Pagination />}
            filter={{ media_type: "featured_image", "deleted_at@is": null }}
          >
            <Box display="flex">
              <Box>
                <GridList />
              </Box>
            </Box>
            <CreateRelatedMediaButton
              entity_type="hotel"
              image_tag="featured_image"
              button_title="Add Feature Image"
              select_multiple={true}
            />
          </ReferenceManyField>
        </TabbedForm.Tab>

        {/*gallery images */}
        <TabbedForm.Tab
          label="gallery images"
          sx={{ maxWidth: "60em" }}
          count={
            <ReferenceManyCount
              reference="resources_media"
              target="entity_id"
              sx={{ lineHeight: "inherit" }}
              filter={{ media_type: "gallery_image", "deleted_at@is": null }}
            />
          }
        >
          <ReferenceManyField
            reference="resources_media"
            target="entity_id"
            pagination={<Pagination />}
            filter={{ media_type: "gallery_image", "deleted_at@is": null }}
            sort={{ field: "position", order: "ASC" }}
          >
            <Box display="flex">
              <Box>
                <GridList />
              </Box>
            </Box>
            <CreateRelatedMediaButton
              button_title="Add Gallery Images"
              entity_type="hotel"
              image_tag="gallery_image"
              select_multiple={true}
            />
          </ReferenceManyField>
        </TabbedForm.Tab>

        {/* bookings */}

        {/* voting */}
        {/* - nomination_categories, voting_devision, voting_years */}

        {/* winner list */}
        {/*  */}

        {/* video */}

        {/* partner logo */}

        {/* visibility */}

        {/* hotel type */}

        {/* tagline image */}

        {/* tagline image style */}
      </TabbedForm>
    </Edit>
  );
};

// TODO - rename featured iamges
