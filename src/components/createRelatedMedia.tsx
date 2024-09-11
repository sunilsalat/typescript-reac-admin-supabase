import { CreateButton, useRecordContext } from "react-admin";

const CreateRelatedMediaButton = ({
  button_title,
  entity_type,
  image_tag,
  select_multiple,
}: any) => {
  const record = useRecordContext();

  return (
    <CreateButton
      label={button_title || "create"}
      resource="media"
      state={
        record
          ? {
              record: {
                entity_type: entity_type,
                entity_id: record.id,
                image_tag: image_tag,
                select_multiple: select_multiple,
              },
            }
          : undefined
      }
    />
  );
};

export default CreateRelatedMediaButton;
