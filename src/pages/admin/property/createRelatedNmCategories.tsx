import { CreateButton, useRecordContext } from "react-admin";

const CreateRelatedNmCategories = ({ label }: any) => {
  const record = useRecordContext();

  return (
    <CreateButton
      resource="properties_nomination_categories"
      label={label ? label : "CREATE"}
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
