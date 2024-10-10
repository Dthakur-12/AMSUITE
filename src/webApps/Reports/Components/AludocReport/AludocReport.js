import React from "react";
import ExpiredDocument from "./ExpiredDocument";
import AllDocuments from "./AllDocuments";
import ControlsReport from "./ControlsReport";
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

import AludocReportHome from "./AludocReportHome";

let date = new Date(),
  y = date.getFullYear(),
  m = date.getMonth();
let lastDay = new Date(y, m + 1, 0);

let activeColumnSort = 3;
let order = "asc";

class AludocReport extends React.Component {
  constructor(props) {
    super(props);
    const { t, expiredDate } = this.props;
    this.state = {
      selectedDate: !isNullOrUndefined(expiredDate) ? expiredDate : lastDay,
      SelectedReportOption: this.reportOptions(t),
      enterprises: [],
      enterpriseIds: [],
      enterpriseColumns: this.translateColumns(t),
      report: 4,
      filters: {
        date: date,
        enterprise: undefined,
        status: undefined,
      },
      SelectedStateOption: Object.values(this.statusOptions(t)),
      selectedState: { value: -1, label: t("all") },
      selectedReport: "",
      controlsColumns: {},
      controlId: 0,
    };
  }

  translateColumns = (t) => {
    return [
      {
        name: t("name"),
        field: "name",
        options: {
          filter: true,
          sort: true,
          sortDirection: activeColumnSort === 0 ? order : "none",
        },
      },
    ];
  };

  updateScreenMode = () => {
    this.setState({ isDesktop: window.innerWidth > 900 });
  };

  componentWillUnmount = () => {
    window.removeEventListener("resize", this.updateScreenMode);
  };

  componentDidMount() {
    this.updateScreenMode();
  }
  reportOptions = (t) => ({
    0: { value: 0, label: t("Documentation") },
    1: { value: 1, label: t("DocumentationToExpired") },
    2: { value: 2, label: t("ControlsDetails") },
  });

  statusOptions = (t) => ({
    0: { value: -1, label: t("all") },
    1: { value: 0, label: t("correct") },
    2: { value: 1, label: t("toReview") },
    3: { value: 2, label: t("Rejected") },
    4: { value: 3, label: t("Expired") },
  });

  statusControlOptions = (t) => ({
    0: { value: null, label: t("all") },
    1: { value: -1, label: t("WithoutDocumentation") },
    2: { value: 0, label: t("correct") },
    3: { value: 1, label: t("toReview") },
    4: { value: 2, label: t("Rejected") },
    5: { value: 3, label: t("Expired") },
  });

  handleSelectReportChange = (name) => (event) => {
    const { t } = this.props;
    let value = event.currentTarget ? event.currentTarget.value : event.value;
    this.setState((prevState) => ({
      selectedReport: this.state.SelectedReportOption[event.value],
      selectedState:
        value === 2
          ? { value: null, label: t("all") }
          : { value: -1, label: t("all") },
      SelectedStateOption:
        value === 2
          ? Object.values(this.statusControlOptions(t))
          : Object.values(this.statusOptions(t)),
      report: value,
    }));
  };

  handleEnterpriseSelected = (enterprises) => {
    let enterpriseIds = [];
    enterprises.map((enterprise) => {
      return enterpriseIds.push(enterprise.id);
    });
    this.setState((prevState) => ({
      ...prevState,
      enterpriseIds: enterpriseIds,
      enterprises: enterprises,
    }));
  };

  handleControlSelected = (control) => {
    this.setState((prevState) => ({
      controlId: control,
    }));
  };

  handleSelectStateChange = (name) => (event) => {
    let value = event.currentTarget ? event.currentTarget.value : event.value;

    this.setState((prevState) => ({
      selectedState: Object.values(this.state.SelectedStateOption).filter(
        (s) => s.value === value
      )[0],
      status: value,
    }));
  };

  renderFilters = () => {
    const { t, classes, theme } = this.props;

    const {
      enterprises,
      enterpriseColumns,
      report,
      SelectedStateOption,
      selectedState,
    } = this.state;
    const EntranceDateText = ({ value, onClick }) => (
      <TextField
        style={{ width: "100%" }}
        onClick={onClick}
        label={t("DateLimit")}
        value={value}
        required={this.state.selectedDate}
      />
    );
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
      <Grid container xs={12} style={{ padding: "5px" }}>
        {report === 2 && (
          <Grid item xs={5} md={3} stye={{ padding: 5 }}>
            <DataTableSelect
              handleConfirm={this.handleControlSelected}
              loadDataFunction={
                ApiHandler.Setting.NotificationSettings.getControls
              }
              element={this.state.controlId}
              primaryTitle={t("Control")}
              title={t("controls")}
              dataTableSubTitle={t("SelectControl")}
              mdSubtitle={3}
              DataTableColumns={[
                {
                  name: t("name"),
                  field: "name",
                },
              ]}
              multipleSelect={false}
              attribute={"name"}
              // hasError={this.state.formErrors.controlId}
            />
          </Grid>
        )}
        {(report === 0 || report === 1) && (
          <Grid item xs={5} md={3} stye={{ padding: 5 }}>
            <DataTableSelectAction
              handleConfirm={this.handleEnterpriseSelected}
              loadDataAction={this.props.requestEnterprises}
              elements={this.state.enterprises}
              primaryTitle={t("SelectEnterprise")}
              title={t("enterprise")}
              DataTableColumns={enterpriseColumns}
              multipleSelect={true}
              attribute={"name"}
              isDetails={this.props.isDetails}
              info={this.props.enterprises}
              success={this.props.successEnterprise}
              loading={this.props.loadingEnterprises}
            />
          </Grid>
        )}
        {report === 1 && (
          <Grid item xs={5} md={3} style={{ marginLeft: "8%" }}>
            <DatePicker
              selected={new Date(this.state.selectedDate)}
              onChange={this.handleChangeDate("selectedDate")}
              customInput={<EntranceDateText />}
              timeCaption="time"
              dateFormat={"dd/MM/yyyy"}
              minDate={new Date()}
              required
              fullWidth
              showYearDropdown
              scrollableYearDropdown
            />
          </Grid>
        )}
        {(report === 0 || report === 2) && (
          <Grid
            item
            xs={report === 0 ? 6 : 7}
            md={3}
            style={{ paddingRight: "15px" }}
          >
            <div className={classes.formControl} style={{ marginLeft: "10%" }}>
              <label className={classes.formControlLabel}>
                {t("StatusFilter")}
              </label>
              <Select
                classes={classes}
                className={classes.select}
                components={components}
                styles={selectStyles}
                options={SelectedStateOption}
                onChange={this.handleSelectStateChange("status")}
                placeholder={t("status")}
                maxMenuHeight={200}
                value={selectedState}
              />
            </div>
          </Grid>
        )}
      </Grid>
    );
  };

  handleChangeDate = (name) => (event) => {
    //let value = event.toDate();
    let value = new Date(event);
    this.setState((prevState) => ({
      ...prevState,
      [name]: value,
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
      isDesktop,
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
      <div>
        <div>
          <Paper>
            {/* <Grid container style={{ marginTop: isDesktop ? "0%" : "16%" }}> */}
            <Grid container>
              <Grid item xs={12} md={3}>
                <div
                  className={classes.formControl}
                  style={{
                    padding: "3%",
                    margin: "2%",
                  }}
                >
                  <label
                    className={classes.formControlLabel}
                    style={{ padding: "3%" }}
                  >
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
              <Grid
                item
                xs={12}
                md={9}
                className={
                  isDesktop
                    ? classes.filterContainer
                    : classes.filterContainerMobile
                }
                style={{}}
              >
                {this.renderFilters()}
              </Grid>
            </Grid>
            {this.state.report === 0 && (
              <AllDocuments
                enterpriseIds={enterpriseIds}
                status={selectedState.value}
                key={enterpriseIds.length + selectedState.label}
              />
            )}
            {this.state.report === 1 && (
              <ExpiredDocument
                expiredDate={selectedDate}
                enterpriseIds={enterpriseIds}
                key={enterpriseIds.length + selectedDate}
              />
            )}
            {this.state.report === 2 && (
              <ControlsReport
                controlId={controlId.id}
                controlName={controlId.name}
                status={selectedState.value}
                key={controlId.id + selectedState.label}
              />
            )}
            {this.state.report === 4 && (
              <AludocReportHome
                controlId={controlId.id}
                status={selectedState.value}
                key={controlId.id + selectedState.label}
              />
            )}
          </Paper>
        </div>
      </div>
    );
  }
}

const styles = (theme) => ({
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
    zIndex: 99,
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
  },
  select: {
    paddingTop: 10,
    paddingRight: 10,
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
  filterContainerMobile: {
    paddingLeft: "3%",
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

const AludocReportConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(AludocReport);

export default withTranslation()(
  withStyles(styles, { withTheme: true })(AludocReportConnected)
);
