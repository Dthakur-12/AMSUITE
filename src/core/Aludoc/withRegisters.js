import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import Typography from "@mui/material/Typography";
import NavBarAludoc from "../../webApps/Aludoc/utils/NavBarAludoc";
import ListItem from "@mui/material/ListItem";
import { ListItemIcon } from "@mui/material";
import { requestRegisters } from "../../actions/EasyAccess/Register_actions";
import { requestPersonById } from "../../actions/EasyAccess/Person_actions";
import moment from "moment";
import Zoom from "@mui/material/Zoom";
import Tooltip from "@mui/material/Tooltip";
import { isNullOrUndefined } from "util";
import { camelize } from "../../utils/HelperFunctions";
import { socketIO } from "../../utils/WebSockets";
import Popover from "@mui/material/Popover";
import CarIcon from "@mui/icons-material/DirectionsCarRounded";

import { Entities, Activity } from "../../utils/Enums";
import { Icon } from "semantic-ui-react";
import { withTranslation } from "react-i18next";
import { debounce } from "throttle-debounce";

let page = 0;
let rowsPerPage = 10;
let activeColumnSort = 0;
let order = "asc";

const withRegisters = (Component) =>
  (class extends React.Component {
    constructor(props) {
      super(props);
      const { t } = props;
      this.state = {
        isLoading: true,
        registerOnEdit: undefined,
        isLoadingNewData: false,
        openDialogDeleteConfirm: false,
        isSearching: false,
        registerAddDocument: undefined,
        columns: this.translateColumns(t, true),
      };

      this.changeSearchDebounce = debounce(300, (value) =>
        this.changeSearch(value)
      );
    }
    static getDerivedStateFromProps(nextProps, prevState) {
      if (
        nextProps.i18n.language !== prevState.language ||
        nextProps.successPerson !== prevState.successPerson ||
        nextProps.registers !== prevState.registers ||
        nextProps.successRegisters !== prevState.successRegisters
      ) {
        return {
          language: nextProps.i18n.language,
          successPerson: nextProps.successPerson,
          registers: nextProps.registers,
          successRegisters: nextProps.successRegisters,
        };
      } else return null;
    }

    componentDidUpdate(prevProps, prevState) {
      const { registers, searchText } = this.state;
      if (prevState.language !== this.state.language) {
        this.setState({
          ...prevState,
          columns: this.translateColumns(this.props.t, false),
        });
      }
      if (
        this.state.successRegisters &&
        this.state.successRegisters !== prevState.successRegisters
      ) {
        this.setState({
          data: this.state.registers.data,
          dataCount: this.state.registers.dataCount,
          isLoading: false,
          hideSearch: false,
          isLoadingNewData: false,
          isSearching: prevState.searchText !== searchText,
        });
      }
      if (
        this.state.successPerson &&
        this.state.successPerson !== prevState.successPerson
      ) {
        this.setState({
          registerOnDetails: this.props.person,
        });
      }
    }

    translateColumns = (t, initial) => {
      const isDesktop = window.innerWidth > 900;

      let colStorage = JSON.parse(
        localStorage.getItem("registerColumnsAludoc")
      );

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
            search: false,
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
                  onMouseEnter={this.handlePopoverOpen}
                  onMouseLeave={this.handlePopoverClose}
                >
                  {value}
                </Typography>
              );
            },
          },
        },
        {
          label: t("LastName"),
          name: "lastname",
          options: {
            filter: true,
            sort: true,
            search: false,
            sortDirection: activeColumnSort === 1 ? order : "none",
            display: isNullOrUndefined(columDisplay.lastname)
              ? true
              : columDisplay.lastname,
            customBodyRender: (value) => {
              return (
                <Typography
                  value={value}
                  aria-owns={this.state.open ? "mouse-over-popover" : undefined}
                  aria-haspopup="true"
                  onMouseEnter={this.handlePopoverOpen}
                  onMouseLeave={this.handlePopoverClose}
                >
                  {value}
                </Typography>
              );
            },
          },
        },
        {
          label: t("dni"),
          name: "document",
          options: {
            display: !isDesktop
              ? false
              : isNullOrUndefined(columDisplay.document)
              ? true
              : columDisplay.document,
            filter: true,
            sort: true,
            search: false,
            sortDirection: activeColumnSort === 2 ? order : "none",
            customBodyRender: (value) => {
              return (
                <Typography
                  value={value}
                  aria-owns={this.state.open ? "mouse-over-popover" : undefined}
                  aria-haspopup="true"
                  onMouseEnter={this.handlePopoverOpen}
                  onMouseLeave={this.handlePopoverClose}
                >
                  {value}
                </Typography>
              );
            },
          },
        },
        {
          label: t("enterprise"),
          name: "originEnterpriseName",
          options: {
            filter: true,
            sort: true,
            search: false,
            display: !isDesktop
              ? false
              : isNullOrUndefined(columDisplay.originEnterpriseName)
              ? true
              : columDisplay.originEnterpriseName,
            sortDirection: activeColumnSort === 3 ? order : "none",
            customBodyRender: (value) => {
              return (
                <Typography
                  value={value}
                  aria-owns={this.state.open ? "mouse-over-popover" : undefined}
                  aria-haspopup="true"
                  onMouseEnter={this.handlePopoverOpen}
                  onMouseLeave={this.handlePopoverClose}
                >
                  {value}
                </Typography>
              );
            },
          },
        },
        {
          label: t("DateAdmission"),
          name: "ingressDate",
          options: {
            filter: true,
            display: !isDesktop
              ? false
              : isNullOrUndefined(columDisplay.ingressDate)
              ? true
              : columDisplay.ingressDate,
            sort: true,
            search: false,
            sortDirection: activeColumnSort === 4 ? order : "none",
            customBodyRender: (value) => {
              if (value)
                return (
                  <Typography
                    value={value}
                    aria-owns={
                      this.state.open ? "mouse-over-popover" : undefined
                    }
                    aria-haspopup="true"
                    onMouseEnter={this.handlePopoverOpen}
                    onMouseLeave={this.handlePopoverClose}
                  >
                    {moment(value).format("DD/MM/YYYY HH:mm")}
                  </Typography>
                );
            },
          },
        },
        {
          label: t("DateExit"),
          name: "egressDate",
          options: {
            display: !isDesktop
              ? false
              : isNullOrUndefined(columDisplay.egressDate)
              ? true
              : columDisplay.egressDate,
            filter: true,
            sort: true,
            search: false,
            sortDirection: activeColumnSort === 5 ? order : "none",
            customBodyRender: (value) => {
              if (value)
                return (
                  <Typography
                    value={value}
                    aria-owns={
                      this.state.open ? "mouse-over-popover" : undefined
                    }
                    aria-haspopup="true"
                    onMouseEnter={this.handlePopoverOpen}
                    onMouseLeave={this.handlePopoverClose}
                  >
                    {moment(value).format("DD/MM/YYYY HH:mm")}
                  </Typography>
                );
            },
          },
        },
        {
          label: t("Type"),
          name: "type",
          options: {
            display: !isDesktop
              ? false
              : isNullOrUndefined(columDisplay.type)
              ? true
              : columDisplay.type,
            filter: true,
            sort: true,
            search: false,
            sortDirection: activeColumnSort === 6 ? order : "none",
            customBodyRender: (value) => {
              return (
                <Typography
                  value={value}
                  aria-owns={this.state.open ? "mouse-over-popover" : undefined}
                  aria-haspopup="true"
                  onMouseEnter={this.handlePopoverOpen}
                  onMouseLeave={this.handlePopoverClose}
                >
                  {value === 1 ? "Visitor" : "Employee"}
                </Typography>
              );
            },
          },
        },
        {
          label: t("Card"),
          name: "badges",
          options: {
            display: !isDesktop
              ? false
              : isNullOrUndefined(columDisplay.badges)
              ? true
              : columDisplay.badges,
            filter: true,
            sort: true,
            search: false,
            sortDirection: activeColumnSort === 7 ? order : "none",
            customBodyRender: (value) => {
              if (value && value.length > 0)
                return (
                  <Typography
                    value={value[0].number}
                    aria-owns={
                      this.state.open ? "mouse-over-popover" : undefined
                    }
                    aria-haspopup="true"
                    onMouseEnter={this.handlePopoverOpen}
                    onMouseLeave={this.handlePopoverClose}
                  >
                    {value[0].number}
                  </Typography>
                );
            },
          },
        },
        {
          label: t("status"),
          name: "statusName",
          options: {
            display: !isDesktop
              ? false
              : isNullOrUndefined(columDisplay.statusName)
              ? true
              : columDisplay.statusName,
            filter: true,
            sort: true,
            search: false,
            sortDirection: activeColumnSort === 8 ? order : "none",
            customBodyRender: (value) => {
              return (
                <Typography
                  value={value}
                  aria-owns={this.state.open ? "mouse-over-popover" : undefined}
                  aria-haspopup="true"
                  onMouseEnter={this.handlePopoverOpen}
                  onMouseLeave={this.handlePopoverClose}
                >
                  {t(camelize(value))}
                </Typography>
              );
            },
          },
        },
        {
          label: t("Documentation"),
          name: "documentationStatus",
          options: {
            filter: false,
            sort: false,
            search: false,
            display: isNullOrUndefined(columDisplay.documentationStatus)
              ? true
              : columDisplay.documentationStatus,
            customBodyRender: (value) => {
              const { classes } = this.props;
              return (
                <ListItem>
                  <ListItemIcon>
                    {value === -1 ? (
                      <Tooltip
                        TransitionComponent={Zoom}
                        title={"sin documentación"}
                      >
                        <Icon name="warning sign" size="big" color="grey" />
                      </Tooltip>
                    ) : value === 0 ? (
                      <Tooltip
                        TransitionComponent={Zoom}
                        title={t("validDocumentation")}
                      >
                        <Icon
                          name="check circle outline"
                          size="big"
                          color="green"
                        />
                      </Tooltip>
                    ) : (
                      <Tooltip
                        TransitionComponent={Zoom}
                        title={
                          value === 3
                            ? "Documentación vencida"
                            : value === 1
                            ? "Documentación a revisar"
                            : "Documentación rechazada"
                        }
                      >
                        <Icon
                          name="times circle outline"
                          size="big"
                          color="red"
                        />
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

    componentDidMount() {
      const { columns, searchText = "" } = this.state;
      const { match } = this.props;
      this.updateScreenMode();
      NavBarAludoc.hideLoader();
      socketIO.emit("changes");
      const loadData = this.loadData;
      socketIO.on("AnyChange", function (data) {
        if (data.message[3] || data.message[4]) {
          loadData(true);
        }
      });
      if (
        this.handleLicence(
          [Entities.EMPLOYEES.toString(), Entities.VISITORS.toString()],
          Activity.VISUALIZE
        )
      ) {
        this.props.requestRegisters({
          start: page * rowsPerPage,
          length: rowsPerPage,
          order:
            columns[activeColumnSort].name === "statusName"
              ? "status" + " " + order
              : columns[activeColumnSort].name + " " + order,
          search: searchText ? searchText : "",
        });
      } else if (
        this.handleLicence([Entities.EMPLOYEES.toString()], Activity.VISUALIZE)
      ) {
        this.props.requestRegisters({
          start: page * rowsPerPage,
          length: rowsPerPage,
          order:
            columns[activeColumnSort].name === "statusName"
              ? "status" + " " + order
              : columns[activeColumnSort].name + " " + order,
          search: searchText ? searchText : "",
          type: 1,
        });
      } else if (
        this.handleLicence([Entities.VISITORS.toString()], Activity.VISUALIZE)
      ) {
        this.props.requestRegisters({
          start: page * rowsPerPage,
          length: rowsPerPage,
          order:
            columns[activeColumnSort].name === "statusName"
              ? "status" + " " + order
              : columns[activeColumnSort].name + " " + order,
          search: searchText ? searchText : "",
          type: 2,
        });
      } else
        this.setState({
          isLoading: false,
          isLoadingNewData: false,
          noVisualize: true,
        });

      if (match) {
        if (match.params.documentid) {
          this.setState({ documentId: match.params.documentid });
        }

        if (match.params.id) {
          this.props.requestPersonById(match.params.id);
        }
      }
    }

    componentWillUnmount = () => {
      socketIO.emit("unsubscribeChanges");

      window.removeEventListener("resize", this.updateScreenMode);
    };

    updateScreenMode = () => {
      this.setState({ isDesktop: window.innerWidth > 900 });
    };

    handlePopoverOpen = (event) => {
      this.setState({ anchorEl: event.currentTarget });
    };

    handlePopoverClose = () => {
      this.setState({ anchorEl: null });
    };

    loadData = (contentLoader, isSearch, page, rowsPerPage) => {
      page = !isNullOrUndefined(page) ? page : 0;
      rowsPerPage = rowsPerPage ? rowsPerPage : 10;
      const { columns, searchText } = this.state;
      if (contentLoader) this.setState({ isLoadingNewData: true });
      if (
        this.handleLicence(
          [Entities.EMPLOYEES.toString(), Entities.VISITORS.toString()],
          Activity.VISUALIZE
        )
      ) {
        this.props.requestRegisters({
          start: isSearch ? 0 : page * rowsPerPage,
          length: rowsPerPage,
          order:
            columns[activeColumnSort].name === "statusName"
              ? "status" + " " + order
              : columns[activeColumnSort].name + " " + order,
          search: searchText ? searchText : "",
        });
      } else if (
        this.handleLicence([Entities.EMPLOYEES.toString()], Activity.VISUALIZE)
      ) {
        this.props.requestRegisters({
          start: isSearch ? 0 : page * rowsPerPage,
          length: rowsPerPage,
          order:
            columns[activeColumnSort].name === "statusName"
              ? "status" + " " + order
              : columns[activeColumnSort].name + " " + order,
          search: searchText ? searchText : "",
          type: 1,
        });
      } else if (
        this.handleLicence([Entities.VISITORS.toString()], Activity.VISUALIZE)
      ) {
        this.props.requestRegisters({
          start: isSearch ? 0 : page * rowsPerPage,
          length: rowsPerPage,
          order:
            columns[activeColumnSort].name === "statusName"
              ? "status" + " " + order
              : columns[activeColumnSort].name + " " + order,
          search: searchText ? searchText : "",
          type: 2,
        });
      } else
        this.setState({
          isLoading: false,
          isLoadingNewData: false,
          noVisualize: true,
        });
    };

    changePage = (newPage) => {
      page = newPage;
      this.loadData(true, false, page, rowsPerPage);
    };

    changeRowsPerPage = (newRowsPerPage) => {
      if (newRowsPerPage !== rowsPerPage) {
        rowsPerPage = newRowsPerPage;

        this.loadData(true, false, 0, rowsPerPage);
      }
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
      this.loadData(true, false, page, rowsPerPage);
    };

    changeSearch = (value) => {
      this.setState({
        isSearching: true,
      });
      this.loadData(true, true, page, rowsPerPage);
    };

    onChangeSearch = (text) => {
      let value = text ? text : "";
      this.setState({
        searchText: value,
      });
      this.changeSearchDebounce(value);
    };

    handleaddDocument = (index) => {
      let register = this.state.data[index];
      this.setState({
        registerAddDocument: register,
      });
    };

    handleOnDetail = (index) => {
      let register = this.state.data[index];
      this.setState({
        registerOnDetails: register,
      });
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
      localStorage.setItem(
        "registerColumnsAludoc",
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
          this.onChangeSearch(tableState.searchText);
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

    renderPopover = () => {
      const { classes } = this.props;
      const { anchorEl } = this.state;
      const open = Boolean(anchorEl);
      return (
        <div style={{ display: "flex", width: 500 }}>
          <Popover
            className={classes.popover}
            classes={{
              paper: classes.paper,
            }}
            open={open}
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            onClose={this.handlePopoverClose}
            disableRestoreFocus
          >
            <CarIcon style={{ color: "white" }} />
          </Popover>
        </div>
      );
    };

    handleLicence = (entities, activity) => {
      const { currentUser } = this.props;
      let a = [];
      a = Object.keys(currentUser.permits).filter((v) => {
        return (
          entities.includes(v.toString()) &&
          currentUser.permits[v].includes(parseInt(activity))
        );
      });

      return a.length === entities.length;
    };

    closeRegisterOnDetails = () => {
      this.setState({ registerOnDetails: undefined });
    };

    closeRegisterAddDoc = () => {
      this.setState({ registerAddDocument: undefined });
    };

    render() {
      const {
        data,
        columns,
        isLoading,
        isDesktop,
        isLoadingNewData,
        dataCount,
        registerOnDetails,
        registerAddDocument,
        documentId,
        searchText,
        isSearching,
        noVisualize,
      } = this.state;
      return (
        <Component
          data={data}
          columns={columns}
          isLoading={isLoading}
          isDesktop={isDesktop}
          isLoadingNewData={isLoadingNewData}
          dataCount={dataCount}
          registerOnDetails={registerOnDetails}
          registerAddDocument={registerAddDocument}
          documentId={documentId}
          searchText={searchText}
          isSearching={isSearching}
          noVisualize={noVisualize}
          closeRegisterOnDetails={this.closeRegisterOnDetails}
          loadData={this.loadData}
          handleaddDocument={this.handleaddDocument}
          handleOnDetail={this.handleOnDetail}
          onTableChange={this.onTableChange}
          handleLicence={this.handleLicence}
          closeRegisterAddDoc={this.closeRegisterAddDoc}
        />
      );
    }
  });

const mapStateToProps = ({ User, Persons, Registers }) => {
  return {
    currentUser: User.currentUser,
    successPerson: Persons.successPerson,
    person: Persons.person,
    registers: Registers.registers,
    successRegisters: Registers.successRegisters,
  };
};

const mapDispatchToProps = {
  requestPersonById: requestPersonById,
  requestRegisters: requestRegisters,
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withTranslation(),
  withRegisters
);
