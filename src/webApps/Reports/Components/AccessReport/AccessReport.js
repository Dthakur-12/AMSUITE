import React from "react";
import { withTranslation } from "react-i18next";
import DatePicker from "react-datepicker";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import DataTableSelect from "../../../Shared/DataTable/DataTableSelect";
import ApiHandler from "../../../../services/ApiHandler";
//import { DatePicker } from "@mui/x-date-pickers";
import { isNullOrUndefined } from "util";
import { withStyles } from "@mui/styles";
import Select from "react-select";
import components from "../../../Shared/ReactSelect";
import { emphasize } from "@mui/system";
import { requestEnterprises } from "../../../../actions/EasyAccess/Enterprise_actions";
import { connect } from "react-redux";
import DataTableSelectAction from "../../../Shared/DataTable/DataTableSelectAction";
import TripReport from "./TripReport";
import TripReportSuncor from "./Suncor/TripReport";
import PassagesReport from "./PassagesReport";
import EventsReport from "./EventsReport";
import GeneralTripsReport from "./GeneralTripsReport";
import TripsReport from "./Suncor/TripsReport";
import withGeneralTripsReport from "../../../../core/Reports/withGeneralTripsReport";

const GeneralTripsReportWrapper = withGeneralTripsReport(GeneralTripsReport);
let date = new Date(),
  y = date.getFullYear(),
  m = date.getMonth();
let lastDay = new Date(y, m + 1, 0);

let activeColumnSort = 3;
let order = "asc";

class AccessReport extends React.Component {
  constructor(props) {
    super(props);
    const { t, expiredDate } = this.props;
    this.state = {
      SelectedReportOption: this.reportOptions(t),
      report: 0,
      selectedReport: { value: 0, label: t("Events") },
      // selectedReport: { value: 4, label: "Contact Trace" },
    };
  }

  reportOptions = (t) => ({
    0: { value: 0, label: t("Events") }, //reporte de eventos generico
    // 1: { value: 1, label: t("Tickets") },//reporte de tikas
    // 2: { value: 2, label: t("GeneralTripsReport") },//reporte de tur este
    // 3: { value: 3, label: t("Trips") },//reporte de tur este
    // 4: { value: 4, label: t("Trips") }, //reporte de suncor
    4: { value: 4, label: "Contact Trace" }, //reporte de suncor
  });

  handleSelectReportChange = (name) => (event) => {
    const { t } = this.props;
    let value = event.currentTarget ? event.currentTarget.value : event.value;

    this.setState((prevState) => ({
      selectedReport: this.state.SelectedReportOption[event.value],
      report: value,
    }));
  };

  render() {
    const { t, classes, theme } = this.props;
    const {
      selectedReport,
      SelectedReportOption,
      enterpriseIds,
      selectedState,
      selectedDate,
      controlId,
    } = this.state;

    const selectStyles = {
      input: (base) => ({
        ...base,
        color: theme.palette.text.primary,
        "& input": {
          font: "inherit",
        },
        width: "100%",
        menuList: {
          maxHeight: 100,
        },
      }),
    };

    return (
      <Grid container className={classes.container}>
        <Grid item xs={10} md={3}>
          <div className={classes.formControl}>
            <label className={classes.formControlLabel}>
              {t("SelectReport")}
            </label>
            <Select
              classes={classes}
              className={classes.select}
              components={components}
              styles={selectStyles}
              options={Object.values(SelectedReportOption)}
              onChange={this.handleSelectReportChange("report")}
              placeholder={t("Reports")}
              maxMenuHeight={200}
              isLoading={false}
              value={selectedReport}
            />
          </div>
        </Grid>
        {this.state.report === 0 && <EventsReport />}
        {/*{this.state.report === 1 && <PassagesReport />}
        {this.state.report === 2 && <GeneralTripsReportWrapper />}
        {this.state.report === 3 && <TripReport />} */}
        {this.state.report === 4 && <TripsReport />}
      </Grid>
    );
  }
}

const styles = (theme) => ({
  container: {
    flexDirection: "column",
  },
  //Select css
  valueContainer: {
    display: "flex",
    flex: 1,
    alignItems: "center",
    overflow: "hidden",
  },
  chip: {
    margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`,
  },
  chipFocused: {
    backgroundColor: emphasize(
      theme.palette.mode === "light"
        ? theme.palette.grey[300]
        : theme.palette.grey[700],
      0.08
    ),
  },
  noOptionsMessage: {
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
  },
  singleValue: {
    fontSize: 16,
    width: "100%",
  },
  placeholder: {
    position: "absolute",
    left: 2,
    fontSize: 16,
  },
  paperSelect: {
    position: "absolute",
    zIndex: 999,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.grey[300],
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  listRoot: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    padding: 0,
  },
  nested: {
    paddingLeft: 0,
  },
  grid: {
    paddingBottom: "0px !important",
    paddingTop: "0px !important",
  },
  expand: {
    transform: "rotate(0deg)",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  withError: {
    color: "#f44336 !important",
  },
  center: {
    display: "flex",
    justifyContent: "center",
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  contentLoader: {
    display: "flex",
    position: "absolute",
    top: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "#d0d0d080",
  },
  circularProgress: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -25,
    marginLeft: -50,
  },
  formControlLabel: {
    top: 0,
    left: 0,
    position: "absolute",
    color: theme.palette.textSecondary.main,
    padding: 0,
    fontSize: "0.8rem",
    fontFamily: "'Lato', sans-serif",
    lineHeight: 1,
  },
  formControl: {
    // margin: 20,
    border: 0,
    display: "inline-flex",
    padding: 0,
    position: "relative",
    minWidth: 0,
    flexDirection: "column",
    verticalAlign: "top",
    width: "100%",
    [theme.breakpoints.down('lg')]: {
      marginTop: 40,
    },
  },
  select: {
    paddingTop: 10,
  },
  input: {
    display: "flex",
    padding: 0,
  },
  //fin select css

  filterContainer: {
    padding: 20,
    paddingLeft: 100,
  },
});

const mapStateToProps = ({ DocumentType, Enterprise }) => {
  return {
    successEnterprise: Enterprise.successEnterprise,
    enterprises: Enterprise.enterprises,
    loadingEnterprises: Enterprise.loading,
  };
};

const mapDispatchToProps = {
  requestEnterprises: requestEnterprises,
};

const AccessReportConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(AccessReport);

export default withTranslation()(
  withStyles(styles, { withTheme: true })(AccessReportConnected)
);
