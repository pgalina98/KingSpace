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
} from "@material-ui/core";

import SaveIcon from "@material-ui/icons/Save";
import DeleteIcon from "@material-ui/icons/Delete";

import { strings } from "../../localization/localization";

const EditTim = (props) => {
  const [name, setName] = useState("");
  const [saveEnabled, setSaveEnabled] = useState(false);
  const [dataCaptured, setDataCaptured] = useState(false);

  useEffect(() => {
    if (props.editTimId !== null) {
      setName(props.editTimName);
      setSaveEnabled(true);
    }
    setDataCaptured(true);
  }, []);

  const handleChangeName = (event) => {
    setName(event.target.value);

    if (event.target.value !== "") {
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
                {strings.formatString(strings.adminPanelEditTeamTitle)}
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
                    {strings.formatString(strings.adminPanelEditUserTeam)}
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
              onClick={() => props.handleCloseYes(props.editTimId, name)}
              disabled={!saveEnabled}
            >
              {strings.formatString(strings.adminPanelEditTeamSaveButton)}
            </Button>
            <Button
              variant="contained"
              size="large"
              color="secondary"
              className={props.classes.button}
              startIcon={<DeleteIcon />}
              onClick={props.handleCloseNo}
            >
              {strings.formatString(strings.adminPanelEditTeamCancelButton)}
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
};

export default EditTim;
