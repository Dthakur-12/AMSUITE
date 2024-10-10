import React from "react";
import { withStyles } from "@mui/styles";
import { withTranslation } from "react-i18next";
import CustomList from "../list";
import ApiHandler from "../../../../services/ApiHandler";
import NewUserGroup from "./NewUserGroup";
// import NavBarUsers from "../../utils/NavBarUsers";
// import Typography from "@mui/material/Typography";

class ADGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      permissions: []
    };
  }

  processData = data => {
    const activities = [1, 2, 3, 4];
    let permits = {};
    activities.map(activity => {
      permits = {
        ...permits,
        [activity]: Object.keys(data.permits).filter(k =>
          data.permits[k].some(v => parseInt(v) === activity)
        )
      };
      return 0;
    });
    const groupData = {
      ...data,
      permits: permits,
      password: ""
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
      <NewUserGroup
        open={open}
        handleClose={handleClose}
        handleElementCreated={handleElementCreated}
        elementOnEdit={elementOnEdit ? elementOnEdit : undefined}
        isEdit={elementOnEdit !== undefined}
        isADGroup
        initValues={elementOnEdit}
        key={elementOnEdit}
      />
    );
  };

  render() {
    const { t } = this.props;
    //const { elementOnEdit } = this.state;
    return (
      <div>
        <CustomList
          type={2}
          loadData={ApiHandler.AMSuite.User.GetAMSuiteGroups}
          renderComponent={this.renderComponent}
          attribute={"name"}
          secondAttribute={"name"}
          primaryTitle={t("ADGroups")}
          actionTitle={t("ImportADGroup")}
          deleteFunction={ApiHandler.AMSuite.User.DeleteGroups}
          getElementDetails={ApiHandler.AMSuite.User.GroupDetails}
          processExtraData={this.processData}
          deleteTitle={t("DeleteGroup")}
          isActiveDirectory
        />
      </div>
    );
  }
}

const styles = () => ({});

export default withTranslation()(withStyles(styles)(ADGroup));
