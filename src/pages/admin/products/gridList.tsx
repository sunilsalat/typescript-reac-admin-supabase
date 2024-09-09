import { useTheme, useMediaQuery } from "@mui/material";
import { Box, ImageList, ImageListItem, ImageListItemBar } from "@mui/material";
import { useCreatePath, useListContext, useGetMany } from "react-admin";
import { Link } from "react-router-dom";

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
              resource: "media",
              id: record.id,
              type: "show",
            })}
          >
            <img src={record.location} alt={record.originalname} />

            <ImageListItemBar
              title={record.originalname}
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
