import { withStyles } from '@mui/styles';
import PropTypes from "prop-types";
import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";
import { debounce } from "throttle-debounce";
import ApiHandler from "../../../../services/ApiHandler";
import CustomList from "../../../Users/Components/list";
import NewPersonGroup from "./NewPersonGroup";
import styles from "../../../../assets/styles/User_styles/UserGroup_styles/userGroupStyles";
import { Dialog } from "@mui/material";
import NavBarEasyAccess from "../../utils/NavBarEasyAccess";

const mapStateToProps = ({ User }) => {
  return {
    // currentUser: User.currentUser
  };
};

const initValues = { name: "" };

class PersonGroups extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      openFormDialog: false,
      userGroupOnEdit: undefined,
      newUserGroup: initValues,
      openDeleteDialog: false,
      searchText: "",
    };
    this.changeSearchDebounce = debounce(500, (value) =>
      this.changeSearch(value)
    );
  }

  componentDidMount() {
    NavBarEasyAccess.hideLoader();
  }

  handleOnDelete = (item) => {
    this.setState({
      openDeleteDialog: true,
      newElement: item,
    });
  };

  processData = (element) => {
    console.log("element: ", element);
    // Para cambiar esto a acciones primero se tiene que modificar el componente list
    const dictionary = {};
    const { personDetails = [] } = element.personDetails;
    element.personDetails.map((p) => {
      dictionary[p.id] = `${p.name || ""} ${p.lastname || ""}`;
    });
    const groupData = {
      ...element,
      personDetails: dictionary,
    };
    return groupData;
  };

  renderComponent = (
    open,
    handleClose,
    handleElementCreated,
    elementOnEdit
  ) => {
    return (
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth={true}
        maxWidth={"md"}
      >
        <NewPersonGroup
          handleElementCreated={handleElementCreated}
          elementOnEdit={elementOnEdit ? elementOnEdit : undefined}
          isEdit={elementOnEdit !== undefined}
          initValues={elementOnEdit}
          key={elementOnEdit}
        />
      </Dialog>
    );
  };

  render() {
    const { t } = this.props;

    return (
      <div>
        <CustomList
          type={1}
          loadData={ApiHandler.EasyAccess.Persons.getPersonGroups}
          renderComponent={this.renderComponent}
          attribute={"name"}
          primaryTitle={t("PersonsGroups")}
          actionTitle={t("NewPersonGroup")}
          deleteFunction={ApiHandler.EasyAccess.Persons.deletePersonGroup}
          getElementDetails={ApiHandler.EasyAccess.Persons.getPersonGroupById}
          processExtraData={this.processData}
        />
      </div>
    );
  }
}
PersonGroups.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

const PersonGroupsConnected = connect(mapStateToProps, null)(PersonGroups);

export default withTranslation()(
  withStyles(styles, { withTheme: true })(PersonGroupsConnected)
);
