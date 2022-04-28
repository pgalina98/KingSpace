import React from "react";

import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Hidden, Drawer, List } from "@material-ui/core";
import {
  TableChart as TableChartIcon,
  Speed as SpeedIcon,
  EventNote as EventNoteIcon,
  ExitToApp as ExitToAppIcon,
} from "@material-ui/icons";
import NavigationItem from "./NavigationItem";

import { ROLA_ADMIN } from "../../utils/constants";
import { strings } from "../../localization/localization";

const useStyle = makeStyles((theme) => ({
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: 300,
      flexShrink: 0,
    },
  },
  drawerPaper: {
    top: 64,
    width: 300,
    [theme.breakpoints.down("sm")]: {
      top: 60,
      width: "85%",
    },
  },
  link: {
    textDecoration: "none",
    color: "black",
  },
  list: {
    height: "calc(100vh - 64px)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
}));

export default function Navigation({
  isNavigationMenuOpen,
  handleMenuIconClick,
  handleLogout,
}) {
  const classes = useStyle();
  const user = JSON.parse(localStorage.getItem("user"));
  const isAdmin = user.authorities.some((role) => role === ROLA_ADMIN);

  const drawer = (
    <div>
      <List className={classes.list}>
        <div>
          <Link to="/dashboard" className={classes.link}>
            <NavigationItem
              text={strings.formatString(strings.navigationItemDashboardText)}
            >
              <TableChartIcon fontSize="large" />
            </NavigationItem>
          </Link>
          <Link to="/myReservations" className={classes.link}>
            <NavigationItem
              text={strings.formatString(
                strings.navigationItemMyReservationsText
              )}
            >
              <EventNoteIcon fontSize="large" />
            </NavigationItem>
          </Link>
          {isAdmin && (
            <Link to="/adminPanel" className={classes.link}>
              <NavigationItem
                text={strings.formatString(
                  strings.navigationItemAdminPanelText
                )}
              >
                <SpeedIcon fontSize="large" />
              </NavigationItem>
            </Link>
          )}
        </div>
        <div>
          <Link to="/#" className={classes.link} onClick={handleLogout}>
            <NavigationItem
              text={strings.formatString(strings.navigationItemLogoutText)}
            >
              <ExitToAppIcon fontSize="large" />
            </NavigationItem>
          </Link>
        </div>
      </List>
    </div>
  );

  return (
    <nav className={classes.drawer} aria-label="navigation menu">
      <Hidden smUp implementation="css">
        <Drawer
          variant="temporary"
          open={isNavigationMenuOpen}
          onClose={handleMenuIconClick}
          classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true,
          }}
        >
          {drawer}
        </Drawer>
      </Hidden>
      <Hidden xsDown implementation="css">
        <Drawer
          classes={{
            paper: classes.drawerPaper,
          }}
          variant="permanent"
          open
        >
          {drawer}
        </Drawer>
      </Hidden>
    </nav>
  );
}
