import React, { Component } from "react";
import Button from "@mui/material/Button";
import green from "@mui/material/colors/green";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import ApiHandler from "../../../../services/ApiHandler";
import { isValueEmptyOrNull } from "../../../../utils/HelperFunctions";
import { withTranslation } from "react-i18next";
import { withStyles } from "@mui/styles";
;
import NavBarEasyAccess from "../../utils/NavBarEasyAccess";
import { connect } from "react-redux";
import { createPersonsGroup } from "../../../../actions/EasyAccess/Person_actions";
import Transfer from "../../../Shared/TransferList/Transfer";
import styles from "../../../../assets/styles/User_styles/UserGroup_styles/newUserGroupStyles";

const initValuesGroup = {
  id: 0,
  name: "",
  persons: [],
  personsDetails: {},
  products: [],
};

const mapDispatchToProps = { createPersonsGroup };

const mapStateToProps = ({ Persons, Settings }) => {
  return {
    successCreateGroup: Persons.successCreateGroup,
    loadingCreateGroup: Persons.loadingCreateGroup,
  };
};

class NewPersonGroup extends Component {
  constructor(props) {
    super(props);
    const { elementOnEdit, isEdit } = props;
    console.log("elementOnEdit: ", elementOnEdit);
    this.state = {
      newGroup: {
        id: elementOnEdit ? elementOnEdit.id : 0,
        name: elementOnEdit ? elementOnEdit.name : "",
        persons: elementOnEdit ? elementOnEdit.personIDs : [],
        personsDetails: elementOnEdit ? elementOnEdit.personDetails : {},
        products: [],
      },
      formErrors: {},
    };
  }
  componentDidMount() {
    NavBarEasyAccess.hideLoader();
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.successCreateGroup !== prevState.successCreateGroup) {
      return {
        successCreateGroup: nextProps.successCreateGroup,
      };
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.successCreateGroup &&
      this.state.successCreateGroup !== prevState.successCreateGroup
    ) {
      this.setState({ isSuccess: true, newGroup: initValuesGroup });
      setTimeout(() => {
        this.setState({
          isSuccess: false,
        });
        this.props.handleElementCreated();
      }, 1000);
    }
  }

  validateObject = (elements, permits, isADGroup) => {
    if (isADGroup)
      return {
        permits: Object.keys(permits).length === 0,
        elements: elements.length === 0,
      };
    else
      return {
        permits: Object.keys(permits).length === 0,
        elements: elements.length === 0,
        name: isValueEmptyOrNull(this.state.newGroup.name),
      };
  };

  onPersonsConfirm = (persons, personsDetails) => {
    this.setState((prevState) => ({
      newGroup: {
        ...prevState.newGroup,
        persons,
        personsDetails,
      },
    }));
  };

  createGroup = () => {
    const { newGroup } = this.state;
    const errors = isValueEmptyOrNull(this.state.newGroup.name);

    this.setState({ formErrors: { name: errors } });
    if (!errors) {
      this.props.createPersonsGroup({
        name: newGroup.name,
        personIDs: newGroup.persons,
        id: newGroup.id,
      });
    }
  };

  handleChange = (name) => (event) => {
    let value = event.currentTarget ? event.currentTarget.value : event.value;
    this.setState(({ newGroup }) => ({
      newGroup: {
        ...newGroup,
        [name]: value,
      },
    }));
  };

  render() {
    const { classes, isEdit, open, t } = this.props;
    return (
      <Grid
        container
        style={{
          width: "100%",
          marginTop: "30px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Grid item xs={12} md={8}>
          <div
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TextField
              required
              style={{ width: "80%" }}
              label={t("WriteGroupName")}
              value={this.state.newGroup.name}
              fullWidth
              onChange={this.handleChange("name")}
              helperText={t("inputEmpty")}
              FormHelperTextProps={{
                style: {
                  opacity: this.state.formErrors.name ? 1 : 0,
                },
              }}
              error={this.state.formErrors.name}
            />
          </div>
          <Transfer
            loadData={ApiHandler.EasyAccess.Persons.getPersons}
            handleUserConfirm={this.onPersonsConfirm}
            order={"name asc"}
            idAttribute={"id"}
            isServerSide={true}
            firstTitle={t("AllSystemPerson")}
            secondTitle={t("PersonsAddedToGroup")}
            addedElements={this.state.newGroup.persons}
            addedElementsDetails={this.state.newGroup.personsDetails}
            attribute="name"
            secondAttribute="lastname"
            limit={10}
            {...this.props}
          />
          <div className={classes.submitNext}>
            <Button
              variant="contained"
              color="primary"
              disabled={this.state.isCreating}
              onClick={() => this.createGroup()}
              fullWidth
              style={{
                background: this.state.isSuccess ? green[500] : undefined,
              }}
            >
              {this.state.isSuccess
                ? this.props.isEdit
                  ? `${t("successEdit")}`
                  : `${t("successCreate")}`
                : this.props.isEdit
                ? `${t("Edit")}`
                : `${t("Create")}`}
            </Button>
          </div>
        </Grid>
      </Grid>
    );
  }
}

const NewPersonGroupConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(NewPersonGroup);
export default withTranslation()(
  withStyles(styles, { withTheme: true })(NewPersonGroupConnected)
);
