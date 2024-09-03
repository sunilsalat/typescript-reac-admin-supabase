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
  <Edit title={<ProductTitle />} mutationMode="pessimistic">
    <TabbedForm>
      {/* <TabbedForm.Tab
        label="resources.products.tabs.image"
        sx={{ maxWidth: "40em" }}
      >
        <Poster />
        <TextInput source="image" validate={req} />
        <TextInput source="thumbnail" validate={req} />
      </TabbedForm.Tab> */}
      <TabbedForm.Tab label="details" path="details" sx={{ maxWidth: "40em" }}>
        <ProductEditDetails />
      </TabbedForm.Tab>
      <TabbedForm.Tab
        label="description"
        path="description"
        sx={{ maxWidth: "40em" }}
      >
        <RichTextInput source="description" label="" validate={req} />
      </TabbedForm.Tab>
      <TabbedForm.Tab
        label="reviews"
        count={
          <ReferenceManyCount
            reference="reviews"
            target="entity_id"
            sx={{ lineHeight: "inherit" }}
          />
        }
        path="reviews"
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
        </ReferenceManyField>
      </TabbedForm.Tab>
    </TabbedForm>
  </Edit>
);

const req = [required()];
