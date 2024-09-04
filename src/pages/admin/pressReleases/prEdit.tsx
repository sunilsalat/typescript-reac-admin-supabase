import {
  DateInput,
  Edit,
  SimpleForm,
  TextInput,
  useDataProvider,
  useGetOne,
  useGetRecordId,
} from "react-admin";

export const pressReleasesEdit = () => {
  const dataProvider = useDataProvider();
  const recordId = useGetRecordId();

  const { data: previousValues } = useGetOne("press_releases", {
    id: recordId,
  });

  const handleSubmit = async (data: any) => {
    try {
      dataProvider.update("press_releases", {
        data: data,
        id: recordId,
        previousData: previousValues,
      });
    } catch (error: any) {}
  };
  return (
    <Edit>
      <SimpleForm warnWhenUnsavedChanges onSubmit={handleSubmit}>
        <TextInput disabled source="id" />
        <TextInput source="title" />
        <TextInput source="description" />
        <DateInput source="date" />
        <TextInput source="slug" />
        <TextInput source="unique_id" />
        <DateInput disabled source="created_at" />
        <DateInput disabled source="updated_at" />
        <DateInput disabled source="deleted_at" />
      </SimpleForm>
    </Edit>
  );
};
