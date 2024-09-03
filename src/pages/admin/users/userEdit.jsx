import { Edit, SimpleForm, TextInput } from "react-admin";

export const userEdit = (props) => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput source="id" disabled />
            <TextInput source="title" />
            <TextInput source="body" />
        </SimpleForm>
    </Edit>
);