import * as React from "react";
import { useState } from "react";
import { Box } from "@mui/material";

import {
  useTranslate,
  DashboardMenuItem,
  MenuItemLink,
  useSidebarState,
} from "react-admin";

import Products from "../products";
import PressReleases from "../pressReleases";
import Reviews from "../reviews";
import Nations from "../settings/nations";
import SubMenu from "./subMenu";
import Hotel from "../property/hotel";
import Restaurant from "../property/restaurant";
import Spa from "../property/spa";

// Define the shape of the state used in the menu
interface MenuState {
  items: boolean;
  products: boolean;
  pressReleases: boolean;
  nations: boolean;
  properties: boolean;
  settings?: boolean; // Optional property
}

interface MenuProps {
  dense?: boolean;
}

const Menu: React.FC<MenuProps> = ({ dense = false }) => {
  // Initialize state with proper typing
  const [state, setState] = useState<MenuState>({
    items: true,
    products: true,
    pressReleases: true,
    nations: true,
    properties: true,
  });

  const translate = useTranslate();
  const [open] = useSidebarState();

  const handleToggle = (menu: keyof MenuState) => {
    setState((prevState) => ({ ...prevState, [menu]: !prevState[menu] }));
  };

  return (
    <Box
      sx={{
        width: open ? 200 : 50,
        marginTop: 1,
        marginBottom: 1,
        transition: (theme) =>
          theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
      }}
    >
      <DashboardMenuItem />
      <SubMenu
        handleToggle={() => handleToggle("properties")}
        isOpen={state.properties}
        name="Properties"
        icon={<Hotel.icon />}
        dense={dense}
      >
        <MenuItemLink
          to="/admin/hotel"
          state={{ _scrollToTop: true }}
          primaryText={translate(`Hotels`, {
            smart_count: 2,
          })}
          leftIcon={<Hotel.icon />}
          dense={dense}
        />
        <MenuItemLink
          to="/admin/restaurant"
          state={{ _scrollToTop: true }}
          primaryText={translate(`Restaurants`, {
            smart_count: 2,
          })}
          leftIcon={<Restaurant.icon />}
          dense={dense}
        />
        <MenuItemLink
          to="/admin/spa"
          state={{ _scrollToTop: true }}
          primaryText={translate(`Spa`, {
            smart_count: 2,
          })}
          leftIcon={<Spa.icon />}
          dense={dense}
        />
      </SubMenu>
      <SubMenu
        handleToggle={() => handleToggle("products")}
        isOpen={state.products}
        name="Products"
        icon={<Products.icon />}
        dense={dense}
      >
        <MenuItemLink
          to="/admin/products"
          state={{ _scrollToTop: true }}
          primaryText={translate(`Products`, {
            smart_count: 2,
          })}
          leftIcon={<Products.icon />}
          dense={dense}
        />
      </SubMenu>
      <MenuItemLink
        to="/admin/press_releases"
        state={{ _scrollToTop: true }}
        primaryText={translate(`Press Releases`, {
          smart_count: 2,
        })}
        leftIcon={<PressReleases.icon />}
        dense={dense}
      />
      <MenuItemLink
        to="/admin/reviews"
        state={{ _scrollToTop: true }}
        primaryText={translate(`Reviews`, {
          smart_count: 2,
        })}
        leftIcon={<Reviews.icon />}
        dense={dense}
      />
      <SubMenu
        handleToggle={() => handleToggle("settings")}
        isOpen={state.settings ?? false}
        name="Settings"
        icon={<Nations.icon />}
        dense={dense}
      >
        <MenuItemLink
          to="/admin/nations"
          state={{ _scrollToTop: true }}
          primaryText={translate(`Nations`, {
            smart_count: 2,
          })}
          leftIcon={<Nations.icon />}
          dense={dense}
        />
      </SubMenu>
    </Box>
  );
};

export default Menu;
