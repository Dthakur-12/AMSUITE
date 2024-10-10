import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from '@mui/styles';
import NavBarReports from "../../utils/NavBarReports";
import Table from "./ActivityTable";
import Chip from "@mui/material/Chip";
import PlusIcon from "@mui/icons-material/AddRounded";
import Fab from "@mui/material/Fab";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import { List, Grid } from "@mui/material";
import DataTableDialogAction from "../../../Shared/DataTable/DataTableDialogAction";
import { isNullOrUndefined } from "util";
import { requestUsers } from "../../../../actions/Users/user_actions";
import { connect } from "react-redux";
import FilterButton from "../Shared/FilterButton";
import {
  getDefaultInputRanges,
  getDefaultStaticRanges,
} from "../Shared/DateRangePickerInputsGenerator";
import { endOfDay, startOfDay } from "date-fns";
import { DateRangePicker, DateRange } from "react-date-range";
import { withTranslation } from "react-i18next";
import { Tab } from "semantic-ui-react";
import ActAndEntFilterView from "./ActAndEntFilterView";
import ActAndEntFilterMobileView from "./ActAndEntFilterMobileView";
import { camelize2 } from "../../../../utils/HelperFunctions";
import { Entities, ActivitiesWithLogin } from "../../../../utils/Enums";
import "../Shared/style.css";

const dateNow = new Date();

class ActivityReport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDesktop: true,
      open: false,
      userList: [],
      entitiesList: [],
      activitiesList: [],
      selectedEntities: [],
      selectedActivities: [],
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
    };
  }
  handleDelete = (id) => {
    const newUserList = this.state.userList.slice();
    const index = newUserList.findIndex((user) => user.id === id);
    if (index !== -1) newUserList.splice(index, 1);
    this.setState({ userList: newUserList });
  };

  handleDeleteEntity = (id) => {
    const newEntitiesList = this.state.selectedEntities.slice();
    const index = newEntitiesList.indexOf(id);
    if (index !== -1) newEntitiesList.splice(index, 1);
    this.setState({ selectedEntities: newEntitiesList });
  };

  componentDidMount() {
    const { t } = this.props;
    NavBarReports.hideLoader();
    this.translateEntitiesAndActivities(t);
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
    if (nextProps.i18n.language !== prevState.language) {
      return {
        language: nextProps.i18n.language,
      };
    } else return null;
  }

  componentDidUpdate(prevProps, prevState) {
    const { t } = this.props;
    if (prevState.language !== this.state.language) {
      this.translateEntitiesAndActivities(t);
    }
    if (
      prevState.selectedActivities.length !=
        this.state.selectedActivities.length ||
      prevState.selectedEntities.length != this.state.selectedEntities.length
    ) {
    }
  }

  translateEntitiesAndActivities = (t) => {
    const entitiesList = [];
    const activitiesList = [];

    Object.keys(Entities).map((key) => {
      entitiesList.push({
        id: Entities[key],
        name: t(camelize2(key.toLocaleLowerCase())),
      });
    });

    Object.keys(ActivitiesWithLogin).map((key) => {
      activitiesList.push({
        id: ActivitiesWithLogin[key],
        name: t(camelize2(key.toLocaleLowerCase())),
      });
    });

    this.setState({
      activitiesList,
      entitiesList,
      entitiesListConst: entitiesList,
    });
  };

  handleOpenUsers = (value) => {
    this.setState({ open: value });
  };

  handleUserSelected = (userList) => {
    this.setState({ userList, open: false });
  };

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

  //FUNCIONES PARA ActAndEntFilterView
  handleActivitySelected = (id) => {
    const index = this.state.selectedActivities.indexOf(id);
    const newSelectedActivities = this.state.selectedActivities.slice();
    if (index === -1) newSelectedActivities.splice(0, 0, id);
    else newSelectedActivities.splice(index, 1);
    this.setState({
      selectedActivities: newSelectedActivities,
    });
  };

  handleSelect = (id) => {
    const index = this.state.selectedEntities.indexOf(id);
    const newSelectedEntities = this.state.selectedEntities.slice();
    if (index === -1) newSelectedEntities.splice(0, 0, id);
    else newSelectedEntities.splice(index, 1);
    this.setState({
      selectedEntities: newSelectedEntities,
    });
  };

  handleSelectEntities = (selectedEntities) => {
    let selectedEntitiesIds = [];
    selectedEntities.map((entity) => {
      return selectedEntitiesIds.push(entity.id);
    });
    this.setState((prevState) => ({
      selectedEntities: selectedEntitiesIds,
      selectedEntitiesObject: selectedEntities,
    }));
  };

  handleSearch = (event) => {
    let value = event.currentTarget ? event.currentTarget.value : event.value;
    const { entitiesListConst } = this.state;
    let data = entitiesListConst ? entitiesListConst.slice() : [];
    this.setState((state) => ({
      ...state,
      entitiesList: data.filter((element) =>
        element.name.toLowerCase().includes(value.toLowerCase())
      ),
      offset: 0,
    }));
  };

  allElementsClientSideQueryChange = (query) => {
    const { allElementsConst } = this.state;
    const { attribute } = this.props;
    let data = allElementsConst ? allElementsConst.slice() : [];
    let value = query.currentTarget.value;
    this.setState((state) => ({
      ...state,
      allElements: data.filter((element) =>
        element[attribute].toLowerCase().includes(value.toLowerCase())
      ),
      offset: 0,
    }));
  };

  handlePageChange = (offset, e) => {
    this.setState({
      offset,
    });
  };

  requestEntitiesClientSide = (dataTable) => {
    const { entitiesListConst } = this.state;
    let data = entitiesListConst ? entitiesListConst.slice() : [];
    let filterData = data.filter((element) =>
      element.name.toLowerCase().includes(dataTable.search.toLowerCase())
    );
    this.setState({
      entitiesList: filterData.slice(
        dataTable.start,
        dataTable.start + dataTable.length
      ),
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
      {
        menuItem: t("ActivityAndEntity"),
        render: () => (
          <Tab.Pane className={classes.pane} attached={false}>
            {isDesktop === true ? (
              <ActAndEntFilterView
                entities={this.state.entitiesList}
                activities={this.state.activitiesList}
                selectedEntities={this.state.selectedEntities}
                selectedActivities={this.state.selectedActivities}
                isLoadingEntities={this.state.isLoadingEntities}
                page={this.state.offset}
                handleDeleteEntity={this.handleDeleteEntity}
                handleSearch={this.handleSearch}
                handleSelect={this.handleSelect}
                handleActivitySelected={this.handleActivitySelected}
                handlePageChange={this.handlePageChange}
              />
            ) : (
              <ActAndEntFilterMobileView
                entities={{
                  data: this.state.entitiesList,
                  dataCount: this.state.entitiesListConst.length,
                }}
                activities={this.state.activitiesList}
                selectedEntities={this.state.selectedEntitiesObject}
                selectedActivities={this.state.selectedActivities}
                isLoadingEntities={this.state.isLoadingEntities}
                page={this.state.offset}
                handleDeleteEntity={this.handleDeleteEntity}
                handleSearch={this.handleSearch}
                handleSelect={this.handleSelectEntities}
                handleActivitySelected={this.handleActivitySelected}
                handlePageChange={this.handlePageChange}
                requestEntitiesClientSide={this.requestEntitiesClientSide}
              />
            )}
          </Tab.Pane>
        ),
      },
    ];
  };

  render() {
    const { classes, t } = this.props;
    const { open = false, users, panes = [] } = this.state;
    return (
      <Grid container className={classes.activityReportContainer}>
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
        <div style={{ width: "100%" }}>
          <List>
            <ListItem style={{ padding: 0 }}>
              <Fab
                size="small"
                className={classes.fab}
                onClick={() => this.handleOpenUsers(true)}
              >
                <PlusIcon className={classes.fabIcon} />
              </Fab>
              <ListItemText
                primary={t("Users")}
                secondaryTypographyProps={{
                  style: { fontSize: "1rem" },
                }}
                // secondary={newPerson.employee ? newPerson.employee.lastname : ""}
              />
            </ListItem>
          </List>
        </div>
        <div style={{ marginBottom: 10 }}>
          {this.state.userList.map((data) => {
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

        <Table
          key={this.state.userList.length || this.state.isDesktop}
          userList={this.state.userList.map((user) => user.id)}
          startDate={this.state.filterRange.startDate}
          endDate={this.state.filterRange.endDate}
          entities={this.state.selectedEntities}
          activities={this.state.selectedActivities}
          isDesktop={this.state.isDesktop}
        />
        <DataTableDialogAction
          open={open}
          onConfirm={this.handleUserSelected}
          onClose={() => this.handleOpenUsers(false)}
          mdSubtitle={4}
          info={this.props.users}
          success={this.props.successEmployees}
          loading={this.props.loadingEmp}
          title={"Usuarios"}
          subTitle={"Seleccione el usuario"}
          loadDataAction={this.props.requestUsers}
          // extraData={this.state.dateRangePicker.selection.startDate.toJSON(),
          //   this.state.dateRangePicker.selection.endDate.toJSON()}
          rowsSelected={!isNullOrUndefined(users) ? users : []}
          multipleSelect={true}
          columns={[
            {
              name: "UserName",
              field: "userName",
              options: {
                filter: true,
                sort: true,
                sortDirection: "asc",
              },
            },
            {
              name: "Nombre",
              field: "name",
              options: {
                filter: true,
                sort: true,
                customBodyRender: (date) => {
                  return `${date.name} ${date.lastname}`;
                },
              },
            },
          ]}
        />
      </Grid>
    );
  }
}

const styles = (theme) => ({
  root: {
    display: "flex",
  },
  bottomActions: {
    position: "fixed",
    bottom: 10,
    right: 0,
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
    height: 320,
    marginTop: "1%",
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

  //Mobile styles
  activityReportContainer: {
    [theme.breakpoints.down('md')]: {
      marginTop: 0,
    },
  },
});

ActivityReport.propTypes = {
  classes: PropTypes.object.isRequired,
};
const mapStateToProps = (Store) => {
  const { User } = Store;
  return {
    users: User.users,
  };
};
const mapDispatchToProps = {
  requestUsers: requestUsers,
};
const ActivityReportConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(ActivityReport);
export default withTranslation()(
  withStyles(styles, {})(ActivityReportConnected)
);
