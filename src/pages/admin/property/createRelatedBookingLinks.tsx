import { CreateButton, useRecordContext } from "react-admin";

const CreateRelatedBookingLinksButton = ({ entity_type }: any) => {
  const record = useRecordContext();

  return (
    <CreateButton
      resource="properties_booking_links"
      state={
        record
          ? {
              record: {
                entity_id: record.id,
                entity_type: entity_type,
              },
            }
          : undefined
      }
    />
  );
};

export default CreateRelatedBookingLinksButton;
