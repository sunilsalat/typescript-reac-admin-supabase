import {
  Create,
  EditProps,
  getRecordFromLocation,
  ImageField,
  ImageInput,
  required,
  SimpleForm,
  TabbedForm,
  useDataProvider,
  useGetOne,
  useGetRecordId,
  useNotify,
  useRecordContext,
  useRedirect,
} from "react-admin";
import { JSX } from "react/jsx-runtime";
import { uploadImagesToSupabase } from "../../../db/queries/uploadImages";
import { useLocation } from "react-router-dom";

export const createMedia = (
  props: JSX.IntrinsicAttributes & EditProps<any, Error>
) => {
  const notify = useNotify();
  const dataProvider = useDataProvider();
  const redirect = useRedirect();
  const location = useLocation();

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
            media_type: data.media_type,
            position: data.position,
          };
          return createMediaAndMediaResource({ uploadedImage, resource_media });
        });

        await Promise.all(creationTasks);
        redirect(`/admin/${data.entity_type}/${data.entity_id}`);
      }
    } catch (error: any) {
      notify(`Error: ${error.message}`, { type: "warning" });
    }
  };

  return (
    <Create {...props}>
      <SimpleForm onSubmit={handleSubmit}>
        <ImageInput source="featured_images" label="Featured Images" multiple>
          <ImageField source="src" title="title" />
        </ImageInput>
      </SimpleForm>
    </Create>
  );
};

const req = [required()];
