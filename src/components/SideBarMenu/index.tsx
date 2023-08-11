import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { GridView, Search, ArrowBack } from "@mui/icons-material";

import { PAGES } from "../../configs/pages";
import "./style.css";

const SideBarMenu = ({
  isSideBarOpen,
  onCloseSideBar,
}: {
  isSideBarOpen: boolean;
  onCloseSideBar: any;
}) => {
  const navigate = useNavigate();

  const [selectedList, setList] = useState("");

  /**
   * @description Close Sidebar menu
   */
  const handleCloseSideBar = () => {
    onCloseSideBar();
  };

  /**
   * @description Redirecting to respective pages
   *
   * @params {String} url
   * @param {Object} event
   */
  const redirectToPage =
    (url: string) =>
    (_: React.MouseEvent<HTMLButtonElement, MouseEvent> | any) => {
      navigate(url);
      onCloseSideBar();
    };

  /**
   * @description Getting icon dynamically
   *
   * @param {String} item
   * @returns {Node} Icon
   */
  const getIcon = (item: String) => {
    switch (item) {
      case "DASHBOARD":
        return (
          <GridView
            className={
              item === selectedList ? "side-bar-icon-hover" : "side-bar-icon"
            }
          />
        );
      case "SEARCH_TRANSACTION":
        return (
          <Search
            className={
              item === selectedList ? "side-bar-icon-hover" : "side-bar-icon"
            }
          />
        );
      case "BATCH_SEARCH":
        return (
          <Search
            className={
              item === selectedList ? "side-bar-icon-hover" : "side-bar-icon"
            }
          />
        );
      case "BATCH_FILE_SEARCH":
        return (
          <Search
            className={
              item === selectedList ? "side-bar-icon-hover" : "side-bar-icon"
            }
          />
        );
      default:
        return (
          <Search
            className={
              item === selectedList ? "side-bar-icon-hover" : "side-bar-icon"
            }
          />
        );
    }
  };

  /**
   * @description To provide hover effect conditionally
   *
   * @param {String} value
   *
   * @returns
   */
  const handleListHover = (value: string) => () => {
    setList(value);
  };

  /**
   * @description To remove hover effect on selected list
   */
  const handleListOnLeave = () => {
    setList("");
  };

  return (
    <Box>
      <Drawer open={isSideBarOpen} onClose={handleCloseSideBar}>
        <Box className="drawer" role="presentation">
          <Box className="side-bar-back">
            <ArrowBack onClick={handleCloseSideBar} />
          </Box>
          <List className="drawer-list">
            {Object.values(PAGES).map(({ label, value, url }) => (
              <ListItem key={value} disablePadding>
                <ListItemButton
                  onClick={redirectToPage(url)}
                  onMouseEnter={handleListHover(value)}
                  onMouseLeave={handleListOnLeave}
                >
                  <ListItemIcon sx={{ minWidth: "30px" }}>
                    {getIcon(value)}
                  </ListItemIcon>

                  <ListItemText
                    className={
                      value === selectedList ? "side-bar-list" : "side-list"
                    }
                    primary={label}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
        <Divider className="sidebar-divider" />
      </Drawer>
    </Box>
  );
};

export default SideBarMenu;
