import React, { useState, useEffect } from "react";

import {
  Typography,
  Grid,
  Paper,
  IconButton,
  LinearProgress,
} from "@material-ui/core";

import DeleteIcon from "@material-ui/icons/Delete";

import FilterForma from "./FilterFormaRadniProstori";
import BrisanjeDialog from "../../components/dialog/Dialog";
import DialogOznaceno from "../../components/dialog/DialogOznaceno";
import DataTable from "../../components/dataTable/DataTable";

import CreateOvlast from "./CreateOvlast";
import api from "../../utils/api";
import { ROLA_ADMIN } from "../../utils/constants";
import { strings } from "../../localization/localization";

const KorisnickeOvlasti = (props) => {
  const [ovlasti, setOvlasti] = useState([]);
  const [sveOvlasti, setSveOvlasti] = useState([]);
  const [searchBox, setSearchBox] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [openCreateOvlast, setOpenCreateOvlast] = useState(false);
  const [selectedOvlastId, setSelectedOvlastId] = useState(0);
  const [oznaceneOvlastiId, setOznaceneOvlastiId] = useState([]);
  const [openOznacenoDialog, setOpenOznacenoDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [disabledDeleteSelected, setDisabledDeleteSelected] = useState(true);
  const [timovi, setTimovi] = useState([]);
  const [useri, setUseri] = useState([]);
  const [podaciDohvaceni, setPodaciDohvaceni] = useState(false);

  useEffect(() => {
    const getUserRoles = async () => {
      await api
        .get(`userTeamRoles`)
        .then((response) => {
          setOvlasti(response.data);
          setSveOvlasti(response.data);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          getTeams();
        });
    };
    const getTeams = async () => {
      api
        .get(`teams`)
        .then((response) => {
          setTimovi(response.data);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          getUsers();
        });
    };

    const getUsers = async () => {
      await api
        .get(`users/allUsers`)
        .then((response) => {
          setUseri(response.data);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setPodaciDohvaceni(true);
        });
    };

    getUserRoles();
  }, []);

  const handleDelete = (ovlastId) => {
    setSelectedOvlastId(ovlastId);
    setOpenDialog(true);
  };

  const handleChangeSearchBox = (event) => {
    setSearchBox(event.target.value);

    let filtriraneOvlasti = sveOvlasti;

    if (event.target.value !== "") {
      const value = event.target.value.toLowerCase();
      filtriraneOvlasti = filtriraneOvlasti.filter(
        (ovlast) =>
          ovlast.user.toLowerCase().includes(value) ||
          ovlast.team.name.toLowerCase().includes(value)
      );
    }

    setOvlasti(filtriraneOvlasti);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleCloseYes = () => {
    setOpenDialog(false);

    api
      .delete(`/userTeamRoles/${selectedOvlastId}?user=${props.user}`)
      .then()
      .catch((err) => {
        console.log(err);
        props.setInitialErrorOccurred(true);
      });

    setOvlasti(ovlasti.filter((ovlast) => ovlast.id !== selectedOvlastId));
    setSveOvlasti(
      sveOvlasti.filter((ovlast) => ovlast.id !== selectedOvlastId)
    );

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
    oznaceneOvlastiId.forEach((ovlastId) => {
      api
        .delete(`/userTeamRoles/${ovlastId}?user=${props.user}`)
        .then((response) => {})
        .catch((err) => {
          console.log(err);
          props.setInitialErrorOccurred(true);
        });
    });

    setOvlasti(
      ovlasti.filter((ovlast) => !oznaceneOvlastiId.includes(ovlast.id))
    );
    setSveOvlasti(
      sveOvlasti.filter((ovlast) => !oznaceneOvlastiId.includes(ovlast.id))
    );

    setOznaceneOvlastiId([]);

    setOpenOznacenoDialog(false);
    setLoading(false);

    window.location.reload();
  };

  const handleOznacenoCloseNo = () => {
    setOpenOznacenoDialog(false);
  };

  const handleChecked = (roles) => {
    setOznaceneOvlastiId(roles);
    setDisabledDeleteSelected(false);
    if (roles.length === 0) {
      setDisabledDeleteSelected(true);
    }
  };

  const handleObrisiOznaceno = (event) => {
    setOpenOznacenoDialog(true);
  };

  const handleCreateClose = () => {
    setOpenCreateOvlast(false);
  };

  const handleAddBox = () => {
    setOpenCreateOvlast(true);
  };

  const handleCloseNoCreateOvlast = () => {
    setOpenCreateOvlast(false);
  };

  const handleCloseYesCreateOvlast = (user, teamId) => {
    const newOvlast = {
      user: user,
      teamId: teamId,
      roleId: 2,
      createdByUser: props.user,
    };
    api
      .post("/userTeamRoles", newOvlast)
      .then()
      .catch((e) => {
        console.log(e);
      });
    setOpenCreateOvlast(false);
    setLoading(false);
    window.location.reload();
  };

  const Delete = (params) => {
    return (
      <>
        <IconButton
          variant="contained"
          size="medium"
          color="secondary"
          className={props.classes.button}
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
      field: "user",
      headerName: strings.formatString(
        strings.adminPanelUserAuthoritiesHeaderModerator
      ),
      flex: 1,
      editable: false,
      headerAlign: "center",
    },
    {
      field: "team",
      headerName: strings.formatString(
        strings.adminPanelUserAuthoritiesHeaderProjectTeam
      ),
      flex: 1,
      editable: false,
      headerAlign: "center",
    },
    {
      field: "delete",
      headerName: strings.formatString(
        strings.adminPanelUserAuthoritiesHeaderDelete
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

  const rows = ovlasti.map((ovlast) => {
    const row = {
      id: ovlast.id,
      user: ovlast.user,
      team: ovlast.team ? ovlast.team.name : ROLA_ADMIN,
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
              {strings.formatString(strings.adminPanelUserAuthoritiesTitle)}
            </Typography>
            <FilterForma
              classes={props.classes}
              handleChangeSearchBox={handleChangeSearchBox}
              searchBox={searchBox}
              handleObrisiOznaceno={handleObrisiOznaceno}
              handleAddBox={handleAddBox}
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
                  strings.adminPanelUserAuthoritiesDeleteMessageText
                )}
                title={strings.formatString(
                  strings.adminPanelUserAuthoritiesDeleteMessageTitle
                )}
              />
              <DialogOznaceno
                open={openOznacenoDialog}
                handleCloseDialog={handleCloseDialogOznaceno}
                handleCloseYes={handleOznacenoCloseYes}
                handleCloseNo={handleOznacenoCloseNo}
                text={strings.formatString(
                  strings.adminPanelUserAuthoritiesDeleteSelectedMessageText
                )}
                title={strings.formatString(
                  strings.adminPanelUserAuthoritiesDeleteSelectedMessageTitle
                )}
              />

              <CreateOvlast
                open={openCreateOvlast}
                handleCloseDialog={handleCreateClose}
                handleCloseNo={handleCloseNoCreateOvlast}
                handleCloseYes={handleCloseYesCreateOvlast}
                classes={props.classes}
                title={"Create User-Team Role"}
                teams={timovi}
                users={useri}
              />
            </Paper>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default KorisnickeOvlasti;
