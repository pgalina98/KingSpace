import * as React from "react";

import { ViewState, Resources } from "@devexpress/dx-react-scheduler";
import {
  Scheduler as DevEXScheduler,
  AllDayPanel,
  DayView,
  WeekView,
  MonthView,
  ViewSwitcher,
  Appointments,
  AppointmentTooltip,
  Toolbar,
  DateNavigator,
  TodayButton,
} from "@devexpress/dx-react-scheduler-material-ui";
import { makeStyles, useTheme, withStyles } from "@material-ui/core/styles";
import { alpha } from "@material-ui/core/styles";
import PersonPinIcon from "@material-ui/icons/PersonPin";
import Room from "@material-ui/icons/Room";
import Grid from "@material-ui/core/Grid";
import classNames from "clsx";
import moment from "moment";
import { Divider, useMediaQuery } from "@material-ui/core";

import { strings } from "../../localization/localization";
import { resourcesData } from "../../components/scheduler/resources";

const styles = ({ palette, font }) => ({
  icon: {
    color: palette.action.active,
  },
  textCenter: {
    textAlign: "center",
  },
  room: {
    background: `url(http://10.23.11.49/assets/box/defaultBox.jpg)`,
  },
  header: {
    height: "260px",
    backgroundSize: "cover",
  },
  content: { fontSize: font.fontSize.medium },
  commandButton: {
    backgroundColor: "rgba(255,255,255,0.65)",
  },
});

const useStyles = makeStyles((theme) => ({
  todayCell: {
    backgroundColor: alpha(theme.palette.primary.main, 0.1),
    "&:hover": {
      backgroundColor: alpha(theme.palette.primary.main, 0.14),
    },
    "&:focus": {
      backgroundColor: alpha(theme.palette.primary.main, 0.16),
    },
  },
  weekendCell: {
    backgroundColor: alpha(theme.palette.action.disabledBackground, 0.04),
    "&:hover": {
      backgroundColor: alpha(theme.palette.action.disabledBackground, 0.04),
    },
    "&:focus": {
      backgroundColor: alpha(theme.palette.action.disabledBackground, 0.04),
    },
  },
  today: {
    backgroundColor: alpha(theme.palette.primary.main, 0.16),
  },
  weekend: {
    backgroundColor: alpha(theme.palette.action.disabledBackground, 0.06),
  },
  icon: {
    color: theme.palette.action.active,
  },
  textCenter: {
    textAlign: "center",
  },
}));

const AllDayCell = (props) => (
  <AllDayPanel.Cell {...props} style={{ height: "65px" }} />
);

const TimeTableCell = (props) => {
  const classes = useStyles();
  const { startDate } = props;
  const date = new Date(startDate);

  if (date.getDate() === new Date().getDate()) {
    return <WeekView.TimeTableCell {...props} className={classes.todayCell} />;
  }
  if (date.getDay() === 0 || date.getDay() === 6) {
    return (
      <WeekView.TimeTableCell {...props} className={classes.weekendCell} />
    );
  }
  return <WeekView.TimeTableCell {...props} />;
};

const DayScaleCell = (props) => {
  const classes = useStyles();
  const { startDate, today } = props;

  if (today) {
    return <WeekView.DayScaleCell {...props} className={classes.today} />;
  }
  if (startDate.getDay() === 0 || startDate.getDay() === 6) {
    return <WeekView.DayScaleCell {...props} className={classes.weekend} />;
  }
  return <WeekView.DayScaleCell {...props} />;
};

const Header = withStyles(styles, { name: "Header" })(
  ({ children, appointmentData, classes, ...restProps }) => (
    <AppointmentTooltip.Header
      {...restProps}
      className={classNames(classes.room, classes.header)}
      appointmentData={appointmentData}
    ></AppointmentTooltip.Header>
  )
);

const Content = withStyles(styles, { name: "Content" })(
  ({ children, appointmentData, classes, ...restProps }) => (
    <AppointmentTooltip.Content
      {...restProps}
      className={classes.content}
      appointmentData={appointmentData}
    >
      <Grid container alignItems="center">
        <Grid item xs={2} className={classes.textCenter}>
          <Room className={classes.icon} fontSize="large" />
        </Grid>
        <Grid item xs={10}>
          <span>{appointmentData.location}</span>
        </Grid>
      </Grid>
      <Grid container alignItems="center">
        <Grid item xs={2} className={classes.textCenter}>
          <PersonPinIcon className={classes.icon} fontSize="large" />
        </Grid>
        <Grid item xs={10}>
          <span>{appointmentData.reservedByUser}</span>
        </Grid>
      </Grid>
    </AppointmentTooltip.Content>
  )
);

const CommandButton = withStyles(styles, { name: "CommandButton" })(
  ({ classes, value, ...restProps }) => (
    <AppointmentTooltip.CommandButton
      {...restProps}
      className={classes.commandButton}
    />
  )
);

const Appointment = ({
  children, style, ...restProps
}) => (
  <Appointments.Appointment
    {...restProps}
    style={{
      ...style,
      backgroundColor: '#ff8f00',
      borderRadius: 10,
      fontSize: 16,
    }}
  >
    {children}
  </Appointments.Appointment>
);

export default function Scheduler({ boxReservations }) {
  const resources = [
    {
      fieldName: "boxId",
      title: "Box",
      instances: resourcesData,
    },
  ];
  const theme = useTheme();
  const isExtraLarge = useMediaQuery(theme.breakpoints.up("xl"));

  boxReservations = boxReservations.map((reservation) => ({
    id: reservation.id,
    location: reservation?.workspace
      ? reservation.workspace.name
      : reservation.workplace.name,
    title: `${reservation?.workspace
      ? reservation.workspace.name
      : reservation.workplace.name
      }  | ${reservation?.team ? reservation?.team.name : reservation.reservedByUser
      }`,
    startDate: moment(
      reservation.reservedFrom + " 09:00:00",
      "DD.MM.YYYY HH:mm:ss"
    )._i,
    endDate: moment(
      reservation.reservedUntil + " 17:00:00",
      "DD.MM.YYYY HH:mm:ss"
    )._i,
    reservedByUser: reservation.reservedByUser,
    boxId: 1,
  }));

  return (
    <>
      <DevEXScheduler
        data={boxReservations}
        height={isExtraLarge ? 640 : 430}
        locale={strings.getLanguage() === "en" ? "en-US" : "hr-HR"}
      >
        <ViewState
          defaultCurrentDate={new Date()}
          defaultCurrentViewName="Week"
        />
        <DayView startDayHour={9} endDayHour={17} />
        <WeekView
          startDayHour={9}
          endDayHour={17}
          timeTableCellComponent={TimeTableCell}
          dayScaleCellComponent={DayScaleCell}
        />
        <MonthView />
        <AllDayPanel cellComponent={AllDayCell} />
        <Toolbar />
        <ViewSwitcher />
        <DateNavigator />
        <TodayButton />

        <Appointments appointmentComponent={Appointment} />
        <Resources data={resources} mainResourceName="boxId" />

        <AppointmentTooltip
          headerComponent={Header}
          contentComponent={Content}
          commandButtonComponent={CommandButton}
          showCloseButton
        />
      </DevEXScheduler>
      <Divider />
    </>
  );
}
