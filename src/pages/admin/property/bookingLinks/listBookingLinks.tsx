import { Datagrid, List, TextField } from "react-admin";

export const boolingLinksList = () => {
  return (
    <List>
      <Datagrid>
        <TextField source="type" />
        <TextField source="value" />
      </Datagrid>
    </List>
  );
};
