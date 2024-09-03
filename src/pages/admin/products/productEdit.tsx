import {
  Datagrid,
  DateField,
  Edit,
  EditButton,
  Pagination,
  ReferenceManyCount,
  ReferenceManyField,
  required,
  TabbedForm,
  TextField,
  useRecordContext,
} from "react-admin";
import { ProductEditDetails } from "./productEditDetail";
import React from "react";
import StarRatingField from "../reviews/StarRatingField";
import CreateRelatedReviewButton from "./CreateRelatedReviewButton";

const RichTextInput = React.lazy(() =>
  import("ra-input-rich-text").then((module) => ({
    default: module.RichTextInput,
  }))
);

const ProductTitle = () => {
  const record = useRecordContext();
  return record ? <span>Product "{record.name}"</span> : null;
};

export const productEdit = () => (
  <Edit title={<ProductTitle />}>
    <TabbedForm>
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
    </TabbedForm>
  </Edit>
);

const req = [required()];
