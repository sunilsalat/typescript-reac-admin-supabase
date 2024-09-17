import { Box, Grid, Typography } from "@mui/material";
import { ReferenceManyField, ReferenceOneField } from "react-admin";
import { VideoField } from "./videoField";
import CreateRelatedMediaButton from "../../../components/createRelatedMedia";
import GridList from "../products/gridList";

export const OtherMedia = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          Featured Image & Featured Video
        </Typography>
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <ReferenceManyField
              reference="resources_media"
              target="entity_id"
              filter={{ media_type: "featured_image", "deleted_at@is": null }}
            >
              <Box display="flex">
                <GridList />
              </Box>
              <CreateRelatedMediaButton
                entity_type="hotel"
                image_tag="featured_image"
                button_title="Add Featured Image"
                select_multiple={true}
                tab_id={7}
              />
            </ReferenceManyField>
          </Grid>

          <Grid item xs={6}>
            <ReferenceOneField
              target="entity_id"
              reference="resources_media"
              filter={{ media_type: "video" }}
            >
              <VideoField />
            </ReferenceOneField>
            <CreateRelatedMediaButton
              button_title="Add Featured Video"
              entity_type="hotel"
              image_tag="video"
              select_multiple={false}
              tab_id={7}
              is_video={true}
            />
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          Partner Logo & Tag Line Image
        </Typography>

        <Grid container spacing={1}>
          <Grid item xs={6}>
            <ReferenceManyField
              reference="resources_media"
              target="entity_id"
              filter={{ media_type: "partner_logo", "deleted_at@is": null }}
              perPage={1}
            >
              <Box>
                <GridList />
                <CreateRelatedMediaButton
                  button_title="Add Partner Logo"
                  entity_type="hotel"
                  image_tag="partner_logo"
                  select_multiple={false}
                  tab_id={7}
                />
              </Box>
            </ReferenceManyField>
          </Grid>
          <Grid item xs={6}>
            <ReferenceManyField
              reference="resources_media"
              target="entity_id"
              filter={{ media_type: "tagline_image", "deleted_at@is": null }}
              perPage={1}
            >
              <Box>
                <GridList />
                <CreateRelatedMediaButton
                  button_title="Add Tagline Image"
                  entity_type="hotel"
                  image_tag="tagline_image"
                  select_multiple={false}
                  tab_id={7}
                />
              </Box>
            </ReferenceManyField>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
