import { CreateButton, useRecordContext } from "react-admin";

const CreateRelatedMediaButton = ({ entity_type, image_tag }: any) => {
  const record = useRecordContext();

  return (
    <CreateButton
      resource="media"
      state={
        record
          ? {
              record: {
                entity_type: entity_type,
                entity_id: record.id,
                image_tag: image_tag,
              },
            }
          : undefined
      }
    />
  );
};

export default CreateRelatedMediaButton;
