import { CreateButton, useRecordContext } from "react-admin";

const CreateRelatedBookingLinksButton = () => {
  const record = useRecordContext();

  return (
    <CreateButton
      resource="properties_booking_links"
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

export default CreateRelatedBookingLinksButton;
