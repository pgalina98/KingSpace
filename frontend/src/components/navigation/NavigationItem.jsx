import React from 'react';

import { ListItem, ListItemText, ListItemIcon } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyle = makeStyles((theme) => ({
  drawer: {
    marginTop: 100,
    [theme.breakpoints.up('sm')]: {
      width: 300,
      flexShrink: 0,
    },
  },
  drawerPaper: {
    top: 64,
    width: 300,
    [theme.breakpoints.down('sm')]: {
      top: 60,
      width: '85%',
    },
  },
  listItem: {
    '& span': {
      fontSize: theme.font.fontSize.large,
    },
  },
}));

export default function NavigationItem({ text, children }) {
  const classes = useStyle();

  return (
    <ListItem button key={text}>
      <ListItemIcon>{children}</ListItemIcon>
      <ListItemText primary={text} className={classes.listItem} />
    </ListItem>
  );
}
