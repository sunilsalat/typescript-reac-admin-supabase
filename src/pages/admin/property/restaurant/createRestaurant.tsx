import { RichTextInput } from "ra-input-rich-text";
import {
  ArrayInput,
  AutocompleteArrayInput,
  Create,
  CreateProps,
  NumberInput,
  ReferenceArrayInput,
  ReferenceInput,
  required,
  SelectArrayInput,
  SelectInput,
  SimpleFormIterator,
  TabbedForm,
  TextInput,
} from "react-admin";
import { JSX } from "react/jsx-runtime";
import { BasicInfo } from "../basicInfo";
import { MiscInfo } from "../miscInfo";
import { AmenityFeature } from "../amenityFeature";
import { PaymentInfo } from "../paymentInfo";

const req = [required()];

const choices = [
  { id: "italian", name: "italian" },
  { id: "mexican", name: "mexican" },
  { id: "indian", name: "indian" },
];

export const restaurantCreate = (
  props: JSX.IntrinsicAttributes & CreateProps<any, Error, any>
) => (
  <Create {...props}>
    <TabbedForm>
      {/* basic info */}
      <TabbedForm.Tab label="basic info" sx={{ maxWidth: "40em" }}>
        <BasicInfo property_type="restaurant" />
        <SelectArrayInput source="cuisines" choices={choices} />
      </TabbedForm.Tab>

      {/* misc_info */}
      <TabbedForm.Tab label="misc info">
        <MiscInfo />
      </TabbedForm.Tab>

      {/* amenity feature */}
      <TabbedForm.Tab label="Amenity Feature">
        <AmenityFeature />
      </TabbedForm.Tab>

      {/* Payment Info */}
      <TabbedForm.Tab label="Payment Info">
        <PaymentInfo />
      </TabbedForm.Tab>
    </TabbedForm>
  </Create>
);
