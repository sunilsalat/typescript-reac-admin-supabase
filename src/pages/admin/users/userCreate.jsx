import { Create, SimpleForm, TextInput } from "react-admin";


export const userCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="name" />
            <TextInput source="password" />
        </SimpleForm>
    </Create>
);