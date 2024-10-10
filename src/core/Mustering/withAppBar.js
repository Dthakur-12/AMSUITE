import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withTranslation } from "react-i18next";
import NavBarMustering from "../../../src/webApps/Mustering/utils/NavBarMustering";

// Logic Component

const LogicComponent = (Component) =>
  (class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        open: false,
        openMenuAdministration: false,
      };
      NavBarMustering.setAppBar(this);
    }
    handleToggle = () => {
      this.setState((state) => ({ open: !state.open }));
    };

    handleClose = (event) => {
      if (this.anchorEl.contains(event.target)) {
        return;
      }
      this.setState({ open: false });
    };
    handleGoTo = (url) => {
      if (NavBarMustering.appNavigation.history.location.pathname !== url) {
        NavBarMustering.showLoader();
        NavBarMustering.appNavigation.history.push(url);
      }
    };

    handleLicence = (entities) => {
      const { currentUser } = this.props;
      return (
        Object.keys(currentUser.permits).filter((v) =>
          entities.includes(v.toString())
        ).length > 0
      );
    };

    render() {
      return (
        <Component
          handleToggle={this.handleToggle}
          handleClose={this.handleClose}
          handleLicence={this.handleLicence}
          handleGoTo={this.handleGoTo}
          {...this.props}
        />
      );
    }
  });

const mapDispatchToProps = {};

const mapStateToProps = ({ User }) => {
  return {
    currentUser: User.currentUser,
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withTranslation(),
  LogicComponent
);
