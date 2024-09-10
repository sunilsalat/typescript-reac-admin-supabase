import { useTheme, useMediaQuery, IconButton } from "@mui/material";
import { Box, ImageList, ImageListItem, ImageListItemBar } from "@mui/material";
import { useListContext, useGetMany, useUpdate } from "react-admin";
import CancelIcon from "@mui/icons-material/Cancel"; // Import cancel icon
import { useEffect, useState } from "react";

const GridList = () => {
  const { isPending } = useListContext();
  return isPending ? <LoadingGridList /> : <LoadedGridList />;
};

const useColsForWidth = () => {
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.up("sm"));
  const md = useMediaQuery(theme.breakpoints.up("md"));
  const lg = useMediaQuery(theme.breakpoints.up("lg"));
  const xl = useMediaQuery(theme.breakpoints.up("xl"));
  // there are all dividers of 24, to have full rows on each page
  if (xl) return 8;
  if (lg) return 6;
  if (md) return 4;
  if (sm) return 3;
  return 2;
};

const times = (nbChildren: number, fn: (key: number) => any) =>
  Array.from({ length: nbChildren }, (_, key) => fn(key));

const LoadingGridList = () => {
  const { perPage } = useListContext();
  const cols = useColsForWidth();
  return (
    <ImageList rowHeight={180} cols={cols} sx={{ m: 0 }}>
      {times(perPage, (key) => (
        <ImageListItem key={key}>
          <Box bgcolor="grey.300" height="100%" />
        </ImageListItem>
      ))}
    </ImageList>
  );
};

const LoadedGridList = () => {
  const { data } = useListContext();
  const cols = useColsForWidth();
  const [update] = useUpdate();
  const [images, setImages] = useState([]);

  const [draggedIndex, setDraggedIndex] = useState(null);

  const ids = data?.map((i: any) => i.media_id);
  let { data: media_data, isPending }: any = useGetMany("media", {
    ids: ids,
  });

  const handleDragStart = (index: any) => {
    setDraggedIndex(index.index);
  };

  const handleDragOver = (event: any) => {
    event.preventDefault(); // Necessary to allow dropping
  };

  const handleDrop = (index: any) => {
    if (draggedIndex === null) return;
    const updatedImages: any = [...images];
    const [draggedImage] = updatedImages.splice(draggedIndex, 1);
    updatedImages.splice(index.index, 0, draggedImage);
    setImages(updatedImages);
    setDraggedIndex(null);
  };

  const handleDelete = async (record: any) => {
    update("media", {
      id: record.id,
      data: { deleted_at: new Date() },
      previousData: record,
    });
  };

  useEffect(() => {
    setImages(media_data);
  }, [isPending]);

  if (!data || !media_data) return null;

  return (
    <ImageList rowHeight={180} cols={cols} sx={{ m: 0 }}>
      {images?.map((record: any, index: any) => {
        return (
          <ImageListItem
            key={record.id}
            onDragStart={() => handleDragStart({ index, id: record.id })}
            onDragOver={handleDragOver}
            onDrop={() => handleDrop({ index, id: record.id })}
            onClick={(event) => {
              event.stopPropagation();
            }}
          >
            <img src={record.location} alt={record.originalname} />

            <ImageListItemBar
              title={record.originalname}
              sx={{
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.8) 0%,rgba(0,0,0,0.4) 70%,rgba(0,0,0,0) 100%)",
              }}
              actionIcon={
                <IconButton
                  onClick={(event) => {
                    event.stopPropagation();
                    handleDelete(record);
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
      })}
    </ImageList>
  );
};

export default GridList;
