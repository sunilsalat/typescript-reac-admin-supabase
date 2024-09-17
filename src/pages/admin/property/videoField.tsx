import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import { Button, useDelete, useGetOne, useRecordContext } from "react-admin";
import CancelIcon from "@mui/icons-material/Cancel"; // Import cancel icon

export const VideoField = () => {
  const record: any = useRecordContext();
  const [deleteOne] = useDelete();
  const { data } = useGetOne("media", {
    id: record.media_id,
  });

  const handleDelete = async () => {
    deleteOne("resources_media", { id: record.id });
  };

  if (!data) return null;

  return (
    <Card sx={{ maxWidth: 345 }}>
      <Box sx={{ position: "relative" }}>
        <CardMedia
          component="video"
          controls
          src={data.location}
          sx={{ height: 200, objectFit: "cover" }}
        />

        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            p: 1,
            backgroundColor: "none)", // optional background for better readability
            boxSizing: "border-box",
          }}
        >
          <Typography variant="h6" color="white">
            {data.originalname}
          </Typography>
          <Button
            color="error"
            onClick={handleDelete}
            sx={{
              color: "white",
              backgroundColor: "none",
              "&:hover": {
                backgroundColor: "none",
              },
            }}
          >
            <CancelIcon />
          </Button>
        </Box>
      </Box>
    </Card>
  );
};
