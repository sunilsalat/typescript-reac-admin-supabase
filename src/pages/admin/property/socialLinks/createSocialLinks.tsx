import React from "react";
import {
  Create,
  SimpleForm,
  TextInput,
  CreateProps,
  ReferenceInput,
  SelectInput,
  getRecordFromLocation,
  useNotify,
  useRedirect,
} from "react-admin";
import { useLocation } from "react-router-dom";

export const SocialLinksCreate: React.FC<CreateProps> = (props) => {
  const notify = useNotify();
  const redirect = useRedirect();
  const location = useLocation();

  const onSuccess = (_: any) => {
    const record = getRecordFromLocation(location);
    notify("Review added.");
    if (record && record.entity_id) {
      redirect(`/admin/${record.entity_type}/${record.entity_id}/7`);
    } else {
      redirect(`/admin/${record.entity_type}`);
    }
  };
  return (
    <Create {...props} mutationOptions={{ onSuccess }}>
      <SimpleForm>
        <TextInput source="name" />
        <TextInput source="url" />
        <ReferenceInput
          source="entity_id"
          reference="properties"
          disabled={true}
        />
        {/* <SelectInput source="name" disabled={true} />
        </ReferenceInput> */}
      </SimpleForm>
    </Create>
  );
};
