import React, { useState, useEffect } from "react";

import {
  Container,
  Grid,
  LinearProgress,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import moment from "moment";
import "moment/locale/hr";
import MomentUtils from "@date-io/moment";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import ServerError from "../../components/messages/error/ServerError";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Button from "@material-ui/core/Button";
import KeyboardReturnRoundedIcon from "@material-ui/icons/KeyboardReturnRounded";
import Popper from "@material-ui/core/Popper";
import PopupState, { bindHover, bindPopper } from "material-ui-popup-state";

import Topbar from "../../components/topbar/Topbar";
import Footer from "../../components/footer/Footer";
import BoxCard from "../../components/card/BoxCard";
import api from "../../utils/api";
import { strings } from "../../localization/localization";

const useStyles = makeStyles((theme) => ({
  root: {
    "& input::placeholder": {
      fontSize: theme.font.fontSize.medium,
    },
    "& label": {
      fontSize: theme.font.fontSize.medium,
    },
  },
  container: {
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(10),
  },
  galleryContainer: {
    paddingLeft: theme.spacing(5),
    [theme.breakpoints.down("sm")]: {
      paddingTop: theme.spacing(3),
      paddingLeft: theme.spacing(3),
    },
    minWidth: "275",
  },
  dateContainer: {
    paddingTop: theme.spacing(3),
    paddingRight: theme.spacing(5),
    [theme.breakpoints.down("sm")]: {
      paddingTop: theme.spacing(3),
      paddingLeft: theme.spacing(3),
    },
    minWidth: "275",
  },
  datePickerSize: {
    width: "150px",
  },
  inputProp: {
    fontSize: theme.font.fontSize.medium,
  },
  gallery: {
    marginTop: "1rem",
    marginLeft: "1rem",
    maxWidth: "150px",
    border: "orange solid 3px",
    borderRadius: "1rem",
  },
  galleryModalTitle: {
    textAlign: "center",
  },
  modalBackButton: {
    fontSize: "3rem",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    overflowX: "scroll",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
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

export default function Dashboard({
  newNotification,
  setNewNotification,
  setLoggedUser,
  handleLogout,
  handleChangeLanguage,
}) {
  const [isFetchingData, setIsFetchingData] = useState(true);
  const [data, setData] = useState([]);
  const [errorOccurred, setErrorOccured] = useState(false);
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const classes = useStyles();
  const [selectedDate, setSelectedDate] = useState(moment());
  const ASSETS_FOLDER_URI = process.env.REACT_APP_ASSETS_URI;

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const getBoxes = async () => {
      setIsFetchingData(true);

      await api
        .get(`/workspaces/dashboard?date=${selectedDate.format("DD.MM.yyyy")}`)
        .then(({ data }) => {
          setData(data);
        })
        .catch((err) => {
          console.log("Dashboard error: " + err);
          setErrorOccured(true);
        })
        .finally(() => {
          setIsFetchingData(false);
        });
    };

    getBoxes();
  }, [selectedDate]);

  const handleDateChange = (value) => {
    setSelectedDate(value);
  };

  return (
    <>
      <Topbar
        newNotification={newNotification}
        setNewNotification={setNewNotification}
        setLoggedUser={setLoggedUser}
        handleLogout={handleLogout}
        handleChangeLanguage={handleChangeLanguage}
      />
      {isFetchingData ? (
        <LinearProgress color="secondary" />
      ) : errorOccurred ? (
        <ServerError />
      ) : (
        <>
          <Grid container justifyContent="space-between" spacing={0}>
            <Grid item sm={12} md className={classes.galleryContainer}>
              <PopupState variant="popper" popupId="popup-popper">
                {(popupState) => (
                  <>
                    <img
                      className={classes.gallery}
                      src={ASSETS_FOLDER_URI + "gallery.png"}
                      alt="Gallery"
                      onClick={handleOpen}
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
                                strings.dashboardToggleLegend
                              )}
                            </Typography>
                          </Paper>
                        </Fade>
                      )}
                    </Popper>
                  </>
                )}
              </PopupState>
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
                      className={classes.galleryModalTitle}
                    >
                      {strings.formatString(
                        strings.dashboardGalleryLegendTitle
                      )}
                    </h2>
                    <img
                      className={classes.galeryModal}
                      src={ASSETS_FOLDER_URI + "gallery.png"}
                      alt="Gallery"
                    />
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleClose}
                    >
                      <KeyboardReturnRoundedIcon
                        className={classes.modalBackButton}
                      />
                    </Button>
                  </div>
                </Fade>
              </Modal>
            </Grid>
            <Grid item className={classes.dateContainer}>
              <MuiPickersUtilsProvider
                utils={MomentUtils}
                locale={strings.getLanguage()}
              >
                <KeyboardDatePicker
                  autoOk
                  variant="inline"
                  inputVariant="outlined"
                  label={strings.formatString(strings.dashboardCalendar)}
                  format="DD.MM.yyyy."
                  disableToolbar
                  disablePast
                  value={selectedDate}
                  InputAdornmentProps={{ position: "start" }}
                  onChange={handleDateChange}
                  InputProps={{ className: classes.inputProp, readOnly: true }}
                  classes={{ root: classes.root }}
                  className={classes.datePickerSize}
                  invalidDateMessage={strings.formatString(
                    strings.dashboardInvalidDateMessage
                  )}
                />
              </MuiPickersUtilsProvider>
            </Grid>
          </Grid>
          <Container className={classes.container}>
            <Grid container spacing={isSmall ? 4 : 9}>
              {data.projections &&
                data.projections.map((box) => {
                  return (
                    <Grid item xs={12} sm={6} md={3} key={box.id}>
                      <BoxCard {...box} selectedDate={selectedDate} />
                    </Grid>
                  );
                })}
            </Grid>
          </Container>
        </>
      )}
      <Footer />
    </>
  );
}
