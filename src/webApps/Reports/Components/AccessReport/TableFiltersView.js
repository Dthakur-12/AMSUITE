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

class TableFiltersView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

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
      <div style={{ display: "flex" }}>
        <div
          style={{ width: "400px", display: "flex", justifyContent: "center" }}
        >
          <FilterTableActions
            items={
              selectedTab === 0 && persons
                ? persons.data
                : selectedTab === 1 && enterprises
                ? enterprises.data
                : []
            }
            itemsCount={
              selectedTab === 0 && persons
                ? persons.dataCount
                : selectedTab === 1 && enterprises
                ? enterprises.dataCount
                : 0
            }
            selectedItems={
              selectedTab === 0 ? selectedPersons : selectedEnterprises
            }
            showProp="name"
            showProp2="lastname"
            loadDataAction={
              selectedTab === 0
                ? this.props.requestPersons
                : this.props.requestEnterprises
            }
            store="Registers"
            dataName="registers"
            //   isLoadingData={isLoadingEntities}
            onSelect={
              selectedTab === 0 ? handlePersonSelect : handleEnterpriseSelect
            }
            title={t("Persons")}
            open={true}
            onButtonClick={() => console.log("Button click")}
            notFixed={true}
            tabs={[
              { value: 0, label: "Persons" },
              { value: 1, label: "Companies" },
            ]}
            onTabSelect={(value) => this.props.handleTabSelect(value)}
            selectedTab={selectedTab}
            key={selectedTab}
          />
        </div>
        <div className={classes.elementsContainer}>
          {isDesktop ? <Divider vertical /> : <Divider horizontal />}
          <Divider vertical />
          <div className={classes.selectedElementsContainer}>
            <Typography
              variant="h6"
              style={{ textAlign: "center", marginTop: 15 }}
            >
              {selectedTab === 0
                ? t("SelectedPersons")
                : t("SelectedEnterprises")}
            </Typography>

            <div style={{ width: "100%" }}>
              {selectedTab === 0 &&
                selectedPersonsObject.map((person) => (
                  <Chip
                    key={person.id}
                    label={person.name}
                    onDelete={() => handleDeletePerson(person.id)}
                    className={classes.chip}
                  />
                ))}
              {selectedTab === 1 &&
                selectedEnterprisesObject.map((person) => (
                  <Chip
                    key={person.id}
                    label={person.name}
                    onDelete={() => handleDeleteEnterprise(person.id)}
                    className={classes.chip}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

TableFiltersView.propTypes = {};

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
});

const mapStateToProps = ({ Persons, Enterprise }) => ({
  enterprises: Enterprise.enterprises,
  persons: Persons.persons,
});

const mapDispatchToProps = {
  requestPersons: requestPersons,
  requestEnterprises: requestEnterprises,
};

const TableFiltersViewConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(TableFiltersView);

export default withTranslation()(
  withStyles(styles, { withTheme: true })(TableFiltersViewConnected)
);
