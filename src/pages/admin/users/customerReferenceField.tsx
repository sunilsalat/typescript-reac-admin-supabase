import { Typography } from "@mui/material";
import {
  ReferenceField,
  ReferenceFieldProps,
  useRecordContext,
} from "react-admin";
import FullNameField from "./fullNameField";

const CustomerReferenceField = (
  props: Omit<ReferenceFieldProps, "reference" | "children" | "source"> & {
    source?: string;
  }
) => {
  const record = useRecordContext();

  return record ? (
    <ReferenceField
      label="profile_ref"
      source="profile_id"
      reference="profile"
      {...props}
    >
      <FullNameField source="email" />
    </ReferenceField>
  ) : null;
};

export default CustomerReferenceField;
