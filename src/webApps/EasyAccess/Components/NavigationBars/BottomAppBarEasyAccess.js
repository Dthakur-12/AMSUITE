import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from '@mui/styles';
import Toolbar from "@mui/material/Toolbar";
import NavBarEasyAccess from "../../utils/NavBarEasyAccess";
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import SupervisedUserCircleRoundedIcon from "@mui/icons-material/SupervisedUserCircleRounded";
import AddPersonIcon from "@mui/icons-material/PersonAddRounded";
import BusinessIcon from "@mui/icons-material/BusinessRounded";
import StatusIcon from "@mui/icons-material/LibraryAddRounded";
import { GroupAdd } from "@mui/icons-material";
import { Entities, Activity } from "../../../../utils/Enums";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import styles from "../../../../assets/styles/EasyAccess_styles/NavigationBars_styles/bottomAppBarEasyAccessStyles";
const mapStateToProps = ({ User }) => {
  return {
    currentUser: User.currentUser,
  };
};
class BottomAppBarEasyAccess extends Component {
  constructor(props) {
    super(props);
    const { t, classes } = props;
    this.state = {
      ocultar: false,
      openSpeedDial: false,
      actions: [
        {
          icon: <AddPersonIcon className={classes.icon} />,
          name: t("NewPerson"),
          entities: [
            Entities.EMPLOYEES.toString(),
            Entities.VISITORS.toString(),
          ],
          activity: Activity.CREATE.toString(),
          handleClick: () => {
            this.handleGoTo("/newperson");
            this.handleCloseSpeedDial();
          },
        },
        {
          icon: <SupervisedUserCircleRoundedIcon className={classes.icon} />,
          name: t("NewEvent"),
          entities: [
            Entities.EMPLOYEES.toString(),
            Entities.VISITORS.toString(),
          ],
          activity: Activity.CREATE.toString(),
          handleClick: () => {
            this.handleGoTo("/newevent");
            this.handleCloseSpeedDial();
          },
        },
    
        // {
        //   icon: <CarIcon color="secondary" />,
        //   name: t("NewVehicle"),
        //   entities: [Entities.VEHICLES.toString()],
        //   activity: Activity.CREATE.toString(),
        //   handleClick: () => {
        //     this.handleGoTo("/newvehicle");
        //     this.handleCloseSpeedDial();
        //   }
        // },
        // {
        //   icon: <Icon name="upload" size="large" style={{margin:0,color:"#303030"}}/>,
        //   name: t("importRegisters"),
        //   entities: [Entities.PRINTERS.toString()],
        //   activity: Activity.CREATE.toString(),
        //   handleClick: () => {
        //     this.handleGoTo("/importregister");
        //     this.handleCloseSpeedDial();
        //   }
        // },
        {
          icon: <BusinessIcon className={classes.icon} />,
          name: t("NewEnterprise"),
          entities: [Entities.COMPANIES.toString()],
          activity: Activity.CREATE.toString(),
          handleClick: () => {
            this.handleGoTo("/newenterprise");
            this.handleCloseSpeedDial();
          },
        },
        {
          icon: <StatusIcon className={classes.icon} />,
          name: t("newStatus"),
          entities: [Entities.PERSON_STATUS.toString()],
          activity: Activity.CREATE.toString(),
          handleClick: () => {
            this.handleGoTo("/newstatus");
            this.handleCloseSpeedDial();
          },
        },
      ],
    };
  }
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
  handleGoTo = (url) => {
    if (NavBarEasyAccess.appNavigation.history.location.pathname !== url) {
      NavBarEasyAccess.showLoader();
      NavBarEasyAccess.appNavigation.history.push(url);
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
  showButton = () => {
    const { actions } = this.state;
    console.log("actionsEA: ", actions);
    const show = actions.filter((action) => {
      return this.handleLicence(action.entities, action.activity);
    });
    return show.length > 0;
  };
  render() {
    const { classes } = this.props;
    const { openSpeedDial, actions } = this.state;
    return (
      <Toolbar className={classes.root}>
        {this.showButton() && (
          <SpeedDial
            ariaLabel="SpeedDial"
            className={classes.speedDial}
            icon={<SpeedDialIcon className={classes.speedIcon} />}
            // onBlur={this.handleCloseSpeedDial}
            onClick={this.handleClickSpeedDial}
            onClose={this.handleCloseSpeedDial}
            // onFocus={this.handleOpenSpeedDial}
            // onMouseEnter={this.handleOpenSpeedDial}
            // onMouseLeave={this.handleCloseSpeedDial}
            open={openSpeedDial}
            direction="left"
          >
            {actions.map(
              (action) =>
                this.handleLicence(action.entities, action.activity) && (
                  <SpeedDialAction
                    key={action.name}
                    icon={action.icon}
                    className={classes.icon}
                    tooltipTitle={action.name}
                    onMouseDown={action.handleClick}
                    /* ButtonProps={{
                      onClick: e => action.handleClick(e)
                    }} */
                    tooltipPlacement="top"
                  />
                )
            )}
          </SpeedDial>
        )}
      </Toolbar>
    );
  }
}
BottomAppBarEasyAccess.propTypes = {
  classes: PropTypes.object.isRequired,
};
const BottomAppBarEasyAccessConnected = connect(
  mapStateToProps,
  null
)(BottomAppBarEasyAccess);
export default withTranslation()(
  withStyles(styles)(BottomAppBarEasyAccessConnected)
);
