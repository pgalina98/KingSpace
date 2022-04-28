import React, { useState } from 'react';
import {
  Button,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  InputLabel,
  Box,
  TextField,
} from '@material-ui/core';

import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';

import { strings } from '../../localization/localization';
import { Autocomplete } from '@material-ui/lab';

const CreateOvlast = (props) => {
  const [user, setUser] = useState('Svi');
  const [team, setTeam] = useState('Svi');
  const [saveEnabled, setSaveEnabled] = useState(false);

  const handleChangeUser = (event) => {
    setUser(event.target.value);

    if (event.target.value !== 'Svi' && team !== 'Svi') {
      setSaveEnabled(true);
    } else {
      setSaveEnabled(false);
    }
  };
  const handleChangeTeam = (event) => {
    setTeam(event.target.value);

    if (event.target.value !== 'Svi' && user !== 'Svi') {
      setSaveEnabled(true);
    } else {
      setSaveEnabled(false);
    }
  };

  return (
    <div>
      <Dialog
        fullWidth
        maxWidth='sm'
        open={props.open}
        onClose={props.handleCloseDialog}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>
          {
            <Typography component='h4' variant='h4'>
              {strings.formatString(strings.adminPanelCreateUserAuhtorityTitle)}
            </Typography>
          }
        </DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            <Box textAlign='center'>
              <InputLabel
                id='demo-controlled-open-select-label'
                className={props.classes.editForm}
              >
                <Typography component='h6' variant='h6'>
                  {strings.formatString(
                    strings.adminPanelCreateUserAuhtorityUser
                  )}
                </Typography>
              </InputLabel>

              <Autocomplete
                id='combo-box'
                onChange={handleChangeUser}
                options={props.users}
                getOptionLabel={(user) => user.firstName + ' ' + user.lastName}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={strings.formatString(strings.allUsersLabel)}
                    variant='outlined'
                  />
                )}
              />
              <InputLabel
                id='demo-controlled-open-select-label'
                className={props.classes.editForm}
              >
                <Typography component='h6' variant='h6'>
                  {strings.formatString(
                    strings.adminPanelCreateUserAuhtorityTeam
                  )}
                </Typography>
              </InputLabel>

              <Autocomplete
                id='combo-box'
                onChange={handleChangeTeam}
                options={props.teams}
                getOptionLabel={(team) => team.name}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={strings.formatString(strings.allTeamsLabel)}
                    variant='outlined'
                  />
                )}
              />
            </Box>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant='contained'
            size='large'
            color='primary'
            className={props.classes.button}
            startIcon={<SaveIcon />}
            onClick={() => props.handleCloseYes(user, team)}
            disabled={!saveEnabled}
          >
            {strings.formatString(
              strings.adminPanelCreateUserAuhtoritySaveButton
            )}
          </Button>
          <Button
            variant='contained'
            size='large'
            color='secondary'
            className={props.classes.button}
            startIcon={<DeleteIcon />}
            onClick={props.handleCloseNo}
          >
            {strings.formatString(
              strings.adminPanelCreateUserAuhtorityCancelButton
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CreateOvlast;
