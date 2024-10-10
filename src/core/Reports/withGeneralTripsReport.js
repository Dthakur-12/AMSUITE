import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import { requestDownloadExcelTemplate } from "../../actions/EasyAccess/Person_actions";
import { requestGeneralTripsReportXLSX } from "../../actions/AccessControl/trip_action";
import { connect } from "react-redux";
import { compose } from "redux";
import moment from "moment";
import SnackbarHandler from "../../utils/SnackbarHandler";
import { endOfDay, startOfDay } from "date-fns";

const dateNow = new Date(new Date().setHours(0, 0, 0));
const dateEnd = new Date(new Date().setHours(23, 59, 0));
const withGeneralTripsReport = (Component) =>
  (class extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        selectStartEnd: true,
        minDate: undefined,
        //  maxDate: dateEnd,
        successFile: false,
        dateRangePicker: {
          selection: {
            startDate: new Date(
              dateNow.getFullYear(),
              dateNow.getMonth() - 1,
              1,
              0,
              0,
              0
            ),
            endDate: new Date(
              moment(dateEnd).subtract(1, "month").endOf("month")
            ),
            key: "selection",
          },
        },
        filterRange: {
          startDate: new Date(
            dateNow.getFullYear(),
            dateNow.getMonth() - 1,
            1,
            0,
            0,
            0
          ),
          endDate: new Date(
            moment(dateEnd).subtract(1, "month").endOf("month")
          ),
        },
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
      //this.setState({});
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
        nextProps.successGeneralXLSX !== prevState.successGeneralXLSX ||
        nextProps.loadingGeneralXLSX !== prevState.loadingGeneralXLSX ||
        nextProps.error !== prevState.error
      ) {
        return {
          error: nextProps.error,
          loadingGeneralXLSX: nextProps.loadingGeneralXLSX,
          successGeneralXLSX: nextProps.successGeneralXLSX,
        };
      } else return null;
    }
    downloadReport = () => {
      let report =
        "data:application/vnd.ms-excel" +
        ";base64," +
        this.props.reportGeneral.data;
      require("downloadjs")(
        report,
        `${this.props.t("GeneralTripsRecordXLSX")}.xlsx`,
        "application/vnd.ms-excel"
      );
    };

    componentDidUpdate(prevProps, prevState) {
      const { statuses, successGetStatuses } = this.state;
      const { t } = this.props;
      if (
        this.state.successGeneralXLSX &&
        prevProps.successGeneralXLSX !== this.state.successGeneralXLSX
      ) {
        SnackbarHandler.showMessage(
          t("TheFileIsReadyToDownload"),
          "info",
          undefined,
          undefined,
          true,
          this.downloadReport
        );
        this.setState({
          isCreating: false,
          successFile: true,
        });
      }
      if (
        !this.state.loadingGeneralXLSX &&
        this.state.loadingGeneralXLSX !== prevState.loadingGeneralXLSX
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
      this.setState({ successFile: false });
      this.props.requestGeneralTripsReportXLSX({
        startDate: valueStart,
        endDate: valueEnd,
      });
      this.setState({ isCreating: true });
    };
    render() {
      const {
        dateRangePicker,
        minDate,
        maxDate,
        isCreating,
        successFile,
      } = this.state;
      return (
        <Component
          dateRangePicker={dateRangePicker}
          minDate={minDate}
          maxDate={maxDate}
          isCreating={isCreating}
          successFile={successFile}
          handleRangeChange={this.handleRangeChange}
          generateReport={this.generateReport}
          downloadReport={this.downloadReport}
          {...this.props}
        />
      );
    }
  });

const mapStateToProps = ({ Persons, Trips }) => ({
  successXlsTemplate: Persons.successXlsTemplate,
  loadingXlsTemplate: Persons.loadingXlsTemplate,
  dataXls: Persons.dataXls,
  reportGeneral: Trips.reportGeneral,
  successGeneralXLSX: Trips.successGeneralXLSX,
  loadingGeneralXLSX: Trips.loadingGeneralXLSX,
  error: Trips.error,
});

const mapDispatchToProps = {
  requestDownloadExcelTemplate,
  requestGeneralTripsReportXLSX,
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withTranslation(),
  withGeneralTripsReport
);
