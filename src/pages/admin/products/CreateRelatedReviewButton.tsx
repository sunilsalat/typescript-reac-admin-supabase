import { CreateButton, useRecordContext } from "react-admin";

const CreateRelatedReviewButton = () => {
  const record = useRecordContext();

  return (
    <CreateButton
      resource="reviews"
      state={
        record
          ? {
              record: {
                entity_id: record.id,
                entity_type: "products",
              },
            }
          : undefined
      }
    />
  );
};

export default CreateRelatedReviewButton;
