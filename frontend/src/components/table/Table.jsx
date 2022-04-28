import React from "react";

import { Grid, makeStyles } from "@material-ui/core";

import { BOX_TIMSKI } from "../../utils/constants";
import Chair from "../chair/Chair";

const useStyles = makeStyles((theme) => ({
  container: {
    height: "100%",
    [theme.breakpoints.down("sm")]: {
      height: "calc(100vh - 145px)",
    },
  },
  table: {
    backgroundColor: theme.palette.primary.main,
    borderRadius: "50px",
    height: "calc(100% - 150px)",
    marginTop: "75px",
    [theme.breakpoints.down("sm")]: {
      height: "calc(100% - 60px)",
      marginTop: "30px",
    },
  },
  tableDescription: {
    paddingTop: "15px",
    paddingBottom: "15px",
    borderTopLeftRadius: "50px",
    borderTopRightRadius: "50px",
    textAlign: "center",
    backgroundColor: theme.palette.secondary.light,
    fontWeight: "bold",
  },
  chairsContainer: {
    height: "calc(100% - 160px)",
    marginTop: "80px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
}));

function TeamBoxTable({ boxDetails, selectedDateBoxReservations }) {
  const classes = useStyles();
  const isReserved = selectedDateBoxReservations ? true : false;

  return (
    <Grid container className={classes.container} justifyContent="center">
      {/*^Fix SPACING after setting all components^*/}
      {/*Chairs on the left side of table*/}
      <Grid item xs={3} sm={3} md={3}>
        <div className={classes.chairsContainer}>
          {boxDetails.workplaces
            .slice(0, boxDetails.workplaces.length / 2)
            .map((workplace) => (
              <Chair
                key={workplace.id}
                isReserved={isReserved}
                hoverEnabled={false}
              />
            ))}
        </div>
      </Grid>
      {/*"Table - div element"*/}
      <Grid item xs={6} sm={5} md={5}>
        <div className={classes.table}>
          {selectedDateBoxReservations && (
            <p className={classes.tableDescription}>
              {selectedDateBoxReservations.team.name}
            </p>
          )}
        </div>
      </Grid>
      {/*Chairs on the right side of table*/}
      <Grid item xs={3} sm={3} md={3}>
        <div className={classes.chairsContainer}>
          {boxDetails.workplaces
            .slice(
              boxDetails.workplaces.length / 2,
              boxDetails.workplaces.length
            )
            .map((workplace) => (
              <Chair
                key={workplace.id}
                isReserved={isReserved}
                hoverEnabled={false}
              />
            ))}
        </div>
      </Grid>
    </Grid>
  );
}

function SingleBoxTable({
  boxDetails,
  selectedDateBoxReservations,
  selectedChair,
  handleChairClick,
}) {
  const classes = useStyles();

  return (
    <Grid container className={classes.container} justifyContent="center">
      {/*^Fix SPACING after setting all components^*/}
      {/*Chairs on the left side of table*/}
      <Grid item xs={3} sm={3} md={3}>
        <div className={classes.chairsContainer}>
          {boxDetails.workplaces
            .slice(0, boxDetails.workplaces.length / 2)
            .map((workplace) => (
              <div
                key={workplace.id}
                data-chair-id={workplace.id}
                data-chair-name={workplace.name}
                data-chair-is-reserved={selectedDateBoxReservations.some(
                  (reservation) => reservation.workplace.id === workplace.id
                )}
                onClick={handleChairClick}
              >
                <Chair
                  key={workplace.id}
                  name={workplace.name}
                  isReserved={selectedDateBoxReservations.some(
                    (reservation) => reservation.workplace.id === workplace.id
                  )}
                  reservedByUser={
                    selectedDateBoxReservations.some(
                      (reservation) => reservation.workplace.id === workplace.id
                    )
                      ? selectedDateBoxReservations.filter(
                        (reservation) =>
                          reservation.workplace.id === workplace.id
                      )[0].reservedByUser
                      : null
                  }
                  selectedChair={selectedChair}
                  hoverEnabled={true}
                />
              </div>
            ))}
        </div>
      </Grid>
      {/*"Table - div element"*/}
      <Grid item xs={6} sm={5} md={5}>
        <div className={classes.table}>
          <p className={classes.tableDescription}>{selectedChair.name}</p>
        </div>
      </Grid>
      {/*Chairs on the right side of table*/}
      <Grid item xs={3} sm={3} md={3}>
        <div className={classes.chairsContainer}>
          {boxDetails.workplaces
            .slice(
              boxDetails.workplaces.length / 2,
              boxDetails.workplaces.length
            )
            .map((workplace) => (
              <div
                key={workplace.id}
                data-chair-id={workplace.id}
                data-chair-name={workplace.name}
                data-chair-is-reserved={selectedDateBoxReservations.some(
                  (reservation) => reservation.workplace.id === workplace.id
                )}
                onClick={handleChairClick}
              >
                <Chair
                  key={workplace.id}
                  name={workplace.name}
                  isReserved={selectedDateBoxReservations.some(
                    (reservation) => reservation.workplace.id === workplace.id
                  )}
                  reservedByUser={
                    selectedDateBoxReservations.some(
                      (reservation) => reservation.workplace.id === workplace.id
                    )
                      ? selectedDateBoxReservations.filter(
                        (reservation) =>
                          reservation.workplace.id === workplace.id
                      )[0].reservedByUser
                      : null
                  }
                  selectedChair={selectedChair}
                  hoverEnabled={true}
                />
              </div>
            ))}
        </div>
      </Grid>
    </Grid>
  );
}

export default function Table(props) {
  const {
    boxDetails,
    selectedDateBoxReservations,
    selectedChair,
    handleChairClick,
  } = props;

  return (
    <>
      {boxDetails.type.name === BOX_TIMSKI ? (
        <TeamBoxTable
          boxDetails={boxDetails}
          selectedDateBoxReservations={selectedDateBoxReservations[0]}
        />
      ) : (
        <SingleBoxTable
          boxDetails={boxDetails}
          selectedDateBoxReservations={selectedDateBoxReservations}
          selectedChair={selectedChair}
          handleChairClick={handleChairClick}
        />
      )}
    </>
  );
}
