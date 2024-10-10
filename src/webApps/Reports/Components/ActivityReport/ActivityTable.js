import React from "react";
import { connect } from "react-redux";

import LinearProgress from "@mui/material/LinearProgress";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import MUIDataTable from "mui-datatables";
// import "react-date-range/dist/styles.css";
// import "./style.css";
import { withTranslation } from "react-i18next";
import { requestAllUserActivities } from "../../../../actions/Users/user_actions";
import { debounce } from "throttle-debounce";
import { getActivityName, getEntityName } from "../../../../utils/Enums";
import { isNullOrUndefined } from "util";

import {
  FormControl,
  Input,
  InputLabel,
  InputAdornment,
  Grid,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@mui/material";

import { Icon } from "semantic-ui-react";
import { withStyles } from "@mui/styles";
import DifferenceTable from "./DifferenceTable";
import {
  camelize,
  camelize2,
  isValueEmptyOrNull,
} from "../../../../utils/HelperFunctions";
import moment from "moment";
let page = 0;
let rowsPerPage = 10;
let activeColumnSort = 3;
let order = "desc";

const dateOptions = { year: "numeric", month: "long", day: "numeric" };

class ActivityTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      dataCount: 0,
      openModal: false,
      columns: this.translateColumns(props.t, true),
    };

    this.changeSearchDebounce = debounce(300, (value) =>
      this.changeSearch(value)
    );
  }
  componentDidMount() {
    this.loadData(false);
  }

  loadData = (loadingContent, isSearch) => {
    const {
      requestAllUserActivities,
      userList,
      startDate,
      endDate,
      entities,
      activities,
    } = this.props;
    const { columns, searchText } = this.state;
    requestAllUserActivities({
      start: isSearch ? 0 : page * rowsPerPage,
      length: rowsPerPage,
      order: columns[activeColumnSort].name + " " + order,
      search: searchText ? searchText : "",
      auxiliarList: userList,
      startDate,
      endDate,
      entitiesList: entities,
      activitiesList: activities,
    });
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.i18n.language !== prevState.language) {
      return {
        language: nextProps.i18n.language,
      };
    } else return null;
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      requestAllUserActivities,
      userList,
      startDate,
      endDate,
      entities = [],
      activities = [],
    } = this.props;
    const { activities: prevActivities = [], entities: prevEntities = [] } =
      prevProps;
    if (prevState.language !== this.state.language) {
      this.setState({
        ...prevState,
        columns: this.translateColumns(this.props.t, false),
      });
    }
    if (prevProps.succesUserActivities !== this.props.succesUserActivities) {
      this.setState({
        isSearching: false,
      });
    }
    if (
      prevActivities.length != activities.length ||
      prevEntities.length != entities.length ||
      prevProps.startDate != startDate ||
      prevProps.endDate != endDate
    ) {
      this.loadData(false);
    }
  }

  showMoreInfo = (index) => {
    this.setState({
      index,
      openModal: true,
    });
  };

  translateColumns = (t, initial) => {
    let colStorage = JSON.parse(localStorage.getItem("activityTableColumns"));
    const isDesktop = window.innerWidth > 900;

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
        name: "userName",
        label: t("UserName"),
        options: {
          filter: true,
          sort: false,
          display: isNullOrUndefined(columDisplay.userName)
            ? true
            : columDisplay.userName,
          customBodyRender: (data, meta) => {
            return t(data);
          },
        },
      },
      {
        name: "entity",
        label: t("Entity"),
        options: {
          filter: false,
          sort: false,
          display: !isDesktop
            ? false
            : isNullOrUndefined(columDisplay.entity)
            ? true
            : columDisplay.entity,
          customBodyRender: (data, meta) => {
            let entity = getEntityName(data);
            if (!isValueEmptyOrNull(entity)) {
              entity = entity.toLowerCase();
              let entityKey = camelize2(entity);
              return t(entityKey);
            } else return "";
          },
        },
      },

      {
        name: "activity",
        label: t("Activity"),
        options: {
          display: !isDesktop
            ? false
            : isNullOrUndefined(columDisplay.activity)
            ? true
            : columDisplay.activity,
          filter: false,
          sort: false,

          customBodyRender: (data, meta) => {
            let activity = getActivityName(data);
            if (!isValueEmptyOrNull(activity)) {
              activity = activity.toLowerCase();
              let activityKey = camelize2(activity);
              return t(activityKey);
            } else return "";
          },
        },
      },
      {
        name: "date",
        label: t("Date"),
        options: {
          filter: true,
          sortDirection: activeColumnSort === 3 ? order : "none",
          display: isNullOrUndefined(columDisplay.date)
            ? true
            : columDisplay.date,
          customBodyRender: (data, meta) => {
            const formattedDate =
              this.props.i18n.language === "es"
                ? moment(data)
                    .lang(this.props.i18n.language)
                    .format("DD/MM/YYYY HH:mm")
                : moment(data)
                    .lang(this.props.i18n.language)
                    .format("MM/DD/YYYY HH:mm");
            return <Typography>{formattedDate}</Typography>;
          },
        },
      },
      {
        name: "details",
        label: t("details"),
        options: {
          filter: false,
          sort: false,
          display: isNullOrUndefined(columDisplay.details)
            ? true
            : columDisplay.details,
          customBodyRender: (data, meta) => {
            const { userActivities } = this.props;
            if (meta.rowData[2] === 2) {
              return (
                <React.Fragment>
                  {data}
                  {/* {userActivities &&
                    userActivities.data[meta.rowIndex].before != '' && (
                      <Icon
                        link
                        name="info circle"
                        size="big"
                        onClick={() => this.showMoreInfo(meta.rowIndex)}
                      />
                    )} */}
                </React.Fragment>
              );
            } else return data;
          },
        },
      },
    ];
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

  changeSearch = (value) => {
    this.setState({
      isSearching: true,
    });
    this.loadData(false, true);
  };
  onChangeSearch = (event) => {
    let value = event.currentTarget ? event.currentTarget.value : event.value;
    this.setState({
      searchText: value,
    });
    this.changeSearchDebounce(value);
  };

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
    localStorage.setItem(
      "activityTableColumns",
      JSON.stringify(modifiedColumns)
    );
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
        // this.changeSearch(tableState.searchText);
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
    const { dataCount, t, userActivities, theme, classes, isDesktop } =
      this.props;
    const { columns } = this.state;
    const options = {
      search: false,
      download: false,
      filterType: "dropdown",
      responsive: "scrollFullHeight",
      serverSide: true,
      rowsPerPage: rowsPerPage,
      print: isDesktop,
      viewColumns: isDesktop,
      count: userActivities ? userActivities.dataCount : 0,
      page: page,
      selectableRows: "none",
      download: false,
      filter: false,
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
      customToolbar: () => {
        return (
          <LinearProgress
            style={{
              opacity: this.state.isSearching ? "1" : "0",
              width: "100%",
              background: "none",
              padding: 0,
              position: "absolute",
              zIndex: 1,
              marginLeft: "-26%",
            }}
            variant="query"
          />
        );
      },
      onTableChange: this.onTableChange,
      textLabels: {
        body: {
          noMatch: t("dontSearchRegister"),
          toolTip: "Ordenar",
        },
        pagination: {
          next: "Siguiente página",
          previous: "Pagina anterior",
          rowsPerPage: t("show"),
          displayRows: "de",
        },
        toolbar: {
          search: "Buscar",
          downloadCsv: "Descargar CSV",
          print: "Imprimir",
          viewColumns: t("seeColumn"),
          filterTable: "Filtros",
        },
        filter: {
          all: "Todos",
          title: "Filtros",
          reset: "Limpiar filtros",
        },
        viewColumns: {
          title: "Mostrar columnas",
          titleAria: "Mostrar/Esconder Columnas",
        },
        selectedRows: {
          text: "fila(s) seleccionadas",
        },
      },
    };
    return (
      <Grid item xs={12}>
        <MUIDataTable
          title={t("UserActivity")}
          data={userActivities ? userActivities.data : []}
          columns={columns}
          options={options}
        />
        <Dialog
          open={this.state.openModal}
          onClose={() => this.setState({ openModal: false })}
          aria-labelledby="form-dialog-title"
        >
          <DialogContent style={{ padding: 0 }}>
            <DifferenceTable
              data={userActivities ? userActivities.data[this.state.index] : []}
            />
          </DialogContent>
        </Dialog>
      </Grid>
    );
  }
}

const mapStateToProps = ({ User }) => {
  return {
    userActivities: User.userActivities,
    succesUserActivities: User.succesUserActivities,
  };
};
const mapDispatchToProps = {
  requestAllUserActivities: requestAllUserActivities,
};

const ConnectedActivityTable = connect(
  mapStateToProps,
  mapDispatchToProps
)(ActivityTable);

export default withTranslation()(
  withStyles({}, { withTheme: true })(ConnectedActivityTable)
);
