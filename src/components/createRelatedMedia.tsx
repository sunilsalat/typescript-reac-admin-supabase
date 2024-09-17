import { CreateButton, useRecordContext } from "react-admin";

const CreateRelatedMediaButton = ({
  button_title,
  entity_type,
  image_tag,
  select_multiple,
  tab_id,
  is_video,
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
                tab_id: tab_id || 0,
                is_video: is_video ? is_video : false,
              },
            }
          : undefined
      }
    />
  );
};

export default CreateRelatedMediaButton;
