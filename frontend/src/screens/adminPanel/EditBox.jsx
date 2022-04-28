import React, { useState, useEffect } from "react";
import {
  Button,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  InputLabel,
  TextField,
  Box,
  Select,
  MenuItem,
} from "@material-ui/core";

import SaveIcon from "@material-ui/icons/Save";
import DeleteIcon from "@material-ui/icons/Delete";

import { strings } from "../../localization/localization";

const EditBox = (props) => {
  const [name, setName] = useState("");
  const [type, setType] = useState(props.editBoxType);
  const [capacity, setCapacity] = useState(0);
  const [open, setOpen] = useState(false);
  const [saveEnabled, setSaveEnabled] = useState(false);
  const [dataCaptured, setDataCaptured] = useState(false);

  useEffect(() => {
    if (props.editBoxId !== null) {
      setName(props.editBoxName);
      setType(props.editBoxType);
      setCapacity(props.editBoxCapacity);
      setSaveEnabled(true);
    }
    setDataCaptured(true);
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(true);
  };

  const handleChangeName = (event) => {
    setName(event.target.value);

    if (
      event.target.value !== "" &&
      capacity !== "" &&
      capacity > 1 &&
      capacity <= 10 &&
      type !== "Svi"
    ) {
      setSaveEnabled(true);
    } else {
      setSaveEnabled(false);
    }
  };
  const handleChangeCapacity = (event) => {
    setCapacity(event.target.value);

    if (
      event.target.value !== "" &&
      name !== "" &&
      event.target.value !== "" &&
      event.target.value > 1 &&
      event.target.value <= 10 &&
      type !== "Svi"
    ) {
      setSaveEnabled(true);
    } else {
      setSaveEnabled(false);
    }
  };
  const handleChangeType = (event) => {
    setType(event.target.value);
    setOpen(false);

    if (
      event.target.value !== "Svi" &&
      capacity !== "" &&
      capacity > 1 &&
      capacity <= 10 &&
      name !== ""
    ) {
      setSaveEnabled(true);
    } else {
      setSaveEnabled(false);
    }
  };

  return (
    <div>
      {!dataCaptured ? (
        <div></div>
      ) : (
        <Dialog
          fullWidth
          maxWidth="sm"
          open={props.open}
          onClose={props.handleCloseDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {
              <Typography component="h4" variant="h4">
                {strings.formatString(strings.adminPanelEditBoxTitle)}
              </Typography>
            }
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <Box textAlign="center">
                <InputLabel
                  id="demo-controlled-open-select-label"
                  className={props.classes.editForm}
                >
                  <Typography component="h6" variant="h6">
                    {strings.formatString(strings.adminPanelEditBoxName)}
                  </Typography>
                </InputLabel>
                <TextField
                  className={props.classes.editForm}
                  fontSize={30}
                  id="name"
                  name="name"
                  onChange={handleChangeName}
                  type="text"
                  value={name || ""}
                  variant="outlined"
                  fullWidth
                />
                <InputLabel
                  id="demo-controlled-open-select-label"
                  className={props.classes.editForm}
                >
                  <Typography component="h6" variant="h6">
                    {strings.formatString(strings.adminPanelEditBoxType)}
                  </Typography>
                </InputLabel>
                <Select
                  className={props.classes.editForm}
                  labelId="demo-controlled-open-select-label"
                  id="demo-controlled-open-select"
                  open={open}
                  onClose={handleClose}
                  onOpen={handleOpen}
                  value={type}
                  onChange={handleChangeType}
                  type="text"
                  variant="outlined"
                  fullWidth
                  disabled={props.disableEditCapacity}
                  defaultValue={type}
                >
                  <MenuItem value={"Svi"}>
                    {strings.formatString(
                      strings.myReservationsFilterTypeAllTypesLabel
                    )}
                  </MenuItem>
                  <MenuItem value={"POJEDINAČNO"}>
                    {strings.formatString(
                      strings.myReservationsFilterTypeSingle
                    )}
                  </MenuItem>
                  <MenuItem value={"TIMSKI"}>
                    {strings.formatString(strings.myReservationsFilterTypeTeam)}
                  </MenuItem>
                </Select>

                <InputLabel
                  id="demo-controlled-open-select-label"
                  className={props.classes.editForm}
                >
                  <Typography component="h6" variant="h6">
                    {strings.formatString(strings.adminPanelEditBoxCapacity)}
                  </Typography>
                </InputLabel>
                <TextField
                  className={props.classes.editForm}
                  fontSize={30}
                  id="capacity"
                  name="capacity"
                  onChange={handleChangeCapacity}
                  type="number"
                  value={capacity || ""}
                  variant="outlined"
                  fullWidth
                  InputProps={{ inputProps: { min: 2, max: 10 } }}
                  disabled={props.disableEditCapacity}
                />
              </Box>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              size="large"
              color="primary"
              className={props.classes.button}
              startIcon={<SaveIcon />}
              onClick={() =>
                props.handleCloseYes(props.editBoxId, name, type, capacity)
              }
              disabled={!saveEnabled}
            >
              {strings.formatString(strings.adminPanelEditBoxSaveButton)}
            </Button>
            <Button
              variant="contained"
              size="large"
              color="secondary"
              className={props.classes.button}
              startIcon={<DeleteIcon />}
              onClick={props.handleCloseNo}
            >
              {strings.formatString(strings.adminPanelEditBoxCancelButton)}
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
};

export default EditBox;
