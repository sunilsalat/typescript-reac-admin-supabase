import {
  Create,
  ReferenceInput,
  required,
  SelectInput,
  SimpleForm,
  TextInput,
  useNotify,
  useRedirect,
} from "react-admin";
import { supabase } from "../../../db/supabase";

export const createNominationCategory = (props: any) => {
  const redirect = useRedirect();
  const notify = useNotify();

  const handleSubmit = async (data: any) => {
    try {
      if (!data.parent_id) {
        await supabase.rpc("create_tree_root", {
          root_name: data.name,
          for_resource_type: data.for_resource_type,
        });
      }

      if (data.parent_id) {
        console.log({ data });
        await supabase.rpc("add_child_node", {
          parent_node_id: data.parent_id,
          child_name: data.name,
          for_resource_type: data.for_resource_type,
        });
      }

      notify("Nomination category added");
      redirect("/admin/nomination_categories");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Create {...props}>
      <SimpleForm onSubmit={handleSubmit}>
        <SelectInput
          source="for_resource_type"
          choices={["hotel", "restaurant", "spa"]}
          validate={req}
        />
        <TextInput source="name" validate={req} />
        <ReferenceInput source="parent_id" reference="nomination_categories" />
      </SimpleForm>
    </Create>
  );
};

const req = [required()];
