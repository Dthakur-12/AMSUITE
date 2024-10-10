import React from "react";
import PropTypes from "prop-types";
import FilterTableActions from "../../../Shared/Filters/FilterTableActions";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import { withStyles } from '@mui/styles';
import { withTranslation } from "react-i18next";
import { Typography } from "@mui/material";
import Chip from "@mui/material/Chip";
import { Divider } from "semantic-ui-react";
import { requestPersons } from "../../../../actions/EasyAccess/Person_actions";
import { requestEnterprises } from "../../../../actions/EasyAccess/Enterprise_actions";
import { connect } from "react-redux";
import AppBar from "@mui/material/AppBar";
import { Tabs, Tab } from "@mui/material";
import DataTableSelectAction from "../../../Shared/DataTable/DataTableSelectAction";

class TableFiltersMobileView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 0,
    };
  }

  handleChange = (event, value) => {
    this.setState({ selectedTab: value });
    this.props.handleTabSelect(value);
  };

  render() {
    const {
      selectedPersons,
      selectedPersonsObject,
      selectedEnterprises,
      selectedEnterprisesObject,
      handleEnterpriseSelect,
      handlePersonSelect,
      t,
      handleDeletePerson,
      handleDeleteEnterprise,
      theme,
      classes,
      persons,
      enterprises,
      handleTabSelect,
      selectedTab,
      isDesktop,
    } = this.props;

    return (
      <div
        className={classes.viewContainer}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <AppBar position="static" color="default">
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
          >
            <Tab value={0} label={t("Persons")} className={classes.tabRoot} />
            <Tab value={1} label={t("Companies")} className={classes.tabRoot} />
          </Tabs>
        </AppBar>
        {selectedTab === 0 && (
          <DataTableSelectAction
            handleConfirm={handlePersonSelect}
            loadDataAction={this.props.requestPersons}
            elements={selectedPersons}
            primaryTitle={t("Persons")}
            title={t("Persons")}
            DataTableColumns={[
              {
                name: t("name"),
                field: "name",
                options: {
                  sort: true,
                  filter: true,
                  sortDirection: "asc",
                  customBodyRender: (data) => {
                    if (data.name)
                      return (
                        <Typography value={data.name}>{data.name}</Typography>
                      );
                  },
                },
              },
              {
                name: t("lastname"),
                field: "lastname",
                options: {
                  sort: true,
                  filter: true,
                  sortDirection: "asc",
                  customBodyRender: (data) => {
                    if (data.name)
                      return (
                        <Typography value={data.name}>{data.name}</Typography>
                      );
                  },
                },
              },
            ]}
            multipleSelect={true}
            attribute={"name"}
            info={this.props.persons}
          />
        )}
        {selectedTab === 1 && (
          <DataTableSelectAction
            handleConfirm={handleEnterpriseSelect}
            loadDataAction={this.props.requestEnterprises}
            elements={selectedEnterprises}
            primaryTitle={t("Companies")}
            title={t("Companies")}
            DataTableColumns={[
              {
                name: t("name"),
                field: "name",
                options: {
                  sort: true,
                  filter: true,
                  sortDirection: "asc",
                  customBodyRender: (data) => {
                    if (data.name)
                      return (
                        <Typography value={data.name}>{data.name}</Typography>
                      );
                  },
                },
              },
            ]}
            multipleSelect={true}
            attribute={"name"}
            info={this.props.enterprises}
          />
        )}
      </div>
    );
  }
}

TableFiltersMobileView.propTypes = {};

const styles = (theme) => ({
  chip: {
    "& svg": {
      margin: 0,
    },
    "& span": {
      paddingRight: 4,
    },
    height: 20,
    margin: 5,
  },
  selectedElementsContainer: {
    maxHeight: 300,
    width: "100%",
    padding: 10,
  },
  elementsContainer: {
    width: 240,
    background: theme.palette.backgroundSecondary.main,
    [theme.breakpoints.down('lg')]: {
      width: "100%",
    },
  },
  viewContainer: { display: "flex", flexDirection: "column", width: "100%" },
});

const mapStateToProps = ({ Persons, Enterprise }) => ({
  enterprises: Enterprise.enterprises,
  persons: Persons.persons,
});

const mapDispatchToProps = {
  requestPersons: requestPersons,
  requestEnterprises: requestEnterprises,
};

const TableFiltersMobileViewConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(TableFiltersMobileView);

export default withTranslation()(
  withStyles(styles, { withTheme: true })(TableFiltersMobileViewConnected)
);
