import React, { useEffect, useState } from 'react';

import { useHistory, useParams } from 'react-router-dom';
import {
  Button,
  CircularProgress,
  alpha,
  Grid,
  LinearProgress,
  makeStyles,
  Snackbar,
} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import SaveIcon from '@material-ui/icons/Save';
import MomentUtils from '@date-io/moment';
import moment from 'moment';

import { BOX_POJEDINACNI } from '../../utils/constants';
import Topbar from '../../components/topbar/Topbar';
import Footer from '../../components/footer/Footer';
import ServerError from '../../components/messages/error/ServerError';
import TitleBar from '../../components/titleBar/TitleBar';
import api from '../../utils/api';
import Table from '../../components/table/Table';
import Scheduler from '../../components/scheduler/Scheduler';
import { strings } from '../../localization/localization';

function Alert(props) {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
}

const useStyles = makeStyles((theme) => ({
  container: {
    height: 'calc(100vh - 158px)',
    [theme.breakpoints.down('sm')]: {
      height: 'calc(100% - 145px)',
    },
  },
  datepickerContainer: {
    marginTop: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      marginLeft: theme.spacing(5),
    },
  },
  datepicker: {
    display: 'flex',
    alignItems: 'center',
  },
  datepickerText: {
    marginRight: theme.spacing(2),
    fontSize: theme.font.fontSize.medium,
    color: alpha('#000000', 0.54),
    whiteSpace: 'nowrap',
  },
  fontResizeSmall: {
    fontSize: theme.font.fontSize.medium,
  },
  fontResizeLarge: {
    fontSize: theme.font.fontSize.medium,
  },
  formControl: {
    margin: theme.spacing(1.5),
    minWidth: 200,
  },
  buttonContainer: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    paddingRight: theme.spacing(2),
  },
  button: {
    fontSize: theme.font.fontSize.large,
    '&:hover': {
      backgroundColor: theme.palette.secondary.light,
    },
  },
  alertIcon: {
    '& .MuiAlert-message': {
      fontSize: theme.font.fontSize.medium,
    },
    '& .MuiAlert-icon': {
      fontSize: 20,
    },
  },
}));

export default function SingleBoxDetails({
  newNotification,
  setNewNotification,
  setLoggedUser,
  handleLogout,
  handleChangeLanguage,
}) {
  const { id, selectedDate } = useParams();

  const [isFetchingData, setIsFetchingData] = useState(true);
  const [isServerError, setIsServerError] = useState(false);
  const [isSavingData, setIsSavingData] = useState(false);
  const [success, setSuccess] = useState(false);
  const [snackBarError, setSnackBarError] = useState({
    opened: false,
    errorMessage: '',
  });
  const [snackBarSuccess, setSnackBarSuccess] = useState({
    opened: false,
    errorMessage: '',
  });
  const [boxDetails, setBoxDetails] = useState();
  const [selectedDateBoxReservations, setSelectedDateBoxReservations] =
    useState();
  const [allBoxReservations, setAllBoxReservations] = useState();
  const [selectedChairReservations, setSelectedChairReservations] = useState();

  const user = JSON.parse(localStorage.getItem('user'));
  const history = useHistory();
  const classes = useStyles();

  const [selectedChair, setSelectedChair] = useState({
    id: '',
    name: 'A1',
    isReserved: false,
  });

  const [selectedDateFrom, setSelectedDateFrom] = useState(
    moment(selectedDate, 'DD.MM.yyyy')
  );
  const [selectedDateTo, setSelectedDateTo] = useState(
    moment(selectedDate, 'DD.MM.yyyy')
  );

  useEffect(() => {
    const getBoxDetails = async () => {
      setIsFetchingData(true);

      await api
        .get(`/workspaces/${id}`)
        .then(({ data }) => {
          if (data.type.name !== BOX_POJEDINACNI) {
            history.push('/dashboard');
          }

          setBoxDetails(data);
          setSelectedChair({
            ...selectedChair,
            id: data.workplaces.filter(
              (workplace) => workplace.name === 'A1'
            )[0].id,
          });
        })
        .catch((error) => {
          console.log('ERROR: ', error);
          setIsServerError(true);
          setIsSavingData(false);
        })
        .finally(() => getSelectedDateBoxReservations());
    };

    const getSelectedDateBoxReservations = async () => {
      await api
        .get(
          `/workspaces/${id}/reservations?dateFrom=${selectedDate}&dateUntil=${selectedDate}`
        )
        .then(({ data }) => {
          setSelectedDateBoxReservations(data);
        })
        .catch((error) => {
          console.log('ERROR: ', error);
          setIsServerError(true);
          setIsSavingData(false);
        })
        .finally(() => {
          getAllBoxReservations();
        });
    };

    const getAllBoxReservations = async () => {
      await api
        .get(`/workspaces/${id}/reservations`)
        .then(({ data }) => {
          setAllBoxReservations(data);
          setSelectedChairReservations(
            data.filter(
              (reservation) => reservation.workplace.name === selectedChair.name
            )
          );
        })
        .catch((error) => {
          console.log('ERROR: ', error);
          setIsServerError(true);
          setIsSavingData(false);
        })
        .finally(() => {
          setIsFetchingData(false);
        });
    };

    getBoxDetails();
  }, [id, history, user.username, selectedDate, success]);

  const handleChairClick = (event) => {
    const { chairId, chairName, chairIsReserved } = event.currentTarget.dataset;

    setSelectedChair({
      id: chairId,
      name: chairName,
      isReserved: chairIsReserved,
    });

    setSelectedChairReservations(
      allBoxReservations.filter(
        (reservation) => reservation.workplace.name === chairName
      )
    );
  };

  const handleSnackBarErrorOpen = (message) => {
    setSnackBarError({ opened: true, message });
  };

  const handleSnackbarErrorClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackBarError({ ...snackBarError, opened: false });
  };

  const handleSnackBarSuccessOpen = (message) => {
    setSnackBarSuccess({ opened: true, message });
  };

  const handleSnackbarSuccessClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackBarSuccess({ ...snackBarSuccess, opened: false });
  };

  const handleDateFromChange = (value) => {
    setSelectedDateFrom(value);
  };

  const handleDateToChange = (value) => {
    if (moment(value).isBefore(moment(selectedDateFrom))) {
      handleSnackBarErrorOpen(
        strings.formatString(strings.singleBoxDetailsWrongReservedUntilDate)
      );
      return;
    }

    setSelectedDateTo(value);
  };

  const handleReserveButtonClick = (event) => {
    if (moment(selectedDateFrom).isAfter(moment(selectedDateTo))) {
      handleSnackBarErrorOpen(
        strings.formatString(strings.singleDetailsWrongReservedUntilFrom)
      );
      return;
    }

    if (selectedDateTo.diff(selectedDateFrom, 'days') > 31) {
      handleSnackBarErrorOpen(
        strings.formatString(strings.singleBoxDetailsInvalidReservationPeriod)
      );
      return;
    }

    const getUserReservationsByDate = async () => {
      setIsSavingData(true);
      await api
        .get(
          `/users/${user.username
          }/reservations?dateFrom=${selectedDateFrom.format(
            'DD.MM.YYYY'
          )}&dateUntil=${selectedDateTo.format('DD.MM.YYYY')}`
        )
        .then(({ data }) => {
          if (
            data?.length > 0 &&
            data.some(
              (reservation) => reservation.typeOfReservation === BOX_POJEDINACNI
            )
          ) {
            const errorMessage = `${strings.formatString(
              strings.singleBoxDetailsInPeriodLabel
            )} ${selectedDateFrom.format(
              'DD.MM.YYYY'
            )} - ${selectedDateTo.format('DD.MM.YYYY')} ${strings.formatString(
              strings.singleBoxDetailsTeamReservationInIntervalExist
            )}`;
            handleSnackBarErrorOpen(errorMessage);
            setIsSavingData(false);
            return;
          } else {
            getWorkspaceReservationsByDate();
          }
        })
        .catch((error) => {
          console.log('ERROR: ', error);
          setIsServerError(true);
          setIsSavingData(false);
        });
    };

    const getWorkspaceReservationsByDate = async () => {
      await api
        .get(
          `/workspaces/${id}/reservations?dateFrom=${selectedDateFrom.format(
            'DD.MM.YYYY'
          )}&dateUntil=${selectedDateTo.format('DD.MM.YYYY')}`
        )
        .then(({ data }) => {
          if (
            data?.filter(
              (reservation) => reservation.workplace.id === selectedChair.id
            ).length > 0
          ) {
            const errorMessage = `${strings.formatString(
              strings.singleBoxDetailsWorkplaceLabel
            )} ${selectedChair.name}
            ${strings.formatString(
              strings.singleBoxDetailsWorkplaceReservationInIntervalExist
            )} ${selectedDateFrom.format(
              'DD.MM.YYYY'
            )} - ${selectedDateTo.format('DD.MM.YYYY')}`;
            handleSnackBarErrorOpen(errorMessage);
            setIsSavingData(false);
            return;
          } else {
            createNewReservation();
          }
        })
        .catch((error) => {
          console.log('ERROR: ', error);
          setIsServerError(true);
          setIsSavingData(false);
        });
    };

    getUserReservationsByDate();

    const createNewReservation = async () => {
      const newReservation = {
        workplaceId: selectedChair.id,
        workspaceId: null,
        teamId: null,
        user: user.username,
        dateOfReservation: moment().format('DD.MM.YYYY HH:mm:ss'),
        reservedFrom: selectedDateFrom.format('DD.MM.YYYY'),
        reservedUntil: selectedDateTo.format('DD.MM.YYYY'),
        createdByUser: user.username,
        updatedByUser: user.username,
        created: moment().format('DD.MM.YYYY HH:mm:ss'),
        updated: moment().format('DD.MM.YYYY HH:mm:ss'),
        validFrom: selectedDateFrom.format('DD.MM.YYYY'),
        validUntil: null,
        isActive: true,
      };

      await api
        .post('/reservations', newReservation)
        .then(({ data }) => {
          sendEmailToUser(newReservation);
          handleSnackBarSuccessOpen(
            `${strings.formatString(
              strings.singleBoxDetailsSuccessfulReservationFirstPart
            )} ${selectedChair.name} ${strings.formatString(
              strings.singleBoxDetailsSuccessfulReservationSecondPart
            )}, ${strings.formatString(
              strings.singleBoxDetailsSuccessfulReservationThirdPart
            )} ${selectedDateFrom.format('DD.MM.YYYY')}-${selectedDateTo.format(
              'DD.MM.YYYY'
            )}, ${strings.formatString(
              strings.singleBoxDetailsSuccessfulReservationFourthPart
            )}`
          );
          setSuccess(true);
        })
        .catch((error) => {
          console.log('ERROR: ', error);
          setIsServerError(true);
          setIsSavingData(false);
        })
        .finally(() => {
          setIsSavingData(false);
          setSelectedDateFrom(moment(selectedDate, 'DD.MM.yyyy'));
          setSelectedDateTo(moment(selectedDate, 'DD.MM.yyyy'));

          saveNotificationToLocalStorage();
        });
    };

    const sendEmailToUser = async (newReservation) => {
      const email = {
        to: user.email,
        subject: 'KingSpace | REZERVACIJA',
        body: ` 
          Bok ${user.firstName}!

          Tvoja rezervacija radnog mjesta ${selectedChair.name} u ${boxDetails.name}, u peridou ${newReservation.reservedFrom}-${newReservation.reservedUntil}, je uspješno pohranjena! 🎉

          Kreirane rezervacije možeš provjeriti unutar KingSpace aplikacije klikom na 'Moje rezervacije', odakle je omogućeno i upravljanje rezervacijama.

          Tvoj KingSpace tim! 😊`,
      };

      await api
        .post('/reservations/sendEmail', email)
        .then(({ data }) => {
        })
        .catch((error) => {
          console.log('ERROR: ', error);
        });
    };

    let notificationMessage = {
      message: `${boxDetails.name}/${selectedChair.name
        }, ${selectedDateFrom.format('DD.MM.YYYY')} - ${selectedDateTo.format(
          'DD.MM.YYYY'
        )}`,
      user: `${user.username}`,
    };

    const saveNotificationToLocalStorage = () => {
      let notifications =
        JSON.parse(localStorage.getItem('notifications')) || [];
      notifications.push(notificationMessage);

      localStorage.setItem('notifications', JSON.stringify(notifications));
      setNewNotification(!newNotification);
    };
    event.preventDefault();
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
        <LinearProgress color='secondary' />
      ) : isServerError ? (
        <ServerError />
      ) : (
        <>
          <TitleBar
            title={`${boxDetails.name} ${strings.formatString(
              strings.singleBoxDetailsTitle
            )}`}
          />
          <Grid container className={classes.container}>
            <Grid item xs={12} sm={12} md={4}>
              {/*Left part of component*/}
              <Table
                boxDetails={boxDetails}
                selectedDateBoxReservations={selectedDateBoxReservations}
                selectedChair={selectedChair}
                handleChairClick={handleChairClick}
              />
            </Grid>
            {/*Right part of component*/}
            <Grid item xs={12} sm={12} md={8}>
              <Grid container>
                {/*Scheduler*/}
                <Grid item xs={12} sm={12} md={12}>
                  <Scheduler boxReservations={selectedChairReservations} />
                </Grid>
                {/*DatePicker*/}

                <Grid item xs={12} sm={12} md={12}>
                  <Grid container>
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      md={6}
                      className={classes.datepickerContainer}
                    >
                      <MuiPickersUtilsProvider
                        locale={strings.getLanguage()}
                        utils={MomentUtils}
                      >
                        <div className={classes.datepicker}>
                          <span className={classes.datepickerText}>
                            {strings.formatString(
                              strings.singleDetailsReserveFromLabel
                            )}
                          </span>
                          <KeyboardDatePicker
                            allowKeyboardControl={false}
                            disablePast
                            error={false}
                            helperText={''}
                            disableToolbar
                            variant='inline'
                            format='DD. MMMM yyyy.'
                            margin='normal'
                            id='date-picker-inline-from'
                            value={selectedDateFrom}
                            onChange={handleDateFromChange}
                            KeyboardButtonProps={{
                              'aria-label': 'change date',
                            }}
                            autoOk
                            InputProps={{
                              className: classes.fontResizeLarge,
                              readOnly: true,
                            }}
                          />
                        </div>

                        <div className={classes.datepicker}>
                          <span className={classes.datepickerText}>
                            {strings.formatString(
                              strings.singleDetailsReserveUntilLabel
                            )}
                          </span>
                          <KeyboardDatePicker
                            allowKeyboardControl={false}
                            disablePast
                            error={false}
                            helperText={''}
                            disableToolbar
                            variant='inline'
                            format='DD. MMMM yyyy.'
                            margin='normal'
                            id='date-picker-inline-to'
                            value={selectedDateTo}
                            onChange={handleDateToChange}
                            KeyboardButtonProps={{
                              'aria-label': 'change date',
                            }}
                            autoOk
                            InputProps={{
                              className: classes.fontResizeLarge,
                              readOnly: true,
                            }}
                          />
                        </div>
                      </MuiPickersUtilsProvider>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      md={6}
                      className={classes.buttonContainer}
                    >
                      <Button
                        variant='contained'
                        size='medium'
                        className={classes.button}
                        startIcon={
                          isSavingData ? (
                            <CircularProgress color='secondary' size='25px' />
                          ) : (
                            <SaveIcon />
                          )
                        }
                        onClick={handleReserveButtonClick}
                        disabled={isSavingData}
                      >
                        {strings.formatString(
                          strings.singleDetailsReserveButton
                        )}
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Snackbar
            open={snackBarError.opened}
            autoHideDuration={6000}
            onClose={handleSnackbarErrorClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            <Alert
              className={classes.alertIcon}
              onClose={handleSnackbarErrorClose}
              severity='warning'
            >
              {snackBarError.message}
            </Alert>
          </Snackbar>
          <Snackbar
            open={snackBarSuccess.opened}
            autoHideDuration={6000}
            onClose={handleSnackbarSuccessClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            <Alert
              className={classes.alertIcon}
              onClose={handleSnackbarSuccessClose}
              severity='success'
            >
              {snackBarSuccess.message}
            </Alert>
          </Snackbar>
        </>
      )}
      <Footer />
    </>
  );
}
