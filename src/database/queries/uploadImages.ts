import { supabase } from "../supabase";

export const uploadImagesToSupabase = async (
  featured_images: any
): Promise<any> => {
  try {
    let updatedFeaturedImages = featured_images || [];

    // Handle single image input correctly (if it's not an array yet)
    if (
      !Array.isArray(updatedFeaturedImages) &&
      updatedFeaturedImages.rawFile
    ) {
      updatedFeaturedImages = [updatedFeaturedImages];
    }

    // Check if there are new images to upload
    if (updatedFeaturedImages.length > 0) {
      const uploadedImages: any[] = [];

      for (const image of updatedFeaturedImages) {
        if (image.rawFile) {
          const file = image.rawFile;
          const fileName = `${file.name}-${Date.now()}`;
          const size = file.size;
          const mimetype = file.type;
          const { data, error } = await supabase.storage
            .from("luxe_global")
            .upload(`public/${fileName}`, file);

          if (error) {
            throw new Error("Error uploading image: " + error.message);
          }

          // Get the public URL of the uploaded image
          const {
            data: { publicUrl },
          } = supabase.storage
            .from("luxe_global")
            .getPublicUrl(`public/${fileName}`);

          uploadedImages.push({
            originalname: image.title || file.name,
            location: publicUrl,
            key: data.path,
            encoding: "7bit",
            mimetype: mimetype,
            content_type: mimetype,
            size: size,
          });
        }
      }

      return uploadedImages;
    }

    return [];
  } catch (error) {
    //
  }
};

export const insertImagesInMediaTable = async (uploadedImages: any[]) => {
  const { data, error } = await supabase
    .from("media")
    .insert(uploadedImages)
    .select("*");

  if (!data || error) {
    throw new Error("Image upload failed!");
  }

  return data;
};
