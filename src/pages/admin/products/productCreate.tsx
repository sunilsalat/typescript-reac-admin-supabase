import { RichTextInput } from "ra-input-rich-text";
import { Create, TabbedForm } from "react-admin";
import { ProductEditDetails } from "./productEditDetail";

export const productCreate = () => {
  return (
    <Create redirect="edit">
      <TabbedForm shouldUnregister>
        <TabbedForm.Tab label="details" sx={{ maxWidth: "40em" }}>
          <ProductEditDetails />
        </TabbedForm.Tab>
        <TabbedForm.Tab label="description">
          <RichTextInput source="description" label="" />
        </TabbedForm.Tab>
      </TabbedForm>
    </Create>
  );
};
