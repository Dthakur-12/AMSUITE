import React, { Component } from "react";
import PropTypes from "prop-types";
import { withTranslation } from "react-i18next";
import { withStyles } from "@mui/styles";
import styles from "../../../../assets/styles/User_styles/UserGroup_styles/newUserGroupStyles";
import CustomTable from "../../../Shared/DataTable/CustomTable";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import PersonGroupAdministrationField from "./PersonGroupAdministrationField";
import { requestGetPersonGroups } from "../../../../actions/EasyAccess/Person_actions";
import { selectedPersonGroupChange } from "../../../../actions/Settings/settings_actions";
import { connect } from "react-redux";

class PersonGroupSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { classes, t, selectedPersonGroup = {} } = this.props;
    return (
      <main className={classes.layout}>
        <div className={classes.fill}>
          <Grid container>
            <Grid item xs={3}>
              <Paper elevation={2} className={classes.paper}>
                <CustomTable
                  title={t("PersonsGroups")}
                  showProp={"name"}
                  storeName="Persons"
                  storeAttr="personGroups"
                  requestData={this.props.requestGetPersonGroups}
                  handleSelectItem={this.props.selectedPersonGroupChange}
                  selectedItem={selectedPersonGroup}
                />
              </Paper>
            </Grid>
            <Grid item xs={12} md={9} style={{ padding: "0 20px" }}>
              <PersonGroupAdministrationField />
            </Grid>
          </Grid>
        </div>
      </main>
    );
  }
}

const mapStateToProps = ({ Settings }) => ({
  selectedPersonGroup: Settings.selectedPersonGroup,
});

const mapDispatchToProps = {
  requestGetPersonGroups,
  selectedPersonGroupChange,
};

const ConnectedPersonGroupSettings = connect(
  mapStateToProps,
  mapDispatchToProps
)(PersonGroupSettings);

export default withTranslation()(
  withStyles(styles, { withTheme: true })(ConnectedPersonGroupSettings)
);
