import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withTranslation } from "react-i18next";
import AddLocation from "@mui/icons-material/AddLocation";
import PlaylistAdd from "@mui/icons-material/PlaylistAdd";
import Satellite from "@mui/icons-material/Satellite";
import NavBarMustering from "../../../src/webApps/Mustering/utils/NavBarMustering";
import styles from "../../assets/styles/Mustering_styles/NavigationBars_styles/bottomAppBarMusteringStyles";
import { Entities, Activity } from "../../utils/Enums";
import { withStyles } from '@mui/styles';

// Logic Component

const LogicComponent = (Component) =>
  (class extends React.Component {
    constructor(props) {
      super(props);
      const { t } = props;
      this.state = {
        openSpeedDial: false,
        actions: [
          {
            icon: <PlaylistAdd className={this.props.classes.icon} />,
            name: t("AreaGroup"),
            entities: [Entities.MUSTER_ZONES.toString()],
            activity: Activity.CREATE.toString(),
            handleClick: () => {
              this.handleGoTo("/newareagroup");
              this.handleCloseSpeedDial();
            },
          },
          {
            icon: <Satellite className={this.props.classes.icon} />,
            name: t("AddArea"),
            entities: [Entities.MUSTER_ZONES.toString()],
            activity: Activity.CREATE.toString(),
            handleClick: () => {
              this.handleGoTo("/newarea");
              this.handleCloseSpeedDial();
            },
          },
          {
            icon: <AddLocation className={this.props.classes.icon} />,
            name: t("AddZone"),
            entities: [Entities.MUSTER_ZONES.toString()],
            activity: Activity.CREATE.toString(),
            handleClick: () => {
              this.handleGoTo("/newzone");
              this.handleCloseSpeedDial();
            },
          },
        ],
      };
    }

    handleGoTo = (url) => {
      if (NavBarMustering.appNavigation.history.location.pathname !== url) {
        NavBarMustering.showLoader();
        NavBarMustering.appNavigation.history.push(url);
      }
    };

    handleClickSpeedDial = () => {
      this.setState((state) => ({
        openSpeedDial: !state.openSpeedDial,
      }));
    };

    handleCloseSpeedDial = () => {
      this.setState({ openSpeedDial: false });
    };

    handleOpenSpeedDial = () => {
      this.setState({ openSpeedDial: true });
    };

    handleLicence = (entities, activity) => {
      const { currentUser } = this.props;
      return (
        Object.keys(currentUser.permits).filter((v) => {
          return (
            entities.includes(v.toString()) &&
            currentUser.permits[v].includes(parseInt(activity))
          );
        }).length > 0
      );
    };
    showButton = () => {
      const { actions } = this.state;
      const show = actions.filter((action) => {
        return this.handleLicence(action.entities, action.activity);
      });
      return show.length > 0;
    };

    render() {
      return (
        <Component
          {...this.props}
          openSpeedDial={this.state.openSpeedDial}
          actions={this.state.actions}
          showButton={this.showButton}
          handleClickSpeedDial={this.handleClickSpeedDial}
          handleCloseSpeedDial={this.handleCloseSpeedDial}
          handleLicence={this.handleLicence}
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
  withStyles(styles, { withTheme: true }),
  LogicComponent
);
