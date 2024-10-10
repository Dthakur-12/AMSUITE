import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";

import { isNullOrUndefined } from "util";
import NavBarAludoc from "../../webApps/Aludoc/utils/NavBarAludoc";
import ListItem from "@mui/material/ListItem";
import { ListItemIcon } from "@mui/material";
import Zoom from "@mui/material/Zoom";
import Tooltip from "@mui/material/Tooltip";

import FileIcon from "@mui/icons-material/Description";
import { withTranslation } from "react-i18next";
import { debounce } from "throttle-debounce";
import {
  requestEnterprises,
  requestEnterprisesById,
} from "../../actions/EasyAccess/Enterprise_actions";

let page = 0;
let rowsPerPage = 10;
let activeColumnSort = 0;
let order = "asc";

const withEnterprises = (Component) =>
  (class extends React.Component {
    constructor(props) {
      super(props);
      const { t } = props;
      this.state = {
        isLoading: true,
        isLoadingNewData: false,
        isSearching: false,
        openDialogEditEnterprise: true,
        indexsToDelete: undefined,
        openDialogDeleteConfirm: false,
        enterpriseAddDocument: undefined,
        columns: this.translateColumns(t, true),
      };

      this.changeSearchDebounce = debounce(300, (value) =>
        this.changeSearch(value)
      );
    }

    static getDerivedStateFromProps(nextProps, prevState) {
      if (
        nextProps.i18n.language !== prevState.language ||
        nextProps.enterprises !== prevState.enterprises ||
        nextProps.successEnterprise !== prevState.successEnterprise ||
        nextProps.successEnterpriseByID !== prevState.successEnterpriseByID
      ) {
        return {
          language: nextProps.i18n.language,
          enterprises: nextProps.enterprises,
          successEnterprise: nextProps.successEnterprise,
          successEnterpriseByID: nextProps.successEnterpriseByID,
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
      if (
        this.state.successEnterprise &&
        this.state.successEnterprise !== prevState.successEnterprise
      ) {
        this.setState({
          data: this.state.enterprises.data,
          dataCount: this.state.enterprises.dataCount,
          isLoadingNewData: false,
          isSearching: this.state.searchText !== prevState.searchText,
          isLoading: false,
        });
        if (this.state.searchText !== prevState.searchText)
          this.loadData(false, false, page, rowsPerPage);
      }
      if (
        this.state.successEnterpriseByID &&
        this.state.successEnterpriseByID !== prevState.successEnterpriseByID
      ) {
        this.setState({
          enterpriseOnEdit: this.props.enterpriseById,
        });
      }
    }
    translateColumns = (t, initial) => {
      const isDesktop = window.innerWidth > 900;

      let colStorage = JSON.parse(
        localStorage.getItem("enterprisesColumnsAludoc")
      );

      let columDisplay = {};
      if (initial && !isNullOrUndefined(colStorage)) {
        !isNullOrUndefined(colStorage) &&
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
            sortDirection: activeColumnSort === 0 ? order : "none",
            display: isNullOrUndefined(columDisplay.name)
              ? true
              : columDisplay.name,
          },
        },
        {
          label: t("RUT"),
          name: "rut",
          options: {
            display: !isDesktop
              ? false
              : isNullOrUndefined(columDisplay.rut)
              ? true
              : columDisplay.rut,
            filter: true,
            sort: true,
            sortDirection: activeColumnSort === 1 ? order : "none",
          },
        },
        {
          label: t("address"),
          name: "address",
          options: {
            display: !isDesktop
              ? false
              : isNullOrUndefined(columDisplay.address)
              ? true
              : columDisplay.address,
            filter: true,
            sort: true,
            sortDirection: activeColumnSort === 2 ? order : "none",
          },
        },
        {
          label: t("Phone"),
          name: "phone",
          options: {
            display: !isDesktop
              ? false
              : isNullOrUndefined(columDisplay.phone)
              ? true
              : columDisplay.phone,
            filter: true,
            sort: true,
            sortDirection: activeColumnSort === 3 ? order : "none",
          },
        },
        {
          label: t("email"),
          name: "email",
          options: {
            filter: true,
            sort: true,
            sortDirection: activeColumnSort === 4 ? order : "none",
            display: isNullOrUndefined(columDisplay.email)
              ? true
              : columDisplay.email,
          },
        },
        {
          label: t("DocumentationStatus"),
          name: "documentationStatus",
          options: {
            filter: true,
            sort: true,
            sortDirection: activeColumnSort === 5 ? order : "none",
            display: isNullOrUndefined(columDisplay.documentationStatus)
              ? true
              : columDisplay.documentationStatus,
            customBodyRender: (data) => {
              const { classes } = this.props;
              if (data !== -1)
                return (
                  <ListItem>
                    <ListItemIcon>
                      <Tooltip
                        TransitionComponent={Zoom}
                        title={
                          data === 0
                            ? t("validDocumentation")
                            : t("InvalidDocumentation")
                        }
                      >
                        <FileIcon
                          style={data === 0 ? { color: "" } : { color: "red" }}
                        />
                      </Tooltip>
                    </ListItemIcon>
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
      NavBarAludoc.hideLoader();
      const { match } = this.props;
      this.updateScreenMode();
      const { columns } = this.state;
      this.props.requestEnterprises({
        start: page * rowsPerPage,
        length: rowsPerPage,
        order: columns[activeColumnSort].name + " " + order,
        search: "",
      });
      if (match) {
        if (match.params.id) {
          this.props.requestEnterprisesById(match.params.id);
        }
      }
    }

    loadData = (contentLoader, isSearch, page, rowsPerPage) => {
      const { columns, searchText } = this.state;
      page = !isNullOrUndefined(page) ? page : 0;
      rowsPerPage = rowsPerPage ? rowsPerPage : 10;
      if (contentLoader) this.setState({ isLoadingNewData: true });
      this.props.requestEnterprises({
        start: isSearch ? 0 : page * rowsPerPage,
        length: rowsPerPage,
        order: columns[activeColumnSort].name + " " + order,
        search: searchText ? searchText : "",
      });
    };

    changePage = (newPage) => {
      page = newPage;
      this.loadData(true, false, newPage, rowsPerPage);
    };

    changeRowsPerPage = (newRowsPerPage) => {
      if (newRowsPerPage !== rowsPerPage) {
        rowsPerPage = newRowsPerPage;
        this.loadData(true, false, 0, newRowsPerPage);
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
      this.loadData(true);
    };

    changeSearch = (value) => {
      this.setState({
        isSearching: true,
      });

      this.loadData(true, true);
    };

    onChangeSearch = (text) => {
      //  let value = event.currentTarget ? event.currentTarget.value : event.value;
      let value = text ? text : "";
      this.setState({
        searchText: value,
      });
      this.changeSearchDebounce(value);
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
        "enterprisesColumnsAludoc",
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

    handleOnDetails = (index) => {
      let enterprise = this.state.data[index];
      this.props.requestEnterprisesById(enterprise.id);
    };

    handleaddDocument = (index) => {
      let enterprise = this.state.data[index];
      this.setState({
        enterpriseAddDocument: enterprise,
      });
    };

    handleOnDelete = (indexs) => {
      const { data } = this.state;
      let enterpriseToDeleteDocument = [];
      indexs.map((i) => {
        return enterpriseToDeleteDocument.push(data[i].id);
      });
      this.setState({
        enterpriseToDeleteDocument: enterpriseToDeleteDocument,
        openDialogConfirmDelete: true,
      });
    };

    handleCloseEnterpriseAddDoc = () => {
      this.setState({ enterpriseAddDocument: undefined });
    };

    handleCloseEnterpriseOnEdit = () => {
      this.setState({ enterpriseOnEdit: undefined });
    };

    render() {
      const {
        data,
        columns,
        isLoading,
        isLoadingNewData,
        dataCount,
        isDesktop,
        enterpriseAddDocument,
        enterpriseOnEdit,
        isSearching,
        searchText,
        loadData,
      } = this.state;
      return (
        <Component
          page={page}
          rowsPerPage={rowsPerPage}
          isSearching={isSearching}
          data={data}
          columns={columns}
          isLoading={isLoading}
          isLoadingNewData={isLoadingNewData}
          dataCount={dataCount}
          isDesktop={isDesktop}
          enterpriseAddDocument={enterpriseAddDocument}
          enterpriseOnEdit={enterpriseOnEdit}
          searchText={searchText}
          loadData={this.loadData}
          onTableChange={this.onTableChange}
          handleOnDetails={this.handleOnDetails}
          handleaddDocument={this.handleaddDocument}
          handleCloseEnterpriseOnEdit={this.handleCloseEnterpriseOnEdit}
          handleCloseEnterpriseAddDoc={this.handleCloseEnterpriseAddDoc}
        />
      );
    }
  });

const mapStateToProps = ({ Enterprise }) => {
  return {
    enterprises: Enterprise.enterprises,
    enterpriseById: Enterprise.enterpriseById,
    successEnterprise: Enterprise.successEnterprise,
    successEnterpriseByID: Enterprise.successEnterpriseByID,
  };
};

const mapDispatchToProps = {
  requestEnterprises: requestEnterprises,
  requestEnterprisesById: requestEnterprisesById,
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withTranslation(),
  withEnterprises
);
