import { CreateButton, useRecordContext } from "react-admin";

const CreateRelatedMediaButton = () => {
  const record = useRecordContext();

  return (
    <CreateButton
      resource="media"
      state={
        record
          ? {
              record: {
                entity_type: "products",
                entity_id: record.id,
                image_tag: "product_image",
              },
            }
          : undefined
      }
    />
  );
};

export default CreateRelatedMediaButton;
