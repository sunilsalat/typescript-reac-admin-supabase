import { CreateButton, useRecordContext } from "react-admin";

const CreateRelatedSocialLinksButton = () => {
  const record = useRecordContext();

  return (
    <CreateButton
      resource="properties_social_links"
      state={
        record
          ? {
              record: {
                property_id: record.id,
              },
            }
          : undefined
      }
    />
  );
};

export default CreateRelatedSocialLinksButton;
