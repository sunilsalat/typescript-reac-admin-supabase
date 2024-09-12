import { CreateButton, useRecordContext } from "react-admin";

const CreateRelatedAddresButton = ({ button_title, entity_type }: any) => {
  const record = useRecordContext();

  console.log({ record });

  return (
    <CreateButton
      label={button_title || "create"}
      resource="addresses"
      state={
        record
          ? {
              record: {
                entity_type: entity_type,
                entity_id: record.id,
              },
            }
          : undefined
      }
    />
  );
};

export default CreateRelatedAddresButton;
