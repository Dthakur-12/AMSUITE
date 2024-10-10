import { ListItemIcon } from "@mui/material";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { withStyles } from '@mui/styles';
import Typography from "@mui/material/Typography";
import PointIcon from "@mui/icons-material/FiberManualRecord";
import React from "react";
import { withTranslation } from "react-i18next";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import MUIDataTable from "mui-datatables";
import CircularProgress from "@mui/material/CircularProgress";
import { requestDocumentsExpiringBeforeDate } from "../../../../actions/Aludoc/documents_action";
import { connect } from "react-redux";
import { requestEnterprises } from "../../../../actions/EasyAccess/Enterprise_actions";
import { isNullOrUndefined } from "util";
import moment from "moment";
// import Tooltip from "@mui/material/Tooltip";
// import DataTableSelect from "../../../Shared/DataTable/DataTableSelect";
// import DataTableSelectAction from "../../../Shared/DataTable/DataTableSelectAction";
// import { DatePicker } from "@mui/x-date-pickers";
// import CustomToolbarSelect from "../../../Shared/DataTable/CustomToolBarSelect";
// import LinearProgress from "@mui/material/LinearProgress";

let page = 0;
let rowsPerPage = 10;
let activeColumnSort = 3;
let order = "asc";

let date = new Date(),
  y = date.getFullYear(),
  m = date.getMonth();
let lastDay = new Date(y, m + 1, 0);

class ExpiredDocument extends React.Component {
  constructor(props) {
    super(props);
    const { t, expiredDate } = this.props;
    this.state = {
      enterprises: [],
      enterpriseIds: [],
      columns: this.translateColumns(t, true),
      selectedDate: !isNullOrUndefined(expiredDate) ? expiredDate : lastDay,
      data: [],
      isLoading: false,
      isLoadingNewData: false,
      dataCount: 0,
    };
  }

  translateColumns = (t, initial) => {
    const isDesktop = window.innerWidth > 900;
    let colStorage = JSON.parse(localStorage.getItem("expiredDocColumns"));

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
        label: t("name"),
        name: "name",
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
        label: t("person"),
        name: "owner",
        options: {
          filter: true,
          sort: false,
          sortDirection: activeColumnSort === 1 ? order : "none",
          display: isNullOrUndefined(columDisplay.owner)
            ? true
            : columDisplay.owner,
        },
      },
      {
        label: t("enterprise"),
        name: "enterpriseName",
        options: {
          filter: true,
          sort: false,
          sortDirection: activeColumnSort === 2 ? order : "none",
          display: isNullOrUndefined(columDisplay.enterpriseName)
            ? true
            : columDisplay.enterpriseName,
        },
      },
      {
        label: t("expirationDate"),
        name: "expirationDate",
        options: {
          filter: true,
          sort: true,
          sortDirection: activeColumnSort === 3 ? order : "none",
          display: isNullOrUndefined(columDisplay.expirationDate)
            ? true
            : columDisplay.expirationDate,
          customBodyRender: (data) => {
            return (
              <Typography>
                {new Intl.DateTimeFormat("es-ES", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                }).format(Date.parse(data))}
              </Typography>
            );
          },
        },
      },
      {
        label: t("status"),
        name: "status",
        options: {
          filter: true,
          sort: false,
          sortDirection: activeColumnSort === 4 ? order : "none",
          display: isNullOrUndefined(columDisplay.status)
            ? true
            : columDisplay.status,
          customBodyRender: (data) => {
            const { classes } = this.props;
            return (
              <ListItem className={classes.nested}>
                <ListItemIcon>
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
                {isDesktop && (
                  <ListItemText
                    inset
                    primary={
                      data === 0
                        ? t("correct")
                        : data === 1
                        ? t("toReview")
                        : data === 2
                        ? t("Rejected")
                        : t("Expired")
                    }
                  />
                )}
              </ListItem>
            );
          },
        },
      },
    ];
  };

  componentWillUnmount = () => {
    window.removeEventListener("resize", this.updateScreenMode);
  };

  updateScreenMode = () => {
    this.setState({ isDesktop: window.innerWidth > 900 });
  };

  componentDidMount() {
    this.loadExpiredDocuments();
    this.updateScreenMode();
  }

  loadExpiredDocuments = () => {
    const { columns } = this.state;
    const { enterpriseIds, expiredDate } = this.props;
    let ids = [];
    enterpriseIds.map((i) => {
      return ids.push(i);
    });
    if (ids.length !== 0) {
      this.setState({ isLoadingNewData: true });
      this.props.requestDocumentsExpiringBeforeDate({
        start: page * rowsPerPage,
        length: rowsPerPage,
        order: columns[activeColumnSort].name + " " + order,
        search: "",
        companies: ids,
        maxExpirationDate: expiredDate,
      });
    }
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.language !== this.state.language) {
      this.setState({
        ...prevState,
        columns: this.translateColumns(this.props.t),
      });
    }
    if (
      this.state.successDocsExpiringBfDate &&
      prevState.successDocsExpiringBfDate !==
        this.state.successDocsExpiringBfDate
    ) {
      const { searchText } = this.state;

      this.setState({
        data: this.state.docBDate.data,
        dataCount: this.state.docBDate.dataCount,
        isLoadingNewData: false,
        isSearching: prevState.searchText !== searchText,
      });
      if (prevState.searchText !== searchText) this.loadData(false);
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      nextProps.i18n.language !== prevState.language ||
      nextProps.docBDate !== prevState.docBDate ||
      nextProps.successDocsExpiringBfDate !==
        prevState.successDocsExpiringBfDate
    ) {
      return {
        language: nextProps.i18n.language,
        successDocsExpiringBfDate: nextProps.successDocsExpiringBfDate,
        docBDate: nextProps.docBDate,
      };
    }
    return null;
  }

  loadData = (contentLoader) => {
    if (contentLoader) this.setState({ isLoadingNewData: true });
    this.loadExpiredDocuments();
  };

  changePage = (newPage) => {
    page = newPage;
    this.loadData(true);
  };

  changeRowsPerPage = (newRowsPerPage) => {
    rowsPerPage = newRowsPerPage;
    this.loadData(true);
  };

  changeSort = (activeColumnIndex, newOrder) => {
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
  };

  changeSearch = (searchText) => {
    const { isSearching } = this.state;
    this.setState({
      searchText,
      isSearching: true,
    });
    if (!isSearching) {
      this.loadData(false);
    }
  };

  filterChange = (filterList) => {};

  columnViewChange = (newColumns) => {
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
    localStorage.setItem("expiredDocColumns", JSON.stringify(modifiedColumns));
  };

  onTableChange = (action, tableState) => {
    switch (action) {
      case "changePage":
        this.changePage(tableState.page);
        break;
      case "changeRowsPerPage":
        this.changeRowsPerPage(tableState.rowsPerPage);
        break;
      case "sort":
        this.changeSort(
          tableState.activeColumn,
          tableState.announceText.includes("ascending") ? "asc" : "desc"
        );
        break;
      case "search":
        this.changeSearch(tableState.searchText);
        break;
      case "filterChange":
        this.filterChange(tableState.filterList);
        break;
      case "columnViewChange":
        this.columnViewChange(tableState.columns);
        break;
      default:
    }
  };

  render() {
    const { t, classes } = this.props;
    const { columns, data, isLoadingNewData, dataCount, isDesktop } =
      this.state;

    const options = {
      filterType: "dropdown",
      responsive: "scrollFullHeight",
      serverSide: true,
      rowsPerPage: rowsPerPage,
      count: dataCount,
      page: page,
      selectableRows: false,
      download: false,
      filter: false,
      print: isDesktop,
      viewColumns: isDesktop,
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
    return (
      <div>
        <Paper elevation={0} className={classes.paper}>
          <Grid container>
            <Grid item xs={12} style={{ position: "relative", marginTop: 5 }}>
              <MUIDataTable
                title={t("AssociatedDocuments")}
                data={data}
                columns={columns}
                options={options}
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
});
const mapStateToProps = ({ Document, Enterprise }) => {
  return {
    docBDate: Document.docBDate,
    successDocsExpiringBfDate: Document.successDocsExpiringBfDate,
    enterprises: Enterprise.enterprises,
    successEnterprise: Enterprise.successEnterprise,
    isLoadingEnterprises: Enterprise.loading,
  };
};
const mapDispatchToProps = {
  requestDocumentsExpiringBeforeDate: requestDocumentsExpiringBeforeDate,
  requestEnterprises: requestEnterprises,
};
const ExpiredDocumentConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(ExpiredDocument);

export default withTranslation()(withStyles(style)(ExpiredDocumentConnected));
