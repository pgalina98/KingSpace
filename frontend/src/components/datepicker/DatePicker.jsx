import React from 'react';
import { makeStyles, Grid } from '@material-ui/core';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { hr } from 'date-fns/locale';
import format from 'date-fns/format';
import moment from 'moment';

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(5),
    paddingRight: theme.spacing(5),
    [theme.breakpoints.down('sm')]: {
      paddingTop: theme.spacing(3),
      paddingRight: theme.spacing(3),
    },
    minWidth: '275',
  },
  datePickerSize: {
    width: '200px',
  },
  inputProp: {
    fontSize: theme.font.fontSize.medium,
  },
}));

class LocalizedUtils extends DateFnsUtils {
  getDatePickerHeaderText(date) {
    return format(date, 'dd.MM.yyyy.', { locale: this.locale });
  }
}

export default function DatePicker({ selectedDate, setSelectedDate }) {
  const classes = useStyles();

  const handleDateChange = (date) => {
    const formatedDate = moment(date).format('DD.MM.yyyy');
    setSelectedDate(formatedDate);
  };

  return (
    <MuiPickersUtilsProvider utils={LocalizedUtils} locale={hr}>
      <Grid container justifyContent='flex-end' className={classes.container}>
        <KeyboardDatePicker
          autoOk
          variant='inline'
          inputVariant='outlined'
          label='Kalendar'
          format='dd.MM.yyyy.'
          value={selectedDate}
          InputAdornmentProps={{ position: 'start' }}
          onChange={handleDateChange}
          InputProps={{ className: classes.inputProp }}
          className={classes.datePickerSize}
        />
      </Grid>
    </MuiPickersUtilsProvider>
  );
}
