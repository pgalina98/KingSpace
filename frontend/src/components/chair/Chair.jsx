import React from 'react';

import {
  Avatar,
  Fade,
  makeStyles,
  Paper,
  Popper,
  Typography,
} from '@material-ui/core';
import PopupState, { bindHover, bindPopper } from 'material-ui-popup-state';

const useStyles = makeStyles((theme) => ({
  avatar: {
    width: 50,
    height: 50,
    fontSize: '18px',
    border: (props) =>
      props.name
        ? props?.name === props.selectedChair?.name
          ? `3px solid black`
          : `3px solid ${theme.palette.background.paper}`
        : `3px solid ${theme.palette.background.paper}`,
    backgroundColor: (props) =>
      props.isReserved ? theme.palette.secondary.main : 'green',
    '&:hover': {
      border: (props) =>
        props.hoverEnabled ? `3px solid ${theme.palette.primary.main}` : '',
    },
    [theme.breakpoints.down('sm')]: {
      width: 40,
      height: 40,
    },
  },
  popper: {
    marginTop: 3,
    zIndex: theme.zIndex.drawer + 1,
  },
  popperText: {
    padding: theme.spacing(1),
    fontSize: 12,
  },
}));

export default function Chair({
  name,
  isReserved,
  reservedByUser,
  selectedChair,
  hoverEnabled,
}) {
  const classes = useStyles({ isReserved, hoverEnabled, name, selectedChair });

  return (
    <>
      {name === undefined ? (
        <Avatar className={classes.avatar} />
      ) : (
        <PopupState variant='popper' popupId='popup-popper'>
          {(popupState) => (
            <>
              <Avatar className={classes.avatar} {...bindHover(popupState)} />
              <Popper
                className={classes.popper}
                {...bindPopper(popupState)}
                transition
              >
                {({ TransitionProps }) => (
                  <Fade {...TransitionProps} timeout={350}>
                    <Paper>
                      <Typography className={classes.popperText}>
                        {name} {reservedByUser ? ` | ${reservedByUser}` : ''}
                      </Typography>
                    </Paper>
                  </Fade>
                )}
              </Popper>
            </>
          )}
        </PopupState>
      )}
    </>
  );
}
