import { RichTextInput } from "ra-input-rich-text";
import { Create, ImageField, ImageInput, TabbedForm } from "react-admin";
import { ProductEditDetails } from "./productEditDetail";

export const productCreate = () => {
  const handleSave = () => {};

  return (
    <Create>
      <TabbedForm defaultValues={{ sales: 0 }} onSubmit={handleSave}>
        <TabbedForm.Tab label="images" sx={{ maxWidth: "40em" }}>
          <ImageInput source="featured_images" label="Featured Images" multiple>
            <ImageField source="src" title="title" />
          </ImageInput>
        </TabbedForm.Tab>
        <TabbedForm.Tab
          label="details"
          path="details"
          sx={{ maxWidth: "40em" }}
        >
          <ProductEditDetails />
        </TabbedForm.Tab>
        <TabbedForm.Tab label="description" path="description">
          <RichTextInput source="description" label="" />
        </TabbedForm.Tab>
      </TabbedForm>
    </Create>
  );
};
