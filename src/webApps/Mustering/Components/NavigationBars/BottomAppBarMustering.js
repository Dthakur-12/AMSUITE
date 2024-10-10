import React from "react";
import PropTypes from "prop-types";
import { withStyles } from '@mui/styles';
import Toolbar from "@mui/material/Toolbar";
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import { withTranslation } from "react-i18next";
import styles from "../../../../assets/styles/Mustering_styles/NavigationBars_styles/bottomAppBarMusteringStyles";
import { compose } from "redux";
import withBottomAppBar from "../../../../core/Mustering/withBottomAppBar";

const BottomAppBarMustering = (props) => {
  const {
    classes,
    openSpeedDial,
    actions,
    showButton,
    handleClickSpeedDial,
    handleCloseSpeedDial,
    handleLicence,
  } = props;

  return (
    <Toolbar className={classes.root}>
      {showButton() && (
        <SpeedDial
          ariaLabel="SpeedDial"
          className={classes.speedDial}
          icon={<SpeedDialIcon />}
          // onBlur={this.handleCloseSpeedDial}
          onClick={handleClickSpeedDial}
          onClose={handleCloseSpeedDial}
          // onFocus={this.handleOpenSpeedDial}
          // onMouseEnter={this.handleOpenSpeedDial}
          // onMouseLeave={this.handleCloseSpeedDial}
          open={openSpeedDial}
          direction="left"
        >
          {actions.map(
            (action) =>
              handleLicence(action.entities, action.activity) && (
                <SpeedDialAction
                  key={action.name}
                  icon={action.icon}
                  tooltipTitle={action.name}
                  onClick={action.handleClick}
                  tooltipPlacement="top"
                />
              )
          )}
        </SpeedDial>
      )}
    </Toolbar>
  );
};

BottomAppBarMustering.propTypes = {
  classes: PropTypes.object.isRequired,
};

const enhance = compose(
  withTranslation(),
  withStyles(styles, { withTheme: true })
);
export default withBottomAppBar(enhance(BottomAppBarMustering));
