import React, { useState } from "react";
import { CardHeader, makeStyles, Paper, Popper } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import PersonIcon from "@material-ui/icons/Person";
import PeopleIcon from "@material-ui/icons/People";
import { Link } from "react-router-dom";
import CardMedia from "@material-ui/core/CardMedia";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import KeyboardReturnRoundedIcon from "@material-ui/icons/KeyboardReturnRounded";
import PopupState, { bindHover, bindPopper } from "material-ui-popup-state";

import { strings } from "../../localization/localization";

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: "center",
    borderRadius: "2rem",
    backgroundColor: theme.palette.primary.main,
    color: "white",
    justifyContent: "center",
  },
  avatar: {
    color: "white",
    width: 35,
    height: 35,
    padding: "1rem",
    boxShadow: "0px 0px 7px #272827 inset",
    backgroundColor: ({ capacity, reserved }) =>
      capacity === reserved ? theme.palette.secondary.main : "green",
  },
  button: {
    color: "white",
    fontSize: "2rem",
    borderRadius: "2rem",
    textTransform: "capitalize",
    backgroundColor: theme.palette.secondary.light,
    "&:hover": {
      backgroundColor: "#db7c03",
    },
    boxShadow: "0px 0px 4px #272827 inset",
  },
  userIcon: {
    width: 40,
    height: 40,
  },
  boxTitleText: {
    fontSize: "1rem",
    color: "white",
  },
  boxCapacityText: {
    fontSize: "2rem",
    color: "white",
  },
  link: {
    textDecoration: "none",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  info: {
    fontSize: "3.5rem",
    paddingRight: "2rem",
    color: "white",
  },
  cardActions: {
    justifyContent: "center",
    marginBottom: "1rem",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  galeryModalTitle: {
    textAlign: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  modalBackButton: {
    fontSize: "3rem",
  },
  title: {
    fontSize: 24,
  },
  subHeader: {
    color: "white",
  },
  infoDetailsContainer: {
    flexGrow: 1,
    display: "flex",
    justifyContent: "space-between",
  },
  popper: {
    zIndex: theme.zIndex.drawer + 2,
    marginTop: 3,
  },
  popperText: {
    padding: theme.spacing(1),
    fontSize: 12,
  },
}));

export default function BoxCard({
  id,
  name,
  capacity,
  reserved,
  teamIndicator,
  teamName,
  selectedDate,
  imageURL,
}) {
  const classes = useStyles({ capacity, reserved });
  const ASSETS_FOLDER_URI = process.env.REACT_APP_ASSETS_URI;
  const GALLERY_FOLDER_URI = ASSETS_FOLDER_URI + "gallery/";
  const BOX_FOLDER_URI = ASSETS_FOLDER_URI + "box/";

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Card className={classes.root}>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              {teamIndicator ? (
                <PopupState variant="popper" popupId="popup-popper">
                  {(popupState) => (
                    <>
                      <PeopleIcon
                        className={classes.userIcon}
                        {...bindHover(popupState)}
                      />
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
                                  strings.boxCardToggleTeamBoxType
                                )}
                              </Typography>
                            </Paper>
                          </Fade>
                        )}
                      </Popper>
                    </>
                  )}
                </PopupState>
              ) : (
                <PopupState variant="popper" popupId="popup-popper">
                  {(popupState) => (
                    <>
                      <PersonIcon
                        className={classes.userIcon}
                        {...bindHover(popupState)}
                      />

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
                                  strings.boxCardToggleSingleBoxType
                                )}
                              </Typography>
                            </Paper>
                          </Fade>
                        )}
                      </Popper>
                    </>
                  )}
                </PopupState>
              )}
            </Avatar>
          }
          title={<Typography className={classes.title}>{name}</Typography>}
          subheader={
            teamIndicator ? (
              <Typography className={classes.subHeader} variant="h5">
                {teamName}
              </Typography>
            ) : (
              ""
            )
          }
        />
        <CardMedia
          className={classes.media}
          image={BOX_FOLDER_URI + imageURL}
          title="Box image"
        />
        <CardContent>
          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
            className={classes.boxCapacityText}
          >
            {reserved} / {capacity}
          </Typography>
        </CardContent>
        <CardActions disableSpacing className={classes.cardActions}>
          <div className={classes.infoDetailsContainer}>
            <Button onClick={handleOpen}>
              <InfoOutlinedIcon className={classes.info} />
            </Button>
            <Link
              to={
                teamIndicator
                  ? `/teamBox/${id}/reservations/${selectedDate.format(
                    "DD.MM.yyyy"
                  )}`
                  : `/singleBox/${id}/reservations/${selectedDate.format(
                    "DD.MM.yyyy"
                  )}`
              }
              className={classes.link}
            >
              <Button className={classes.button}>
                {strings.formatString(strings.boxCardDetails)}
              </Button>
            </Link>
          </div>
        </CardActions>
      </Card>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2
              id="transition-modal-title"
              className={classes.galeryModalTitle}
            >
              {strings.formatString(strings.boxCardGalleryLegendTitle)} {name}
            </h2>
            <img
              className={classes.galeryModal}
              src={
                imageURL === "defaultBox.jpg"
                  ? ASSETS_FOLDER_URI + `gallery.png`
                  : GALLERY_FOLDER_URI +
                  `gallery_${name.toLowerCase().replace(" ", "-")}.png`
              }
              alt="Galery Box"
            />
            <Button variant="contained" color="primary" onClick={handleClose}>
              <KeyboardReturnRoundedIcon className={classes.modalBackButton} />
            </Button>
          </div>
        </Fade>
      </Modal>
    </>
  );
}
