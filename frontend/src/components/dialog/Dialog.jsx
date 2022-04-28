import React from "react";
import {
  Button,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@material-ui/core";

import { strings } from "../../localization/localization";

const BrisanjeDialog = (props) => {
  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Typography component="h4" variant="h4">
              {props.text}
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={props.handleCloseYes}
            color="primary"
          >
            <Typography component="h5" variant="h5">
              {strings.formatString(strings.dialogYes)}
            </Typography>
          </Button>
          <Button
            variant="contained"
            onClick={props.handleCloseNo}
            color="secondary"
            autoFocus
          >
            <Typography component="h5" variant="h5">
              {strings.formatString(strings.dialogNo)}
            </Typography>
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default BrisanjeDialog;
