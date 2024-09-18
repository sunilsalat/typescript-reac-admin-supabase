import { CreateButton, useRecordContext } from "react-admin";

const CreateRelatedNmCategories = () => {
  const record = useRecordContext();

  return (
    <CreateButton
      resource="properties_nomination_categories"
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

export default CreateRelatedNmCategories;
