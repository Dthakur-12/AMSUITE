import { ListItemIcon, Typography } from "@mui/material";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { withStyles } from '@mui/styles';
import Tooltip from "@mui/material/Tooltip";
import Zoom from "@mui/material/Zoom";
import React from "react";
import { withTranslation } from "react-i18next";
import ApiHandler from "../../../../services/ApiHandler";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import MUIDataTable from "mui-datatables";
import PointIcon from "@mui/icons-material/FiberManualRecord";
import CircularProgress from "@mui/material/CircularProgress";
import CustomToolbarSelect from "../../../Shared/DataTable/CustomToolBarSelect";
import LinearProgress from "@mui/material/LinearProgress";
import { emphasize } from "@mui/system";
import { requestEnterprisesByControl } from "../../../../actions/Aludoc/controls_actions";
import { requestDocumentsExpiringBeforeDate } from "../../../../actions/Aludoc/documents_action";
import { Icon } from "semantic-ui-react";
import { connect } from "react-redux";
import { debounce } from "throttle-debounce";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import Input from "@mui/material/Input";
import IconButton from "@mui/material/IconButton";
import AmSuiteNavBar from "../../../../utils/AmSuiteNavBar";

import { isNullOrUndefined } from "util";

let page = 0;
let rowsPerPage = 15;
let activeColumnSort = 0;
let order = "asc";

let page2 = 0;
let rowsPerPage2 = 15;
let activeColumnSort2 = 0;
let order2 = "asc";

class ConstrolsReport extends React.Component {
  constructor(props) {
    super(props);
    const { t } = this.props;
    this.state = {
      allStatusOk: true,
      columns: this.translateColumns(t, true),
      columnsEnterprise: this.translateColumnsEnterprises(t),
      SelectedStateOption: this.statusOptions(t),
      data: [],
      dataEnterprises: [],
      isLoading: false,
      isLoadingNewData: false,
      dataCount: 0,
      status: -1,
      searchText: "",
    };
    this.changeSearchDebounce = debounce(500, (value) =>
      this.changeSearch(value)
    );
  }

  statusOptions = (t) => ({
    0: { value: 0, label: t("correct") },
    1: { value: 1, label: t("toReview") },
    2: { value: 2, label: t("Rejected") },
    3: { value: 3, label: t("Expired") },
    4: { value: -1, label: t("None") },
  });

  // ************* COLUMNS PERSONS ******************
  translateColumns = (t, initial) => {
    let colStorage = JSON.parse(localStorage.getItem("controlRepColumns"));

    let columDisplay = {};
    if (initial && !isNullOrUndefined(colStorage)) {
      colStorage &&
        colStorage.map(
          (elem) =>
            (columDisplay[elem.name] = !isNullOrUndefined(elem.options.display)
              ? elem.options.display
              : true)
        );
    } else {
      this.state &&
        this.state.columns &&
        this.state.columns.map(
          (elem) =>
            (columDisplay[elem.name] = !isNullOrUndefined(elem.options.display)
              ? elem.options.display
              : true)
        );
    }
    return [
      {
        name: "name",
        label: t("name"),
        options: {
          filter: true,
          sort: true,
          sortDirection: activeColumnSort === 0 ? order : "none",
          display: isNullOrUndefined(columDisplay.name)
            ? true
            : columDisplay.name,
        },
      },
      {
        name: "lastname",
        label: t("LastName"),
        options: {
          filter: true,
          sort: true,
          sortDirection: activeColumnSort === 1 ? order : "none",
          display: isNullOrUndefined(columDisplay.lastname)
            ? true
            : columDisplay.lastname,
        },
      },
      {
        label: t("Document"),
        name: "documentNumber",
        options: {
          filter: true,
          sort: false,
          sortDirection: activeColumnSort === 2 ? order : "none",
          display: isNullOrUndefined(columDisplay.documentNumber)
            ? true
            : columDisplay.documentNumber,
        },
      },
      {
        name: "documentationStatus",
        label: t("status"),
        options: {
          filter: true,
          sort: false,
          sortDirection: activeColumnSort === 3 ? order : "none",
          display: isNullOrUndefined(columDisplay.documentationStatus)
            ? true
            : columDisplay.documentationStatus,
          customBodyRender: (data, meta) => {
            const { classes } = this.props;
            return (
              <ListItem className={classes.nested}>
                <ListItemIcon>
                  {data === -1 ? (
                    <Tooltip
                      TransitionComponent={Zoom}
                      title={t("WithoutDocumentation")}
                    >
                      <Icon name="warning sign" size="big" color="grey" />
                    </Tooltip>
                  ) : data === 0 ? (
                    <Tooltip
                      TransitionComponent={Zoom}
                      title={t("validDocumentation")}
                    >
                      <PointIcon style={{ color: "#437043" }} />
                    </Tooltip>
                  ) : data === 1 ? (
                    <Tooltip
                      TransitionComponent={Zoom}
                      title={t("DocumentationToReview")}
                    >
                      <PointIcon style={{ color: "#e66b00" }} />
                    </Tooltip>
                  ) : (
                    <Tooltip
                      TransitionComponent={Zoom}
                      title={
                        data === 2
                          ? t("RejectedDocumentaton")
                          : t("ExpiredDocumentation")
                      }
                    >
                      <PointIcon style={{ color: "#743631" }} />
                    </Tooltip>
                  )}
                </ListItemIcon>
              </ListItem>
            );
          },
        },
      },
    ];
  };

  translateColumnsEnterprises = (t) => {
    return [
      {
        label: t("name"),
        name: "name",
        options: {
          filter: true,
          sort: true,
          sortDirection: activeColumnSort2 === 0 ? order2 : "none",
        },
      },

      {
        label: t("Document"),
        name: "documentationStatus",
        options: {
          filter: true,
          sort: true,
          sortDirection: activeColumnSort2 === 5 ? order2 : "none",
          customBodyRender: (data) => {
            const { classes } = this.props;
            return (
              <ListItem className={classes.nested}>
                <ListItemIcon

                // title={this.state.SelectedStateOption[data.status].label}
                >
                  <PointIcon
                    style={
                      data === 0
                        ? { color: "#437043" }
                        : data === 1
                        ? { color: "#e66b00" }
                        : { color: "#743631" }
                    }
                  />
                </ListItemIcon>
                <ListItemText
                  inset
                  primary={
                    data === 0
                      ? t("validDocumentation")
                      : data === 1
                      ? t("DocumentationToReview")
                      : data === 2
                      ? t("RejectedDocumentaton")
                      : t("ExpiredDocumentation")
                  }
                />
              </ListItem>
            );
          },
        },
      },
    ];
  };

  redirectToDocuments = (personId) => {
    if (personId)
      AmSuiteNavBar.appNavigation.history.push(
        `aludoc/register/personDocument/${personId}`
      );
  };

  redirectToEnterprises = (enterpriseId) => {
    if (enterpriseId)
      AmSuiteNavBar.appNavigation.history.push(
        `aludoc/enterprise/enterpriseDocument/${enterpriseId}`
      );
  };

  componentWillUnmount = () => {
    window.removeEventListener("resize", this.updateScreenMode);
  };

  updateScreenMode = () => {
    this.setState({ isDesktop: window.innerWidth > 900 });
  };

  componentDidMount() {
    this.loadAllDocuments();
    this.updateScreenMode();
    if (this.props.controlId) {
      this.props.requestEnterprisesByControl(this.props.controlId);
    }
  }

  loadAllDocuments = () => {
    const { searchText } = this.state;
    this.setState({ isLoadingNewData: true });
    ApiHandler.Aludoc.Controls.getPersonDocumentationStatusByControls({
      start: page * rowsPerPage,
      length: rowsPerPage,
      order: "",
      search: searchText,
      controlId: this.props.controlId,
      documentationStatus: this.props.status,
    })
      .then((response) => {
        this.setState({
          allStatusOk:
            response.data.data &&
            !response.data.data.some(
              (a) =>
                a.documentationStatus === 1 ||
                a.documentationStatus === 2 ||
                a.documentationStatus === 3
            ),
          isLoadingNewData: false,
          isSearching: false,
          data: response.data.data ? response.data.data : [],
          dataCount: response.data.dataCount,
        });
      })
      .catch((error) => {
        this.setState({
          isLoadingNewData: false,
        });
        console.log(error);
      });
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      nextProps.i18n.language !== prevState.language ||
      nextProps.enterprises !== prevState.enterprises ||
      nextProps.successEnterprise !== prevState.successEnterprise
    ) {
      return {
        language: nextProps.i18n.language,
        enterprises: nextProps.enterprises,
        successEnterprise: nextProps.successEnterprise,
      };
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    const { control } = this.state;

    if (prevState.language !== this.state.language) {
      this.setState({
        ...prevState,
        columns: this.translateColumns(this.props.t),
        columnsEnterprise: this.translateColumnsEnterprises(this.props.t),
      });
    }
    if (
      this.state.successEnterprise &&
      this.state.successEnterprise !== prevState.successEnterprise
    ) {
      this.setState({ dataEnterprises: this.state.enterprises });
    }
    if (this.state.searchText !== prevState.searchText) {
    }
  }

  onRowClickedPerson = (rowData, rowMeta) => {
    this.redirectToDocuments(this.state.data[rowMeta.rowIndex].id);
  };

  onRowClickedEnterprises = (rowData, rowMeta) => {
    this.redirectToEnterprises(this.state.dataEnterprises[rowMeta.rowIndex].id);
  };

  changePage = (newPage, table) => {
    if (table === 1) {
      page = newPage;
      this.loadData(true);
    }
  };

  changeRowsPerPage = (newRowsPerPage, table) => {
    if (table === 1) {
      rowsPerPage = newRowsPerPage;
      this.loadData(true);
    }
  };

  changeSort = (activeColumnIndex, newOrder, table) => {
    if (table === 1) {
      const { columns } = this.state;
      let columnsSorted = columns.slice();
      columnsSorted.map((column) => (column.options.sortDirection = undefined));
      columnsSorted[activeColumnIndex].options.sortDirection = newOrder;
      this.setState({
        columns: columnsSorted,
      });
      activeColumnSort = activeColumnIndex;
      order = newOrder;
      this.loadData(true);
    }
  };

  changeSearch = (value) => {
    this.setState({
      isSearching: true,
    });
    this.loadData(true);
  };

  onChangeSearch = (text) => {
    let value = text ? text : "";
    this.setState({
      searchText: value,
    });
    this.changeSearchDebounce(value);
  };

  filterChange = (filterList) => {};

  columnViewChange = (newColumns, table) => {
    if (table === 1) {
      const { columns } = this.state;
      let modifiedColumns = columns.slice();
      modifiedColumns.map(
        (column) =>
          (column.options.display = newColumns.some(
            (newColumn) =>
              newColumn.name === column.name && newColumn.display === "true"
          ))
      );
      this.setState({
        columns: modifiedColumns,
      });
      localStorage.setItem(
        "controlRepColumns",
        JSON.stringify(modifiedColumns)
      );
    }
  };

  onTableChange = (action, tableState) => {
    switch (action) {
      case "changePage":
        this.changePage(tableState.page, 1);
        break;
      case "changeRowsPerPage":
        this.changeRowsPerPage(tableState.rowsPerPage, 1);
        break;
      case "sort":
        this.changeSort(
          tableState.activeColumn,
          tableState.announceText.includes("ascending") ? "asc" : "desc",
          1
        );
        break;
      case "search":
        this.onChangeSearch(tableState.searchText);
        break;
      case "filterChange":
        this.filterChange(tableState.filterList, 1);
        break;
      case "columnViewChange":
        this.columnViewChange(tableState.columns, 1);
        break;
      default:
    }
  };

  loadData = (contentLoader) => {
    if (contentLoader) this.setState({ isLoadingNewData: true });
    this.loadAllDocuments();
  };

  render() {
    const { t, classes, theme } = this.props;

    const {
      columns,
      data,
      isLoadingNewData,
      dataCount,
      dataEnterprises,
      columnsEnterprise,
      isDesktop,
    } = this.state;

    const optionsPersons = {
      sort: false,
      search: true,
      searchText: this.state.searchText,
      filterType: "dropdown",
      responsive: "scrollFullHeight",
      serverSide: true,
      rowsPerPage: rowsPerPage,
      count: dataCount,
      page: page,
      onRowClick: this.onRowClickedPerson,
      selectableRows: "none",
      download: false,
      filter: false,
      print: isDesktop,
      viewColumns: isDesktop,
      customToolbarSelect: (selectedRows) => (
        <CustomToolbarSelect
          selectedRows={selectedRows}
          onDetails={this.handleOnDetails}
        />
      ),
      customToolbar: () => {
        return (
          <LinearProgress
            style={{
              opacity: this.state.isSearching ? "1" : "0",
              width: "90%",
              background: "none",
              marginLeft: "-50%",
              padding: 0,
              position: "absolute",
              zIndex: 1,
            }}
            variant="query"
          />
        );
      },
      onTableChange: this.onTableChange,
      textLabels: {
        body: {
          noMatch: t("dontSearchRegister"),
          toolTip: t("order"),
        },
        pagination: {
          next: t("nextPage"),
          previous: t("beforePage"),
          rowsPerPage: `${t("show")} : `,
          displayRows: t("of"),
        },
        toolbar: {
          search: t("search"),
          downloadCsv: t("downloadCSV"),
          print: t("print"),
          viewColumns: t("seeColumn"),
          filterTable: t("filter"),
        },
        filter: {
          all: t("all"),
          title: t("filter"),
          reset: t("cleanFilter"),
        },
        viewColumns: {
          title: t("showColumns"),
          titleAria: t("showHideColumns"),
        },
        selectedRows: {
          text: t("rowsSelected"),
        },
      },
    };

    const optionsEnterprises = {
      sort: false,
      search: false,
      filterType: "dropdown",
      responsive: "scrollFullHeight",
      serverSide: true,
      rowsPerPage: rowsPerPage,
      count: dataCount,
      page: page,
      onRowClick: this.onRowClickedEnterprises,
      selectableRows: "none",
      download: false,

      print: isDesktop,
      viewColumns: isDesktop,
      filter: false,
      customToolbarSelect: (selectedRows) => (
        <CustomToolbarSelect
          selectedRows={selectedRows}
          onDetails={this.handleOnDetails}
        />
      ),
      customToolbar: () => {
        return (
          <LinearProgress
            style={{
              opacity: this.state.isSearching ? "1" : "0",
              width: "90%",
              background: "none",
              marginLeft: "-50%",
              padding: 0,
              position: "absolute",
              zIndex: 1,
            }}
            variant="query"
          />
        );
      },
      textLabels: {
        body: {
          noMatch: t("dontSearchRegister"),
          toolTip: t("order"),
        },
        pagination: {
          next: t("nextPage"),
          previous: t("beforePage"),
          rowsPerPage: `${t("show")} : `,
          displayRows: t("of"),
        },
        toolbar: {
          search: t("search"),
          downloadCsv: t("downloadCSV"),
          print: t("print"),
          viewColumns: t("seeColumn"),
          filterTable: t("filter"),
        },
        filter: {
          all: t("all"),
          title: t("filter"),
          reset: t("cleanFilter"),
        },
        viewColumns: {
          title: t("showColumns"),
          titleAria: t("showHideColumns"),
        },
        selectedRows: {
          text: t("rowsSelected"),
        },
      },
    };

    return (
      <div>
        <Paper elevation={0} className={classes.paper}>
          <Grid container>
            <Grid item xs={12} style={{ position: "relative", marginTop: 5 }}>
              {(this.props.controlId && (
                <Typography variant="h5" style={{ marginBottom: 10 }}>
                  {t("ControlsDetails")} : {this.props.controlName}
                  <PointIcon
                    style={
                      this.state.allStatusOk
                        ? { color: "#437043" }
                        : { color: "#743631" }
                    }
                  />
                </Typography>
              )) || (
                <Typography variant="h5" style={{ marginBottom: 10 }}>
                  {t("ControlsDetails")}
                </Typography>
              )}
              {/* <Grid
                item
                style={{
                  zIndex: 1,
                  display: "flex",
                  position: "absolute",
                  right: "10em"
                }}
              >
                <FormControl xs={12} md={12} className={classes.textField}>
                  <InputLabel htmlFor="adornment-password">
                    {t("search") + "..."}
                  </InputLabel>
                  <Input
                    id="adornment-password"
                    type={"text"}
                    value={this.state.searchText ? this.state.searchText : ""}
                    onChange={this.onChangeSearch}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() =>
                            this.setState({ registerOnDetails: undefined })
                          }
                        >
                          <Icon
                            name="search"
                            link
                            style={{
                              margin: 0,
                              color: theme.palette.text.main
                            }}
                          />
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </Grid> */}

              <MUIDataTable
                title={t("PeopleDocumentation")}
                data={data}
                columns={columns}
                options={optionsPersons}
              />
              <div
                className={classes.contentLoader}
                style={{ display: isLoadingNewData ? "inherit" : "none" }}
              >
                <CircularProgress
                  className={classes.circularProgress}
                  size={50}
                />
              </div>
            </Grid>
            <Grid item xs={12} style={{ position: "relative", marginTop: 15 }}>
              <MUIDataTable
                title={t("enterprises")}
                data={dataEnterprises}
                columns={columnsEnterprise}
                options={optionsEnterprises}
              />
              <div
                className={classes.contentLoader}
                style={{ display: isLoadingNewData ? "inherit" : "none" }}
              >
                <CircularProgress
                  className={classes.circularProgress}
                  size={50}
                />
              </div>
            </Grid>
          </Grid>
        </Paper>
      </div>
    );
  }
}

const style = (theme) => ({
  paper: {
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${
      theme.spacing.unit * 3
    }px`,
    [theme.breakpoints.up(900 + theme.spacing.unit * 3 * 2)]: {
      marginBottom: theme.spacing.unit * 6,
      padding: theme.spacing.unit * 3,
    },
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: "10px !important",
  },
  datePickerLabel: {
    fontSize: "1.3rem",
  },
  datePickerInput: {},
  input: {
    display: "flex",
    padding: 0,
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
    color: "rgba(255, 255, 255, 0.7)",
    padding: 0,
    fontSize: "0.8rem",
    fontFamily: "'Lato', sans-serif",
    lineHeight: 1,
  },
  formControl: {
    margin: 0,
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
  },
});

const mapStateToProps = ({ Control }) => {
  return {
    control: Control.control,
    successDetailsControl: Control.successDetails,
    enterprises: Control.enterprises,
    successEnterprise: Control.successEnterprise,
  };
};

const mapDispatchToPrps = {
  requestEnterprisesByControl,
};

const ConstrolsReportConnected = connect(
  mapStateToProps,
  mapDispatchToPrps
)(ConstrolsReport);
export default withTranslation()(
  withStyles(style, { withTheme: true })(ConstrolsReportConnected)
);
