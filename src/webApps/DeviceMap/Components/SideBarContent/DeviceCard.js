import React from "react";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
  Paper,
  MenuList,
  MenuItem,
} from "@mui/material";
import {

  withStyles,
  
} from "@mui/styles";
import { GpsFixed, Timeline, Place } from "@mui/icons-material";
import { withTranslation } from "react-i18next";

const DeviceCard = (props) => {
  const { classes, t } = props;
  return (
    <div>
      <Paper className={classes.root}>
        <Typography style={{ padding: "0 16px" }}>
          {props.panel
            ? props.panel.panelName
            : props.zone
            ? props.zone.zoneName
            : ""}
        </Typography>
        {props.panel && (
          <MenuList>
            <MenuItem
              button
              selected={props.followingDevice}
              onClick={props.handleFollowDevice}
              className={classes.menuItem}
              classes={{ selected: classes.selected }}
            >
              <ListItemIcon>
                <GpsFixed />
              </ListItemIcon>
              <Typography variant="inherit" noWrap>
                {t("FollowDevice")}
              </Typography>
            </MenuItem>
            <MenuItem
              selected={props.showingTracing}
              button
              onClick={props.handleDrawTrace}
              className={classes.menuItem}
              classes={{ selected: classes.selected }}
            >
              <ListItemIcon>
                <Timeline />
              </ListItemIcon>
              <Typography variant="inherit" noWrap>
                {t("DrawTrace")}
              </Typography>
            </MenuItem>
            <MenuItem
              selected={props.deviceToShow && props.deviceToShow === 1}
              button
              onClick={props.handleShowOnlyThisDevice}
              className={classes.menuItem}
              classes={{ selected: classes.selected }}
            >
              <ListItemIcon>
                <Place />
              </ListItemIcon>
              <Typography variant="inherit" noWrap>
                {t("ShowOnlyThisDevice")}
              </Typography>
            </MenuItem>
          </MenuList>
        )}
        {props.zone && (
          <MenuList>
            <MenuItem
              button
              selected={props.deviceToShow >= 0}
              onClick={props.handleShowOnlyAssociatedDevices}
              className={classes.menuItem}
              classes={{ selected: classes.selected }}
            >
              <ListItemIcon>
                <Place />
              </ListItemIcon>
              <Typography variant="inherit" noWrap>
                {t("AssociatedDevices")}
              </Typography>
            </MenuItem>
          </MenuList>
        )}
      </Paper>
    </div>
  );
};

const styles = (theme) => ({
  paper: {
    marginBottom: 10,
  },
  menuItem: {
    "&:focus": {
      backgroundColor: theme.palette.primary.main,
      "& $primary, & $icon": {
        color: theme.palette.common.white,
      },
    },
  },
  selected: {
    backgroundColor: theme.palette.primary.main + " !important",
  },
});
export default withTranslation()(
  withStyles(styles, { withTeme: true })(DeviceCard)
);
