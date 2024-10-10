import React from "react";
import DeviceCard from "./DeviceCard";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
  Button,
  Paper,
  MenuList,
  MenuItem,
} from "@mui/material";
import {

  withStyles,

} from "@mui/styles";
import { Map, PhoneIphone } from "@mui/icons-material";
import { withTranslation } from "react-i18next";
import SearchModule from "./SearchModule";
import { MapContainer } from "react-leaflet";
const SlideContent = (props) => {
  const { classes, t } = props;
  return (
    <div className={classes.sideBarContent}>
      <List className={classes.listRoot}>
        <SearchModule handlePanelClick={props.handlePanelClick} />
      </List>

      <Paper className={classes.paper}>
        <MenuList>
          <MenuItem
            button
            selected={props.showDevices == false}
            onClick={() => props.hideDevices("showDevices")}
            className={classes.menuItem}
            classes={{ selected: classes.selected }}
          >
            <ListItemIcon>
              <PhoneIphone />
            </ListItemIcon>
            <Typography variant="inherit" noWrap>
              {t("Alutel Mobile")}
            </Typography>
          </MenuItem>
          <MenuItem
            selected={props.showZones == false}
            onClick={() => props.hideDevices("showZones")}
            button
            className={classes.menuItem}
            classes={{ selected: classes.selected }}
          >
            <ListItemIcon>
              <MapContainer />
            </ListItemIcon>
            <Typography variant="inherit" noWrap>
              {t("VirtualZones")}
            </Typography>
          </MenuItem>
        </MenuList>
      </Paper>

      {props.selectedPanel && (
        <DeviceCard
          panel={props.selectedPanel}
          handleFollowDevice={props.handleFollowDevice}
          handleDrawTrace={props.handleShowTracing}
          handleShowOnlyThisDevice={props.handleShowOnlyThisPanel}
          followingDevice={props.followingDevice}
          showingTracing={props.showingTracing}
          deviceToShow={props.deviceToShow}
        />
      )}
      {props.selectedZone && (
        <DeviceCard
          zone={props.selectedZone}
          deviceToShow={props.deviceToShow}
          handleShowOnlyAssociatedDevices={
            props.handleShowOnlyAssociatedDevices
          }
        />
      )}
      <Button
        className={classes.buttonClearFliters}
        onClick={props.handleClearFilters}
        style={{ color: "red" }}
      >
        {t("ClearFilters")}
      </Button>
    </div>
  );
};

const styles = (theme) => ({
  paper: {
    marginBottom: 10,
  },
  listRoot: {
    background: theme.palette.backgroundSecondary.main + " !important",
    marginBottom: 15 + "!important",
    display: "flex",
    justifyContent: "center",
  },
  sideBarContent: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  buttonClearFliters: {
    marginTop: "auto",
    width: "100%",
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
  withStyles(styles, { withTheme: true })(SlideContent)
);
