import { useTheme, useMediaQuery, IconButton } from "@mui/material";
import { Box, ImageList, ImageListItem, ImageListItemBar } from "@mui/material";
import { useListContext, useGetMany, useUpdate, useDelete } from "react-admin";
import CancelIcon from "@mui/icons-material/Cancel"; // Import cancel icon
import { useEffect, useState } from "react";
import { GridListItem } from "./gridListItem";
import medias from "../medias";

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
  const { data: rmData, isPending }: any = useListContext();
  const cols = useColsForWidth();
  const [update] = useUpdate();
  const [deleteOne] = useDelete();
  const [images, setImages] = useState([]);
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [draggedRecord, setDraggedRecord]: any = useState(null);

  const handleDragStart = (data: any) => {
    setDraggedIndex(data.index);
    setDraggedRecord(data.data);
  };

  const handleDragOver = (event: any) => {
    event.preventDefault();
  };

  const handleDrop = (data: any) => {
    if (draggedIndex === null) return;
    const updatedImages: any = [...images];
    const [draggedImage] = updatedImages.splice(draggedIndex, 1);
    updatedImages.splice(data.index, 0, draggedImage);
    setImages(updatedImages);

    console.log();

    if (draggedRecord) {
      // update("resources_media", {
      //   id: draggedRecord.id,
      //   data: { position: data.data.position },
      //   previousData: draggedRecord,
      // });
    }

    setDraggedIndex(null);
    setDraggedRecord(null);
  };

  const handleDelete = async (data: any) => {
    deleteOne("resources_media", {
      id: data.id,
      previousData: data,
    });
    const updatedData = rmData?.filter((i: any) => i.id !== data.id);
    setImages(updatedData);
  };

  useEffect(() => {
    if (images.length === 0) {
      setImages(rmData);
    }
  }, [isPending]);

  if (!rmData) return null;

  return (
    images && (
      <ImageList rowHeight={180} cols={cols} sx={{ m: 0 }}>
        {images?.map((record: any, index: any) => {
          return (
            <GridListItem
              key={index}
              index={index}
              data={record}
              handleDelete={handleDelete}
              handleDragOver={handleDragOver}
              handleDragStart={handleDragStart}
              handleDrop={handleDrop}
            />
          );
        })}
      </ImageList>
    )
  );
};

export default GridList;
