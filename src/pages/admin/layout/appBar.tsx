import * as React from "react";
import { AppBar, TitlePortal } from "react-admin";
import { Box, useMediaQuery, Theme } from "@mui/material";

import Logo from "./logo";
import { AppBarToolbar } from "./appToolBar";

const CustomAppBar: React.FC = () => {
  // Use the theme object in useMediaQuery
  const isLargeEnough = useMediaQuery((theme: Theme) => theme.breakpoints.up("sm"));
  
  return (
    <AppBar color="secondary" toolbar={<AppBarToolbar />}>
      <TitlePortal />
      {isLargeEnough && <Logo />}
      {isLargeEnough && <Box component="span" sx={{ flex: 1 }} />}
    </AppBar>
  );
};

export default CustomAppBar;
