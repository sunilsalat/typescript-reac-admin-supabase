import { Card, CardMedia } from "@mui/material";
import { useRecordContext } from "react-admin";

const ImageCard = (props: any) => {
  const record = useRecordContext();
  if (!record) return null;
  console.log({ mediare: record });
  return (
    <Card sx={{ display: "inline-block" }}>
      <CardMedia
        component="img"
        image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDo890dsxpB5UCLQFdVBWmK4qVxTrsrLEEUg&s"
        alt={record.originalname}
        sx={{ maxWidth: "42em", maxHeight: "15em" }}
      />
    </Card>
  );
};

export default ImageCard;
