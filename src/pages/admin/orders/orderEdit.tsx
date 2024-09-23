import { Edit, required, TabbedForm, useRecordContext } from "react-admin";

const OrderTitle = () => {
  const record = useRecordContext();
  return record ? <span>Order "{record.id}"</span> : null;
};

export const orderEdit = (props: any) => {
  return (
    <Edit title={<OrderTitle />} {...props}>
      <TabbedForm>
        {/* description */}
        <TabbedForm.Tab
          label="description"
          sx={{ maxWidth: "40em" }}
        ></TabbedForm.Tab>
      </TabbedForm>
    </Edit>
  );
};

const req = [required()];
