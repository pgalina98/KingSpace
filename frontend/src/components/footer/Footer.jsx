import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Typography } from "@material-ui/core";

import { strings } from "../../localization/localization";

const useStyle = makeStyles((theme) => ({
  appBar: {
    top: "auto",
    bottom: 0,
    zIndex: theme.zIndex.drawer + 1,
  },
  toolbar: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  logoImage: {
    height: 64,
    marginRight: theme.spacing(1),
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  copyright: {
    fontSize: theme.font.fontSize.medium,
    [theme.breakpoints.down("sm")]: {
      fontSize: theme.font.fontSize.small,
    },
  },
}));

export default function Footer() {
  const ASSETS_FOLDER_URI = process.env.REACT_APP_ASSETS_URI;
  const classes = useStyle();

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <img
          src={ASSETS_FOLDER_URI + "king_akademija_2021_logo.png"}
          alt="Logo"
          className={classes.logoImage}
        />
        <Typography component="h1" className={classes.copyright}>
          {strings.formatString(strings.footerTitle)} &copy;
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
