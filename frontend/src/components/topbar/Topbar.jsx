import React, { useState, useEffect } from "react";

import { makeStyles, withStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Badge from "@material-ui/core/Badge";
import { Link } from "react-router-dom";
import {
  Menu as MenuIcon,
  Notifications as NotificationsIcon,
  Delete as DeleteIcon,
} from "@material-ui/icons";
import {
  AppBar,
  IconButton,
  Toolbar,
  Typography,
  Switch,
  Grid,
} from "@material-ui/core";
import Popper from "@material-ui/core/Popper";
import PopupState, { bindHover, bindPopper } from "material-ui-popup-state";
import Fade from "@material-ui/core/Fade";
import Paper from "@material-ui/core/Paper";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";
import { GB, HR } from "round-flags";

import Notification from "../notification/Notification";
import Navigation from "../navigation/Navigation";
import { strings } from "../../localization/localization";

const useStyle = makeStyles((theme) => ({
  flagIcon: {
    height: 20,
  },
  spacing: {
    marginRight: theme.spacing(4),
  },
  grow: {
    flexGrow: 1,
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },
  sectionLeft: {
    display: "flex",
    alignItems: "center",
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      marginRight: theme.spacing(1),
    },
    "&:hover": {
      color: theme.palette.secondary.main,
    },
  },
  logoImage: {
    display: "none",
    height: 60,
    marginRight: theme.spacing(1),
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  logoLetters: {
    fontSize: 22,
  },
  link: {
    textDecoration: "none",
    color: "white",
  },
  notificationIcon: {
    "&:hover": {
      color: theme.palette.secondary.main,
    },
  },
  notificationActiveIcon: {
    marginRight: 10,
  },
  notificationCard: {
    display: (props) => (props.isNotificationMenuOpen ? "block" : "none"),
    width: 225,
    maxHeight: 200,
    overflowY: "scroll",
    position: "absolute",
    marginTop: -10,
    right: 80,
    zIndex: theme.zIndex.drawer + 2,
  },
  notificationCardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  deleteIcon: {
    cursor: "pointer",
    fontSize: 19,
    "&:hover": {
      color: theme.palette.secondary.main,
    },
  },
  notificationCardTitle: {
    fontSize: 14,
  },
  notificationCardText: {
    display: "flex",
    alignItems: "center",
    fontSize: 12,
  },
  popper: {
    zIndex: theme.zIndex.drawer + 2,
  },
  popperText: {
    padding: theme.spacing(1),
    fontSize: 12,
  },
  sectionDesktop: {
    display: "flex",
  },
}));

const StyledAvatar = withStyles((theme) => ({
  root: {
    cursor: "initial",
    width: 32,
    height: 32,
    backgroundColor: "#0f1012",
    fontSize: theme.font.fontSize.large,
    marginRight: "15px",
    [theme.breakpoints.down("sm")]: {
      marginRight: "8px",
    },
    border: `2px solid ${theme.palette.background.paper}`,
  },
}))(Avatar);

export default function Topbar({
  login,
  newNotification,
  setNewNotification,
  handleLogout,
  handleChangeLanguage,
}) {
  const user = JSON.parse(localStorage.getItem("user"))
    ? JSON.parse(localStorage.getItem("user"))
    : null;
  const ASSETS_FOLDER_URI = process.env.REACT_APP_ASSETS_URI;
  const [notifications, setNotifications] = useState(
    localStorage.getItem("notifications") !== null
      ? JSON.parse(localStorage.getItem("notifications"))
      : []
  );
  const [isNotificationMenuOpen, setIsNotificationMenuOpen] = useState(false);
  const [isNavigationMenuOpen, setIsNavigationMenuOpen] = useState(false);
  const language = localStorage.getItem("language")
    ? localStorage.getItem("language")
    : "hr";
  const classes = useStyle({ isNotificationMenuOpen });

  const userInitials = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    return `${user.firstName[0].toUpperCase()}${user.lastName[0].toUpperCase()}`;
  };

  useEffect(() => {
    setNotifications(JSON.parse(localStorage.getItem("notifications")));
  }, [newNotification]);

  const handleNotificationIconClick = () => {
    setIsNotificationMenuOpen(!isNotificationMenuOpen);
  };

  const handleMenuIconClick = () => {
    setIsNavigationMenuOpen(!isNavigationMenuOpen);
  };

  const handleClearNotifications = () => {
    localStorage.removeItem("notifications");
    setNotifications([]);
  };

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar className={classes.toolbar}>
          <div className={classes.sectionLeft}>
            {!login && (
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="open drawer"
                onClick={handleMenuIconClick}
              >
                <MenuIcon fontSize="large" />
              </IconButton>
            )}
            <img
              src={ASSETS_FOLDER_URI + "king_logo.png"}
              alt="Logo"
              className={classes.logoImage}
            />
            <Link to="/" className={classes.link}>
              <Typography className={classes.logoLetters} variant="h6" noWrap>
                King Space
              </Typography>
            </Link>
          </div>
          {!login ? (
            <div className={classes.sectionDesktop}>
              <Grid
                component="label"
                container
                alignItems="center"
                spacing={1}
                className={classes.spacing}
              >
                <Grid item>
                  <img
                    src={HR}
                    className={classes.flagIcon}
                    alt="HR zastava/flag"
                  />
                </Grid>
                <Grid item>
                  <Switch
                    checked={language === "hr" ? false : true}
                    onChange={handleChangeLanguage} // relevant method to handle your change
                    size="medium"
                  />
                </Grid>
                <Grid item>
                  <img
                    src={GB}
                    className={classes.flagIcon}
                    alt="GB zastava/flag"
                  />
                </Grid>
              </Grid>
              <PopupState variant="popper" popupId="popup-popper">
                {(popupState) => (
                  <>
                    <IconButton
                      aria-label="show notifications"
                      color="inherit"
                      className={classes.notificationIcon}
                      onClick={handleNotificationIconClick}
                      {...bindHover(popupState)}
                    >
                      <Badge
                        badgeContent={
                          notifications?.filter(
                            (notification) =>
                              notification.user === user?.username
                          ).length
                        }
                        color="secondary"
                      >
                        <NotificationsIcon fontSize="large" />
                      </Badge>
                    </IconButton>
                    <Popper
                      className={classes.popper}
                      {...bindPopper(popupState)}
                      transition
                    >
                      {({ TransitionProps }) => (
                        <Fade {...TransitionProps} timeout={350}>
                          <Paper>
                            <Typography className={classes.popperText}>
                              {strings.formatString(
                                strings.topbatToggleNotification
                              )}
                            </Typography>
                          </Paper>
                        </Fade>
                      )}
                    </Popper>
                  </>
                )}
              </PopupState>
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls="primary-search-account-menu"
                aria-haspopup="true"
                color="inherit"
              >
                <StyledAvatar>{userInitials()}</StyledAvatar>
              </IconButton>
            </div>
          ) : (
            <div className={classes.sectionDesktop}>
              <Grid component="label" container alignItems="center" spacing={1}>
                <Grid item>
                  <img
                    src={HR}
                    className={classes.flagIcon}
                    alt="HR zastava/flag"
                  />
                </Grid>
                <Grid item>
                  <Switch
                    checked={language === "hr" ? false : true}
                    onChange={handleChangeLanguage} // relevant method to handle your change
                    size="medium"
                  />
                </Grid>
                <Grid item>
                  <img
                    src={GB}
                    className={classes.flagIcon}
                    alt="gb zastava/flag"
                  />
                </Grid>
              </Grid>
            </div>
          )}
        </Toolbar>
      </AppBar>
      <Fade in={isNotificationMenuOpen} timeout={500}>
        <Card variant="outlined" className={classes.notificationCard}>
          <CardContent>
            <div className={classes.notificationCardHeader}>
              <Typography
                className={classes.notificationCardTitle}
                color="textSecondary"
                gutterBottom
              >
                Notifications
              </Typography>
              <DeleteIcon
                className={classes.deleteIcon}
                onClick={handleClearNotifications}
              />
            </div>
            <Divider style={{ marginBottom: "10px" }} />
            {notifications &&
            notifications.filter(
              (notification) => notification.user === user?.username
            ).length > 0 ? (
              notifications
                .filter((notification) => notification.user === user?.username)
                .map((notification, index) => (
                  <Notification
                    key={index}
                    id={index + 1}
                    text={notification?.message}
                    newNotification={newNotification}
                    setNewNotification={setNewNotification}
                  />
                ))
            ) : (
              <Notification text={"Nothing Yet!"} />
            )}
          </CardContent>
        </Card>
      </Fade>
      {isNavigationMenuOpen && (
        <Navigation
          isNavigationMenuOpen={isNavigationMenuOpen}
          handleMenuIconClick={handleMenuIconClick}
          handleLogout={handleLogout}
        />
      )}
    </div>
  );
}
