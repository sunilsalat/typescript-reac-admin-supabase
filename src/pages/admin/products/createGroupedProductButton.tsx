import { CreateButton, useRecordContext } from "react-admin";

const CreateGroupedProductButton = () => {
  const record = useRecordContext();

  return (
    <CreateButton
      resource="grouped_products"
      state={
        record
          ? {
              record: {
                group_id: record.id,
              },
            }
          : undefined
      }
    />
  );
};

export default CreateGroupedProductButton;
