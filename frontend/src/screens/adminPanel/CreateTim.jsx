import React, { useState } from "react";
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

const CreateTim = (props) => {
  const [name, setName] = useState("");
  const [saveEnabled, setSaveEnabled] = useState(false);

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
              {strings.formatString(strings.dminPanelCreateTeamTitle)}
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
                  {strings.formatString(strings.adminPanelCreateTeamName)}
                </Typography>
              </InputLabel>
              <TextField
                className={props.classes.editForm}
                fontSize={30}
                id="nameCreate"
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
            onClick={() => props.handleCloseYes(name)}
            disabled={!saveEnabled}
          >
            {strings.formatString(strings.adminPanelCreateTeamSaveButton)}
          </Button>
          <Button
            variant="contained"
            size="large"
            color="secondary"
            className={props.classes.button}
            startIcon={<DeleteIcon />}
            onClick={props.handleCloseNo}
          >
            {strings.formatString(strings.adminPanelCreateTeamCancelButton)}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CreateTim;
