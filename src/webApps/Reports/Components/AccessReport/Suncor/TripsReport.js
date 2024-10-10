import React, { Component } from "react";
import PropTypes from "prop-types";
import { DateRange } from "react-date-range";
import { connect } from "react-redux";
import {
  Grid,
  Paper,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";
import {

  withStyles,
} from "@mui/styles";
import { requestGeneralTripsReportXLSX } from "../../../../../actions/AccessControl/trip_action";
import DataTableSelectAction from "../../../../Shared/DataTable/DataTableSelectAction";
import withTripsReport from "../../../../../core/Reports/withTripsReport";
import { withTranslation } from "react-i18next";
import { compose } from "redux";

export const TripsReport = (props) => {
  const {
    t,
    classes,
    theme,
    handleRangeChange,
    dateRangePicker,
    minDate,
    maxDate,
    requestBadges,
    requestGetPanels,
    generateReport,
    isCreating,
    downloadReport,
    successFile,
    loadingXLSX,
    selectedPanels,
    selectedBadgesObject,
    selectedPanelsObject,
    handleBadgeTableSelect,
    handlePanelTableSelect,
    badges,
    panels,
    panelsCount,
    loading,
  } = props;

  return (
    <Paper className={classes.paper}>
      <Grid xs={12} item></Grid>
      <Grid container spacing={24}>
        <Grid xs={12} md={5} lg={4} item>
          <DateRange
            onChange={handleRangeChange}
            moveRangeOnFirstSelection={false}
            ranges={[dateRangePicker.selection]}
            className={classes.rangePicker}
            months={1}
            dragSelectionEnabled={false}
            minDate={minDate}
            maxDate={maxDate}
          />
        </Grid>
        <Grid xs={12} md lg item style={{ padding: 10 }}>
          <DataTableSelectAction
            handleConfirm={handlePanelTableSelect}
            loadDataAction={requestGetPanels}
            elements={selectedPanelsObject}
            primaryTitle={t("Panels")}
            title={t("Panels")}
            DataTableColumns={[
              {
                name: t("name"),
                field: "name",
                options: {
                  sort: true,
                  filter: true,
                  sortDirection: "asc",
                  customBodyRender: (data) => {
                    if (data.name) return <Typography>{data.name}</Typography>;
                  },
                },
              },
            ]}
            multipleSelect={true}
            attribute={"name"}
            info={{ data: panels, dataCount: panelsCount }}
          />
        </Grid>

        <Grid xs={12} md lg item style={{ padding: 10 }}>
          <DataTableSelectAction
            handleConfirm={handleBadgeTableSelect}
            loadDataAction={requestBadges}
            elements={selectedBadgesObject}
            primaryTitle={t("Badges")}
            title={t("Badges")}
            DataTableColumns={[
              {
                name: t("number"),
                field: "number",
                options: {
                  sort: true,
                  filter: true,
                  sortDirection: "asc",
                  customBodyRender: (data) => {
                    if (data.number)
                      return (
                        <Typography value={data.number}>
                          {data.number}
                        </Typography>
                      );
                  },
                },
              },
            ]}
            multipleSelect={true}
            attribute={"number"}
            info={badges}
            showSelectedElements={false}
          />
        </Grid>
        <Button
          disabled={loading}
          onClick={generateReport}
          color="primary"
          variant="contained"
          fullWidth
        >
          {loading ? (
            <CircularProgress color="inherit" size={14} />
          ) : (
            "Download"
          )}
        </Button>
      </Grid>
    </Paper>
  );
};

const styles = (theme) => ({
  paper: {
    padding: "2rem",
  },
  customCircularProgress: {
    position: "inherit",
    //bottom: "5%",
    rigth: 0,
    //left: "50%",
    //marginTop: -12,
    marginLeft: 4,
    color: theme.palette.text.main + " !important",
  },
  rangePicker: {
    color: theme.palette.text.main + " !important",
    "& .rdrDayDisabled": {
      backgroundColor: theme.palette.backgroundSecondary.main,
    },
    "& .rdrDayPassive .rdrDayNumber span": {
      color: "#6e6e6e !important",
    },
    "& .rdrDay .rdrDayPassive .rdrDayToday": { color: "red !important" },
  },
  customButton: {
    color: theme.palette.text.main + " !important",
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
  confirmDialog: {
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${
      theme.spacing.unit * 3
    }px`,
    [theme.breakpoints.up(900 + theme.spacing.unit * 3 * 2)]: {
      marginBottom: theme.spacing.unit * 6,
      padding: theme.spacing.unit * 3,
    },
  },
});

const enhance = compose(
  withTranslation(),
  withStyles(styles, { withTheme: true })
);

export default withTripsReport(enhance(TripsReport));
