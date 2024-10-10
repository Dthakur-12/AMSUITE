import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import { requestDownloadExcelTemplate } from "../../actions/EasyAccess/Person_actions";
import { requestDownloadSunctorTripsXLSX } from "../../actions/AccessControl/trip_action";
import { connect } from "react-redux";
import { compose } from "redux";
import moment from "moment";
import SnackbarHandler from "../../utils/SnackbarHandler";
import { endOfDay, startOfDay } from "date-fns";
import { requestGetPanels } from "../../actions/AccessControl/panel_actions";
import { requestBadges } from "../../actions/EasyAccess/Badges_actions";

const dateNow = new Date(new Date().setHours(0, 0, 0));
let auxStartDate = new Date(new Date().setHours(0, 0, 0));
auxStartDate.setDate(auxStartDate.getDate() - 7);
const dateEnd = new Date(new Date().setHours(23, 59, 0));
const withTripsReport = (Component) =>
  (class extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        selectStartEnd: true,
        minDate: undefined,
        successFile: false,
        dateRangePicker: {
          selection: {
            startDate: auxStartDate,
            endDate: new Date(),
            key: "selection",
          },
        },
        filterRange: {
          startDate: auxStartDate,
          endDate: new Date(),
        },
        selectedPanels: [],
        selectedPanelsObject: [],
        selectedBadges: [],
        selectedBadgesObject: [],
      };
    }

    handleRangeChange = (ranges) => {
      const minDate = new Date(
        moment(ranges.selection.endDate).subtract(30, "days")
      );

      const maxDate = new Date(
        moment(ranges.selection.startDate).add(30, "days")
      );
      const isBeforeToday = moment(dateNow).isAfter(maxDate);
      this.setState({
        dateRangePicker: {
          selection: {
            ...this.state.dateRangePicker.selection,
            startDate: startOfDay(ranges.selection.startDate),
            endDate: endOfDay(ranges.selection.endDate),
          },
        },
        filterRange: {
          startDate: startOfDay(ranges.selection.startDate),
          endDate: endOfDay(ranges.selection.endDate),
        },
      });
      this.setState((prevState) => ({
        selectStartEnd: !prevState.selectStartEnd,
        minDate: prevState.selectStartEnd ? minDate : undefined,
        maxDate: prevState.selectStartEnd
          ? isBeforeToday
            ? maxDate
            : dateNow
          : dateNow,
      }));
    };

    static getDerivedStateFromProps(nextProps, prevState) {
      if (
        nextProps.successDownloadXLS !== prevState.successDownloadXLS ||
        nextProps.loadingTripsXLSX !== prevState.loadingTripsXLSX ||
        nextProps.error !== prevState.error
      ) {
        return {
          error: nextProps.error,
          loadingTripsXLSX: nextProps.loadingTripsXLSX,
          successDownloadXLS: nextProps.successDownloadXLS,
        };
      } else return null;
    }

    componentDidUpdate(prevProps, prevState) {
      const { statuses, successGetStatuses } = this.state;
      const { t } = this.props;
      if (
        this.state.successDownloadXLS &&
        prevProps.successDownloadXLS !== this.state.successDownloadXLS
      ) {
        let report =
          "data:application/vnd.ms-excel" + ";base64," + this.props.report.data;
        require("downloadjs")(
          report,
          `${this.props.t("TripsRecordXLSX")}.xls`,
          "application/vnd.ms-excel"
        );
      }
      if (
        !this.state.loadingTripsXLSX &&
        this.state.loadingTripsXLSX !== prevState.loadingTripsXLSX
      ) {
        if (this.state.error) {
          SnackbarHandler.showMessage(t(this.state.error), "error");
          this.setState({
            isCreating: false,
          });
        }
      }
    }

    generateReport = () => {
      let valueStart = new Date(
        this.state.filterRange.startDate -
          this.state.filterRange.startDate.getTimezoneOffset() * 60000
      ).toJSON();

      let valueEnd = new Date(
        this.state.filterRange.endDate -
          this.state.filterRange.endDate.getTimezoneOffset() * 60000
      ).toJSON();

      let selectedBadgesNumbers = this.state.selectedBadgesObject.slice();
      selectedBadgesNumbers = selectedBadgesNumbers.map((b) => b.number);

      this.props.requestDownloadSunctorTripsXLSX({
        startDate: valueStart,
        endDate: valueEnd,
        panelIds: this.state.selectedPanels,
        badges: selectedBadgesNumbers,
      });
    };

    handleBadgeTableSelect = (selectedBadges) => {
      let selectedBadgesIds = [];
      selectedBadges.map((panel) => {
        return selectedBadgesIds.push(panel.id);
      });
      this.setState((prevState) => ({
        selectedBadges: selectedBadgesIds,
        selectedBadgesObject: selectedBadges,
      }));
    };

    handlePanelTableSelect = (selectedPanels) => {
      let selectedPanelsIds = [];
      selectedPanels.map((panel) => {
        return selectedPanelsIds.push(panel.id);
      });
      this.setState((prevState) => ({
        selectedPanels: selectedPanelsIds,
        selectedPanelsObject: selectedPanels,
      }));
    };

    render() {
      const {
        dateRangePicker,
        minDate,
        maxDate,
        isCreating,
        successFile,
        selectedPanelsObject,
        selectedBadgesObject,
      } = this.state;

      const {
        badges,
        badgesCount,
        panels,
        panelsCount,
        loading,
        loadingTripsXLSX,
        successDownloadXLS,
      } = this.props;
      return (
        <Component
          dateRangePicker={dateRangePicker}
          minDate={minDate}
          maxDate={maxDate}
          loading={loading}
          loadingTripsXLSX={loadingTripsXLSX}
          successDownloadXLS={successDownloadXLS}
          handleRangeChange={this.handleRangeChange}
          handleBadgeTableSelect={this.handleBadgeTableSelect}
          handlePanelTableSelect={this.handlePanelTableSelect}
          generateReport={this.generateReport}
          selectedPanelsObject={selectedPanelsObject}
          selectedBadgesObject={selectedBadgesObject}
          requestBadges={requestBadges}
          requestGetPanels={requestGetPanels}
          badges={badges}
          panels={panels}
          panelsCount={panelsCount}
          {...this.props}
        />
      );
    }
  });

const mapStateToProps = ({ Persons, Trips, Panel, Badges }) => ({
  report: Trips.report,
  successDownloadXLS: Trips.successDownloadXLS,
  loadingTripsXLSX: Trips.loadingTripsXLSX,
  loading: Trips.loading,
  error: Trips.error,
  badges: Badges.badges,
  panels: Panel.panels,
  panelsCount: Panel.panelsCount,
});

const mapDispatchToProps = {
  requestDownloadSunctorTripsXLSX,
  requestGetPanels,
  requestBadges,
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withTranslation(),
  withTripsReport
);
