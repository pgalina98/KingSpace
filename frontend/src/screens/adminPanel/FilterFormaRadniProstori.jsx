import React from "react";
import { FormControl, TextField, Button, IconButton } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";

import { strings } from "../../localization/localization";

const FilterForma = (props) => {
  return (
    <>
      <div className={props.classes.formSearch}>
        <FormControl className={props.classes.formControl} variant="outlined">
          <span className={props.classes.datepickerText}>
            {strings.formatString(strings.adminPanelBoxesFilterSearch)}
          </span>
          <TextField
            className={props.classes.spacing}
            fontSize={30}
            id="rezerviranoOd"
            name="rezerviranoOd"
            onChange={props.handleChangeSearchBox}
            type="text"
            value={props.searchBox || ""}
            variant="outlined"
          />
        </FormControl>
      </div>
      <div className={props.classes.buttonContainer}>
        <Button
          variant="contained"
          size="large"
          color="secondary"
          startIcon={<DeleteIcon />}
          onClick={props.handleObrisiOznaceno}
          disabled={props.disabledDeleteSelected}
        >
          {strings.formatString(strings.adminPanelBoxesDeleteButton)}
        </Button>
        <IconButton
          type="submit"
          variant="contained"
          color="primary"
          fontSize="large"
          className={props.classes.addButton}
          onClick={props.handleAddBox}
        >
          <AddIcon fontSize="large" />
        </IconButton>
      </div>
    </>
  );
};

export default FilterForma;
