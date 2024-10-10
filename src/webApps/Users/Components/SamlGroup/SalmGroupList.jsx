import { withStyles } from '@mui/styles';
import PropTypes from "prop-types";
import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";
import { debounce } from "throttle-debounce";
import ApiHandler from "../../../../services/ApiHandler";
import CustomList from "../list";
import NewUserGroup from "./NewSamlGroup";
import styles from "../../../../assets/styles/User_styles/UserGroup_styles/userGroupStyles";
const mapStateToProps = ({ User }) => {
  return {
    currentUser: User.currentUser,
  };
};

const initValues = { name: "" };

class SalmGroupList extends Component {
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

  handleOnEdit = (item) => {
    this.props.getElement(item.id).then(({ data }) => {
      const elementData = {
        ...data,
        fullEnterpriseVisibility: data.fullEnterpriseVisibility ? "1" : "0",
        password: "",
      };
      this.setState({
        elementOnEdit: elementData,
        openFormDialog: true,
        newElement: elementData,
      });
    });
  };

  handleOnDelete = (item) => {
    this.setState({
      openDeleteDialog: true,
      newElement: item,
    });
  };

  processData = (data) => {
    const activities = [1, 2, 3, 4];
    let permits = {};
    activities.map((activity) => {
      permits = {
        ...permits,
        [activity]: Object.keys(data.permits).filter((k) =>
          data.permits[k].some((v) => parseInt(v) === activity)
        ),
      };
      return 0;
    });
    let usersDetail = {};
    data.users.map((usr) => {
      usersDetail = {
        ...usersDetail,
        [usr.id]: usr.name,
      };
      return 0;
    });
    const groupData = {
      ...data,
      permits: permits,
      users: data.users.map((usr) => usr.id),
      userDetails: usersDetail,
      password: "",
    };
    return groupData;
  };

  renderComponent = (
    open,
    handleClose,
    handleElementCreated,
    elementOnEdit,
    loadElements
  ) => {
    return (
      <NewUserGroup
        open={open}
        handleClose={handleClose}
        handleElementCreated={handleElementCreated}
        elementOnEdit={elementOnEdit ? elementOnEdit : undefined}
        isEdit={elementOnEdit !== undefined}
        initValues={elementOnEdit}
        key={elementOnEdit}
      />
    );
  };

  render() {
    const { t } = this.props;

    return (
      <div>
        <CustomList
          type={3}
          loadData={ApiHandler.AMSuite.User.GetAMSuiteGroups}
          renderComponent={this.renderComponent}
          attribute={"name"}
          secondAttribute={"name"}
          primaryTitle={t("UserGroups")}
          actionTitle={t("NewUserGroup")}
          deleteFunction={ApiHandler.AMSuite.User.DeleteGroups}
          getElementDetails={ApiHandler.AMSuite.User.GroupDetails}
          processExtraData={this.processData}
        />
      </div>
    );
  }
}
SalmGroupList.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

const SalmGroupListConnected = connect(mapStateToProps, null)(SalmGroupList);

export default withTranslation()(
  withStyles(styles, { withTheme: true })(SalmGroupListConnected)
);
