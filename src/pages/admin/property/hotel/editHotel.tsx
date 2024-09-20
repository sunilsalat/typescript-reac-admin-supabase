import { Box, Grid, Typography } from "@mui/material";
import { RichTextInput } from "ra-input-rich-text";
import {
  Edit,
  Pagination,
  ReferenceManyCount,
  ReferenceManyField,
  required,
  SaveButton,
  TabbedForm,
  TabbedFormTabs,
  TextInput,
  Toolbar,
  useGetOne,
  useGetRecordId,
  useUpdate,
} from "react-admin";
import GridList from "../../products/gridList";
import CreateRelatedMediaButton from "../../../../components/createRelatedMedia";
import { BasicInfo } from "../basicInfo";
import { MiscInfo } from "../miscInfo";
import { AmenityFeature } from "../amenityFeature";
import { PaymentInfo } from "../paymentInfo";
import { AddressField } from "../../address/addressField";
import CreateRelatedAddresButton from "../../../../components/createRelatedAddress";
import { OtherMedia } from "../otherMedia";
import CreateRelatedBookingLinksButton from "../createRelatedBookingLinks";
import { BookingLinksField } from "../bookingLinks/bookingLInksField";
import CreateRelatedSocialLinksButton from "../createRelatedSocialLinks";
import { SocialLinksField } from "../socialLinks/socialLinkFields";
import CreateRelatedNmCategories from "../createRelatedNmCategories";
import { NominationCategoriesField } from "../nominationCategories/nomonationCategoryField";
import CreateRelatedWinner from "../createRelatedWinner";
import { WinnerField } from "../winnersLIst/winnerField";

const req = [required()];

const HotelEditToolbar = () => (
  <Toolbar>
    <SaveButton />
  </Toolbar>
);

export const hotelEdit = () => {
  const recordId = useGetRecordId();

  // Fetch the previous values using useGetOne
  const { data: previousData } = useGetOne("hotel", { id: recordId });
  const [update] = useUpdate();

  const handleSubmit = async (data: any) => {
    // updating hotel
    await update("hotel", {
      id: recordId,
      data,
      previousData,
    });
  };

  return (
    <Edit>
      <TabbedForm
        tabs={<TabbedFormTabs variant="scrollable" scrollButtons="auto" />}
        onSubmit={handleSubmit}
        toolbar={<HotelEditToolbar />}
      >
        {/* basic info */}
        <TabbedForm.Tab label="basic info" sx={{ maxWidth: "40em" }}>
          <BasicInfo />
          <TextInput source="checkin_time" label="CheckIn Time" />
          <TextInput source="checkout_time" label="CheckOut Time" />
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

        {/* hotel address */}
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
          {/* <PropertySetting /> */}
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

        {/*gallery images */}
        <TabbedForm.Tab
          label="gallery images"
          sx={{ maxWidth: "80em" }}
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
              <GridList />
            </Box>
            <CreateRelatedMediaButton
              button_title="Add Gallery Images"
              entity_type="hotel"
              image_tag="gallery_image"
              select_multiple={true}
              tab_id={7}
            />
          </ReferenceManyField>
        </TabbedForm.Tab>

        {/* bookings & social links */}
        <TabbedForm.Tab label="Bookings & Social Links">
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Booking Links
              </Typography>

              <ReferenceManyField
                reference="properties_booking_links"
                target="property_id"
                label="Booking Links"
              >
                <BookingLinksField />
                <CreateRelatedBookingLinksButton />
              </ReferenceManyField>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Social Links
              </Typography>

              <ReferenceManyField
                reference="properties_social_links"
                target="property_id"
                label="Social Links"
              >
                <SocialLinksField />
                <CreateRelatedSocialLinksButton />
              </ReferenceManyField>
            </Grid>
          </Grid>
        </TabbedForm.Tab>

        {/* voting */}
        <TabbedForm.Tab label="Voting">
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Nomination Categories
              </Typography>
              <ReferenceManyField
                reference="properties_nomination_categories"
                target="property_id"
              >
                <Grid container>
                  <NominationCategoriesField />
                  <CreateRelatedNmCategories label={"ADD"} />
                </Grid>
              </ReferenceManyField>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Winner List
              </Typography>
              <ReferenceManyField
                reference="properties_winners"
                target="property_id"
              >
                <Grid>
                  <WinnerField />
                  <CreateRelatedWinner label={"ADD NOMINATION"} />
                </Grid>
              </ReferenceManyField>
            </Grid>
          </Grid>
        </TabbedForm.Tab>

        {/* video & other media */}
        <TabbedForm.Tab label="Other Media">
          <OtherMedia />
        </TabbedForm.Tab>

        {/* tagline image style */}
      </TabbedForm>
    </Edit>
  );
};

// TODO - rename featured iamges
