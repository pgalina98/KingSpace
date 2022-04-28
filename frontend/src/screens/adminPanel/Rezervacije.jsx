import React, { useState, useEffect } from "react";

import {
  Typography,
  Grid,
  Paper,
  Button,
  IconButton,
  LinearProgress,
  Snackbar,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import MuiAlert from "@material-ui/lab/Alert";

import FilterFormaRezervacije from "./FilterFormaRezervacije";
import BrisanjeDialog from "../../components/dialog/Dialog";
import DialogOznaceno from "../../components/dialog/DialogOznaceno";
import DataTable from "../../components/dataTable/DataTable";
import api from "../../utils/api";
import { strings } from "../../localization/localization";
import moment from "moment";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Rezervacije = (props) => {
  const [pojedinacneRezervacije, setPojedinacneRezervacije] = useState([]);
  const [svePojedinacneRezervacije, setSvePojedinacneRezervacije] = useState(
    []
  );
  const [timskeRezervacije, setTimskeRezervacije] = useState([]);
  const [sveTimskeRezervacije, setSveTimskeRezervacije] = useState([]);
  const [disabledPojedinacno, setDisabledPojedinacno] = useState(true);
  const [rezerviranoOd, setRezerviranoOd] = useState("");
  const [rezerviranoDo, setRezerviranoDo] = useState("");
  const [searchBox, setSearchBox] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedRezervacijaId, setSelectedRezervacijaId] = useState(0);
  const [oznaceneRezervacijeId, setOznaceneRezervacijeId] = useState([]);
  const [openOznacenoDialog, setOpenOznacenoDialog] = useState(false);
  const [disabledDeleteSelected, setDisabledDeleteSelected] = useState(true);
  const [podaciDohvaceni, setPodaciDohvaceni] = useState(false);

  const [snackBarError, setSnackBarError] = useState({
    opened: false,
    errorMessage: "",
  });

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const getSingleReservatios = async () => {
      await api
        .get(`/reservations/allSingle`)
        .then((response) => {
          setPojedinacneRezervacije(response.data);
          setSvePojedinacneRezervacije(response.data);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          getTeamReservations();
        });
    };

    const getTeamReservations = async () => {
      api
        .get(`reservations/allTeam`)
        .then((response) => {
          setTimskeRezervacije(response.data);
          setSveTimskeRezervacije(response.data);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setPodaciDohvaceni(true);
        });
    };

    getSingleReservatios();
  }, []);

  const openPojedinacno = () => {
    setRezerviranoOd("");
    setRezerviranoDo("");
    setSearchBox("");

    setPojedinacneRezervacije(svePojedinacneRezervacije);
    setDisabledPojedinacno(true);
  };

  const openTimski = () => {
    setRezerviranoOd("");
    setRezerviranoDo("");
    setSearchBox("");

    setTimskeRezervacije(sveTimskeRezervacije);
    setDisabledPojedinacno(false);
  };

  const handleDelete = (rezervacijaId) => {
    setSelectedRezervacijaId(rezervacijaId);
    setOpenDialog(true);
  };

  const handleChangeRezerviranoOd = (event) => {
    setRezerviranoOd(event.target.value);

    if (rezerviranoDo !== "") {
      let filtriraneRezervacijeP = svePojedinacneRezervacije;
      let filtriraneRezervacijeT = sveTimskeRezervacije;

      if (event.target.value !== "") {
        filtriraneRezervacijeP = filtriraneRezervacijeP.filter(
          (rezervacija) =>
            rezervacija.reservedFrom >= event.target.value &&
            rezervacija.reservedUntil <= rezerviranoDo
        );
        filtriraneRezervacijeT = filtriraneRezervacijeT.filter(
          (rezervacija) =>
            rezervacija.reservedFrom >= event.target.value &&
            rezervacija.reservedUntil <= rezerviranoDo
        );
      }

      if (searchBox !== "") {
        filtriraneRezervacijeP = filtriraneRezervacijeP.filter(
          (rezervacija) =>
            rezervacija.reservedByUser
              .toLowerCase()
              .includes(searchBox.toLowerCase()) ||
            rezervacija.workspace.name
              .toLowerCase()
              .includes(searchBox.toLowerCase()) ||
            rezervacija.workplace.name
              .toLowerCase()
              .includes(searchBox.toLowerCase())
        );
        filtriraneRezervacijeT = filtriraneRezervacijeT.filter(
          (rezervacija) =>
            rezervacija.reservedByUser
              .toLowerCase()
              .includes(searchBox.toLowerCase()) ||
            rezervacija.workspace.name
              .toLowerCase()
              .includes(searchBox.toLowerCase()) ||
            rezervacija.team.name
              .toLowerCase()
              .includes(searchBox.toLowerCase())
        );
      }

      setTimskeRezervacije(filtriraneRezervacijeT);
      setPojedinacneRezervacije(filtriraneRezervacijeP);
    }
  };

  const handleSnackBarErrorOpen = (message) => {
    setSnackBarError({ opened: true, message });
  };

  const handleSnackbarErrorClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackBarError({ ...snackBarError, opened: false });
  };

  const handleChangeRezerviranoDo = (event) => {
    if (moment(event.target.value).isBefore(moment(rezerviranoOd))) {
      handleSnackBarErrorOpen(
        strings.formatString(strings.teamBoxDetailsWrongReservedUntilDate)
      );
      return;
    }

    setRezerviranoDo(event.target.value);

    if (rezerviranoOd !== "") {
      let filtriraneRezervacijeP = svePojedinacneRezervacije;
      let filtriraneRezervacijeT = sveTimskeRezervacije;

      if (event.target.value !== "") {
        filtriraneRezervacijeP = filtriraneRezervacijeP.filter(
          (rezervacija) =>
            rezervacija.reservedFrom >= rezerviranoOd &&
            rezervacija.reservedUntil <= event.target.value
        );
        filtriraneRezervacijeT = filtriraneRezervacijeT.filter(
          (rezervacija) =>
            rezervacija.reservedFrom >= rezerviranoOd &&
            rezervacija.reservedUntil <= event.target.value
        );
      }

      if (searchBox !== "") {
        filtriraneRezervacijeP = filtriraneRezervacijeP.filter(
          (rezervacija) =>
            rezervacija.reservedByUser
              .toLowerCase()
              .includes(searchBox.toLowerCase()) ||
            rezervacija.workspace.name
              .toLowerCase()
              .includes(searchBox.toLowerCase()) ||
            rezervacija.workplace.name
              .toLowerCase()
              .includes(searchBox.toLowerCase())
        );
        filtriraneRezervacijeT = filtriraneRezervacijeT.filter(
          (rezervacija) =>
            rezervacija.reservedByUser
              .toLowerCase()
              .includes(searchBox.toLowerCase()) ||
            rezervacija.workspace.name
              .toLowerCase()
              .includes(searchBox.toLowerCase()) ||
            rezervacija.team.name
              .toLowerCase()
              .includes(searchBox.toLowerCase())
        );
      }

      setTimskeRezervacije(filtriraneRezervacijeT);
      setPojedinacneRezervacije(filtriraneRezervacijeP);
    }
  };

  const handleChangeSearchBox = (event) => {
    setSearchBox(event.target.value);

    let filtriraneRezervacijeP = svePojedinacneRezervacije;
    let filtriraneRezervacijeT = sveTimskeRezervacije;

    if (event.target.value !== "") {
      const value = event.target.value.toLowerCase();
      filtriraneRezervacijeP = filtriraneRezervacijeP.filter(
        (rezervacija) =>
          rezervacija.reservedByUser.toLowerCase().includes(value) ||
          rezervacija.workspace.name.toLowerCase().includes(value) ||
          rezervacija.workplace.name.toLowerCase().includes(value)
      );
      filtriraneRezervacijeT = filtriraneRezervacijeT.filter(
        (rezervacija) =>
          rezervacija.reservedByUser.toLowerCase().includes(value) ||
          rezervacija.workspace.name.toLowerCase().includes(value) ||
          rezervacija.team.name.toLowerCase().includes(value)
      );
    }

    if (rezerviranoOd !== "" && rezerviranoDo !== "") {
      filtriraneRezervacijeP = filtriraneRezervacijeP.filter(
        (rezervacija) =>
          rezervacija.reservedFrom >= rezerviranoOd &&
          rezervacija.reservedUntil <= rezerviranoDo
      );
      filtriraneRezervacijeT = filtriraneRezervacijeT.filter(
        (rezervacija) =>
          rezervacija.reservedFrom >= rezerviranoOd &&
          rezervacija.reservedUntil <= rezerviranoDo
      );
    }

    setTimskeRezervacije(filtriraneRezervacijeT);
    setPojedinacneRezervacije(filtriraneRezervacijeP);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleCloseYes = () => {
    setOpenDialog(false);

    api
      .delete(`/reservations?id=${selectedRezervacijaId}&user=${user.username}`)
      .then((response) => {})
      .catch((err) => {
        console.log(err);
      });

    setTimskeRezervacije(
      timskeRezervacije.filter(
        (rezervacija) => rezervacija.id !== selectedRezervacijaId
      )
    );
    setPojedinacneRezervacije(
      pojedinacneRezervacije.filter(
        (rezervacija) => rezervacija.id !== selectedRezervacijaId
      )
    );

    setSveTimskeRezervacije(
      sveTimskeRezervacije.filter(
        (rezervacija) => rezervacija.id !== selectedRezervacijaId
      )
    );
    setSvePojedinacneRezervacije(
      svePojedinacneRezervacije.filter(
        (rezervacija) => rezervacija.id !== selectedRezervacijaId
      )
    );
  };

  const handleCloseNo = () => {
    setOpenDialog(false);
  };

  const handleCloseDialogOznaceno = () => {
    setOpenOznacenoDialog(false);
  };

  const handleOznacenoCloseYes = () => {
    oznaceneRezervacijeId.forEach((rezervacijaId) => {
      api
        .delete(`/reservations?id=${rezervacijaId}&user=${user.username}`)
        .then((response) => {})
        .catch((err) => {
          console.log(err);
        });
    });

    setPojedinacneRezervacije(
      pojedinacneRezervacije.filter(
        (rezervacija) => !oznaceneRezervacijeId.includes(rezervacija.id)
      )
    );
    setSvePojedinacneRezervacije(
      svePojedinacneRezervacije.filter(
        (rezervacija) => !oznaceneRezervacijeId.includes(rezervacija.id)
      )
    );

    setTimskeRezervacije(
      timskeRezervacije.filter(
        (rezervacija) => !oznaceneRezervacijeId.includes(rezervacija.id)
      )
    );
    setSveTimskeRezervacije(
      sveTimskeRezervacije.filter(
        (rezervacija) => !oznaceneRezervacijeId.includes(rezervacija.id)
      )
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

  function dataRefactor(date) {
    const data = date.split("-");
    const newFormatDate = data[2]
      .concat(".")
      .concat(data[1])
      .concat(".")
      .concat(data[0])
      .concat(".");
    return newFormatDate;
  }

  const Delete = (params) => {
    return (
      <>
        <IconButton
          variant="contained"
          size="medium"
          color="secondary"
          onClick={() => handleDelete(params.row.id)}
        >
          <DeleteIcon fontSize="large" />
        </IconButton>
      </>
    );
  };
  const columns = [
    { field: "id", headerName: "ID", flex: 1, hide: true },
    {
      field: "employee",
      headerName: strings.formatString(
        strings.adminPanelReservationsHeaderEmployee
      ),
      flex: 1,
      headerAlign: "center",
      filterable: false,
      align: "center",
      editable: false,
    },
    {
      field: "projectTeam",
      headerName: strings.formatString(
        strings.adminPanelReservationsHeaderProjectTeam
      ),
      flex: 1,
      editable: false,
      headerAlign: "center",
    },
    {
      field: "box",
      headerName: strings.formatString(strings.adminPanelReservationsHeaderBox),
      flex: 1,
      editable: false,
      headerAlign: "center",
    },
    {
      field: "reservedFrom",
      headerName: strings.formatString(
        strings.adminPanelReservationsHeaderReservedFrom
      ),
      flex: 1,
      editable: false,
      headerAlign: "center",
    },
    {
      field: "reservedUntil",
      headerName: strings.formatString(
        strings.adminPanelReservationsHeaderReservedUntil
      ),
      flex: 1,
      editable: false,
      headerAlign: "center",
    },
    {
      field: "delete",
      headerName: strings.formatString(
        strings.adminPanelReservationsHeaderDelete
      ),
      renderCell: Delete,
      sortable: false,
      flex: 1,
      headerAlign: "center",
      filterable: false,
      align: "center",
      disableColumnMenu: true,
      disableReorder: true,
    },
  ];

  const rows = timskeRezervacije.map((rezervacija) => {
    const row = {
      id: rezervacija.id,
      employee: rezervacija.reservedByUser,
      projectTeam: rezervacija.team.name,
      box: rezervacija.workspace.name,
      reservedFrom: dataRefactor(rezervacija.reservedFrom),
      reservedUntil: dataRefactor(rezervacija.reservedUntil),
    };
    return row;
  });

  const columns2 = [
    { field: "id", headerName: "ID", width: 90, hide: true },
    {
      field: "employee",
      headerName: strings.formatString(
        strings.adminPanelReservationsHeaderEmployee
      ),
      flex: 1,
      editable: false,
      headerAlign: "center",
    },
    {
      field: "box",
      headerName: strings.formatString(strings.adminPanelReservationsHeaderBox),
      flex: 1,
      editable: false,
      headerAlign: "center",
    },
    {
      field: "reservedFrom",
      headerName: strings.formatString(
        strings.adminPanelReservationsHeaderReservedFrom
      ),
      flex: 1,
      editable: false,
      headerAlign: "center",
    },
    {
      field: "reservedUntil",
      headerName: strings.formatString(
        strings.adminPanelReservationsHeaderReservedUntil
      ),
      flex: 1,
      editable: false,
      headerAlign: "center",
    },
    {
      field: "delete",
      headerName: strings.formatString(
        strings.adminPanelReservationsHeaderDelete
      ),
      renderCell: Delete,
      sortable: false,
      flex: 1,
      headerAlign: "center",
      filterable: false,
      align: "center",
      disableColumnMenu: true,
      disableReorder: true,
    },
  ];

  const rows2 = pojedinacneRezervacije.map((rezervacija) => {
    const row = {
      id: rezervacija.id,
      employee: rezervacija.reservedByUser,
      box: rezervacija.workspace.name + " / " + rezervacija.workplace.name,
      reservedFrom: dataRefactor(rezervacija.reservedFrom),
      reservedUntil: dataRefactor(rezervacija.reservedUntil),
    };
    return row;
  });

  return (
    <>
      {!podaciDohvaceni ? (
        <LinearProgress color="secondary" />
      ) : (
        <Grid container spacing={8} alignItems="center">
          <Grid item xs={12} md={8} lg={12}>
            <Typography
              component="h1"
              variant="h4"
              className={props.classes.tabTitle}
            >
              {disabledPojedinacno
                ? strings.formatString(
                    strings.adminPanelSingleReservationsTitle
                  )
                : strings.formatString(strings.adminPanelTeamReservationsTitle)}
            </Typography>
            <div className={props.classes.singleTeamButtonContainer}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={props.classes.submit}
                disabled={disabledPojedinacno}
                onClick={openPojedinacno}
              >
                {strings.formatString(strings.adminPanelReservationsSingleTab)}
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={props.classes.submit}
                disabled={!disabledPojedinacno}
                onClick={openTimski}
              >
                {strings.formatString(
                  strings.adminPanelReservationsHeaderTeamTab
                )}
              </Button>
            </div>
            <FilterFormaRezervacije
              classes={props.classes}
              rezerviranoOd={rezerviranoOd}
              rezerviranoDo={rezerviranoDo}
              handleChangeSearchBox={handleChangeSearchBox}
              handleChangeRezerviranoOd={handleChangeRezerviranoOd}
              handleChangeRezerviranoDo={handleChangeRezerviranoDo}
              searchBox={searchBox}
              handleObrisiOznaceno={handleObrisiOznaceno}
              disabledDeleteSelected={disabledDeleteSelected}
            />
            <Paper className={props.classes.fixedHeightPaper}>
              {disabledPojedinacno ? (
                <DataTable
                  columns={columns2}
                  rows={rows2}
                  handleChecked={handleChecked}
                />
              ) : (
                <DataTable
                  columns={columns}
                  rows={rows}
                  handleChecked={handleChecked}
                />
              )}
              <BrisanjeDialog
                open={openDialog}
                handleCloseDialog={handleCloseDialog}
                handleCloseYes={handleCloseYes}
                handleCloseNo={handleCloseNo}
                text={strings.formatString(
                  strings.adminPanelReservationsDeleteMessageText
                )}
                title={strings.formatString(
                  strings.adminPanelReservationsDeleteMessageTitle
                )}
              />
              <DialogOznaceno
                open={openOznacenoDialog}
                handleCloseDialog={handleCloseDialogOznaceno}
                handleCloseYes={handleOznacenoCloseYes}
                handleCloseNo={handleOznacenoCloseNo}
                text={strings.formatString(
                  strings.adminPanelReservationsDeleteSelectedMessageText
                )}
                title={strings.formatString(
                  strings.adminPanelReservationsDeleteSelectedMessageTitle
                )}
              />
            </Paper>
          </Grid>
          <Snackbar
            open={snackBarError.opened}
            autoHideDuration={6000}
            onClose={handleSnackbarErrorClose}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <Alert
              className={props.classes.alertIcon}
              onClose={handleSnackbarErrorClose}
              severity="warning"
            >
              {snackBarError.message}
            </Alert>
          </Snackbar>
        </Grid>
      )}
    </>
  );
};

export default Rezervacije;
