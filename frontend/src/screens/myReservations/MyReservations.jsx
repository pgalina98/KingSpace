import React, { useState, useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import {
  Container,
  Typography,
  Tabs,
  Tab,
  AppBar,
  Grid,
  LinearProgress,
  IconButton,
  Snackbar,
} from '@material-ui/core';

import Scheduler from './Scheduler.jsx';
import BrisanjeDialog from '../../components/dialog/Dialog';
import DialogOznaceno from '../../components/dialog/DialogOznaceno';
import TabPanel from './TabPanel';
import DataTable from '../../components/dataTable/DataTable';
import FilterForma from './FilterForma';
import style from './style';
import DeleteIcon from '@material-ui/icons/Delete';

import ServerError from '../../components/messages/error/ServerError';
import Topbar from '../../components/topbar/Topbar.jsx';
import Footer from '../../components/footer/Footer.jsx';
import TitleBar from '../../components/titleBar/TitleBar.jsx';
import { BOX_TIMSKI } from '../../utils/constants.js';
import api from '../../utils/api';
import { strings } from '../../localization/localization';
import MuiAlert from '@material-ui/lab/Alert';
import moment from 'moment';

function Alert(props) {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
}

const useStyles = makeStyles(style);
const MyReservations = ({
  newNotification,
  setNewNotification,
  setLoggedUser,
  handleLogout,
  handleChangeLanguage,
}) => {
  const classes = useStyles();

  const [rezervacije, setRezervacije] = useState([]);
  const [sveRezervacije, setSveRezervacije] = useState([]);
  const [aktivneRezervacije, setAktivneRezervacije] = useState([]);
  const [sveAktivneRezervacije, setSveAktivneRezervacije] = useState([]);
  const [value, setValue] = useState(0);
  const [tipBoxa, setTipBoxa] = useState('Svi');
  const [box, setBox] = useState('Svi');
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [boxevi, setBoxevi] = useState([]);
  const [rezerviranoOd, setRezerviranoOd] = useState('');
  const [rezerviranoDo, setRezerviranoDo] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedRezervacijaId, setSelectedRezervacijaId] = useState(0);
  const [podaciDohvaceni, setPodaciDohvaceni] = useState(false);
  const [oznaceneRezervacijeId, setOznaceneRezervacijeId] = useState([]);
  const [openOznacenoDialog, setOpenOznacenoDialog] = useState(false);
  const [errorOccurred, setErrorOccured] = useState(false);
  const [disabledDeleteSelected, setDisabledDeleteSelected] = useState(true);
  const [snackBarSuccess, setSnackBarSuccess] = useState({
    opened: false,
    errorMessage: '',
  });
  const [snackBarError, setSnackBarError] = useState({
    opened: false,
    errorMessage: '',
  });

  const user = JSON.parse(localStorage.getItem('user'));

  const handleChange = (event, newValue) => {
    setValue(newValue);
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

  function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }

  useEffect(() => {
    const getAllUserReservations = async () => {
      await api
        .get(`/users/${user.username}/reservations`)
        .then((response) => {
          setRezervacije(response.data);
          setSveRezervacije(response.data);
          setAktivneRezervacije(response.data);
          setSveAktivneRezervacije(response.data);

          setBoxevi(
            response.data
              .map((rezervacija) => rezervacija.workspace.name)
              .filter(onlyUnique)
          );
        })
        .catch((err) => {
          console.log('Moje rezervacije error: ' + err);
          setErrorOccured(true);
        })
        .finally(() => {
          setPodaciDohvaceni(true);
        });
    };

    getAllUserReservations();
  }, []);

  const handleDelete = (rezervacijaId) => {
    setSelectedRezervacijaId(rezervacijaId);
    setOpenDialog(true);
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  function dataRefactor(date) {
    const data = date.split('-');
    const newFormatDate = data[2]
      .concat('.')
      .concat(data[1])
      .concat('.')
      .concat(data[0])
      .concat('.');
    return newFormatDate;
  }

  const handleChangeTipBoxa = (event) => {
    setTipBoxa(event.target.value);

    let filtriraneRezervacije = sveRezervacije;
    let filtriraneAktivneRezervacije = sveAktivneRezervacije;

    if (event.target.value !== 'Svi') {
      filtriraneRezervacije = filtriraneRezervacije.filter(
        (rezervacija) => rezervacija.typeOfReservation === event.target.value
      );
      filtriraneAktivneRezervacije = filtriraneAktivneRezervacije.filter(
        (rezervacija) => rezervacija.typeOfReservation === event.target.value
      );
    }
    if (box !== 'Svi') {
      filtriraneRezervacije = filtriraneRezervacije.filter(
        (rezervacija) => rezervacija.workspace.name === box
      );
      filtriraneAktivneRezervacije = filtriraneAktivneRezervacije.filter(
        (rezervacija) => rezervacija.workspace.name === box
      );
    }
    if (rezerviranoDo !== '' && rezerviranoOd !== '') {
      filtriraneRezervacije = filtriraneRezervacije.filter(
        (rezervacija) =>
          rezervacija.reservedFrom >= rezerviranoOd &&
          rezervacija.reservedUntil <= rezerviranoDo
      );
      filtriraneAktivneRezervacije = filtriraneAktivneRezervacije.filter(
        (rezervacija) =>
          rezervacija.reservedFrom >= rezerviranoOd &&
          rezervacija.reservedUntil <= rezerviranoDo
      );
    }

    setRezervacije(filtriraneRezervacije);
    setAktivneRezervacije(filtriraneAktivneRezervacije);
    setBoxevi(
      filtriraneAktivneRezervacije
        .map((rezervacija) => rezervacija.workspace.name)
        .filter(onlyUnique)
    );
  };

  const handleChangeBox = (event) => {
    setBox(event.target.value);

    let filtriraneRezervacije = sveRezervacije;
    let filtriraneAktivneRezervacije = sveAktivneRezervacije;

    if (event.target.value !== 'Svi') {
      filtriraneRezervacije = filtriraneRezervacije.filter(
        (rezervacija) => rezervacija.workspace.name === event.target.value
      );
      filtriraneAktivneRezervacije = filtriraneAktivneRezervacije.filter(
        (rezervacija) => rezervacija.workspace.name === event.target.value
      );
    }
    if (tipBoxa !== 'Svi') {
      filtriraneRezervacije = filtriraneRezervacije.filter(
        (rezervacija) => rezervacija.typeOfReservation === tipBoxa
      );
      filtriraneAktivneRezervacije = filtriraneAktivneRezervacije.filter(
        (rezervacija) => rezervacija.typeOfReservation === tipBoxa
      );
    }
    if (rezerviranoDo !== '' && rezerviranoOd !== '') {
      filtriraneRezervacije = filtriraneRezervacije.filter(
        (rezervacija) =>
          rezervacija.reservedFrom >= rezerviranoOd &&
          rezervacija.reservedUntil <= rezerviranoDo
      );
      filtriraneAktivneRezervacije = filtriraneAktivneRezervacije.filter(
        (rezervacija) =>
          rezervacija.reservedFrom >= rezerviranoOd &&
          rezervacija.reservedUntil <= rezerviranoDo
      );
    }
    setRezervacije(filtriraneRezervacije);
    setAktivneRezervacije(filtriraneAktivneRezervacije);
    setBoxevi(
      filtriraneAktivneRezervacije
        .map((rezervacija) => rezervacija.workspace.name)
        .filter(onlyUnique)
    );
  };

  const handleChangeRezerviranoOd = (event) => {
    setRezerviranoOd(event.target.value);

    let filtriraneRezervacije = sveRezervacije;
    let filtriraneAktivneRezervacije = sveAktivneRezervacije;

    if (box !== 'Svi') {
      filtriraneRezervacije = filtriraneRezervacije.filter(
        (rezervacija) => rezervacija.workspace.name === box
      );
      filtriraneAktivneRezervacije = filtriraneAktivneRezervacije.filter(
        (rezervacija) => rezervacija.workspace.name === box
      );
    }
    if (tipBoxa !== 'Svi') {
      filtriraneRezervacije = filtriraneRezervacije.filter(
        (rezervacija) => rezervacija.typeOfReservation === tipBoxa
      );
      filtriraneAktivneRezervacije = filtriraneAktivneRezervacije.filter(
        (rezervacija) => rezervacija.typeOfReservation === tipBoxa
      );
    }
    if ((event.target.value !== '') & (rezerviranoDo !== '')) {
      filtriraneRezervacije = filtriraneRezervacije.filter(
        (rezervacija) =>
          rezervacija.reservedFrom >= event.target.value &&
          rezervacija.reservedUntil <= rezerviranoDo
      );
      filtriraneAktivneRezervacije = filtriraneAktivneRezervacije.filter(
        (rezervacija) =>
          rezervacija.reservedFrom >= event.target.value &&
          rezervacija.reservedUntil <= rezerviranoDo
      );
    }

    setRezervacije(filtriraneRezervacije);
    setAktivneRezervacije(filtriraneAktivneRezervacije);
    setBoxevi(
      filtriraneAktivneRezervacije
        .map((rezervacija) => rezervacija.workspace.name)
        .filter(onlyUnique)
    );
  };

  const handleChangeRezerviranoDo = (event) => {
    if (moment(event.target.value).isBefore(moment(rezerviranoOd))) {
      handleSnackBarErrorOpen(
        strings.formatString(strings.teamBoxDetailsWrongReservedUntilDate)
      );
      return;
    }

    setRezerviranoDo(event.target.value);

    if (rezerviranoOd !== '') {
      let filtriraneRezervacije = sveRezervacije;
      let filtriraneAktivneRezervacije = sveAktivneRezervacije;

      if (box !== 'Svi') {
        filtriraneRezervacije = filtriraneRezervacije.filter(
          (rezervacija) => rezervacija.workspace.name === box
        );
        filtriraneAktivneRezervacije = filtriraneAktivneRezervacije.filter(
          (rezervacija) => rezervacija.workspace.name === box
        );
      }
      if (tipBoxa !== 'Svi') {
        filtriraneRezervacije = filtriraneRezervacije.filter(
          (rezervacija) => rezervacija.typeOfReservation === tipBoxa
        );
        filtriraneAktivneRezervacije = filtriraneAktivneRezervacije.filter(
          (rezervacija) => rezervacija.typeOfReservation === tipBoxa
        );
      }

      if ((event.target.value !== '') & (rezerviranoOd !== '')) {
        filtriraneRezervacije = filtriraneRezervacije.filter(
          (rezervacija) =>
            rezervacija.reservedFrom >= rezerviranoOd &&
            rezervacija.reservedUntil <= event.target.value
        );
        filtriraneAktivneRezervacije = filtriraneAktivneRezervacije.filter(
          (rezervacija) =>
            rezervacija.reservedFrom >= rezerviranoOd &&
            rezervacija.reservedUntil <= event.target.value
        );
      }

      setRezervacije(filtriraneRezervacije);
      setAktivneRezervacije(filtriraneAktivneRezervacije);
      setBoxevi(
        filtriraneAktivneRezervacije
          .map((rezervacija) => rezervacija.workspace.name)
          .filter(onlyUnique)
      );
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose2 = () => {
    setOpen2(false);
  };

  const handleOpen2 = () => {
    setOpen2(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleCloseYes = () => {
    setOpenDialog(false);

    api
      .delete(`/reservations?id=${selectedRezervacijaId}&user=${user.username}`)
      .then((response) => {
        handleSnackBarSuccessOpen(
          strings.formatString(strings.myReservationsDeleteLabel)
        );
      })
      .catch((err) => {
        console.log(err);
        setErrorOccured(true);
      });

    setRezervacije(
      rezervacije.filter(
        (rezervacija) => rezervacija.id !== selectedRezervacijaId
      )
    );
    setSveRezervacije(
      sveRezervacije.filter(
        (rezervacija) => rezervacija.id !== selectedRezervacijaId
      )
    );

    setAktivneRezervacije(
      aktivneRezervacije.filter(
        (rezervacija) => rezervacija.id !== selectedRezervacijaId
      )
    );
    setSveAktivneRezervacije(
      sveAktivneRezervacije.filter(
        (rezervacija) => rezervacija.id !== selectedRezervacijaId
      )
    );

    setBoxevi(
      aktivneRezervacije
        .filter((rezervacija) => rezervacija.id !== selectedRezervacijaId)
        .map((rezervacija) => rezervacija.box)
        .filter(onlyUnique)
    );
  };

  const handleCloseNo = () => {
    setOpenDialog(false);
  };

  const handleCloseDialogOznaceno = () => {
    setOpenOznacenoDialog(false);
  };

  const handleOznacenoCloseYes = () => {
    let error = false;

    oznaceneRezervacijeId.forEach((rezervacijaId) => {
      api
        .delete(`/reservations?id=${rezervacijaId}&user=${user.username}`)
        .then((response) => { })
        .catch((err) => {
          console.log(err);
          setErrorOccured(true);
          error = true;
        });
    });

    if (!error) {
      handleSnackBarSuccessOpen(
        strings.formatString(strings.myReservationsSelectedDeleteLabel)
      );
    }

    setRezervacije(
      rezervacije.filter(
        (rezervacija) => !oznaceneRezervacijeId.includes(rezervacija.id)
      )
    );
    setSveRezervacije(
      sveRezervacije.filter(
        (rezervacija) => !oznaceneRezervacijeId.includes(rezervacija.id)
      )
    );

    setAktivneRezervacije(
      aktivneRezervacije.filter(
        (rezervacija) => !oznaceneRezervacijeId.includes(rezervacija.id)
      )
    );
    setSveAktivneRezervacije(
      sveAktivneRezervacije.filter(
        (rezervacija) => !oznaceneRezervacijeId.includes(rezervacija.id)
      )
    );

    setBoxevi(
      aktivneRezervacije
        .map((rezervacija) => rezervacija.box)
        .filter(onlyUnique)
    );

    setOznaceneRezervacijeId([]);

    setOpenOznacenoDialog(false);
  };

  const handleOznacenoCloseNo = () => {
    setOpenOznacenoDialog(false);
  };

  const handleChecked = (rezervacije) => {
    setOznaceneRezervacijeId(rezervacije);
    setDisabledDeleteSelected(false);
    if (rezervacije.length === 0) {
      setDisabledDeleteSelected(true);
    }
  };

  const handleObrisiOznaceno = (event) => {
    setOpenOznacenoDialog(true);
  };

  const Delete = (params) => {
    return (
      <>
        <IconButton
          variant='contained'
          fontSize='large'
          color='secondary'
          onClick={() => handleDelete(params.row.id)}
        >
          <DeleteIcon fontSize='large' />
        </IconButton>
      </>
    );
  };

  const columns = [
    { field: 'id', headerName: 'ID', flex: 1, hide: true },
    {
      field: 'workplace',
      headerName: strings.formatString(
        strings.myReservationsSchedulerHeaderWorkplace
      ),
      flex: 1,
      editable: false,
      headerAlign: 'center',
    },
    {
      field: 'type',
      headerName: strings.formatString(
        strings.myReservationsSchedulerHeaderType
      ),
      flex: 1,
      editable: false,
      headerAlign: 'center',
    },
    {
      field: 'reservedFrom',
      headerName: strings.formatString(
        strings.myReservationsSchedulerHeaderReservedFrom
      ),
      flex: 1,
      editable: false,
      headerAlign: 'center',
    },
    {
      field: 'reservedUntil',
      headerName: strings.formatString(
        strings.myReservationsSchedulerHeaderReservedUntil
      ),
      flex: 1,
      editable: false,
      headerAlign: 'center',
    },
    {
      field: 'delete',
      headerName: strings.formatString(
        strings.myReservationsSchedulerHeaderDelete
      ),
      flex: 1,
      renderCell: Delete,
      sortable: false,
      headerAlign: 'center',
      filterable: false,
      align: 'center',
      disableColumnMenu: true,
      disableReorder: true,
    },
  ];

  const rows = aktivneRezervacije.map((rezervacija) => {
    const row = {
      id: rezervacija.id,
      type: rezervacija.typeOfReservation,
      workplace:
        rezervacija.typeOfReservation === BOX_TIMSKI
          ? rezervacija.workspace.name + ' / ' + rezervacija.team.name
          : rezervacija.workspace.name + ' / ' + rezervacija.workplace.name,
      reservedFrom: dataRefactor(rezervacija.reservedFrom),
      reservedUntil: dataRefactor(rezervacija.reservedUntil),
    };
    return row;
  });

  const handleSnackBarSuccessOpen = (message) => {
    setSnackBarSuccess({ opened: true, message });
  };

  const handleSnackbarSuccessClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackBarSuccess({ ...snackBarSuccess, opened: false });
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
      {!podaciDohvaceni ? (
        <LinearProgress color='secondary' />
      ) : errorOccurred ? (
        <ServerError />
      ) : (
        <>
          <TitleBar title={strings.formatString(strings.myReservationsTitle)} />
          <Container className={classes.container}>
            <AppBar position='static' className={classes.appBar}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label='simple tabs example'
                centered
              >
                <Tab
                  label={
                    <Typography component='h2' variant='h4'>
                      {strings.formatString(
                        strings.myReservationsTableViewLabel
                      )}
                    </Typography>
                  }
                  {...a11yProps(0)}
                />
                <Tab
                  label={
                    <Typography component='h2' variant='h4'>
                      {strings.formatString(
                        strings.myReservationsCalendarViewLabel
                      )}
                    </Typography>
                  }
                  {...a11yProps(1)}
                />
              </Tabs>
            </AppBar>

            <TabPanel value={value} index={0}>
              {podaciDohvaceni ? (
                <div>
                  <FilterForma
                    classes={classes}
                    open={open}
                    handleClose={handleClose}
                    handleOpen={handleOpen}
                    tipBoxa={tipBoxa}
                    handleChangeTipBoxa={handleChangeTipBoxa}
                    open2={open2}
                    handleClose2={handleClose2}
                    handleOpen2={handleOpen2}
                    box={box}
                    handleChangeBox={handleChangeBox}
                    boxevi={boxevi}
                    rezerviranoOd={rezerviranoOd}
                    rezerviranoDo={rezerviranoDo}
                    handleChangeRezerviranoOd={handleChangeRezerviranoOd}
                    handleChangeRezerviranoDo={handleChangeRezerviranoDo}
                    disabledDeleteSelected={disabledDeleteSelected}
                    handleObrisiOznaceno={handleObrisiOznaceno}
                  />
                  <DataTable
                    columns={columns}
                    rows={rows}
                    handleChecked={handleChecked}
                  />
                  <BrisanjeDialog
                    open={openDialog}
                    handleCloseDialog={handleCloseDialog}
                    handleCloseYes={handleCloseYes}
                    handleCloseNo={handleCloseNo}
                    text={strings.formatString(
                      strings.myReservationsDeleteMessageText
                    )}
                  />
                  <DialogOznaceno
                    open={openOznacenoDialog}
                    handleCloseDialog={handleCloseDialogOznaceno}
                    handleCloseYes={handleOznacenoCloseYes}
                    handleCloseNo={handleOznacenoCloseNo}
                    text={strings.formatString(
                      strings.myReservationsDeleteSelectedMessageText
                    )}
                    title={strings.formatString(
                      strings.myReservationsDeleteSelectedMessageTitle
                    )}
                  />
                </div>
              ) : (
                <LinearProgress color='secondary' />
              )}
            </TabPanel>
            <TabPanel value={value} index={1}>
              <Grid container>
                <Grid item xs={12} sm={12} md={12}>
                  <Scheduler rezervacije={aktivneRezervacije} />
                </Grid>
              </Grid>
            </TabPanel>
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
          </Container>
          <Footer />
        </>
      )}
    </>
  );
};

export default MyReservations;
