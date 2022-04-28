import React from "react";
import {
  Typography,
  FormControl,
  Select,
  MenuItem,
  TextField,
  Grid,
  Box,
  Button,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

import { BOX_TIMSKI, BOX_POJEDINACNI } from "../../utils/constants";
import { strings } from "../../localization/localization";

const FilterForma = (props) => {
  return (
    <Grid className={props.classes.content} item lg={12} xs={12}>
      <div className={props.classes.form}>
        <FormControl className={props.classes.formControl} variant="outlined">
          <span className={props.classes.datepickerText}>
            {strings.formatString(strings.myReservationsFilterTypeLabel)}
          </span>
          <Select
            className={props.classes.select}
            labelId="demo-controlled-open-select-label"
            id="demo-controlled-open-select"
            open={props.open}
            onClose={props.handleClose}
            onOpen={props.handleOpen}
            value={props.tipBoxa}
            onChange={props.handleChangeTipBoxa}
            type="text"
          >
            <MenuItem value={"Svi"}>
              <Typography component="h5" variant="h5">
                {strings.formatString(
                  strings.myReservationsFilterTypeAllTypesLabel
                )}
              </Typography>
            </MenuItem>
            <MenuItem value={BOX_POJEDINACNI}>
              <Typography component="h5" variant="h5">
                {strings.formatString(strings.myReservationsFilterTypeSingle)}
              </Typography>
            </MenuItem>
            <MenuItem value={BOX_TIMSKI}>
              <Typography component="h5" variant="h5">
                {strings.formatString(strings.myReservationsFilterTypeTeam)}
              </Typography>
            </MenuItem>
          </Select>
        </FormControl>
        <FormControl className={props.classes.formControl} variant="outlined">
          <span className={props.classes.datepickerText}>
            {strings.formatString(strings.myReservationsFilterWorkplaceLabel)}
          </span>
          <Select
            className={props.classes.select}
            labelId="demo-controlled-open-select-label"
            id="demo-controlled-open-select2"
            open={props.open2}
            onClose={props.handleClose2}
            onOpen={props.handleOpen2}
            value={props.box}
            onChange={props.handleChangeBox}
            type="text"
          >
            <MenuItem value={"Svi"}>
              <Typography component="h5" variant="h5">
                {strings.formatString(
                  strings.myReservationsFilterWorkplaceAllWorkplacesLabel
                )}
              </Typography>
            </MenuItem>
            {props.boxevi.map((box) => (
              <MenuItem value={box}>
                <Typography component="h5" variant="h5">
                  {box}
                </Typography>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl className={props.classes.formControl} variant="outlined">
          <span className={props.classes.datepickerText}>
            {strings.formatString(
              strings.myReservationsFilterReservedFromLabel
            )}
          </span>
          <TextField
            className={props.classes.spacing}
            fontSize={30}
            id="rezerviranoOd"
            fullWidth
            name="rezerviranoOd"
            onChange={props.handleChangeRezerviranoOd}
            type="date"
            value={props.rezerviranoOd || ""}
            variant="outlined"
            InputProps={{ className: props.classes.inputProp }}
          />
        </FormControl>
        <FormControl className={props.classes.formControl} variant="outlined">
          <span className={props.classes.datepickerText}>
            {strings.formatString(
              strings.myReservationsFilterReservedUntilLabel
            )}
          </span>
          <TextField
            className={props.classes.spacing}
            id="rezerviranoDo"
            name="rezerviranoDo"
            onChange={props.handleChangeRezerviranoDo}
            type="date"
            value={props.rezerviranoDo || ""}
            variant="outlined"
            InputProps={{ className: props.classes.inputProp }}
          />
        </FormControl>
      </div>
      <Box textAlign="right">
        <Button
          variant="contained"
          size="large"
          color="secondary"
          className={props.classes.button}
          startIcon={<DeleteIcon />}
          onClick={props.handleObrisiOznaceno}
          disabled={props.disabledDeleteSelected}
        >
          {strings.formatString(strings.myReservationsDeleteButton)}
        </Button>
      </Box>
    </Grid>
  );
};

export default FilterForma;
