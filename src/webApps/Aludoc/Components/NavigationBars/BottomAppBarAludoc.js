import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from '@mui/styles';
import Toolbar from "@mui/material/Toolbar";
import NavBarAludoc from "../../utils/NavBarAludoc";
import CreateNewFolder from "@mui/icons-material/CreateNewFolder";
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import AddPersonIcon from "@mui/icons-material/PersonAddRounded";
import AddDocument from "@mui/icons-material/NoteAdd";
import { Entities, Activity } from "../../../../utils/Enums";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import styles from "../../../../assets/styles/Aludoc_styles/NavigationBars_styles/bottomAppBarAludocStyles.js";
const mapStateToProps = ({ User }) => {
  return {
    currentUser: User.currentUser,
  };
};

class BottomAppBarAludoc extends Component {
  constructor(props) {
    super(props);
    const { t, classes } = props;
    this.state = {
      openSpeedDial: false,
      actions: [
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
          // e => {
          //   console.log("e: ", e);
          //   if (e) e.preventDefault();
          //   this.handleGoTo("/newperson");
          //   this.handleCloseSpeedDial();
          // }
        },
        // {
        //   icon: <CloudUpload color="secondary" />,
        //   name: t("importRegisters"),
        //   entities: [
        //     Entities.EMPLOYEES.toString(),
        //     Entities.VISITORS.toString()
        //   ],
        //   activity: Activity.CREATE.toString(),
        //   handleClick: () => {
        //     this.handleGoTo("/importregister");
        //     this.handleCloseSpeedDial();
        //   }
        // },
        {
          icon: <AddDocument className={classes.icon} />,
          name: t("newDocumentType"),
          entities: [Entities.DOCUMENT_TYPES.toString()],
          activity: Activity.CREATE.toString(),
          handleClick: () => {
            this.handleGoTo("/newDocumentType");
            this.handleCloseSpeedDial();
          },
        },
        {
          icon: <CreateNewFolder className={classes.icon} />,
          name: t("NewControl"),
          entities: [Entities.DOCUMENTS.toString()],
          activity: Activity.CREATE.toString(),
          handleClick: () => {
            this.handleGoTo("/newControl");
            this.handleCloseSpeedDial();
          },
        },
      ],
    };
  }

  handleLicence = (entities, activity) => {
    console.log("activity: ", activity);
    console.log("entities: ", entities);
    const { currentUser } = this.props;
    console.log("currentUser: ", currentUser);
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
    if (NavBarAludoc.appNavigation.history.location.pathname !== url) {
      NavBarAludoc.showLoader();
      NavBarAludoc.appNavigation.history.push(url);
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
    console.log("actions: ", actions);
    const show = actions.filter((action) => {
      return this.handleLicence(action.entities, action.activity);
    });

    console.log("show: ", show);
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
            icon={<SpeedDialIcon />}
            // onBlur={this.handleCloseSpeedDial}
            onClick={this.handleClickSpeedDial}
            onClose={this.handleCloseSpeedDial}
            // onFocus={this.handleOpenSpeedDial}
            // onMouseEnter={this.handleOpenSpeedDial}
            // onMouseLeave={this.handleCloseSpeedDial}
            open={openSpeedDial}
            direction="left"
          >
            {actions.map((action) => (
              <SpeedDialAction
                key={action.name}
                icon={action.icon}
                tooltipTitle={action.name}
                onMouseDown={action.handleClick}
                /* ButtonProps={{
                  onClick: e => action.handleClick(e)
                }} */
                tooltipPlacement="top"
              />
            ))}
          </SpeedDial>
        )}
      </Toolbar>
    );
  }
}

BottomAppBarAludoc.propTypes = {
  classes: PropTypes.object.isRequired,
};

const BottomAppBarAludocConnected = connect(
  mapStateToProps,
  null
)(BottomAppBarAludoc);

export default withTranslation()(
  withStyles(styles)(BottomAppBarAludocConnected)
);
