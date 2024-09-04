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
  ReferenceField,
  ReferenceManyCount,
  ReferenceManyField,
  required,
  TabbedForm,
  TextField,
  useDataProvider,
  useFormGroupContext,
  useGetOne,
  useGetRecordId,
  useNotify,
  useRecordContext,
  useRedirect,
  useUpdate,
} from "react-admin";
import { ProductEditDetails } from "./productEditDetail";
import StarRatingField from "../reviews/StarRatingField";
import CreateRelatedReviewButton from "./CreateRelatedReviewButton";
import CreateGroupedProductButton from "./createGroupedProductButton";
import { JSX } from "react/jsx-runtime";
import { uploadImagesToSupabase } from "../../../db/queries/uploadImages";

const RichTextInput = React.lazy(() =>
  import("ra-input-rich-text").then((module) => ({
    default: module.RichTextInput,
  }))
);

const ProductTitle = () => {
  const record = useRecordContext();
  return record ? <span>Product "{record.name}"</span> : null;
};

export const productEdit = (
  props: JSX.IntrinsicAttributes & EditProps<any, Error>
) => {
  const notify = useNotify();
  const dataProvider = useDataProvider();
  const recordId = useGetRecordId();
  const { data: previousValues } = useGetOne("products", {
    id: recordId,
  });

  const handleSubmit = async (data: any) => {
    try {
      if (data && data.featured_images) {
        const uploadedImages = await uploadImagesToSupabase(
          data.featured_images
        );
        console.log({ uploadedImages });
        if (uploadedImages.length > 0) {
          dataProvider
            .create("media", { data: uploadedImages })
            .then(({ data }) => {
              console.log({ data });
              notify("Product update successfully");
              // redirect("list", "posts");
            });
        }
      }

      // dataProvider.update("products", {
      //   data: data,
      //   id: recordId,
      //   previousData: previousValues,
      // });
    } catch (error: any) {
      notify(`Error: ${error.message}`, { type: "warning" });
    }
  };

  return (
    <Edit title={<ProductTitle />} {...props}>
      <TabbedForm onSubmit={handleSubmit}>
        {/* images */}
        <TabbedForm.Tab label="images" sx={{ maxWidth: "40em" }}>
          <ImageInput source="featured_images" label="Featured Images" multiple>
            <ImageField source="src" title="title" />
          </ImageInput>
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
