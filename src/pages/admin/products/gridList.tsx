import { useTheme, useMediaQuery } from "@mui/material";
import { Box, ImageList, ImageListItem, ImageListItemBar } from "@mui/material";
import {
  useCreatePath,
  NumberField,
  useListContext,
  TextField,
  ReferenceField,
  useGetMany,
} from "react-admin";
import { Link } from "react-router-dom";
import ImageCard from "./imageCard";

const GridList = () => {
  const { isPending } = useListContext();
  return isPending ? <LoadedGridList /> : <LoadedGridList />;
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
  const createPath = useCreatePath();
  const ids = data?.map((i: any) => i.media_id);
  const { data: media_data } = useGetMany("media", { ids: ids });

  if (!data || !media_data) return null;

  return (
    <ImageList rowHeight={180} cols={cols} sx={{ m: 0 }}>
      {media_data.map((record, index) => {
        return (
          <ImageListItem
            component={Link}
            key={index}
            to={createPath({
              resource: "products",
              id: record.id,
              type: "edit",
            })}
          >
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDo890dsxpB5UCLQFdVBWmK4qVxTrsrLEEUg&s"
              alt=""
            />

            <ImageListItemBar
              title={record.originalname}
              subtitle={
                <span>
                  <TextField
                    source="price"
                    record={record}
                    color="inherit"
                    sx={{
                      display: "inline",
                      fontSize: "1em",
                    }}
                  />
                </span>
              }
              sx={{
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.8) 0%,rgba(0,0,0,0.4) 70%,rgba(0,0,0,0) 100%)",
              }}
            />
          </ImageListItem>
        );
      })}
    </ImageList>
  );
};

export default GridList;
