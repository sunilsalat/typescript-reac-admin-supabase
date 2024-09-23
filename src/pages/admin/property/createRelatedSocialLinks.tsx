import { CreateButton, useRecordContext } from "react-admin";

const CreateRelatedSocialLinksButton = ({ entity_type }: any) => {
  const record = useRecordContext();

  return (
    <CreateButton
      resource="properties_social_links"
      state={
        record
          ? {
              record: {
                entity_id: record.id,
                entity_type: entity_type,
              },
            }
          : undefined
      }
    />
  );
};

export default CreateRelatedSocialLinksButton;
