import { ListItemIcon } from "@mui/material";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { withStyles } from '@mui/styles';
import Typography from "@mui/material/Typography";
import PointIcon from "@mui/icons-material/FiberManualRecord";
import React, { createRef } from "react";
import { withTranslation } from "react-i18next";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import MUIDataTable from "mui-datatables";
import { emphasize } from "@mui/system";
import { requestAllDocumentsByEnterprises } from "../../../../actions/Aludoc/documents_action";
import { connect } from "react-redux";
import { requestEnterprises } from "../../../../actions/EasyAccess/Enterprise_actions";
import Hidden from "@mui/material/Hidden";
import { default as classNames } from "classnames";
import { Ref, Segment, Sticky, Button } from "semantic-ui-react";
import PersonInfoCard from "./PersonInfoCard";
import { isNullOrUndefined } from "util";

import moment from "moment";
let page = 0;
let rowsPerPage = 15;
let activeColumnSort = 3;
let order = "asc";
const drawerWidth = 240;

class AllDocuments extends React.Component {
  constructor(props) {
    super(props);
    const { t } = this.props;
    this.state = {
      enterprises: [],
      enterpriseIds: [],
      columns: this.translateColumns(t, true),
      SelectedStateOption: this.statusOptions(t),
      data: [],
      isLoading: false,
      isLoadingNewData: false,
      dataCount: 0,
      selectedState: { value: -1, label: t("all") },
      status: -1,
      showInfo: false,
    };
  }
  contextRef = createRef();

  statusOptions = (t) => ({
    0: { value: 0, label: t("correct") },
    1: { value: 1, label: t("toReview") },
    2: { value: 2, label: t("Rejected") },
    3: { value: 3, label: t("Expired") },
    4: { value: -1, label: t("all") },
  });

  translateColumns = (t, initial) => {
    const isDesktop = window.innerWidth > 900;

    let colStorage = JSON.parse(localStorage.getItem("allDocColumns"));

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
          customBodyRender: (data, meta) => {
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
          customBodyRender: (data, meta) => {
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
                {isDesktop && (
                  <ListItemText
                    inset
                    primary={this.state.SelectedStateOption[data].label}
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
    this.loadAllDocuments();
    this.updateScreenMode();
  }

  loadAllDocuments = () => {
    const { columns } = this.state;
    const { status } = this.props;
    this.setState({ isLoadingNewData: true });
    var ids = [];
    this.props.enterpriseIds.map((i) => {
      return ids.push(i);
    });
    this.props.requestAllDocumentsByEnterprises({
      start: page * rowsPerPage,
      length: rowsPerPage,
      order: columns[activeColumnSort].name + " " + order,
      search: "",
      companies: ids,
      status,
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.language !== this.state.language) {
      this.setState({
        ...prevState,
        columns: this.translateColumns(this.props.t),
        SelectedStateOption: this.statusOptions(this.props.t),
      });
    }
    if (
      this.state.successAllDocumentsByEnterprises &&
      this.state.successAllDocumentsByEnterprises !==
        prevState.successAllDocumentsByEnterprises
    ) {
      this.setState({
        data: this.state.docBCompanies.data,
        dataCount: this.state.docBCompanies.dataCount,
        isLoadingNewData: false,
        isSearching: prevState.searchText !== this.state.searchText,
      });
      if (prevState.searchText !== this.state.searchText) this.loadData(false);
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      nextProps.i18n.language !== prevState.language ||
      nextProps.docBCompanies !== prevState.docBCompanies ||
      nextProps.successAllDocumentsByEnterprises !==
        prevState.successAllDocumentsByEnterprises
    ) {
      return {
        language: nextProps.i18n.language,
        docBCompanies: nextProps.docBCompanies,
        successAllDocumentsByEnterprises:
          nextProps.successAllDocumentsByEnterprises,
      };
    }
    return null;
  }

  handleEnterpriseSelected = (enterprises) => {
    let enterpriseIds = [];
    enterprises.map((enterprise) => {
      return enterpriseIds.push(enterprise.id);
    });
    this.setState(
      (prevState) => ({
        ...prevState,
        enterpriseIds: enterpriseIds,
        enterprises: enterprises,
      }),
      () => this.loadAllDocuments()
    );
  };

  handleSelectStateChange = (name) => (event) => {
    let value = event.currentTarget ? event.currentTarget.value : event.value;
    this.setState(
      (prevState) => ({
        selectedState: this.state.SelectedStateOption[event.value],
        status: value,
      }),
      () => this.loadAllDocuments()
    );
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
    localStorage.setItem("allDocColumns", JSON.stringify(modifiedColumns));
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

  loadData = (contentLoader) => {
    if (contentLoader) this.setState({ isLoadingNewData: true });
    this.loadAllDocuments();
  };

  onRowClicked = (rowData, rowMeta) => {
    this.setState({
      selectedRow: rowMeta.rowIndex,
      selectedData: this.state.data[rowMeta.dataIndex],
    });
  };

  handleInfoClick = () => {
    this.setState((state) => ({ showInfo: !state.showInfo }));
  };

  render() {
    const { t, classes } = this.props;
    const { columns, data, dataCount, selectedData, showInfo, isDesktop } =
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
      onRowClick: this.onRowClicked,
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
      (<div>
        <Paper elevation={0} className={classes.paper}>
          <Ref innerRef={this.contextRef}>
            <Segment
              style={{
                width: "100%",
                background: "transparent",
                border: "none",
                padding: 0,
              }}
            >
              <Grid container>
                {this.state.isDesktop && (
                  <Hidden lgDown>
                    <Button
                      circular
                      icon={showInfo ? "close" : "info"}
                      className={classes.fab}
                      onClick={this.handleInfoClick}
                    />
                    <div
                      className={classNames({
                        [classes.drawerOpen]: this.state.showInfo,
                        [classes.drawerClose]: !this.state.showInfo,
                      })}
                    >
                      <Sticky
                        context={this.contextRef}
                        offset={100}
                        style={{ paddingRight: 10 }}
                      >
                        <PersonInfoCard
                          showInfo={showInfo}
                          key={selectedData ? selectedData.person : -1}
                          personId={selectedData ? selectedData.person : -1}
                        />
                      </Sticky>
                    </div>
                  </Hidden>
                )}
                <div
                  item
                  className={classNames(
                    classes.content,
                    this.state.showInfo && classes.contentShift
                  )}
                >
                  <Grid
                    item
                    xs={12}
                    style={{ position: "relative", marginTop: 5 }}
                  >
                    <MUIDataTable
                      title={t("AssociatedDocuments")}
                      data={data}
                      columns={columns}
                      options={options}
                    />
                  </Grid>
                </div>
              </Grid>
            </Segment>
          </Ref>
        </Paper>
      </div>)
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
    zIndex: 0,
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

  contentShift: {
    //marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth + 72}px) !important`,
    [theme.breakpoints.down('lg')]: {
      width: "100% !important",
    },
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: 500,
    }),
  },

  content: {
    width: "90%",
    [theme.breakpoints.down('lg')]: {
      width: "100%",
    },
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: 500,
    }),
  },

  drawerOpen: {
    width: drawerWidth,
    position: "initial",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: 500,
    }),
    left: 72,
    top: 62,
    height: "200%",
  },
  drawerClose: {
    position: "initial",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: 500,
    }),
    overflowX: "hidden",
    width: 30,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing.unit * 9 + 1,
    },
    left: 72,
    top: 62,
    height: "110%",
  },
  fab: {
    position: "absolute",
    zIndex: 801,
    margin: "-10px !important",
    color: theme.palette.text.main + " !important",
    background: theme.palette.background.main + " !important",
  },
});
const mapStateToProps = ({ Document, Enterprise }) => {
  return {
    docBCompanies: Document.docBCompanies,
    successAllDocumentsByEnterprises: Document.successAllDocumentsByEnterprises,
    enterprises: Enterprise.enterprises,
    successEnterprise: Enterprise.successEnterprise,
    isLoadingEnterprises: Enterprise.loading,
  };
};
const mapDispatchToProps = {
  requestAllDocumentsByEnterprises: requestAllDocumentsByEnterprises,
  requestEnterprises: requestEnterprises,
};

const AllDocumentsConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(AllDocuments);

export default withTranslation()(
  withStyles(style, { withTheme: true })(AllDocumentsConnected)
);
