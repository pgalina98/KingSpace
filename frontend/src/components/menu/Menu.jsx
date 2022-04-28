import React from "react";

import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import List from "@material-ui/core/List";
import {
  AccountTree as AccountTreeIcon,
  Assignment as AssignmentIcon,
  Domain as DomainIcon,
  SupervisorAccount as SupervisorAccountIcon,
} from "@material-ui/icons/";

import MenuItem from "./MenuItem";
import { Divider } from "@material-ui/core";

import { strings } from "../../localization/localization";

const useStyles = makeStyles((theme) => ({
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    left: 0,
    width: 300,
    height: "calc(100vh - 128px)",
    borderLeft: "1px solid #e0e0e0",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 5px",
    ...theme.mixins.toolbar,
  },
  toolbarIconChevron: {
    "&:hover": {
      color: theme.palette.secondary.main,
    },
  },
}));

export default function Menu({
  isDashboardMenuOpen,
  handleDrawerClose,
  handleClickOnItem,
}) {
  const classes = useStyles();

  return (
    <Drawer
      variant="permanent"
      classes={{
        paper: clsx(
          classes.drawerPaper,
          !isDashboardMenuOpen && classes.drawerPaperClose
        ),
      }}
      open={isDashboardMenuOpen}
    >
      <div className={classes.toolbarIcon}>
        <IconButton
          onClick={handleDrawerClose}
          className={classes.toolbarIconChevron}
        >
          <ChevronLeftIcon fontSize="large" />
        </IconButton>
      </div>
      <Divider />
      <List>
        <MenuItem
          text={strings.formatString(strings.menuItemReservations)}
          handleClickOnItem={handleClickOnItem}
        >
          <AssignmentIcon fontSize="large" />
        </MenuItem>
        <MenuItem
          text={strings.formatString(strings.menuItemWorkspaces)}
          handleClickOnItem={handleClickOnItem}
        >
          <DomainIcon fontSize="large" />
        </MenuItem>
        <MenuItem
          text={strings.formatString(strings.menuItemUserAuthorities)}
          handleClickOnItem={handleClickOnItem}
        >
          <SupervisorAccountIcon fontSize="large" />
        </MenuItem>
        <MenuItem
          text={strings.formatString(strings.menuItemProjects)}
          handleClickOnItem={handleClickOnItem}
        >
          <AccountTreeIcon fontSize="large" />
        </MenuItem>
      </List>
    </Drawer>
  );
}
