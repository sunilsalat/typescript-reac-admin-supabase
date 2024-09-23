import { Create, CreateProps, TabbedForm } from "react-admin";
import { JSX } from "react/jsx-runtime";
import { BasicInfo } from "../basicInfo";
import { MiscInfo } from "../miscInfo";
import { AmenityFeature } from "../amenityFeature";
import { PaymentInfo } from "../paymentInfo";

const entity_type = "spa";

export const spaCreate = (
  props: JSX.IntrinsicAttributes & CreateProps<any, Error, any>
) => (
  <Create {...props}>
    <TabbedForm>
      {/* basic info */}
      <TabbedForm.Tab label="basic info" sx={{ maxWidth: "40em" }}>
        <BasicInfo property_type={entity_type} />
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
