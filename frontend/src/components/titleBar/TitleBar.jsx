import React from "react";

import { AppBar, makeStyles, Toolbar } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  appBar: {
    height: 30,
    [theme.breakpoints.down("sm")]: {
      marginTop: "-1px",
    },
  },
  toolbar: {
    minHeight: 0,
  },
}));

export default function TitleBar({ title }) {
  const classes = useStyles();

  return (
    <AppBar position="relative" className={classes.appBar}>
      <Toolbar
        className={classes.toolbar}
        classes={{ regular: classes.toolbar }}
      >
        {title}
      </Toolbar>
    </AppBar>
  );
}
