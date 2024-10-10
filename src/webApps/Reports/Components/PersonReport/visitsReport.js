import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from '@mui/styles';
import NavBarReports from "../../utils/NavBarReports";
import Table from "../ActivityReport/ActivityTable";
import Chip from "@mui/material/Chip";
import PlusIcon from "@mui/icons-material/AddRounded";
import Fab from "@mui/material/Fab";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import { List, Grid } from "@mui/material";
import Select from "react-select";
import components from "../../../Shared/ReactSelect";
import DataTableDialogAction from "../../../Shared/DataTable/DataTableDialogAction";
import { isNullOrUndefined } from "util";
import moment from "moment";
import { requestUsers } from "../../../../actions/Users/user_actions";
import {
  requestGetPersonGroups,
  requestGetPersonByGroup,
  requestGetPersonGroupReportXLS,
} from "../../../../actions/EasyAccess/Person_actions";
import { connect } from "react-redux";
import FilterButton from "../Shared/FilterButton";
import MUIDataTable from "mui-datatables";
import {
  getDefaultInputRanges,
  getDefaultStaticRanges,
} from "../Shared/DateRangePickerInputsGenerator";

import { Fade, CircularProgress, Tooltip } from "@mui/material";
import { Print } from "@mui/icons-material";
import { endOfDay, startOfDay } from "date-fns";
import { DateRangePicker, DateRange } from "react-date-range";
import { withTranslation } from "react-i18next";
import { Tab } from "semantic-ui-react";
import ActAndEntFilterView from "../ActivityReport/ActAndEntFilterView";
import ActAndEntFilterMobileView from "../ActivityReport/ActAndEntFilterMobileView";
import { camelize2 } from "../../../../utils/HelperFunctions";
import { debounce } from "throttle-debounce";
import {
  requestEnterprises,
  requestVisitsEnterprises,
  requestVisitsEnterprisesReportXLS,
} from "../../../../actions/EasyAccess/Enterprise_actions";
import { Entities, ActivitiesWithLogin } from "../../../../utils/Enums";
import "../Shared/style.css";

const dateNow = new Date();
let page = 0;
let rowsPerPage = 15;
let activeColumnSort = 0;
let order = "desc";

let pageGroup = 0;
let rowsPerPageGroup = 15;
let activeColumnSortGroup = 0;
let orderGroup = "desc";

class VisitsReport extends Component {
  constructor(props) {
    super(props);
    const { t } = props;
    this.state = {
      columns: this.translateColumns(t, true),
      columnsGroup: this.translateColumnsGroups(t, true),
      isDesktop: true,
      open: false,
      dateRangePicker: {
        selection: {
          startDate: new Date(
            dateNow.getFullYear(),
            dateNow.getMonth() - 1,
            dateNow.getDay(),
            0,
            0,
            0
          ),
          endDate: new Date(dateNow.setHours(23, 59, 0)),
          key: "selection",
        },
      },
      filterRange: {
        startDate: new Date(
          dateNow.getFullYear(),
          dateNow.getMonth() - 1,
          dateNow.getDay(),
          0,
          0,
          0
        ),
        endDate: new Date(dateNow.setHours(23, 59, 0)),
      },
      offset: 0,
      empList: [],
      personGroupList: undefined,
      openPersonGroups: false,
      SelectedReportOption: this.reportOptions(t),
      selectedReport: { value: 0, label: t("visitsByEnterprise") },
      report: 0,
    };

    this.loadData(true, false);
  }
  reportOptions = (t) => ({
    0: { value: 0, label: t("visitsByEnterprise") },
    1: { value: 1, label: t("personByGroups") },
    // 2: { value: 2, label: t("GeneralTripsReport") },
    // 3: { value: 3, label: t("Trips") },
  });

  translateColumns = (t, initial) => {
    const { classes } = this.props;
    let colStorage = JSON.parse(localStorage.getItem("visitsReportColumns"));

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
        name: "nombre", //visitorName
        options: {
          display:
            window.innerWidth < 1050
              ? false
              : isNullOrUndefined(columDisplay.name)
              ? true
              : columDisplay.name,
          filter: true,
          sort: true,
          sortDirection: activeColumnSort === 0 ? order : "none",
          customBodyRender: (data) => {
            if (!isNullOrUndefined(data) && data !== "") return data;
          },
        },
      },
      {
        label: t("LastName"),
        name: "apellido",
        options: {
          display:
            window.innerWidth < 1050
              ? false
              : isNullOrUndefined(columDisplay.apellido)
              ? true
              : columDisplay.apellido,
          filter: true,
          sort: true,
          sortDirection: activeColumnSort === 1 ? order : "none",
          customBodyRender: (data) => {
            if (!isNullOrUndefined(data) && data !== "") return data;
          },
        },
      },
      {
        label: t("dni"),
        name: "documento",
        options: {
          display:
            window.innerWidth < 1050
              ? false
              : isNullOrUndefined(columDisplay.documento)
              ? true
              : columDisplay.documento,
          filter: true,
          sort: true,
          sortDirection: activeColumnSort === 2 ? order : "none",
          customBodyRender: (data) => {
            if (!isNullOrUndefined(data) && data !== "") return data;
          },
        },
      },
      {
        label: t("email"),
        name: "email",
        options: {
          display:
            window.innerWidth < 1050
              ? false
              : isNullOrUndefined(columDisplay.email)
              ? true
              : columDisplay.email,
          filter: true,
          sort: true,
          sortDirection: activeColumnSort === 3 ? order : "none",
          customBodyRender: (data) => {
            if (!isNullOrUndefined(data) && data !== "") return data;
          },
        },
      },
      {
        label: t("enterprise"),
        name: "empresaVisitada",
        options: {
          display:
            window.innerWidth < 1050
              ? false
              : isNullOrUndefined(columDisplay.empresaVisitada)
              ? true
              : columDisplay.empresaVisitada,
          filter: true,
          sort: true,
          sortDirection: activeColumnSort === 3 ? order : "none",
          customBodyRender: (data) => {
            if (!isNullOrUndefined(data) && data !== "") return data;
          },
        },
      },
      {
        label: t("DateAdmission"),
        name: "startDate",
        options: {
          display:
            window.innerWidth < 1050
              ? false
              : isNullOrUndefined(columDisplay.startDate)
              ? true
              : columDisplay.startDate,
          filter: true,
          sort: true,
          sortDirection: activeColumnSort === 3 ? order : "none",
          customBodyRender: (data) => {
            console.log("data: ", data);
            if (!isNullOrUndefined(data) && data !== "")
              return moment(data).format("DD/MM/YYYY");
          },
        },
      },

      {
        label: t("DateExit"),
        name: "endDate",
        options: {
          display:
            window.innerWidth < 1050
              ? false
              : isNullOrUndefined(columDisplay.endDate)
              ? true
              : columDisplay.endDate,
          filter: true,
          sort: true,
          sortDirection: activeColumnSort === 3 ? order : "none",
          customBodyRender: (data) => {
            console.log("data: ", data);
            if (!isNullOrUndefined(data) && data !== "")
              return moment(data).format("DD/MM/YYYY");
          },
        },
      },
    ];
  };

  translateColumnsGroups = (t, initial) => {
    const { classes } = this.props;
    let colStorage = JSON.parse(localStorage.getItem("visitsReportColumns"));

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
        name: "nombre", //visitorName
        options: {
          display:
            window.innerWidth < 1050
              ? false
              : isNullOrUndefined(columDisplay.name)
              ? true
              : columDisplay.name,
          filter: true,
          sort: true,
          sortDirection: activeColumnSort === 0 ? order : "none",
          customBodyRender: (data) => {
            if (!isNullOrUndefined(data) && data !== "") return data;
          },
        },
      },
      {
        label: t("LastName"),
        name: "apellido",
        options: {
          display:
            window.innerWidth < 1050
              ? false
              : isNullOrUndefined(columDisplay.visitorLastName)
              ? true
              : columDisplay.visitorLastName,
          filter: true,
          sort: true,
          sortDirection: activeColumnSort === 1 ? order : "none",
          customBodyRender: (data) => {
            if (!isNullOrUndefined(data) && data !== "") return data;
          },
        },
      },
      {
        label: t("dni"),
        name: "documento",
        options: {
          display:
            window.innerWidth < 1050
              ? false
              : isNullOrUndefined(columDisplay.visitorDocument)
              ? true
              : columDisplay.visitorDocument,
          filter: true,
          sort: true,
          sortDirection: activeColumnSort === 2 ? order : "none",
          customBodyRender: (data) => {
            if (!isNullOrUndefined(data) && data !== "") return data;
          },
        },
      },
      {
        label: t("email"),
        name: "email",
        options: {
          display:
            window.innerWidth < 1050
              ? false
              : isNullOrUndefined(columDisplay.visitorEmail)
              ? true
              : columDisplay.visitorEmail,
          filter: true,
          sort: true,
          sortDirection: activeColumnSort === 3 ? order : "none",
          customBodyRender: (data) => {
            if (!isNullOrUndefined(data) && data !== "") return data;
          },
        },
      },
      {
        label: t("Phone"),
        name: "telefono",
        options: {
          display:
            window.innerWidth < 1050
              ? false
              : isNullOrUndefined(columDisplay.phone)
              ? true
              : columDisplay.phone,
          filter: true,
          sort: true,
          sortDirection: activeColumnSort === 3 ? order : "none",
          customBodyRender: (data) => {
            if (!isNullOrUndefined(data) && data !== "") return data;
          },
        },
      },
    ];
  };

  loadData = (loadData, isSearch) => {
    const {
      selectedBadgesObject = [],
      columns,
      searchText,
      empList,
    } = this.state;
    const selectedBadges = selectedBadgesObject.map((badge) => badge.number);
    let valueStart = new Date(
      this.state.filterRange.startDate -
        this.state.filterRange.startDate.getTimezoneOffset() * 60000
    ).toJSON();
    let valueEnd = new Date(
      this.state.filterRange.endDate -
        this.state.filterRange.endDate.getTimezoneOffset() * 60000
    ).toJSON();
    console.log("valueStart: ", valueStart);
    console.log("valueEnd: ", valueEnd);

    if (loadData) {
      this.setState({
        isLoadingNewData: true,
      });
    }
    this.props.requestVisitsEnterprises({
      scheduledVisitsFilters: {
        enterprises: empList.length > 0 ? empList.map((emp) => emp.id) : [],
        startTime: valueStart,
        endTime: valueEnd,
      },
      start: isSearch ? 0 : page * rowsPerPage,
      length: rowsPerPage,
      order:
        columns[activeColumnSort].name === "statusName"
          ? "status" + " " + order
          : columns[activeColumnSort].name + " " + order,
    });
  };

  loadDataGroup = (loadData, isSearch) => {
    const {
      selectedBadgesObject = [],
      columnsGroup,
      personGroupList,
      searchText,
      empList,
    } = this.state;
    if (loadData) {
      this.setState({
        isLoadingNewData: true,
      });
    }
    console.log("personGroupList: ", personGroupList);
    this.props.requestGetPersonByGroup({
      start: isSearch ? 0 : pageGroup * rowsPerPageGroup,
      length: rowsPerPageGroup,
      filters: {
        groupId: personGroupList ? personGroupList.id : 0,
      },
      order:
        columnsGroup[activeColumnSortGroup].name === "statusName"
          ? "status" + " " + order
          : columnsGroup[activeColumnSortGroup].name + " " + order,
    });
  };

  componentDidMount() {
    const { t } = this.props;
    NavBarReports.hideLoader();
    this.updateScreenMode();
    window.addEventListener("resize", this.updateScreenMode);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateScreenMode);
  }

  updateScreenMode = () => {
    this.setState({
      isDesktop: window.innerWidth > 1050,
      panes: this.createPanes(window.innerWidth > 1050),
    });
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      nextProps.i18n.language !== prevState.language ||
      nextProps.successGetVisitReport !== prevState.successGetVisitReport ||
      nextProps.successXlsPersonByGroups !==
        prevState.successXlsPersonByGroups ||
      nextProps.loading !== prevState.loading
    ) {
      return {
        language: nextProps.i18n.language,
        isLoadingNewData: nextProps.loading,
        successXlsPersonByGroups: nextProps.successXlsPersonByGroups,
        successGetVisitReport: nextProps.successGetVisitReport,
      };
    } else return null;
  }

  componentDidUpdate(prevProps, prevState) {
    const { t } = this.props;
    const { successGetVisitReport, successXlsPersonByGroups } = prevState;
    if (
      prevState.filterRange.endDate !== this.state.filterRange.endDate ||
      prevState.empList !== this.state.empList
    ) {
      console.log("this.state.empList", prevState.empList);
      this.loadData(false, false);
    }
    if (prevState.personGroupList !== this.state.personGroupList) {
      this.loadDataGroup(false, false);
    }
    console.log(
      " this.state.successGetVisitReport : ",
      this.state.successGetVisitReport
    );
    if (
      this.state.successGetVisitReport &&
      this.state.successGetVisitReport !== successGetVisitReport
    ) {
      let report =
        "data:application/vnd.ms-excel" + ";base64," + this.props.report.data;
      require("downloadjs")(
        report,
        t("RecordsByEnterprisesReport") + ".xls",
        "application/vnd.ms-excel"
      );
    }
    if (
      this.state.successXlsPersonByGroups &&
      this.state.successXlsPersonByGroups !== successXlsPersonByGroups
    ) {
      let report =
        "data:application/vnd.ms-excel" +
        ";base64," +
        this.props.reportGroup.data;
      require("downloadjs")(
        report,
        t("RecordsByEnterprisesReport") + ".xls",
        "application/vnd.ms-excel"
      );
    }
  }

  handleRangeChange = (ranges) => {
    this.setState({
      filterRange: {
        startDate: startOfDay(ranges.selection.startDate),
        endDate: endOfDay(ranges.selection.endDate),
      },
    });
    this.setState({
      dateRangePicker: {
        selection: {
          ...this.state.dateRangePicker.selection,
          startDate: startOfDay(ranges.selection.startDate),
          endDate: endOfDay(ranges.selection.endDate),
        },
      },
    });
  };

  createPanes = (isDesktop) => {
    const { t, classes } = this.props;
    const staticRanges = getDefaultStaticRanges(t);
    return [
      {
        menuItem: t("Date"),
        render: () => (
          <Tab.Pane className={classes.pane} attached={false}>
            {isDesktop === true ? (
              <DateRangePicker
                onChange={this.handleRangeChange}
                showSelectionPreview={true}
                moveRangeOnFirstSelection={false}
                months={1}
                ranges={[this.state.dateRangePicker.selection]}
                direction="horizontal"
                className={classes.rangePicker}
                staticRanges={staticRanges}
                inputRanges={getDefaultInputRanges(t)}
                dragSelectionEnabled={false}
              />
            ) : (
              <DateRange
                onChange={this.handleRangeChange}
                moveRangeOnFirstSelection={false}
                ranges={[this.state.dateRangePicker.selection]}
                className={classes.rangePicker}
                dragSelectionEnabled={false}
              />
            )}
          </Tab.Pane>
        ),
      },
    ];
  };
  handleOpenEnterprise = (value) => {
    this.setState({ open: value });
  };

  handleOpenPersonGroups = (value) => {
    this.setState({ openPersonGroups: value });
  };

  handleEmpSelected = (empList) => {
    this.setState((prevState) => ({ empList, open: false }));
  };
  handleGroupSelected = (personGroupList) => {
    this.setState((prevState) => ({
      personGroupList,
      openPersonGroups: false,
    }));
  };
  handleDelete = (id) => {
    const newEmpList = this.state.empList.slice();
    const index = newEmpList.findIndex((user) => user.id === id);
    if (index !== -1) newEmpList.splice(index, 1);
    this.setState({ empList: newEmpList });
  };

  changePage = (newPage) => {
    page = newPage;
    this.loadData(true);
  };

  changeRowsPerPage = (newRowsPerPage) => {
    rowsPerPage = newRowsPerPage;
    this.loadData(true);
  };

  changeSearch = (searchText) => {
    const { isSearching } = this.state;
    this.setState({
      searchText,
      isSearching: true,
    });
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
    localStorage.setItem("visitReportColumns", JSON.stringify(modifiedColumns));
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

  handleDownloadReportVisit = () => {
    const { empList } = this.state;
    let valueStart = new Date(
      this.state.filterRange.startDate -
        this.state.filterRange.startDate.getTimezoneOffset() * 60000
    ).toJSON();
    let valueEnd = new Date(
      this.state.filterRange.endDate -
        this.state.filterRange.endDate.getTimezoneOffset() * 60000
    ).toJSON();
    this.props.requestVisitsEnterprisesReportXLS({
      enterprises: empList.length > 0 ? empList.map((emp) => emp.id) : [],
      startTime: valueStart,
      endTime: valueEnd,
    });
  };

  handleDownloadReportPersonGroup = () => {
    const { personGroupList } = this.state;

    this.props.requestGetPersonGroupReportXLS({
      groupId: personGroupList ? personGroupList.id : 0,
    });
  };

  handleSelectReportChange = (name) => (event) => {
    const { t } = this.props;
    let value = event.currentTarget ? event.currentTarget.value : event.value;
    this.setState((prevState) => ({
      selectedReport: this.state.SelectedReportOption[event.value],
      report: value,
    }));
  };

  render() {
    const {
      classes,
      t,
      visitsEnterpriseCount = 0,
      theme,
      personByGroupCount = 0,
    } = this.props;
    const {
      open = false,
      users,
      panes = [],
      empList,
      personGroupList = [],
      openPersonGroups,
      columns,
      columnsGroup,
      isLoadingNewData,
      SelectedReportOption,
      selectedReport,
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
    const options = {
      filterType: "dropdown",
      responsive: "scrollFullHeight",
      serverSide: true,
      rowsPerPage: rowsPerPage,
      count: visitsEnterpriseCount,
      page: page,
      selectableRows: "none",
      download: false,
      filter: false,
      search: false,
      print: false,
      onRowClick: this.onRowClicked,
      viewColumns: this.state.isDesktop,
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

    const optionsGroupPerson = {
      filterType: "dropdown",
      responsive: "scrollFullHeight",
      serverSide: true,
      rowsPerPage: rowsPerPageGroup,
      count: personByGroupCount,
      page: pageGroup,
      selectableRows: "none",
      download: false,
      filter: false,
      search: false,
      print: false,
      onRowClick: this.onRowClicked,
      viewColumns: this.state.isDesktop,
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
    console.log("this.props.personByGroup: ", this.props.personByGroup);
    return (
      <Grid container className={classes.VisitsReportContainer}>
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
        </Grid>
        {this.state.report === 0 && (
          <div style={{ width: "100%" }}>
            <FilterButton
              body={
                <Tab
                  className={classes.tab}
                  menu={{ secondary: true, pointing: true }}
                  panes={panes}
                />
              }
              withOutListener={!this.state.isDesktop}
              title=""
              actions=""
              key={"FilterButton" + this.state.isDesktop}
            />
            <div style={{ width: "100%", marginTop: 20 }}>
              <List>
                <ListItem style={{ padding: 0 }}>
                  <Fab
                    size="small"
                    className={classes.fab}
                    onClick={() => this.handleOpenEnterprise(true)}
                  >
                    <PlusIcon className={classes.fabIcon} />
                  </Fab>
                  <ListItemText
                    primary={t("enterprises")}
                    secondaryTypographyProps={{
                      style: { fontSize: "1rem" },
                    }}
                    // secondary={newPerson.employee ? newPerson.employee.lastname : ""}
                  />
                </ListItem>
              </List>
            </div>
            <div style={{ marginBottom: 10 }}>
              {this.state.empList.map((data) => {
                return (
                  <Chip
                    key={data.id}
                    label={data.name}
                    onDelete={() => this.handleDelete(data.id)}
                    className={classes.chip}
                  />
                );
              })}
            </div>
            <div style={{ width: "100%" }}>
              <div className={classes.tableContainer}>
                <MUIDataTable
                  title={t("Registers")}
                  data={this.props.visitsEnterprise}
                  columns={columns}
                  options={options}
                />
                <Fade in={isLoadingNewData} className={classes.contentLoader}>
                  <div
                    style={{
                      pointerEvents: isLoadingNewData ? "inherit" : "none",
                    }}
                  >
                    <CircularProgress
                      className={classes.circularProgress}
                      size={50}
                    />
                  </div>
                </Fade>
              </div>
              <div className={classes.bottomActions}>
                <Tooltip
                  title={
                    visitsEnterpriseCount && visitsEnterpriseCount > 0
                      ? t("Download")
                      : t("NoRegisters")
                  }
                  aria-label="add"
                >
                  <span>
                    <Fab
                      color="primary"
                      aria-label="Report"
                      className={classes.fab}
                      onClick={this.handleDownloadReportVisit}
                      disabled={
                        isNullOrUndefined(visitsEnterpriseCount) ||
                        visitsEnterpriseCount === 0
                      }
                    >
                      <Print style={{ fontSize: "3em" }} name="filter" />
                    </Fab>
                  </span>
                </Tooltip>
              </div>
            </div>
          </div>
        )}
        {this.state.report === 1 && (
          <div style={{ width: "100%" }}>
            <div style={{ width: "100%", marginTop: 20 }}>
              <List>
                <ListItem style={{ padding: 0 }}>
                  <Fab
                    size="small"
                    className={classes.fab}
                    onClick={() => this.handleOpenPersonGroups(true)}
                  >
                    <PlusIcon className={classes.fabIcon} />
                  </Fab>
                  <ListItemText
                    primary={t("personGroups")}
                    secondaryTypographyProps={{
                      style: { fontSize: "1rem" },
                    }}
                    // secondary={newPerson.employee ? newPerson.employee.lastname : ""}
                  />
                </ListItem>
              </List>
            </div>
            <div style={{ marginBottom: 10 }}>
              {this.state.personGroupList && (
                <Chip
                  key={this.state.personGroupList.id}
                  label={this.state.personGroupList.name}
                  onDelete={() => this.setState({ personGroupList: undefined })}
                  className={classes.chip}
                />
              )}
            </div>
            <div style={{ width: "100%" }}>
              <div className={classes.tableContainer}>
                <MUIDataTable
                  title={t("Registers")}
                  data={this.props.personByGroup}
                  columns={columnsGroup}
                  options={optionsGroupPerson}
                />
                <Fade in={isLoadingNewData} className={classes.contentLoader}>
                  <div
                    style={{
                      pointerEvents: isLoadingNewData ? "inherit" : "none",
                    }}
                  >
                    <CircularProgress
                      className={classes.circularProgress}
                      size={50}
                    />
                  </div>
                </Fade>
              </div>
              <div className={classes.bottomActions}>
                <Tooltip
                  title={
                    personByGroupCount && personByGroupCount > 0
                      ? t("Download")
                      : t("NoRegisters")
                  }
                  aria-label="add"
                >
                  <span>
                    <Fab
                      color="primary"
                      aria-label="Report"
                      className={classes.fab}
                      onClick={this.handleDownloadReportPersonGroup}
                      disabled={
                        isNullOrUndefined(personByGroupCount) ||
                        personByGroupCount === 0
                      }
                    >
                      <Print style={{ fontSize: "3em" }} name="filter" />
                    </Fab>
                  </span>
                </Tooltip>
              </div>
            </div>
          </div>
        )}
        {open && (
          <DataTableDialogAction
            open={open}
            onConfirm={this.handleEmpSelected}
            onClose={() => this.handleOpenEnterprise(false)}
            mdSubtitle={4}
            info={this.props.enterprises}
            success={this.props.successEmployees}
            loading={this.props.loadingEmp}
            title={t("enterprises")}
            subTitle={t("SelectedEnterprises")}
            loadDataAction={this.props.requestEnterprises}
            // extraData={this.state.dateRangePicker.selection.startDate.toJSON(),
            //   this.state.dateRangePicker.selection.endDate.toJSON()}
            rowsSelected={empList !== undefined ? empList : []}
            multipleSelect={true}
            columns={[
              {
                name: "Nombre",
                field: "name",
                options: {
                  filter: true,
                  sort: true,
                },
              },
            ]}
          />
        )}
        {openPersonGroups && (
          <DataTableDialogAction
            open={openPersonGroups}
            onConfirm={this.handleGroupSelected}
            onClose={() => this.handleOpenPersonGroups(false)}
            mdSubtitle={4}
            info={this.props.personGroups}
            success={this.props.successEmployees}
            loading={this.props.loadingEmp}
            title={t("personGroups")}
            subTitle={t("SelectedEnterprises")}
            loadDataAction={this.props.requestGetPersonGroups}
            // extraData={this.state.dateRangePicker.selection.startDate.toJSON(),
            //   this.state.dateRangePicker.selection.endDate.toJSON()}
            rowsSelected={personGroupList !== undefined ? personGroupList : []}
            multipleSelect={false}
            columns={[
              {
                name: "Nombre",
                field: "name",
                options: {
                  filter: true,
                  sort: true,
                },
              },
            ]}
          />
        )}
      </Grid>
    );
  }
}

const styles = (theme) => ({
  bottomActions: {
    position: "fixed",
    bottom: 10,
    right: 20,
    zIndex: 101,
  },
  root: {
    display: "flex",
  },
  chartContainer: {
    marginLeft: -22,
  },
  chip: {
    marginRight: theme.spacing.unit,
  },
  fab: {
    backgroundColor: theme.palette.primary.main,
  },
  fabIcon: {
    color: theme.palette.text.main,
  },
  tableContainer: {
    position: "relative",
  },
  pane: {
    padding: 0 + " !important",
    border: 0 + " !important",
    color: "#fff",
    backgroundColor: theme.palette.backgroundSecondary.main + " !important",
    display: "flex !important",
    justifyContent: "center",
  },
  tab: {
    "& >.menu >.item": {
      color: theme.palette.text.main + " !important",
    },
    "& >.menu >.item.active": {
      borderColor: theme.palette.primary.main + " !important",
    },
  },
  circularProgress: {},
  contentLoader: {
    display: "flex",
    justifyContent: "center",
    top: 0,
    width: "100%",
    height: "100%",
    position: "absolute",
    alignItems: "center",
    zIndex: 101,
    backgroundColor: "#d0d0d080",
  },
  iconButton: {
    padding: 5,
  },
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

VisitsReport.propTypes = {
  classes: PropTypes.object.isRequired,
};
const mapStateToProps = (Store) => {
  const { User, Enterprise, Persons } = Store;
  return {
    users: User.users,
    enterprises: Enterprise.enterprises,
    loading: Enterprise.loading,
    visitsEnterprise: Enterprise.visitsEnterprise,
    visitsEnterpriseCount: Enterprise.visitsEnterpriseCount,
    successGetVisitReport: Enterprise.successDownloadXLS,
    report: Enterprise.visitReport,
    reportGroup: Persons.GroupReport,
    personGroups: Persons.personGroups,
    personByGroup: Persons.personByGroup
      ? Persons.personByGroup.data
      : undefined,
    personByGroupCount: Persons.personByGroup
      ? Persons.personByGroup.totalCount
      : 0,
    successXlsPersonByGroups: Persons.successXlsPersonByGroups,
  };
};
const mapDispatchToProps = {
  requestUsers: requestUsers,
  requestEnterprises,
  requestVisitsEnterprises,
  requestVisitsEnterprisesReportXLS,
  requestGetPersonGroups,
  requestGetPersonByGroup,
  requestGetPersonGroupReportXLS,
};
const VisitsReportConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(VisitsReport);
export default withTranslation()(
  withStyles(styles, { withTheme: true })(VisitsReportConnected)
);
