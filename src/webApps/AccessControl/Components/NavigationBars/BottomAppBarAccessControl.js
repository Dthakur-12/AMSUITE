import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from '@mui/styles';
import Toolbar from "@mui/material/Toolbar";
import NavBarAccessControl from "../../utils/NavBarAccessControl";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import AddTimeZoneIcon from "@mui/icons-material/AccessTime";
import AddReaderIcon from "@mui/icons-material/ControlPoint";
import PanelIcon from "@mui/icons-material/ControlPointDuplicate";
import CalendarIcon from "@mui/icons-material/CalendarToday";
import AddCardFormatIcon from "@mui/icons-material/CreditCard";
import ImeiListIcon from "@mui/icons-material/Storage";
import AddVirtualZoneIcon from "@mui/icons-material/AddLocation";
import CardIcon from "@mui/icons-material/CreditCardRounded";
import DirectionsRoundedIcon from "@mui/icons-material/DirectionsRounded";
import CloseIcon from "@mui/icons-material/ChevronRightRounded";
import { Typography, Divider } from "@mui/material";
import { Entities, Activity } from "../../../../utils/Enums";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import styles from "../../../../assets/styles/AccessControl_styles/NavigationBars_styles/bottomAppBarAccessControlStyles";
const mapStateToProps = ({ User }) => {
  return {
    currentUser: User.currentUser,
  };
};

class BottomAppBarAccessControl extends Component {
  constructor(props) {
    super(props);
    const { t, classes } = this.props;
    this.state = {
      openCardSpeedDial: false,
      openAccssSpeedDial: false,
      openPanelSpeedDial: false,
      openAccessSpeedDial: false,
      badgeActions: [
        // {
        //   icon: <AddCardFormatIcon color="secondary" />,
        //   name: t("NewCardFormat"),
        //   entities: [Entities.CARD_FORMATS.toString()],
        //   activity: Activity.CREATE.toString(),
        //   handleClick: () => {
        //     this.handleGoTo("/newcardformat");
        //   }
        // },
        // {
        //   icon: <AddStatusCardIcon color="secondary" />,
        //   name: t("NewCardStatus"),
        //   entities: [Entities.BADGE_STATUS.toString()],
        //   activity: Activity.CREATE.toString(),
        //   handleClick: () => {
        //     this.handleGoTo("/badgeStatus");
        //   }
        // },
        // {
        //   icon: <AddStatusCardIcon color="secondary" />,
        //   name: t("newBadgeType"),
        //   entities: [Entities.BADGE_TYPES.toString()],
        //   activity: Activity.CREATE.toString(),
        //   handleClick: () => {
        //     this.handleGoTo("/badgeTypes");
        //   }
        // },
        {
          icon: <CardIcon color="secondary" />,
          name: t("NewBadge"),
          entities: [Entities.BADGES.toString()],
          activity: Activity.CREATE.toString(),
          handleClick: () => {
            this.handleGoTo("/newbadge");
          },
        },
      ],
      panelActions: [
        // {
        //   icon: <AddReaderIcon className={classes.icon} />,
        //   entities: [Entities.READERS.toString()],
        //   activity: Activity.CREATE.toString(),
        //   name: t("NewVirtualReader"),
        //   handleClick: () => {
        //     this.handleGoTo("/newreader");
        //   }
        // },
        {
          icon: <AddCircleOutlineRoundedIcon className={classes.icon} />,
          entities: [Entities.PANELS.toString()],
          activity: Activity.CREATE.toString(),
          name: t("NewPanel"),
          handleClick: () => {
            this.handleGoTo("/newpanel");
          },
        },
        {
          icon: <PanelIcon className={classes.icon} />,
          entities: [Entities.PANELS.toString()],
          activity: Activity.CREATE.toString(),
          name: t("NewMultiplePanel"),
          handleClick: () => {
            this.handleGoTo("/newMultiplePanel");
          },
        },
        {
          icon: <DirectionsRoundedIcon className={classes.icon} />,
          name: t("CrateRoute"),
          entities: [Entities.PANELS.toString()],
          activity: Activity.CREATE.toString(),
          handleClick: () => {
            this.handleGoTo("/routes");
          },
        },
        {
          icon: <AddCardFormatIcon className={classes.icon} />,
          name: t("NewCardFormat"),
          entities: [Entities.CARD_FORMATS.toString()],
          activity: Activity.CREATE.toString(),
          handleClick: () => {
            this.handleGoTo("/newcardformat");
          },
        },
        {
          icon: <ImeiListIcon className={classes.icon} />,
          name: t("IMEIs"),
          entities: [Entities.PANELS.toString()],
          activity: Activity.CREATE.toString(),
          handleClick: () => {
            this.handleGoTo("/imeis");
          },
        },
        {
          icon: <AddVirtualZoneIcon className={classes.icon} />,
          name: t("NewVirtualZone"),
          entities: [Entities.VIRTUAL_ZONES.toString()],
          activity: Activity.CREATE.toString(),
          handleClick: () => {
            this.handleGoTo("/newvirtualzone2");
          },
        },
      ],
      accessActions: [
        {
          icon: <AddTimeZoneIcon color="secondary" />,
          name: t("NewTimeZone"),
          entities: [Entities.TIME_ZONES.toString()],
          activity: Activity.CREATE.toString(),
          handleClick: () => {
            this.handleGoTo("/newtimezone");
          },
        },
        {
          icon: <CalendarIcon color="secondary" />,
          name: t("newAccessLevelResource"),
          entities: [Entities.ACCESS_LEVELS.toString()],
          activity: Activity.CREATE.toString(),
          handleClick: () => {
            this.handleGoTo("/newaccesslevel");
          },
        },
      ],
    };
  }
  handleLicence = (entities, activity) => {
    const { currentUser } = this.props;
    if (currentUser)
      return (
        Object.keys(currentUser.permits).filter((v) => {
          return (
            entities.includes(v.toString()) &&
            currentUser.permits[v].includes(parseInt(activity))
          );
        }).length > 0
      );
    else return null;
  };
  handleGoTo = (url) => {
    if (NavBarAccessControl.appNavigation.history.location.pathname !== url) {
      NavBarAccessControl.showLoader();
      NavBarAccessControl.appNavigation.history.push(url);
    }
  };

  handleCloseSpeedDial = () => {
    this.setState({
      openAccessSpeedDial: false,
      openCardSpeedDial: false,
      openPanelSpeedDial: false,
    });
  };

  handleClickCardSpeedDial = () => {
    this.setState((state) => ({
      openCardSpeedDial: !state.openCardSpeedDial,
      openAccessSpeedDial: false,
      openPanelSpeedDial: false,
    }));
  };

  handleCloseCardSpeedDial = () => {
    this.setState({ openCardSpeedDial: false });
  };

  handleClickAccessSpeedDial = () => {
    this.setState((state) => ({
      openAccessSpeedDial: !state.openAccessSpeedDial,
    }));
    this.handleCloseCardSpeedDial();
    this.handleClosePanelSpeedDial();
  };

  handleCloseAccessSpeedDial = () => {
    this.setState({ openAccessSpeedDial: false });
  };

  handleClickPanelSpeedDial = () => {
    this.setState((state) => ({
      openPanelSpeedDial: !state.openPanelSpeedDial,
    }));
    this.handleCloseAccessSpeedDial();
    this.handleCloseCardSpeedDial();
  };

  handleClosePanelSpeedDial = () => {
    this.setState({ openPanelSpeedDial: false });
  };
  showButtonAccess = () => {
    const { accessActions } = this.state;
    const show = accessActions.filter((action) => {
      return this.handleLicence(action.entities, action.activity);
    });
    return show.length > 0;
  };

  showButtonPanel = () => {
    const { panelActions } = this.state;
    const show = panelActions.filter((action) => {
      return this.handleLicence(action.entities, action.activity);
    });
    return show.length > 0;
  };

  showButtonBadge = () => {
    const { badgeActions } = this.state;
    const show = badgeActions.filter((action) => {
      return this.handleLicence(action.entities, action.activity);
    });
    return show.length > 0;
  };
  render() {
    const { classes, t } = this.props;
    const {
      openCardSpeedDial,
      openAccessSpeedDial,
      openPanelSpeedDial,
      accessActions,
      panelActions,
      badgeActions,
    } = this.state;
    return (
      <Toolbar className={classes.root}>
        <span
          style={{
            marginRight: "0%",
            width: "4%",
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            opacity: openCardSpeedDial ? 1 : 0,
          }}
        >
          <Typography>{t("Badges")}</Typography>
          <Divider style={{ width: "100%" }} />
        </span>
        {this.showButtonBadge() && (
          <SpeedDial
            ariaLabel="SpeedDial"
            className={classes.speedDial}
            icon={
              <SpeedDialIcon icon={<CardIcon />} openIcon={<CloseIcon />} />
            }
            onBlur={this.handleCloseCardSpeedDial}
            onClick={this.handleClickCardSpeedDial}
            title={t("Badges")}
            open={openCardSpeedDial}
            direction="up"
          >
            {badgeActions.map(
              (action) =>
                this.handleLicence(action.entities, action.activity) && (
                  <SpeedDialAction
                    key={action.name}
                    icon={action.icon}
                    tooltipTitle={action.name}
                    onMouseDown={action.handleClick}
                    PopperProps={{ style: { zIndex: 1650 } }}
                    tooltipPlacement="bottom"
                  />
                )
            )}
          </SpeedDial>
        )}
        <span
          style={{
            marginRight: "0%",
            width: "4%",
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            opacity: openAccessSpeedDial ? 1 : 0,
          }}
        >
          <Typography>{t("Permissions")}</Typography>
          <Divider style={{ width: "100%" }} />
        </span>
        {this.showButtonAccess() && (
          <SpeedDial
            ariaLabel="SpeedDial"
            className={classes.speedDial}
            icon={
              <SpeedDialIcon icon={<CalendarIcon />} openIcon={<CloseIcon />} />
            }
            onBlur={this.handleCloseAccessSpeedDial}
            title={t("Permissions")}
            onClick={this.handleClickAccessSpeedDial}
            onClose={this.handleCloseAccessSpeedDial}
            open={openAccessSpeedDial}
            direction="up"
          >
            {accessActions.map(
              (action) =>
                this.handleLicence(action.entities, action.activity) && (
                  <SpeedDialAction
                    key={action.name}
                    icon={action.icon}
                    tooltipTitle={action.name}
                    onMouseDown={action.handleClick}
                    PopperProps={{ style: { zIndex: 1650 } }}
                    tooltipPlacement="bottom"
                  />
                )
            )}
          </SpeedDial>
        )}
        <span
          style={{
            marginRight: "0%",
            width: "4%",
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            opacity: openPanelSpeedDial ? 1 : 0,
          }}
        >
          <Typography>{t("Panels")}</Typography>
          <Divider style={{ width: "100%" }} />
        </span>
        {this.showButtonPanel() && (
          <SpeedDial
            ariaLabel="SpeedDial"
            className={classes.speedDial}
            icon={<SpeedDialIcon />}
            onBlur={this.handleClosePanelSpeedDial}
            onClick={this.handleClickPanelSpeedDial}
            onClose={this.handleClosePanelSpeedDial}
            title={t("Panels")}
            open={openPanelSpeedDial}
            direction="up"
          >
            {panelActions.map(
              (action) =>
                this.handleLicence(action.entities, action.activity) && (
                  <SpeedDialAction
                    key={action.name}
                    icon={action.icon}
                    tooltipTitle={action.name}
                    onMouseDown={action.handleClick}
                    tooltipPlacement="bottom"
                    PopperProps={{ style: { zIndex: 1650 } }}
                  />
                )
            )}
          </SpeedDial>
        )}
      </Toolbar>
    );
  }
}

BottomAppBarAccessControl.propTypes = {
  classes: PropTypes.object.isRequired,
};

const BottomAppBarAccessControlConnected = connect(
  mapStateToProps,
  null
)(BottomAppBarAccessControl);

export default withTranslation()(
  withStyles(styles)(BottomAppBarAccessControlConnected)
);
