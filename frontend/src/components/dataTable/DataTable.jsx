import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { withStyles } from '@material-ui/core';

const StyledDataGrid = withStyles({
  root: {
    '& .MuiDataGrid-columnHeader': {
      backgroundColor: '#212121',
      color: '#fff',
      fontSize: '18px',
    },
    '& .MuiDataGrid-columnHeaderCheckbox': {
      height: '100vh',
      backgroundColor: '#fff',
    },
    '& .MuiDataGrid-selectedRowCount': {
      fontSize: '16px',
    },
    '& .MuiDataGrid-renderingZone': {
      maxHeight: 'none !important',
    },
    '& .MuiDataGrid-row:nth-child(odd)': {
      maxHeight: 'none !important',
      backgroundColor: '#DDDDDD',
      fontSize: '16px',
    },
    '& .MuiDataGrid-row:hover': {
      backgroundColor: '#A2DBFA',
    },
    '& .MuiDataGrid-colCellTitle': {
      display: 'block',
      textAlign: 'center',
      width: '100%',
    },
    '& .MuiDataGrid-cell': {
      whiteSpace: 'normal',
      fontSize: '16px',
      display: 'block',
      position: 'relative',
      textAlign: 'center',
    },
  },
})(DataGrid);

const DataTable = (props) => {
  return (
    <StyledDataGrid
      autoHeight
      rows={props.rows}
      columns={props.columns}
      pageSize={5}
      checkboxSelection
      disableSelectionOnClick
      onSelectionModelChange={(itm) => props.handleChecked(itm)}
      loading={props.loading}
    />
  );
};

export default DataTable;
