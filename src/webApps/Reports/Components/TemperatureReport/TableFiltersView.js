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
import { connect } from "react-redux";
import { requestEnterprises } from "../../../../actions/EasyAccess/Enterprise_actions";

class TableFiltersView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.persons !== nextProps.persons) {
      return { persons: nextProps.persons };
    }
  }

  peopleCompleteName = () => {
    let people = [];
    this.props.persons.data.map((e) =>
      people.push({ ...e, completeName: e.name + " " + e.lastname })
    );
    return people;
  };

  componentDidMount() {
    this.updateScreenMode();
    window.addEventListener("resize", this.updateScreenMode);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateScreenMode);
  }

  updateScreenMode = () => {
    this.setState({
      isDesktop: window.innerWidth > 900,
    });
  };

  render() {
    const {
      selectedPerson,
      handlePersonSelect,
      t,
      theme,
      classes,
      persons,
      selectedEnterprises,
      selectedEnterprisesObject,
      handleEnterpriseSelect,
      handleDeleteEnterprise,
      enterprises,
      selectedPersonsObject,
      tableEnterprise,
    } = this.props;

    if (!this.state.isDesktop) {
      return (
        <div style={{ marginBottom: 20, width: "90%" }}>
          <div>
            <FilterTableActions
              isDesktop={this.state.isDesktop}
              //  items={
              //   tableEnterprise && enterprises
              //     ? enterprises.data
              //     : persons
              //    ? this.peopleCompleteName()
              //    : []
              //  }
              items={
                tableEnterprise && enterprises
                  ? enterprises.data
                  : persons
                  ? persons.data
                  : []
              }
              itemsCount={
                tableEnterprise && enterprises
                  ? enterprises.dataCount
                  : persons
                  ? persons.dataCount
                  : 0
              }
              selectedItems={
                tableEnterprise ? selectedEnterprises : selectedPerson
              }
              showProp={"name"}
              showProp2={tableEnterprise ? undefined : "lastname"}
              loadDataAction={
                tableEnterprise
                  ? this.props.requestEnterprises
                  : this.props.requestPersons
              }
              store="Registers"
              dataName="registers"
              //   isLoadingData={isLoadingEntities}
              onSelect={
                tableEnterprise ? handleEnterpriseSelect : handlePersonSelect
              }
              title={tableEnterprise ? t("Enterprise") : t("Persons")}
              open={true}
              onButtonClick={() => console.log("Button click")}
              notFixed={true}
              tabs={[
                {
                  value: 0,
                  label: tableEnterprise ? t("Enterprise") : t("Persons"),
                },
              ]}
              // onTabSelect={value => this.props.handleTabSelect(value)}
              selectedTab={0}
              key={0}
            />
          </div>
          <Divider style={{ height: 10, width: "100%" }} />
          <div style={{ width: "100%" }}>
            <Typography
              variant="h6"
              style={{ textAlign: "center", marginTop: 15 }}
            >
              {tableEnterprise
                ? t("SelectedEnterprises")
                : t("SelectedPersonInfected")}
            </Typography>

            <div style={{ width: "100%" }}>
              {!tableEnterprise &&
                selectedPerson &&
                selectedPerson.length === 1 && (
                  <Chip
                    key={selectedPerson[0].id}
                    label={
                      selectedPerson[0].name + " " + selectedPerson[0].lastname
                    }
                    // onDelete={() => handleDeletePerson(person.id)}
                    className={classes.chip}
                  />
                )}
              {tableEnterprise &&
                selectedEnterprisesObject.map((enterprise) => (
                  <Chip
                    key={enterprise.id}
                    label={enterprise.name}
                    onDelete={() => handleDeleteEnterprise(enterprise.id)}
                    className={classes.chip}
                  />
                ))}
            </div>
          </div>
        </div>
      );
    }

    return (
      <div style={{ display: "flex" }}>
        <div
          style={{ width: "400px", display: "flex", justifyContent: "center" }}
        >
          <FilterTableActions
            //  items={
            //   tableEnterprise && enterprises
            //     ? enterprises.data
            //     : persons
            //    ? this.peopleCompleteName()
            //    : []
            //  }
            items={
              tableEnterprise && enterprises
                ? enterprises.data
                : persons
                ? persons.data
                : []
            }
            itemsCount={
              tableEnterprise && enterprises
                ? enterprises.dataCount
                : persons
                ? persons.dataCount
                : 0
            }
            selectedItems={
              tableEnterprise ? selectedEnterprises : selectedPerson
            }
            showProp={"name"}
            showProp2={tableEnterprise ? undefined : "lastname"}
            loadDataAction={
              tableEnterprise
                ? this.props.requestEnterprises
                : this.props.requestPersons
            }
            store="Registers"
            dataName="registers"
            //   isLoadingData={isLoadingEntities}
            onSelect={
              tableEnterprise ? handleEnterpriseSelect : handlePersonSelect
            }
            title={tableEnterprise ? t("Enterprise") : t("Persons")}
            open={true}
            onButtonClick={() => console.log("Button click")}
            notFixed={true}
            tabs={[
              {
                value: 0,
                label: tableEnterprise ? t("Enterprise") : t("Persons"),
              },
            ]}
            // onTabSelect={value => this.props.handleTabSelect(value)}
            selectedTab={0}
            key={0}
          />
        </div>
        <div
          style={{
            width: 460,
            paddingLeft: "6%",
            background: theme.palette.backgroundSecondary.main,
          }}
        >
          <Divider vertical />
          <div style={{ maxHeight: 300, width: "100%", padding: 10 }}>
            <Typography
              variant="h6"
              style={{ textAlign: "center", marginTop: 15 }}
            >
              {tableEnterprise
                ? t("SelectedEnterprises")
                : t("SelectedPersonInfected")}
            </Typography>

            <div style={{ width: "100%" }}>
              {!tableEnterprise &&
                selectedPerson &&
                selectedPerson.length === 1 && (
                  <Chip
                    key={selectedPerson[0].id}
                    label={
                      selectedPerson[0].name + " " + selectedPerson[0].lastname
                    }
                    // onDelete={() => handleDeletePerson(person.id)}
                    className={classes.chip}
                  />
                )}
              {tableEnterprise &&
                selectedEnterprisesObject.map((enterprise) => (
                  <Chip
                    key={enterprise.id}
                    label={enterprise.name}
                    onDelete={() => handleDeleteEnterprise(enterprise.id)}
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
