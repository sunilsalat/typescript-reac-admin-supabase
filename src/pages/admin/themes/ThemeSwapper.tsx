import React, { useState, MouseEvent } from "react";
import { useStore, useTranslate, ToggleThemeButton } from "react-admin";
import { IconButton, Menu, MenuItem, Tooltip } from "@mui/material";
import ColorLensIcon from "@mui/icons-material/ColorLens";

import { themes } from "./themes"; // Ensure themes are typed

export const ThemeSwapper: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [themeName, setThemeName] = useStore<string>("themeName", "soft");

  const handleChange = (event: React.MouseEvent<HTMLLIElement>, index: number) => {
    const newTheme = themes[index];
    setThemeName(newTheme.name);
    setAnchorEl(null);
  };

  const currentTheme = themes.find((theme) => theme.name === themeName);

  const translate = useTranslate();
  const toggleThemeTitle = translate("pos.action.change_theme", {
    _: "Change Theme",
  });

  const ucFirst = (str: string): string => str.charAt(0).toUpperCase() + str.slice(1);

  return (
    <>
      <Tooltip title={toggleThemeTitle} enterDelay={300}>
        <IconButton
          onClick={handleClick}
          color="inherit"
          aria-label={toggleThemeTitle}
        >
          <ColorLensIcon />
        </IconButton>
      </Tooltip>
      {currentTheme?.dark ? <ToggleThemeButton /> : null}
      <Menu open={open} onClose={handleClose} anchorEl={anchorEl}>
        {themes.map((theme, index) => (
          <MenuItem
            onClick={(event) => handleChange(event, index)}
            value={theme.name}
            key={theme.name}
            selected={theme.name === themeName}
          >
            {ucFirst(theme.name)}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};
