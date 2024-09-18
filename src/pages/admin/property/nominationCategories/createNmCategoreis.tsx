import React from "react";
import {
  Create,
  SimpleForm,
  CreateProps,
  ReferenceInput,
  ReferenceArrayInput,
  AutocompleteArrayInput,
} from "react-admin";

export const NominationCategoriesCreate: React.FC<CreateProps> = (props) => {
  const handleSubmit = (data: any) => {
    console.log({ data });
  };

  return (
    <Create {...props}>
      <SimpleForm onSubmit={handleSubmit}>
        <ReferenceArrayInput
          source="nomination_categories"
          reference="nomination_categories"
        >
          <AutocompleteArrayInput
            filterToQuery={(searchText: string) => ({
              "name@ilike": `%${searchText}%`,
            })}
          />
        </ReferenceArrayInput>{" "}
      </SimpleForm>
    </Create>
  );
};
