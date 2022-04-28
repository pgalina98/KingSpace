import React, { useState, useEffect } from "react";

import {
  Typography,
  Grid,
  Paper,
  IconButton,
  LinearProgress,
} from "@material-ui/core";

import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

import FilterForma from "./FilterFormaRadniProstori";
import BrisanjeDialog from "../../components/dialog/Dialog";
import DialogOznaceno from "../../components/dialog/DialogOznaceno";
import DataTable from "../../components/dataTable/DataTable";

import EditTim from "./EditTim";
import CreateTim from "./CreateTim";
import api from "../../utils/api";

import { strings } from "../../localization/localization";

const Timovi = (props) => {
  const [timovi, setTimovi] = useState([]);
  const [sviTimovi, setSviTimovi] = useState([]);
  const [aktivniTimovi, setAktivniTimovi] = useState([]);
  const [searchBox, setSearchBox] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [openEditTim, setOpenEditTim] = useState(false);
  const [openCreateTim, setOpenCreateTim] = useState(false);
  const [selectedTimId, setSelectedTimId] = useState(0);
  const [oznaceniTimoviId, setOznaceniTimoviId] = useState([]);
  const [openOznacenoDialog, setOpenOznacenoDialog] = useState(false);
  const [editTimId, setEditTimId] = useState(null);
  const [editTimName, setEditTimName] = useState("");
  const [loading, setLoading] = useState(false);
  const [disabledDeleteSelected, setDisabledDeleteSelected] = useState(true);
  const [podaciDohvaceni, setPodaciDohvaceni] = useState(false);

  useEffect(() => {
    const getTeams = async () => {
      api
        .get(`teams`)
        .then((response) => {
          setTimovi(response.data);
          setSviTimovi(response.data);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          getActiveTeams();
        });
    };

    const getActiveTeams = async () => {
      await api
        .get(`teams/activeTeams`)
        .then((response) => {
          setAktivniTimovi(response.data);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setPodaciDohvaceni(true);
        });
    };

    getTeams();
  }, []);

  const handleDelete = (timId) => {
    setSelectedTimId(timId);
    setOpenDialog(true);
  };

  const handleChangeSearchBox = (event) => {
    setSearchBox(event.target.value);

    let filtriraniTimovi = sviTimovi;

    if (event.target.value !== "") {
      const value = event.target.value.toLowerCase();
      filtriraniTimovi = filtriraniTimovi.filter((tim) =>
        tim.name.toLowerCase().includes(value)
      );
    }

    setTimovi(filtriraniTimovi);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleCloseYes = () => {
    setOpenDialog(false);

    api
      .delete(`/teams/${selectedTimId}?user=${props.user}`)
      .then()
      .catch((err) => {
        console.log(err);
        props.setInitialErrorOccurred(true);
      });

    setTimovi(timovi.filter((tim) => tim.id !== selectedTimId));
    setSviTimovi(sviTimovi.filter((tim) => tim.id !== selectedTimId));

    setLoading(false);
    window.location.reload();
  };

  const handleCloseNo = () => {
    setOpenDialog(false);
  };

  const handleCloseDialogOznaceno = () => {
    setOpenOznacenoDialog(false);
  };

  const handleOznacenoCloseYes = () => {
    oznaceniTimoviId.forEach((timId) => {
      api
        .delete(`/teams/${timId}?user=${props.user}`)
        .then((response) => {})
        .catch((err) => {
          console.log(err);
          props.setInitialErrorOccurred(true);
        });
    });

    setTimovi(timovi.filter((tim) => !oznaceniTimoviId.includes(tim.id)));
    setSviTimovi(sviTimovi.filter((tim) => !oznaceniTimoviId.includes(tim.id)));

    setOznaceniTimoviId([]);

    setOpenOznacenoDialog(false);
    setLoading(false);
    window.location.reload();
  };

  const handleOznacenoCloseNo = () => {
    setOpenOznacenoDialog(false);
  };

  const handleChecked = (teams) => {
    setOznaceniTimoviId(teams);
    setDisabledDeleteSelected(false);
    if (teams.length === 0) {
      setDisabledDeleteSelected(true);
    } else {
      teams.forEach((tim) => {
        if (aktivniTimovi.includes(tim)) {
          setDisabledDeleteSelected(true);
        }
      });
    }
  };

  const handleObrisiOznaceno = (event) => {
    setOpenOznacenoDialog(true);
  };

  const handleEditClose = () => {
    setEditTimId(null);
    setEditTimName("");
    setOpenEditTim(false);
  };

  const handleCreateClose = () => {
    setOpenCreateTim(false);
  };

  const handleEditOpen = () => {
    setOpenEditTim(true);
  };

  const handleAddTim = () => {
    setOpenCreateTim(true);
  };

  const handleCloseNoEditTim = () => {
    setOpenEditTim(false);
  };

  const handleCloseNoCreateTim = () => {
    setOpenCreateTim(false);
  };

  const handleCloseYesCreateTim = (name) => {
    const newTim = {
      name: name,
      user: props.user,
    };
    api
      .post("/teams", newTim)
      .then()
      .catch((e) => {
        console.log(e);
      });
    setOpenCreateTim(false);
    setLoading(false);
    window.location.reload();
  };

  const handleCloseYesEditTim = (id, name) => {
    const updatedTim = {
      id: id,
      name: name,
      user: props.user,
    };
    api
      .put(`/teams/${id}`, updatedTim)
      .then()
      .catch((e) => {
        console.log(e);
      });

    const updatedTimRow = {
      id: id,
      name: name,
    };

    setTimovi((timovi) => timovi.filter((tim) => tim.id !== id));
    setSviTimovi((sviTimovi) => sviTimovi.filter((tim) => tim.id !== id));
    setTimovi((timovi) => [...timovi, updatedTimRow]);
    setSviTimovi((sviTimovi) => [...sviTimovi, updatedTimRow]);
    setOpenEditTim(false);
    setLoading(false);
    window.location.reload();
  };

  const Edit = (params) => {
    return (
      <>
        <IconButton
          variant="contained"
          size="medium"
          color="primary"
          className={props.classes.button}
          onClick={() => {
            setEditTimId(params.row.id);
            setEditTimName(params.row.teamName);
            handleEditOpen();
          }}
        >
          <EditIcon fontSize="large" />
        </IconButton>
      </>
    );
  };

  const Delete = (params) => {
    return (
      <>
        <IconButton
          variant="contained"
          size="large"
          color="secondary"
          className={props.classes.button}
          onClick={() => handleDelete(params.row.id)}
          disabled={aktivniTimovi.includes(params.row.id)}
        >
          <DeleteIcon fontSize="large" />
        </IconButton>
      </>
    );
  };
  const columns = [
    { field: "id", headerName: "ID", flex: 1, hide: true },
    {
      field: "teamName",
      headerName: strings.formatString(
        strings.adminPanelProjectsHeaderTeamName
      ),
      headerAlign: "center",
      align: "center",
      flex: 1,
      editable: false,
    },
    {
      field: "edit",
      headerName: strings.formatString(strings.adminPanelProjectsHeaderEdit),
      renderCell: Edit,
      sortable: false,
      flex: 1,
      headerAlign: "center",
      filterable: false,
      align: "center",
      disableColumnMenu: true,
      disableReorder: true,
    },
    {
      field: "delete",
      headerName: strings.formatString(strings.adminPanelProjectsHeaderDelete),
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

  const rows = timovi.map((tim) => {
    const row = {
      id: tim.id,
      teamName: tim.name,
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
              {strings.formatString(strings.adminPanelProjectsTitle)}
            </Typography>
            <FilterForma
              classes={props.classes}
              handleChangeSearchBox={handleChangeSearchBox}
              searchBox={searchBox}
              handleObrisiOznaceno={handleObrisiOznaceno}
              handleAddBox={handleAddTim}
              disabledDeleteSelected={disabledDeleteSelected}
            />
            <Paper className={props.classes.fixedHeightPaper}>
              <DataTable
                columns={columns}
                rows={rows}
                handleChecked={handleChecked}
                loading={loading}
              />
              <BrisanjeDialog
                open={openDialog}
                handleCloseDialog={handleCloseDialog}
                handleCloseYes={handleCloseYes}
                handleCloseNo={handleCloseNo}
                text={strings.formatString(
                  strings.adminPanelTeamDeleteMessageText
                )}
                title={strings.formatString(
                  strings.adminPanelTeamDeleteMessageTitle
                )}
              />
              <DialogOznaceno
                open={openOznacenoDialog}
                handleCloseDialog={handleCloseDialogOznaceno}
                handleCloseYes={handleOznacenoCloseYes}
                handleCloseNo={handleOznacenoCloseNo}
                text={strings.formatString(
                  strings.adminPanelTeamDeleteSelectedMessageText
                )}
                title={strings.formatString(
                  strings.adminPanelTeamDeleteSelectedMessageTitle
                )}
              />
              {openEditTim ? (
                <EditTim
                  open={openEditTim}
                  handleCloseDialog={handleEditClose}
                  handleCloseNo={handleCloseNoEditTim}
                  classes={props.classes}
                  title={"Edit Team"}
                  editTimId={editTimId}
                  editTimName={editTimName}
                  handleCloseYes={handleCloseYesEditTim}
                />
              ) : (
                <div></div>
              )}

              <CreateTim
                open={openCreateTim}
                handleCloseDialog={handleCreateClose}
                handleCloseNo={handleCloseNoCreateTim}
                handleCloseYes={handleCloseYesCreateTim}
                classes={props.classes}
                title={"Create Team"}
              />
            </Paper>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default Timovi;
