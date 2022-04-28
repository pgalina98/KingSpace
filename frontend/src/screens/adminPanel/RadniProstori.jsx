import React, { useState, useEffect } from "react";

import {
  Typography,
  Grid,
  Paper,
  IconButton,
  LinearProgress,
} from "@material-ui/core";

import FilterForma from "./FilterFormaRadniProstori";
import BrisanjeDialog from "../../components/dialog/Dialog";
import DialogOznaceno from "../../components/dialog/DialogOznaceno";
import DataTable from "../../components/dataTable/DataTable";

import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import EditBox from "./EditBox";
import CreateBox from "./CreateBox";
import api from "../../utils/api";
import { BOX_POJEDINACNI } from "../../utils/constants";

import { strings } from "../../localization/localization";

const RadniProstori = (props) => {
  const [boxevi, setBoxevi] = useState([]);
  const [sviBoxevi, setSviBoxevi] = useState([]);
  const [searchBox, setSearchBox] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [openEditBox, setOpenEditBox] = useState(false);
  const [openCreateBox, setOpenCreateBox] = useState(false);
  const [selectedBoxId, setSelectedBoxId] = useState(0);
  const [oznaceniBoxeviId, setOznaceniBoxeviId] = useState([]);
  const [openOznacenoDialog, setOpenOznacenoDialog] = useState(false);
  const [editBoxId, setEditBoxId] = useState(null);
  const [editBoxName, setEditBoxName] = useState("");
  const [editBoxType, setEditBoxType] = useState("Svi");
  const [editBoxCapacity, setEditBoxCapacity] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeBoxevi, setActiveBoxevi] = useState([]);
  const [disabledDeleteSelected, setDisabledDeleteSelected] = useState(true);
  const [disableEditCapacity, setDisableEditCapacity] = useState(false);
  const [podaciDohvaceni, setPodaciDohvaceni] = useState(false);

  useEffect(() => {
    const getWorkspaceDetails = async () => {
      await api
        .get(`workspaces`)
        .then((response) => {
          setBoxevi(response.data);
          setSviBoxevi(response.data);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          getActiveWorkspaceDetails();
        });
    };

    const getActiveWorkspaceDetails = async () => {
      await api
        .get(`workspaces/activeWorkspaces`)
        .then((response) => {
          setActiveBoxevi(response.data);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setPodaciDohvaceni(true);
        });
    };

    getWorkspaceDetails();
  }, []);

  const handleDelete = (boxId) => {
    setSelectedBoxId(boxId);
    setOpenDialog(true);
  };

  const handleChangeSearchBox = (event) => {
    setSearchBox(event.target.value);

    let filtriraniBoxevi = sviBoxevi;

    if (event.target.value !== "") {
      const value = event.target.value.toLowerCase();
      filtriraniBoxevi = filtriraniBoxevi.filter(
        (box) =>
          box.name.toLowerCase().includes(value) ||
          box.type.name.toLowerCase().includes(value)
      );
    }

    setBoxevi(filtriraniBoxevi);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleCloseYes = () => {
    setOpenDialog(false);

    api
      .delete(`/workspaces/${selectedBoxId}?user=${props.user}`)
      .then()
      .catch((err) => {
        console.log(err);
        props.setInitialErrorOccurred(true);
      });

    setBoxevi(boxevi.filter((box) => box.id !== selectedBoxId));
    setSviBoxevi(sviBoxevi.filter((box) => box.id !== selectedBoxId));

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
    oznaceniBoxeviId.forEach((boxId) => {
      api
        .delete(`/workspaces/${boxId}?user=${props.user}`)
        .then((response) => {})
        .catch((err) => {
          console.log(err);
          props.setInitialErrorOccurred(true);
        });
    });

    setBoxevi(boxevi.filter((box) => !oznaceniBoxeviId.includes(box.id)));
    setSviBoxevi(sviBoxevi.filter((box) => !oznaceniBoxeviId.includes(box.id)));

    setOznaceniBoxeviId([]);

    setOpenOznacenoDialog(false);
    setLoading(false);
    window.location.reload();
  };

  const handleOznacenoCloseNo = () => {
    setOpenOznacenoDialog(false);
  };

  const handleChecked = (boxes) => {
    setOznaceniBoxeviId(boxes);
    setDisabledDeleteSelected(false);
    if (boxes.length === 0) {
      setDisabledDeleteSelected(true);
    } else {
      boxes.forEach((box) => {
        if (activeBoxevi.includes(box)) {
          setDisabledDeleteSelected(true);
        }
      });
    }
  };

  const handleObrisiOznaceno = (event) => {
    setOpenOznacenoDialog(true);
  };

  const handleEditClose = () => {
    setEditBoxId(null);
    setEditBoxName("");
    setEditBoxType("Svi");
    setEditBoxCapacity("");
    setOpenEditBox(false);
  };

  const handleCreateClose = () => {
    setOpenCreateBox(false);
  };

  const handleEditOpen = () => {
    setOpenEditBox(true);
  };

  const handleAddBox = () => {
    setOpenCreateBox(true);
  };

  const handleCloseNoEditBox = () => {
    setOpenEditBox(false);
  };

  const handleCloseNoCreateBox = () => {
    setOpenCreateBox(false);
  };

  const handleCloseYesCreateBox = (name, type, capacity) => {
    const newBox = {
      name: name,
      typeId: type === BOX_POJEDINACNI ? 1 : 2,
      capacity: capacity,
      user: props.user,
      imageURL: "defaultBox.jpg",
    };

    api
      .post("/workspaces", newBox)
      .then()
      .catch((e) => {
        console.log(e);
      });
    setOpenCreateBox(false);
    setLoading(false);
    window.location.reload();
  };

  const handleCloseYesEditBox = (id, name, type, capacity) => {
    const updatedBox = {
      id: id,
      name: name,
      typeId: type === BOX_POJEDINACNI ? 1 : 2,
      capacity: capacity,
      user: props.user,
    };
    api
      .put(`/workspaces/${id}`, updatedBox)
      .then()
      .catch((e) => {
        console.log(e);
      });

    const updatedBoxRow = {
      id: id,
      name: name,
      type: {
        name: type,
      },
      capacity: capacity,
    };
    setBoxevi((boxevi) => boxevi.filter((box) => box.id !== id));
    setSviBoxevi((sviBoxevi) => sviBoxevi.filter((box) => box.id !== id));
    setBoxevi((boxevi) => [...boxevi, updatedBoxRow]);
    setSviBoxevi((sviBoxevi) => [...sviBoxevi, updatedBoxRow]);
    setOpenEditBox(false);
    setLoading(false);
    window.location.reload();
  };

  const Edit = (params) => {
    return (
      <>
        <IconButton
          variant="contained"
          fontSize="medium"
          color="primary"
          className={props.classes.button}
          onClick={() => {
            setDisableEditCapacity(activeBoxevi.includes(params.row.id));
            setEditBoxId(params.row.id);
            setEditBoxName(params.row.boxName);
            setEditBoxType(params.row.boxType);
            setEditBoxCapacity(params.row.capacity);
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
          disabled={activeBoxevi.includes(params.row.id)}
        >
          <DeleteIcon fontSize="large" />
        </IconButton>
      </>
    );
  };
  const columns = [
    {
      field: "id",
      headerName: "ID",
      flex: 1,
      headerAlign: "center",
      hide: true,
    },
    {
      field: "boxName",
      headerName: strings.formatString(strings.adminPanelBoxesHeaderBox),
      flex: 1,
      headerAlign: "center",
      editable: false,
    },
    {
      field: "boxType",
      headerName: strings.formatString(strings.adminPanelBoxesHeaderBoxType),
      flex: 1,
      headerAlign: "center",
      editable: false,
    },
    {
      field: "capacity",
      headerName: strings.formatString(strings.adminPanelBoxesHeaderCapacity),
      type: "number",
      headerAlign: "center",
      flex: 1,
      editable: false,
    },
    {
      field: "edit",
      headerName: strings.formatString(strings.adminPanelBoxesHeaderEdit),
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
      headerName: strings.formatString(strings.adminPanelBoxesHeaderDelete),
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

  const rows = boxevi.map((box) => {
    const row = {
      id: box.id,
      boxName: box.name,
      boxType: box.type.name,
      capacity: box.capacity,
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
              {strings.formatString(strings.adminPanelBoxesTitle)}
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
                  strings.adminPanelBoxesDeleteMessageText
                )}
                title={strings.formatString(
                  strings.adminPanelBoxesDeleteMessageTitle
                )}
              />
              <DialogOznaceno
                open={openOznacenoDialog}
                handleCloseDialog={handleCloseDialogOznaceno}
                handleCloseYes={handleOznacenoCloseYes}
                handleCloseNo={handleOznacenoCloseNo}
                text={strings.formatString(
                  strings.adminPanelBoxesDeleteSelectedMessageText
                )}
                title={strings.formatString(
                  strings.adminPanelBoxesDeleteSelectedMessageTitle
                )}
              />
              {openEditBox ? (
                <EditBox
                  open={openEditBox}
                  handleCloseDialog={handleEditClose}
                  handleCloseNo={handleCloseNoEditBox}
                  classes={props.classes}
                  title={"Edit box"}
                  editBoxId={editBoxId}
                  editBoxCapacity={editBoxCapacity}
                  editBoxType={editBoxType}
                  editBoxName={editBoxName}
                  handleCloseYes={handleCloseYesEditBox}
                  disableEditCapacity={disableEditCapacity}
                />
              ) : (
                <div></div>
              )}

              <CreateBox
                open={openCreateBox}
                handleCloseDialog={handleCreateClose}
                handleCloseNo={handleCloseNoCreateBox}
                handleCloseYes={handleCloseYesCreateBox}
                classes={props.classes}
                title={"Create box"}
              />
            </Paper>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default RadniProstori;
