import React from "react";
import {
  SimpleForm,
  TextInput,
  CreateProps,
  ReferenceInput,
  Edit,
  getRecordFromLocation,
  useNotify,
  useRedirect,
} from "react-admin";
import { useLocation } from "react-router-dom";

export const SocialLinksEdit: React.FC<CreateProps> = (props) => {
  const notify = useNotify();
  const redirect = useRedirect();
  const location = useLocation();

  const onSuccess = (_: any) => {
    const record = getRecordFromLocation(location);
    notify("Review added.");
    if (record && record.entity_id) {
      redirect(`/admin/${record.entity_type}/${record.entity_id}/8`);
    } else {
      redirect(`/admin/${record.entity_type}`);
    }
  };
  return (
    <Edit {...props} mutationOptions={{ onSuccess }}>
      <SimpleForm>
        <TextInput source="name" />
        <TextInput source="url" />
        <ReferenceInput
          source="entity_id"
          reference="properties"
          disabled={true}
        />
      </SimpleForm>
    </Edit>
  );
};
