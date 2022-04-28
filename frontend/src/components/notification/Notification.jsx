import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import {
  NotificationsActive as NotificationsActiveIcon,
  Delete as DeleteIcon,
} from '@material-ui/icons';

const useStyle = makeStyles((theme) => ({
  notificationActiveIcon: {
    marginRight: 10,
  },
  notificationCardText: {
    display: 'flex',
    alignItems: 'center',
    fontSize: 12,
  },
  deleteIcon: {
    cursor: 'pointer',
    fontSize: 19,
    '&:hover': {
      color: theme.palette.secondary.main,
    },
  },
  notificationContainer: {
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  notificationText: {
    display: 'flex',
    alignItems: 'center',
  },
}));

export default function Notification({
  id,
  text,
  newNotification,
  setNewNotification,
}) {
  const classes = useStyle();

  const handleDeleteSingleNotification = (event) => {
    const { value } = event.currentTarget.dataset;

    let notifications = JSON.parse(localStorage.getItem('notifications'));

    notifications = notifications.filter(
      (notification) => notification !== value
    );

    localStorage.setItem('notifications', JSON.stringify(notifications));
    setNewNotification(!newNotification);
  };

  return (
    <Typography
      component={'span'}
      className={classes.notificationCardText}
      color='textSecondary'
      gutterBottom
    >
      <div className={classes.notificationContainer}>
        <div className={classes.notificationText}>
          <NotificationsActiveIcon className={classes.notificationActiveIcon} />
          {text}
        </div>
        {id && (
          <DeleteIcon
            data-value={text}
            className={classes.deleteIcon}
            onClick={handleDeleteSingleNotification}
          />
        )}
      </div>
    </Typography>
  );
}
