import React, { Component } from "react";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import { withStyles } from '@mui/styles';
import { Grid, Typography, TextField } from "@mui/material";
import { justNumbers } from "../../../../utils/HelperFunctions";
import { Checkbox } from "semantic-ui-react";

export const OthersFiltersView = (props) => {
  const {
    maxSpeedLEQ,
    maxSpeedGEQ,
    avgSpeedLEQ,
    avgSpeedGEQ,
    travelTimeLEQ,
    travelTimeGEQ,
    numberOfPassengersLEQ,
    numberOfPassengersGEQ,
    handleInputChange,
    t,
    classes,
    checked,
    handleChange,
  } = props;
  return (
    (<Grid
      container
      spacing={24}
      direction="row"
      justifyContent="center"
      alignItems="center"
      className={classes.container}
    >
      <Grid item xs="12">
        <div className={classes.inputTitle}>
          <Typography>{t("MaximumSpeed") + " (k/s)"}</Typography>
          <Checkbox
            name="maxSpeed"
            checked={checked.maxSpeed}
            className={classes.checkBox}
            toggle
            onChange={props.handleChange}
            style={{ marginLeft: 5 }}
          />
        </div>

        <TextField
          value={maxSpeedGEQ}
          name="maxSpeedGEQ"
          id="outlined-basic"
          label={t("GEQ")}
          variant="outlined"
          className={classes.textField}
          onChange={handleInputChange}
          onKeyPress={(event) => {
            if (!justNumbers(event)) event.preventDefault();
          }}
          disabled={!checked.maxSpeed}
        />
        <TextField
          value={maxSpeedLEQ}
          name="maxSpeedLEQ"
          id="outlined-basic"
          label={t("LEQ")}
          variant="outlined"
          className={classes.textField}
          onChange={handleInputChange}
          onKeyPress={(event) => {
            if (!justNumbers(event)) event.preventDefault();
          }}
          disabled={!checked.maxSpeed}
        />
      </Grid>
      <Grid item xs="12">
        <div className={classes.inputTitle}>
          <Typography>{t("AverageSpeed")}</Typography>
          <Checkbox
            name="avgSpeed"
            checked={checked.avgSpeed}
            className={classes.checkBox}
            toggle
            onChange={props.handleChange}
            style={{ marginLeft: 5 }}
          />
        </div>
        <TextField
          value={avgSpeedGEQ}
          name="avgSpeedGEQ"
          id="outlined-basic"
          label={t("GEQ")}
          variant="outlined"
          className={classes.textField}
          onChange={handleInputChange}
          onKeyPress={(event) => {
            if (!justNumbers(event)) event.preventDefault();
          }}
          disabled={!checked.avgSpeed}
        />
        <TextField
          value={avgSpeedLEQ}
          name="avgSpeedLEQ"
          id="outlined-basic"
          label={t("LEQ")}
          variant="outlined"
          className={classes.textField}
          onChange={handleInputChange}
          onKeyPress={(event) => {
            if (!justNumbers(event)) event.preventDefault();
          }}
          disabled={!checked.avgSpeed}
        />
      </Grid>
      <Grid item xs="12">
        <div className={classes.inputTitle}>
          <Typography>{t("NumberOfPassengers")}</Typography>
          <Checkbox
            name="numberOfPassengers"
            checked={checked.numberOfPassengers}
            className={classes.checkBox}
            toggle
            onChange={props.handleChange}
            style={{ marginLeft: 5 }}
          />
        </div>
        <TextField
          value={numberOfPassengersGEQ}
          name="numberOfPassengersGEQ"
          id="outlined-basic"
          label={t("GEQ")}
          variant="outlined"
          className={classes.textField}
          onChange={handleInputChange}
          onKeyPress={(event) => {
            if (!justNumbers(event)) event.preventDefault();
          }}
          disabled={!checked.numberOfPassengers}
        />
        <TextField
          value={numberOfPassengersLEQ}
          name="numberOfPassengersLEQ"
          id="outlined-basic"
          label={t("LEQ")}
          variant="outlined"
          className={classes.textField}
          onChange={handleInputChange}
          onKeyPress={(event) => {
            if (!justNumbers(event)) event.preventDefault();
          }}
          disabled={!checked.numberOfPassengers}
        />
      </Grid>
      <Grid item xs="12">
        <div className={classes.inputTitle}>
          <Typography>{t("TravelTime") + " (m)"}</Typography>
          <Checkbox
            name="travelTime"
            checked={checked.travelTime}
            className={classes.checkBox}
            toggle
            onChange={props.handleChange}
            style={{ marginLeft: 5 }}
          />
        </div>
        <TextField
          value={travelTimeGEQ}
          name="travelTimeGEQ"
          id="outlined-basic"
          label={t("GEQ")}
          variant="outlined"
          className={classes.textField}
          onChange={handleInputChange}
          onKeyPress={(event) => {
            if (!justNumbers(event)) event.preventDefault();
          }}
          disabled={!checked.travelTime}
        />
        <TextField
          value={travelTimeLEQ}
          name="travelTimeLEQ"
          id="outlined-basic"
          label={t("LEQ")}
          variant="outlined"
          className={classes.textField}
          onChange={handleInputChange}
          onKeyPress={(event) => {
            if (!justNumbers(event)) event.preventDefault();
          }}
          disabled={!checked.travelTime}
        />
      </Grid>
    </Grid>)
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

const OthersFiltersViewConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(OthersFiltersView);

const styles = (theme) => ({
  textField: {
    width: "50%",
    paddingRight: 10,
  },
  container: {
    width: 460,
  },
  inputTitle: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    marginBottom: 10,
  },
});
export default withTranslation()(
  withStyles(styles, { withTheme: true })(OthersFiltersViewConnected)
);
