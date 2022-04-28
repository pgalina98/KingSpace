import React from "react";

import { makeStyles } from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";

import { strings } from "../../../localization/localization";

const useStyles = makeStyles((theme) => ({
  rootAlert: {
    fontSize: theme.font.fontSize.small,
  },
  rootTitle: {
    fontSize: theme.font.fontSize.medium,
  },
  errorImage: {
    display: "block",
    marginTop: theme.spacing(2),
    marginLeft: "auto",
    marginRight: "auto",
    width: "60%",
    [theme.breakpoints.down("sm")]: {
      width: "80%",
    },
  },
}));

export default function ServerError() {
  const ASSETS_FOLDER_URI = process.env.REACT_APP_ASSETS_URI;
  const classes = useStyles();

  return (
    <div>
      <Alert classes={{ root: classes.rootAlert }} severity="error">
        <AlertTitle classes={{ root: classes.rootTitle }}>Error</AlertTitle>
        {strings.formatString(strings.serverErrorMessageTitle)} —{" "}
        <strong>{strings.formatString(strings.serverErrorMessageText)}</strong>
      </Alert>
      <img
        className={classes.errorImage}
        src={ASSETS_FOLDER_URI + "error_page.png"}
        alt="Error page"
      />
    </div>
  );
}
