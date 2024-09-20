import React from "react";
import {
  Create,
  SimpleForm,
  CreateProps,
  useRedirect,
  ReferenceInput,
  SelectInput,
  required,
  FormDataConsumer,
  NumberField,
  NumberInput,
  getRecordFromLocation,
  useNotify,
} from "react-admin";
import { useLocation } from "react-router-dom";

const choices: { id: string; name: string }[] = [
  { id: "global", name: "global" },
  { id: "region", name: "regions" },
  { id: "continent", name: "continents" },
  { id: "nation", name: "nations" },
];

const findItem = (id: string): string => {
  const item = choices.find((item) => item.id === id);
  return item ? item.name : "global";
};

export const WinnersCreate: React.FC<CreateProps> = (props) => {
  const redirect = useRedirect();
  const notify = useNotify();
  const location = useLocation();

  const onSuccess = (_: any) => {
    const record = getRecordFromLocation(location);

    notify("Nomination added.");
    if (record && record.property_id) {
      redirect(`/admin/hotel/${record.property_id}/8`);
    } else {
      redirect(`/admin/hotel`);
    }
  };

  return (
    <Create {...props} mutationOptions={{ onSuccess }}>
      <SimpleForm>
        <ReferenceInput
          source="property_id"
          reference="properties"
          disabled={true}
        />

        <ReferenceInput
          source="nomination_category_id"
          reference="nomination_categories"
        >
          <SelectInput
            label="Nomination Category"
            optionText="name"
            validate={required()}
          />
        </ReferenceInput>

        <NumberInput label="Winning Year" source="winning_year" />

        <SelectInput
          source="winner_type"
          choices={choices}
          validate={required()}
        />

        <FormDataConsumer<{ winner_type: string }>>
          {({ formData, ...rest }) =>
            formData.winner_type &&
            formData.winner_type !== "global" && (
              <ReferenceInput
                source="winner_type_id"
                reference={
                  formData.winner_type
                    ? findItem(formData.winner_type)
                    : "global"
                }
                {...rest}
              >
                <SelectInput label="Winnet Type ID" validate={required()} />
              </ReferenceInput>
            )
          }
        </FormDataConsumer>
      </SimpleForm>
    </Create>
  );
};
