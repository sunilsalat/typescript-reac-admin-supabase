import { SxProps, Typography } from "@mui/material";
import { memo } from "react";
import { FieldProps, useRecordContext } from "react-admin";

interface Props extends FieldProps {
  size?: string;
  sx?: SxProps;
}

const FullNameField = (props: Props) => {
  const record = useRecordContext();
  console.log({ reer: record });
  return record ? (
    <Typography
      variant="body2"
      display="flex"
      flexWrap="nowrap"
      alignItems="center"
      component="div"
      sx={props.sx}
    >
      {record.first_name} {record.last_name}
    </Typography>
  ) : null;
};

export default memo<Props>(FullNameField);
