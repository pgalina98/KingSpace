import React, { useEffect, useState } from 'react';

import {
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Snackbar,
  makeStyles,
  CircularProgress,
  alpha,
} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import LinearProgress from '@material-ui/core/LinearProgress';
import { useParams, useHistory } from 'react-router-dom';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import 'moment/locale/hr';
import moment from 'moment';
import SaveIcon from '@material-ui/icons/Save';

import { BOX_TIMSKI } from '../../utils/constants';
import Topbar from '../../components/topbar/Topbar';
import Footer from '../../components/footer/Footer';
import Table from '../../components/table/Table';
import TitleBar from '../../components/titleBar/TitleBar';
import Scheduler from '../../components/scheduler/Scheduler';
import ServerError from '../../components/messages/error/ServerError';
import api from '../../utils/api';
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
  selectButtonContainer: {
    [theme.breakpoints.down('sm')]: {
      marginLeft: theme.spacing(5),
    },
  },
  menuPaper: {
    maxHeight: 110,
  },
  selectButton: {
    display: 'flex',
    alignItems: 'center',
  },
  selectButtonLabel: {
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

export default function TeamBoxDetails({
  newNotification,
  setNewNotification,
  setLoggedUser,
  handleLogout,
  handleChangeLanguage,
}) {
  const { id, selectedDate } = useParams();

  const [isFetchingData, setIsFetchingData] = useState(true);
  const [isFetchingTableData, setIsFetchingTableData] = useState(true);
  const [isSavingData, setIsSavingData] = useState(false);
  const [success, setSuccess] = useState(false);
  const [isServerError, setIsServerError] = useState(false);
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
  const [allBoxReservationsData, setAllBoxReservationsData] = useState();
  const [userTeams, setUserTeams] = useState();
  const [allTeams, setAllTeams] = useState();

  const [selectedDateFrom, setSelectedDateFrom] = useState(
    moment(selectedDate, 'DD.MM.yyyy')
  );
  const [selectedDateTo, setSelectedDateTo] = useState(
    moment(selectedDate, 'DD.MM.yyyy')
  );
  const [selectedTeam, setSelectedTeam] = useState({
    id: 0,
    name: '',
  });

  const user = JSON.parse(localStorage.getItem('user'));
  const history = useHistory();
  const classes = useStyles();

  useEffect(() => {
    const getBoxDetails = async () => {
      setIsFetchingData(true);

      await api
        .get(`/workspaces/${id}`)
        .then(({ data }) => {
          if (data.type.name !== BOX_TIMSKI) {
            history.push('/dashboard');
          }
          setBoxDetails(data);
        })
        .catch((error) => {
          console.log('ERROR: ', error);
          setIsServerError(true);
          setIsSavingData(false);
        })
        .finally(() => {
          getSelectedDateBoxReservations();
        });
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
          setAllBoxReservationsData(data);
        })
        .catch((error) => {
          console.log('ERROR: ', error);
          setIsServerError(true);
          setIsSavingData(false);
        })
        .finally(() => {
          if (user.authorities.includes('Admin')) {
            getAllTeams();
          } else {
            getUserTeams();
          }
        });
    };

    const getUserTeams = async () => {
      await api
        .get(`/users/${user.username}/teams`)
        .then(({ data }) => {
          setUserTeams(
            data.map((teamRole) => ({
              id: teamRole.team.id,
              name: teamRole.team.name,
            }))
          );
        })
        .catch((error) => {
          console.log('ERROR: ', error);
          setIsServerError(true);
          setIsSavingData(false);
        })
        .finally(() => {
          getAllTeams();
        });
    };

    const getAllTeams = async () => {
      await api
        .get('teams')
        .then(({ data }) => {
          setAllTeams(data);
        })
        .catch((error) => {
          console.log('ERROR: ', error);
        })
        .finally(() => {
          setIsFetchingData(false);
        });
    };

    getBoxDetails();
  }, [id, history, user.username, selectedDate, success]);

  useEffect(() => {
    const getBoxReservationsForDateInterval = async () => {
      setIsFetchingTableData(true);

      await api
        .get(
          `/workspaces/${id}/reservations?dateFrom=${selectedDateFrom.format(
            'DD.MM.yyyy'
          )}&dateUntil=${selectedDateTo.format('DD.MM.yyyy')}`
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
          setIsFetchingTableData(false);
        });
    };

    getBoxReservationsForDateInterval();
  }, [id, selectedDateFrom, selectedDateTo]);

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
        strings.formatString(strings.teamBoxDetailsWrongReservedUntilDate)
      );
      return;
    }

    setSelectedDateTo(value);
  };

  const handleTeamChange = (event) => {
    const { teamName } = event.currentTarget.dataset;

    setSelectedTeam({ id: event.target.value, name: teamName });
  };

  const handleReserveButtonClick = (event) => {
    if (moment(selectedDateFrom).isAfter(moment(selectedDateTo))) {
      handleSnackBarErrorOpen(
        strings.formatString(strings.teamBoxDetailsWrongReservedUntilFrom)
      );
      return;
    }

    if (selectedDateTo.diff(selectedDateFrom, 'days') > 14) {
      handleSnackBarErrorOpen(
        strings.formatString(strings.teamBoxDetailsInvalidReservationPeriod)
      );
      return;
    }

    if (selectedTeam.name.length === 0) {
      handleSnackBarErrorOpen(
        strings.formatString(strings.teamBoxDetailsInvalidTeam)
      );
      return;
    }

    const getTeamReservationsByDate = async () => {
      setIsSavingData(true);
      await api
        .get(
          `teams/${selectedTeam.id
          }/reservations?dateFrom=${selectedDateFrom.format(
            'DD.MM.YYYY'
          )}&dateUntil=${selectedDateTo.format('DD.MM.YYYY')}`
        )
        .then(({ data }) => {
          if (data?.length > 0) {
            const errorMessage = `${strings.formatString(
              strings.teamBoxDetailsTeamLabel
            )} ${data[0].team.name} ${strings.formatString(
              strings.teamBoxDetailsTeamReservationInIntervalExist
            )} ${selectedDateFrom.format(
              'DD.MM.YYYY'
            )} - ${selectedDateTo.format('DD.MM.YYYY')}`;
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
          `workspaces/${id}/reservations?dateFrom=${selectedDateFrom.format(
            'DD.MM.YYYY'
          )}&dateUntil=${selectedDateTo.format('DD.MM.YYYY')}`
        )
        .then(({ data }) => {
          if (data?.length > 0) {
            const errorMessage = `${strings.formatString(
              strings.teamBoxDetailsBoxLabel
            )} ${strings.formatString(
              strings.teamBoxDetailsBoxReservationInIntervalExist
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

    getTeamReservationsByDate();

    const createNewReservation = async () => {
      const newReservation = {
        workplaceId: null,
        workspaceId: id,
        teamId: selectedTeam.id,
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
              strings.teamBoxDetailsSuccessfulReservationFirstPart
            )}, ${strings.formatString(
              strings.teamBoxDetailsSuccessfulReservationSecondPart
            )} ${selectedDateFrom.format('DD.MM.YYYY')}-${selectedDateTo.format(
              'DD.MM.YYYY'
            )}, ${strings.formatString(
              strings.teamBoxDetailsSuccessfulReservationThirdPart
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

          Tvoja rezervacija radnog prostora Box ${newReservation.workspaceId} za tim ${selectedTeam.name}, u peridou ${newReservation.reservedFrom}-${newReservation.reservedUntil}, je uspješno pohranjena! 🎉

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

    const saveNotificationToLocalStorage = () => {
      let notificationMessage = {
        message: `${boxDetails.name}, ${selectedDateFrom.format(
          'DD.MM.YYYY'
        )} - ${selectedDateTo.format('DD.MM.YYYY')}`,
        user: `${user.username}`,
      };

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
              strings.teamBoxDetailsTitle
            )}`}
          />
          <Grid container className={classes.container}>
            <Grid item xs={12} sm={12} md={4}>
              {/*Left part of component*/}
              {isFetchingTableData ? (
                <LinearProgress color='secondary' />
              ) : isServerError ? (
                <ServerError />
              ) : (
                <Table
                  boxDetails={boxDetails}
                  selectedDateBoxReservations={selectedDateBoxReservations}
                />
              )}
            </Grid>
            {/*Right part of component*/}
            <Grid item xs={12} sm={12} md={8}>
              <Grid container>
                {/*Scheduler*/}
                <Grid item xs={12} sm={12} md={12}>
                  <Scheduler boxReservations={allBoxReservationsData} />
                </Grid>
                {/*DatePicker*/}
                {user.authorities.includes('Moderator') ||
                  user.authorities.includes('Admin') ? (
                  <Grid item xs={12} sm={12} md={12}>
                    <Grid container>
                      <Grid
                        item
                        xs={12}
                        sm={4}
                        md={4}
                        className={classes.datepickerContainer}
                      >
                        <MuiPickersUtilsProvider
                          locale={strings.getLanguage()}
                          utils={MomentUtils}
                        >
                          <div className={classes.datepicker}>
                            <span className={classes.datepickerText}>
                              {strings.formatString(
                                strings.teamBoxDetailsReserveFromLabel
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
                                strings.teamBoxDetailsReserveUntilLabel
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
                        sm={4}
                        md={4}
                        className={classes.selectButtonContainer}
                      >
                        <div className={classes.selectButton}>
                          <FormControl className={classes.formControl}>
                            <InputLabel
                              id='demo-simple-select-label'
                              className={classes.selectButtonLabel}
                            >
                              {strings.formatString(
                                strings.teamBoxDetailsChooseTeamLabel
                              )}
                            </InputLabel>
                            <Select
                              labelId='demo-simple-select-label'
                              id='demo-simple-select'
                              value={selectedTeam.id}
                              onChange={handleTeamChange}
                              inputProps={{
                                className: classes.fontResizeLarge,
                              }}
                              MenuProps={{
                                classes: { paper: classes.menuPaper },
                              }}
                            >
                              {user.authorities.includes('Admin')
                                ? allTeams.map((team) => (
                                  <MenuItem
                                    key={team.id}
                                    value={team.id}
                                    data-team-name={team.name}
                                  >
                                    {team.name}
                                  </MenuItem>
                                ))
                                : userTeams.map((team) => (
                                  <MenuItem
                                    key={team.id}
                                    value={team.id}
                                    data-team-name={team.name}
                                  >
                                    {team.name}
                                  </MenuItem>
                                ))}
                            </Select>
                          </FormControl>
                        </div>
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        sm={4}
                        md={4}
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
                            strings.teamBoxDetailsReserveButton
                          )}
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                ) : (
                  <></>
                )}
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
