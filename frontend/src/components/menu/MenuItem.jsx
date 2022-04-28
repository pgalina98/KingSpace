import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

const useStyle = makeStyles((theme) => ({
  listItem: {
    "& span": {
      fontSize: theme.font.fontSize.large,
    },
  },
}));

export default function MenuItem({ text, handleClickOnItem, children }) {
  const classes = useStyle();

  return (
    <ListItem button key={text} onClick={() => handleClickOnItem(text)}>
      <ListItemIcon>{children}</ListItemIcon>
      <ListItemText primary={text} className={classes.listItem} />
    </ListItem>
  );
}
