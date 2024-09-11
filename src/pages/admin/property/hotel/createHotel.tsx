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
  { id: "hotel", name: "Hotel" },
  { id: "retreat", name: "Retreat" },
  { id: "resort", name: "Resort" },
  { id: "villa", name: "Villa" },
  { id: "self catering", name: "Self Catering" },
  { id: "lodge", name: "Lodge" },
  { id: "sanctury", name: "Sanctury" },
  { id: "service apartment", name: "Service Apartment" },
  { id: "camp", name: "Camp" },
  { id: "tented camp", name: "Tented Camp" },
  { id: "game reserve", name: "Game Reserve" },
  { id: "botique hotel", name: "Botique Hotel" },
];

export const hotelCreate = (
  props: JSX.IntrinsicAttributes & CreateProps<any, Error, any>
) => (
  <Create {...props}>
    <TabbedForm>
      {/* basic info */}
      <TabbedForm.Tab label="basic info" sx={{ maxWidth: "40em" }}>
        <BasicInfo />
        <SelectInput
          source="hotel_type"
          choices={choices}
          defaultValue="hotel"
        />
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
