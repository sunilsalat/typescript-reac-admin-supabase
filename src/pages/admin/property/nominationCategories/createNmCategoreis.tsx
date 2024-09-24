import React from "react";
import {
  Create,
  SimpleForm,
  CreateProps,
  ReferenceArrayInput,
  AutocompleteArrayInput,
  useRedirect,
} from "react-admin";
import { upsertPnmCategories } from "../../../../database/queries/propertyNmCategory";

export const NominationCategoriesCreate: React.FC<CreateProps> = (props) => {
  const redirect = useRedirect();
  const handleSubmit = async (data: any) => {
    const result = await upsertPnmCategories(
      data.property_id,
      data.nomination_categories
    );

    if (data && result) {
      redirect(`/admin/hotel/${data.property_id}/8`);
    } else {
      redirect(`/admin/hotel`);
    }
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
        </ReferenceArrayInput>
      </SimpleForm>
    </Create>
  );
};
