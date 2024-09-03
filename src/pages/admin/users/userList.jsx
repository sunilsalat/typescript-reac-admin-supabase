import { Datagrid, List, TextField } from "react-admin";

export const userList = (props) => (
    <List {...props}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="name" />
            <TextField source="email" />
        </Datagrid>
    </List>
);