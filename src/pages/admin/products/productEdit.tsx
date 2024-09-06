import React from "react";
import {
  Datagrid,
  DateField,
  Edit,
  EditButton,
  EditProps,
  ImageField,
  ImageInput,
  Pagination,
  ReferenceArrayField,
  ReferenceField,
  ReferenceManyCount,
  ReferenceManyField,
  required,
  SimpleList,
  TabbedForm,
  TextField,
  TextInput,
  useRecordContext,
  WithRecord,
} from "react-admin";
import { ProductEditDetails } from "./productEditDetail";
import StarRatingField from "../reviews/StarRatingField";
import CreateRelatedReviewButton from "./CreateRelatedReviewButton";
import CreateGroupedProductButton from "./createGroupedProductButton";
import { JSX } from "react/jsx-runtime";
import CreateRelatedMediaButton from "./createRelatedImageButton";
import { Box, Typography, useMediaQuery } from "@mui/material";
import ImageCard from "./imageCard";
import GridList from "./gridList";

const RichTextInput = React.lazy(() =>
  import("ra-input-rich-text").then((module) => ({
    default: module.RichTextInput,
  }))
);

const ProductTitle = () => {
  const record = useRecordContext();
  return record ? <span>Product "{record.name}"</span> : null;
};

const Aside = () => (
  <div style={{ width: 200, margin: "4em 1em" }}>
    <Typography variant="h6">Create Product Images</Typography>
    <CreateRelatedMediaButton />
    <Typography variant="body2">
      Posts will only be published once an editor approves them
    </Typography>
  </div>
);

export const productEdit = (
  props: JSX.IntrinsicAttributes & EditProps<any, Error>
) => {
  const isSmall = useMediaQuery((theme: any) => theme.breakpoints.down("md"));

  return (
    <Edit title={<ProductTitle />} {...props}>
      <TabbedForm>
        {/* images */}
        <TabbedForm.Tab
          label="images"
          sx={{ maxWidth: "40em" }}
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
              <Box display="flex">
                <Box>
                  <GridList />
                  {/* <SimpleList
                    primaryText={
                      <ReferenceField reference="media" source="media_id">
                        <ImageCard source="location" />
                      </ReferenceField>
                    }
                  /> */}
                  {/* <Pagination rowsPerPageOptions={[12, 24, 48, 72]} /> */}
                </Box>
              </Box>
            </Box>
            <CreateRelatedMediaButton />
          </ReferenceManyField>
        </TabbedForm.Tab>

        {/* details */}
        <TabbedForm.Tab label="details" sx={{ maxWidth: "40em" }}>
          <ProductEditDetails />
        </TabbedForm.Tab>

        {/* description */}
        <TabbedForm.Tab label="description" sx={{ maxWidth: "40em" }}>
          <RichTextInput source="description" label="" validate={req} />
        </TabbedForm.Tab>

        {/* reviews */}
        <TabbedForm.Tab
          label="reviews"
          count={
            <ReferenceManyCount
              reference="reviews"
              target="entity_id"
              sx={{ lineHeight: "inherit" }}
            />
          }
        >
          <ReferenceManyField
            reference="reviews"
            target="entity_id"
            pagination={<Pagination />}
          >
            <Datagrid
              sx={{
                width: "100%",
                "& .column-comment": {
                  maxWidth: "20em",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                },
              }}
            >
              <DateField source="created_at" />
              {/* <CustomerReferenceField source="customer_id" /> */}
              <StarRatingField label="rating" source="overall_rating" />
              <TextField source="reviewer_name" />
              <TextField source="reviewer_note" />
              <TextField source="status" />
              <EditButton />
            </Datagrid>
            <CreateRelatedReviewButton />
          </ReferenceManyField>
        </TabbedForm.Tab>

        {/* grouped_products */}
        <TabbedForm.Tab
          label="add related products"
          count={
            <ReferenceManyCount
              reference="grouped_products"
              target="group_id"
              sx={{ lineHeight: "inherit" }}
            />
          }
        >
          <ReferenceManyField
            reference="grouped_products"
            target="group_id"
            pagination={<Pagination />}
          >
            <Datagrid
              sx={{
                width: "100%",
                "& .column-comment": {
                  maxWidth: "20em",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                },
              }}
            >
              <ReferenceField source="group_id" reference="products" />
              <ReferenceField source="product_id" reference="products" />
            </Datagrid>
            <CreateGroupedProductButton />
          </ReferenceManyField>
        </TabbedForm.Tab>
      </TabbedForm>
    </Edit>
  );
};

const req = [required()];
