import React from "react";
import { FormControl, TextField, Button, Box } from "@material-ui/core";

import DeleteIcon from "@material-ui/icons/Delete";

import { strings } from "../../localization/localization";

const FilterForma = (props) => {
  return (
    <>
      <div className={props.classes.form}>
        <FormControl className={props.classes.formControl} variant="outlined">
          <span className={props.classes.datepickerText}>
            {strings.formatString(strings.adminPanelReservationsFilterFrom)}
          </span>
          <TextField
            className={props.classes.spacing}
            fontSize={30}
            id="rezerviranoOd"
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
            {strings.formatString(strings.adminPanelReservationsFilterUntil)}
          </span>
          <TextField
            className={props.classes.spacing}
            fontSize={30}
            id="rezerviranoDo"
            name="rezerviranoDo"
            onChange={props.handleChangeRezerviranoDo}
            type="date"
            value={props.rezerviranoDo || ""}
            variant="outlined"
            InputProps={{ className: props.classes.inputProp }}
          />
        </FormControl>
        <FormControl className={props.classes.formControl} variant="outlined">
          <span className={props.classes.datepickerText}>
            {strings.formatString(strings.adminPanelReservationsFilterSearch)}
          </span>
          <TextField
            className={props.classes.spacing}
            fontSize={30}
            id="search"
            name="search"
            onChange={props.handleChangeSearchBox}
            type="text"
            value={props.searchBox || ""}
            variant="outlined"
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
          {strings.formatString(strings.adminPanelReservationsDeleteButton)}
        </Button>
      </Box>
    </>
  );
};

export default FilterForma;
