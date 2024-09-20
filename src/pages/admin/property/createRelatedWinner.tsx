import { CreateButton, useRecordContext } from "react-admin";

const CreateRelatedWinner = ({ label }: any) => {
  const record = useRecordContext();
  console.log({ record });

  return (
    <CreateButton
      resource="properties_winners"
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

export default CreateRelatedWinner;
