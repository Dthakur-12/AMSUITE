import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import NavBarTikas from "../../../src/webApps/Tikas/utils/NavBarTikas";

import ApiHandler from "../../services/ApiHandler";
import { Typography } from "@mui/material";
import moment from "moment";
import { socketIO } from "../../utils/WebSockets";
import SnackbarHandler from "../../utils/SnackbarHandler";

import { withTranslation } from "react-i18next";
import { isNullOrUndefined } from "util";

let page = 0;
let rowsPerPage = 10;
let activeColumnSort = 0;
let order = "asc";

const withStalls = (Component) =>
  (class extends React.Component {
    constructor(props) {
      super(props);
      const { t } = props;
      this.state = {
        isEdit: false,
        isDetails: false,
        isLoading: true,
        dateTime: moment(),
        isLoadingNewData: false,
        isSearching: false,
        data: [],
        dataCount: 0,
        searchText: "",
        openDialogDeleteConfirm: false,
        indexsToDelete: undefined,
        openEdit: false,
        columns: this.translateColumns(t, true),
        openDetails: false,
        openCreateStall: false,
      };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
      if (nextProps.i18n.language !== prevState.language) {
        return {
          language: nextProps.i18n.language,
        };
      } else return null;
    }

    componentDidUpdate(prevProps, prevState) {
      if (prevState.language !== this.state.language) {
        this.setState({
          ...prevState,
          columns: this.translateColumns(this.props.t, false),
        });
      }
    }

    translateColumns = (t, initial) => {
      const isDesktop = window.innerWidth > 900;

      let colStorage = JSON.parse(localStorage.getItem("stallsColumns"));

      let columDisplay = {};
      if (initial && !isNullOrUndefined(colStorage)) {
        colStorage &&
          colStorage.map(
            (elem) =>
              (columDisplay[elem.name] = !isNullOrUndefined(
                elem.options.display
              )
                ? elem.options.display
                : true)
          );
      } else {
        this.state &&
          this.state.columns &&
          this.state.columns.map(
            (elem) =>
              (columDisplay[elem.name] = !isNullOrUndefined(
                elem.options.display
              )
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
            display: isNullOrUndefined(columDisplay.name)
              ? true
              : columDisplay.name,
            sortDirection: activeColumnSort === 0 ? order : "none",
            customBodyRender: (value, tableMeta) => {
              return (
                <Typography
                  value={value}
                  aria-owns={this.state.open ? "mouse-over-popover" : undefined}
                  aria-haspopup="true"
                >
                  {value}
                </Typography>
              );
            },
          },
        },
        {
          label: t("Type"),
          name: "online",
          options: {
            filter: true,
            sort: true,
            display: isNullOrUndefined(columDisplay.online)
              ? true
              : columDisplay.lastname,
            sortDirection: activeColumnSort === 1 ? order : "none",
            customBodyRender: (value, tableMeta) => {
              return (
                <Typography
                  value={value}
                  aria-owns={this.state.open ? "mouse-over-popover" : undefined}
                  aria-haspopup="true"
                  // onMouseEnter={this.handlePopoverOpen}
                  // onMouseLeave={this.handlePopoverClose}
                >
                  {value ? t("Online") : t("Offline")}
                </Typography>
              );
            },
          },
        },
        {
          label: t("Breakfast"),
          name: "breakfastStart",
          options: {
            filter: true,
            sort: true,
            display: isNullOrUndefined(columDisplay.breakfastStart)
              ? true
              : columDisplay.breakfastStart,
            sortDirection: activeColumnSort === 1 ? order : "none",
            customBodyRender: (value, tableMeta) => {
              let data = this.state ? this.state.data : [];

              let startFormatDate =
                data.length > 0 && data[tableMeta.rowIndex].breakfastStart
                  ? moment(
                      new Date(data[tableMeta.rowIndex].breakfastStart)
                    ).format("LT")
                  : "";

              let endFormatDate =
                data.length > 0 && data[tableMeta.rowIndex].breakfastEnd
                  ? moment(
                      new Date(data[tableMeta.rowIndex].breakfastEnd)
                    ).format("LT")
                  : "";

              return (
                <Typography
                  value={value}
                  aria-owns={this.state.open ? "mouse-over-popover" : undefined}
                  aria-haspopup="true"
                  // onMouseEnter={this.handlePopoverOpen}
                  // onMouseLeave={this.handlePopoverClose}
                >
                  {startFormatDate + " - " + endFormatDate}
                </Typography>
              );
            },
          },
        },
        {
          label: t("Lunch"),
          name: "lunchStart",
          options: {
            filter: true,
            sort: true,
            display: isNullOrUndefined(columDisplay.lunchStart)
              ? true
              : columDisplay.lunchStart,
            sortDirection: activeColumnSort === 1 ? order : "none",
            customBodyRender: (value, tableMeta) => {
              let data = this.state ? this.state.data : [];

              let startFormatDate =
                data.length > 0 && data[tableMeta.rowIndex].lunchStart
                  ? moment(
                      new Date(data[tableMeta.rowIndex].lunchStart)
                    ).format("LT")
                  : "";

              let endFormatDate =
                data.length > 0 && data[tableMeta.rowIndex].lunchEnd
                  ? moment(new Date(data[tableMeta.rowIndex].lunchEnd)).format(
                      "LT"
                    )
                  : "";

              return (
                <Typography
                  value={value}
                  aria-owns={this.state.open ? "mouse-over-popover" : undefined}
                  aria-haspopup="true"
                  // onMouseEnter={this.handlePopoverOpen}
                  // onMouseLeave={this.handlePopoverClose}
                >
                  {startFormatDate + " - " + endFormatDate}
                </Typography>
              );
            },
          },
        },
        {
          label: t("Snack"),
          name: "snackStart",
          options: {
            filter: true,
            sort: true,
            display: isNullOrUndefined(columDisplay.snackStart)
              ? true
              : columDisplay.snackStart,
            sortDirection: activeColumnSort === 1 ? order : "none",
            customBodyRender: (value, tableMeta) => {
              let data = this.state ? this.state.data : [];

              let startFormatDate =
                data.length > 0 && data[tableMeta.rowIndex].snackStart
                  ? moment(
                      new Date(data[tableMeta.rowIndex].snackStart)
                    ).format("LT")
                  : "";

              let endFormatDate =
                data.length > 0 && data[tableMeta.rowIndex].snackEnd
                  ? moment(new Date(data[tableMeta.rowIndex].snackEnd)).format(
                      "LT"
                    )
                  : "";

              return (
                <Typography
                  value={value}
                  aria-owns={this.state.open ? "mouse-over-popover" : undefined}
                  aria-haspopup="true"
                  // onMouseEnter={this.handlePopoverOpen}
                  // onMouseLeave={this.handlePopoverClose}
                >
                  {startFormatDate + " - " + endFormatDate}
                </Typography>
              );
            },
          },
        },
        {
          label: t("Dinner"),
          name: "dinnerStart",
          options: {
            filter: true,
            sort: true,
            display: isNullOrUndefined(columDisplay.dinnerStart)
              ? true
              : columDisplay.dinnerStart,
            sortDirection: activeColumnSort === 1 ? order : "none",
            customBodyRender: (value, tableMeta) => {
              let data = this.state ? this.state.data : [];

              let startFormatDate =
                data.length > 0 && data[tableMeta.rowIndex].dinnerStart
                  ? moment(
                      new Date(data[tableMeta.rowIndex].dinnerStart)
                    ).format("LT")
                  : "";

              let endFormatDate =
                data.length > 0 && data[tableMeta.rowIndex].dinnerEnd
                  ? moment(new Date(data[tableMeta.rowIndex].dinnerEnd)).format(
                      "LT"
                    )
                  : "";

              return (
                <Typography
                  value={value}
                  aria-owns={this.state.open ? "mouse-over-popover" : undefined}
                  aria-haspopup="true"
                  // onMouseEnter={this.handlePopoverOpen}
                  // onMouseLeave={this.handlePopoverClose}
                >
                  {startFormatDate + " - " + endFormatDate}
                </Typography>
              );
            },
          },
        },
      ];
    };

    updateScreenMode = () => {
      this.setState({ isDesktop: window.innerWidth > 900 });
    };

    componentWillUnmount() {
      socketIO.emit("unsubscribeChanges");
      //  window.removeEventListener("resize", this.updateScreenMode);
      window.removeEventListener("resize", this.updateScreenMode);
    }

    handleOnDetails = (index) => {
      let stallId = this.state.data[index].id;
      ApiHandler.Tikas.Stalls.getStallById(stallId)
        .then(({ data }) => {
          let intervalList = {
            Breakfast: [],
            Lunch: [],
            Snack: [],
            Dinner: [],
          };

          const breakfastStart = data.breakfastStart
            ? this.calculateMinuts(data.breakfastStart)
            : null;
          const breakfastEnd = data.breakfastEnd
            ? this.calculateMinuts(data.breakfastEnd)
            : null;

          const lunchStart = data.lunchStart
            ? this.calculateMinuts(data.lunchStart)
            : null;
          const lunchEnd = data.lunchEnd
            ? this.calculateMinuts(data.lunchEnd)
            : null;
          const snackStart = data.snackStart
            ? this.calculateMinuts(data.snackStart)
            : null;
          const snackEnd = data.snackEnd
            ? this.calculateMinuts(data.snackEnd)
            : null;
          const dinnerStart = data.dinnerStart
            ? this.calculateMinuts(data.dinnerStart)
            : null;
          const dinnerEnd = data.dinnerEnd
            ? this.calculateMinuts(data.dinnerEnd)
            : null;

          intervalList.Breakfast = data.breakfastStart
            ? this.calculateIntervals(breakfastStart, breakfastEnd)
            : [];
          intervalList.Lunch = data.lunchStart
            ? this.calculateIntervals(lunchStart, lunchEnd)
            : [];
          intervalList.Snack = data.snackStart
            ? this.calculateIntervals(snackStart, snackEnd)
            : [];
          intervalList.Dinner = data.dinnerStart
            ? this.calculateIntervals(dinnerStart, dinnerEnd)
            : [];
          this.setState({
            intervalList: intervalList,
            isEdit: false,
            isDetails: true,
            openDetails: true,
            newStall: {
              id: data.id,
              name: data.name,
              online: data.online,
              intervalSelected: [
                { start: breakfastStart, end: breakfastEnd },
                { start: lunchStart, end: lunchEnd },
                { start: snackStart, end: snackEnd },
                { start: dinnerStart, end: dinnerEnd },
              ],

              stock: data.stock,
            },
          });
        })
        .catch(({ error }) => {
          console.log(error);
        });
    };

    componentDidMount() {
      this.updateScreenMode();
      const { searchText } = this.state;
      const { t } = this.props;
      this.loadData(true);

      NavBarTikas.hideLoader();
    }

    loadData = (contentLoader) => {
      const { searchText, dateTime, filter, ZoneID, columns } = this.state;
      const { t } = this.props;
      if (contentLoader) this.setState({ isLoadingNewData: true });
      ApiHandler.Tikas.Stalls.getStalls({
        start: page * rowsPerPage,
        length: rowsPerPage,
        order: columns[activeColumnSort].name + " " + order,
        //   search: searchText ? searchText : "",
      })
        .then(({ data }) => {
          this.setState({
            isLoadingNewData: false,
            isLoading: false,
            data: data.data,
            dataCount: data.dataCount,
          });
        })
        .catch(({ error }) => {
          console.log(error);
        });
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
      this.loadData(false);
    };

    changeSearch = (value) => {
      this.setState({
        isSearching: true,
      });
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
      localStorage.setItem("stallsColumns", JSON.stringify(modifiedColumns));
    };

    calculateMinuts = (d) => {
      const date = new Date(d);
      const minuts = date.getHours() * 60 + date.getMinutes();
      return minuts;
    };

    calculateIntervals = (valueStart, valueEnd) => {
      let ret = [];

      let iter = valueStart;

      while (iter + 30 < valueEnd) {
        ret.push({ start: iter, end: iter + 30 });
        iter += 30;
      }
      if (valueEnd === 1439) {
        ret.push({ start: iter, end: iter + 29 });
      } else {
        ret.push({ start: iter, end: iter + 30 });
      }
      return ret;
    };

    handleOnEdit = (index) => {
      let stallId = this.state.data[index].id;
      ApiHandler.Tikas.Stalls.getStallById(stallId)
        .then(({ data }) => {
          let intervalList = {
            Breakfast: [],
            Lunch: [],
            Snack: [],
            Dinner: [],
          };

          const breakfastStart = data.breakfastStart
            ? this.calculateMinuts(data.breakfastStart)
            : null;
          const breakfastEnd = data.breakfastEnd
            ? this.calculateMinuts(data.breakfastEnd)
            : null;

          const lunchStart = data.lunchStart
            ? this.calculateMinuts(data.lunchStart)
            : null;
          const lunchEnd = data.lunchEnd
            ? this.calculateMinuts(data.lunchEnd)
            : null;
          const snackStart = data.snackStart
            ? this.calculateMinuts(data.snackStart)
            : null;
          const snackEnd = data.snackEnd
            ? this.calculateMinuts(data.snackEnd)
            : null;
          const dinnerStart = data.dinnerStart
            ? this.calculateMinuts(data.dinnerStart)
            : null;
          const dinnerEnd = data.dinnerEnd
            ? this.calculateMinuts(data.dinnerEnd)
            : null;

          intervalList.Breakfast = data.breakfastStart
            ? this.calculateIntervals(breakfastStart, breakfastEnd)
            : [];
          intervalList.Lunch = data.lunchStart
            ? this.calculateIntervals(lunchStart, lunchEnd)
            : [];
          intervalList.Snack = data.snackStart
            ? this.calculateIntervals(snackStart, snackEnd)
            : [];
          intervalList.Dinner = data.dinnerStart
            ? this.calculateIntervals(dinnerStart, dinnerEnd)
            : [];
          this.setState({
            intervalList: intervalList,
            isEdit: true,
            openEdit: true,
            isDetails: false,
            newStall: {
              id: data.id,
              name: data.name,
              online: data.online,
              intervalSelected: [
                { start: breakfastStart, end: breakfastEnd },
                { start: lunchStart, end: lunchEnd },
                { start: snackStart, end: snackEnd },
                { start: dinnerStart, end: dinnerEnd },
              ],

              stock: data.stock,
            },
          });
        })
        .catch(({ error }) => {
          console.log(error);
        });
    };

    handleLicence = (entities, activity) => {
      const { currentUser } = this.props;
      return (
        Object.keys(currentUser.permits).filter((v) => {
          return entities.includes(v.toString()) && activity != null
            ? currentUser.permits[v].includes(parseInt(activity))
            : true;
        }).length > 0
      );
    };

    handleOnDelete = () => {
      const { data, indexsToDelete } = this.state;
      //const { deleteRequestControl } = this.props;
      let ids = [];
      indexsToDelete.map((i) => {
        return ids.push(data[i].id);
      });
      ApiHandler.Tikas.Stalls.deleteStalls(ids)
        .then(({ data }) => {
          SnackbarHandler.showMessage(this.props.t("SuccessDelete"));
          this.loadData(true);
          this.setState({ openDialogDeleteConfirm: false });
        })
        .catch(({ error }) => {
          console.log(error);
        });
      // deleteRequestControl(ids);
    };

    handleCloseEditModal = () => {
      this.setState((prevState) => ({
        ...prevState,
        openEdit: false,
        openDetails: false,
      }));
    };

    handleOpenDeleteConfirm = (indexs) => {
      this.setState({
        openDialogDeleteConfirm: true,
        indexsToDelete: indexs,
      });
    };

    handleCloseDeleteConfirm = () => {
      this.setState({
        openDialogDeleteConfirm: false,
      });
    };

    openNewStall = () => {
      this.setState({ openCreateStall: true });
    };
    handleCloseNewStall = () => {
      this.setState({ openCreateStall: false });
    };

    handleAdd = () => {
      this.setState({
        productOnCreate: true,
      });
    };
    handleCloseProductOnCreate = () => {
      this.setState({ productOnCreate: undefined });
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
      return (
        <Component
          {...this.props}
          handleOnDelete={this.handleOnDelete}
          productOnCreate={this.state.productOnCreate}
          intervalList={this.state.intervalList}
          newStall={this.state.newStall}
          openDialogDeleteConfirm={this.state.openDialogDeleteConfirm}
          indexsToDelete={this.state.indexsToDelete}
          data={this.state.data}
          stallId={this.state.stallId}
          isDetails={this.state.isDetails}
          page={page}
          isEdit={this.state.isEdit}
          openEdit={this.state.openEdit}
          openDetails={this.state.openDetails}
          rowsPerPage={rowsPerPage}
          columns={this.state.columns}
          isLoading={this.state.isLoading}
          isLoadingNewData={this.state.isLoadingNewData}
          dataCount={this.state.dataCount}
          isDesktop={this.state.isDesktop}
          isSearching={this.state.isSearching}
          loadData={this.loadData}
          handleCloseEditModal={this.handleCloseEditModal}
          onTableChange={this.onTableChange}
          handleOnDetails={this.handleOnDetails}
          handleOpenDeleteConfirm={this.handleOpenDeleteConfirm}
          handleOnEdit={this.handleOnEdit}
          handleLicence={this.handleLicence}
          handleAdd={this.handleAdd}
          handleCloseProductOnCreate={this.handleCloseProductOnCreate}
          handleCloseDeleteConfirm={this.handleCloseDeleteConfirm}
          handleCloseNewStall={this.handleCloseNewStall}
          openCreateStall={this.state.openCreateStall}
          openNewStall={this.openNewStall}
        />
      );
    }
  });

const mapDispatchToProps = {};

const mapStateToProps = ({ User }) => {
  return {
    currentUser: User.currentUser,
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withTranslation(),
  withStalls
);
