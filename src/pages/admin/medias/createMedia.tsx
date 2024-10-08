import {
  Button,
  Create,
  EditProps,
  FileField,
  FileInput,
  FormDataConsumer,
  ImageField,
  ImageInput,
  required,
  SimpleForm,
  TextInput,
  useDataProvider,
  useNotify,
  useRecordContext,
  useRedirect,
} from "react-admin";
import { JSX } from "react/jsx-runtime";
import { uploadImagesToSupabase } from "../../../database/queries/uploadImages";
import { useLocation, useNavigate } from "react-router-dom";

export const createMedia = (
  props: JSX.IntrinsicAttributes & EditProps<any, Error>
) => {
  const notify = useNotify();
  const dataProvider = useDataProvider();
  const redirect = useRedirect();
  const location = useLocation();
  const navigate = useNavigate();
  const record = useRecordContext();

  const createMediaAndMediaResource = async ({
    uploadedImage,
    resource_media,
  }: {
    uploadedImage: any;
    resource_media: any;
  }) => {
    try {
      const { data: mediaData } = await dataProvider.create("media", {
        data: uploadedImage,
      });

      const updateResourceMedia = { ...resource_media, media_id: mediaData.id };
      const {} = await dataProvider.create("resources_media", {
        data: updateResourceMedia,
      });
    } catch (error) {
      throw error;
    }
  };

  const handleSubmit = async (data: any) => {
    try {
      if (
        !data ||
        !data.featured_images ||
        !data.entity_id ||
        !data.entity_type
      ) {
        throw new Error("Missing required fields.");
      }

      const uploadedImages = await uploadImagesToSupabase(data.featured_images);

      if (uploadedImages && uploadedImages.length > 0) {
        const creationTasks = uploadedImages.map((uploadedImage: any) => {
          const resource_media = {
            entity_id: data.entity_id,
            entity_type: data.entity_type,
            media_type: data.image_tag,
          };
          return createMediaAndMediaResource({ uploadedImage, resource_media });
        });

        await Promise.all(creationTasks);
        redirect(`/admin/${data.entity_type}/${data.entity_id}/${data.tab_id}`);
      }
    } catch (error: any) {
      notify(`Error: ${error.message}`, { type: "warning" });
    }
  };

  return (
    <Create {...props}>
      <SimpleForm onSubmit={handleSubmit}>
        <FormDataConsumer<{ is_video: boolean }>>
          {({ formData, ...rest }) =>
            formData.is_video ? (
              <FileInput source="featured_images" label="Upload new video">
                <FileField source="src" title="title" />
              </FileInput>
            ) : (
              <ImageInput
                source="featured_images"
                label="Featured Images"
                multiple={record?.select_multiple}
                {...rest}
              >
                <ImageField source="src" title="title" />
              </ImageInput>
            )
          }
        </FormDataConsumer>

        <Button
          type="button"
          label="Go Back"
          onClick={() => navigate(-1)}
        ></Button>
      </SimpleForm>
    </Create>
  );
};
