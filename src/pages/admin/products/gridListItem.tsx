import { IconButton, ImageListItem, ImageListItemBar } from "@mui/material";
import { useGetOne } from "react-admin";
import CancelIcon from "@mui/icons-material/Cancel"; // Import cancel icon

export const GridListItem = ({
  data,
  index,
  handleDelete,
  handleDragOver,
  handleDragStart,
  handleDrop,
}: any) => {
  const { data: media } = useGetOne("media", { id: data.media_id });

  if (!media) return null;

  return (
    <ImageListItem
      key={data.media_id}
      onDragStart={() => handleDragStart({ index, data, media })}
      onDragOver={handleDragOver}
      onDrop={() => handleDrop({ index, data, media })}
      onClick={(event) => {
        event.stopPropagation();
      }}
      sx={{
        maxHeight: "350",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <img src={media?.location} alt={media?.originalname} />

      <ImageListItemBar
        title={media.originalname}
        sx={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.8) 0%,rgba(0,0,0,0.4) 70%,rgba(0,0,0,0) 100%)",
        }}
        actionIcon={
          <IconButton
            onClick={(event) => {
              event.stopPropagation();
              handleDelete(data);
            }}
            sx={{
              color: "white",
            }}
          >
            <CancelIcon />
          </IconButton>
        }
      />
    </ImageListItem>
  );
};
