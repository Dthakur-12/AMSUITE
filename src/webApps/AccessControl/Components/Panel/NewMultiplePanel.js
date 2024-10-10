import React, { Component } from "react";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import { withStyles } from '@mui/styles';
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { isNullOrUndefined } from "util";
import PanelIcon from "@mui/icons-material/ControlPointDuplicate";
import PlusIcon from "@mui/icons-material/AddRounded";
import EditIcon from "@mui/icons-material/Edit";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import green from "@mui/material/colors/green";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";

import moment from "moment";
import { socketIO } from "../../../../utils/WebSockets";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Chip from "@mui/material/Chip";
import DataTableDialogAction from "../../../Shared/DataTable/DataTableDialogAction";
import DataTableSelectAction from "../../../Shared/DataTable/DataTableSelectAction";
import LinearProgress from "@mui/material/LinearProgress";
import { List, Badge } from "@mui/material";
import { isValueEmptyOrNull } from "../../../../utils/HelperFunctions";
import SnackbarHandler from "../../../../utils/SnackbarHandler";
import NavBarAccesControl from "../../utils/NavBarAccessControl";
import Fab from "@mui/material/Fab";
import { withTranslation } from "react-i18next";
import { FormHelperText } from "@mui/material";
import {
  TileLayer,
  LayersControl,
  FeatureGroup,
  Marker,
  MapContainer,
} from "react-leaflet";
import {
  requestEditPanel,
  requestCreatePanel,
  requestGetById,
  requestGetRoutes,
} from "../../../../actions/AccessControl/panel_actions";
import { requestBadges } from "../../../../actions/EasyAccess/Badges_actions";
import { connect } from "react-redux";
import styles from "../../../../assets/styles/AccessControl_styles/Panel_styles/newPanelStyles";
//import { purple } from "@mui/material/colors";
const formValues = {
  panelID: "",
  name: "",
  active: false,
  type: 5,
  mode: 0,
  badge: undefined,
  routeIds: [],
};

// let routesPrueba = [
//   { id: 1, name: "aaa" },
//   { id: 2, name: "bbb" }
// ];
// let infoPrueba = { data: routesPrueba, dataCount: 2 };

const CustomSwitch = withStyles({
  switchBase: {
    color: "#bdbdbd !important",
    "&$checked": {
      color: "#296084 !important",
    },
  },
  checked: {},
  bar: {
    "&$checked": {
      backgroundColor: "#296084 !important",
      opacity: "1 !important",
    },
  },
})(Switch);

class NewMultiplePanel extends Component {
  constructor(props) {
    super(props);
    const { initValues } = props;

    this.state = {
      routes: [],
      openDialogBadges: false,
      newPanel: initValues ? initValues : formValues,
      active: false,
      formErrors: {},
      isLoadingTracking: true,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      nextProps.i18n.language !== prevState.language ||
      nextProps.successGetById !== prevState.successGetById ||
      nextProps.successCreatePanel !== prevState.successCreatePanel ||
      nextProps.successEditPanel !== prevState.successEditPanel
    ) {
      return {
        language: nextProps.i18n.language,
        successGetById: nextProps.successGetById,
        successCreatePanel: nextProps.successCreatePanel,
        successEditPanel: nextProps.successEditPanel,
      };
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    const { t } = this.props;
    if (
      this.state.successEditPanel &&
      prevState.successEditPanel !== this.state.successEditPanel
    ) {
      this.setState({
        isCreating: false,
        isSuccess: true,
      });
      SnackbarHandler.showMessage(t("SuccessEditPanel"));
      setTimeout(() => {
        this.setState({
          isSuccess: false,
          isCreating: false,
          newPanel: formValues,
          active: false,
          deferred: false,
        });
        this.props.updateParent();
        this.props.onEdit();
      }, 500);
    }
    if (
      this.state.successCreatePanel &&
      prevState.successCreatePanel !== this.state.successCreatePanel
    ) {
      this.setState({
        isCreating: false,
        isSuccess: true,
      });
      SnackbarHandler.showMessage(t("SuccessCreatePanel"));
      setTimeout(() => {
        this.setState({
          routes: [],
          isSuccess: false,
          isCreating: false,
          newPanel: formValues,
          active: false,
        });
      }, 1000);
    }
    if (
      this.state.successGetById &&
      prevState.successGetById !== this.state.successGetById
    ) {
      const { panelById } = this.props;
      let routeIds = [];

      let routes = [];

      for (let key in panelById.routes) {
        routeIds.push(Number(key));
        routes.push({ id: Number(key), name: panelById.routes[key] });
      }
      this.setState((prevState) => ({
        deferred: panelById.mode === 1,
        routes: routes, // panelById.routes,
        newPanel: {
          ...prevState.newPanel,
          type: 5,
          mode: panelById.mode,
          active: panelById.active,
          routeIds: routeIds,
          badge: panelById.badgeId
            ? { id: panelById.badgeId, number: panelById.badgeNumber }
            : undefined,
        },

        active: panelById.active,
      }));
    }
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateScreenMode);
  }
  updateScreenMode = () => {
    this.setState({ isDesktop: window.innerWidth > 900 });
  };

  componentDidMount() {
    this.updateScreenMode();
    window.addEventListener("resize", this.updateScreenMode);
    NavBarAccesControl.hideLoader();
    const { newPanel } = this.state;

    if (this.props.isEdit || this.props.isDetails) {
      this.props.requestGetById(newPanel.id);
    }
    if (this.props.isDetails) {
      const { currentUser } = this.props;
      socketIO.emit("subscribeLiveTracking", newPanel.id, currentUser.token);
      const loadLiveTracking = this.loadLiveTracking;
      socketIO.on("trackingPanel", function (data) {
        loadLiveTracking(data);
      });
    }
  }

  componentWillUnmount = () => {
    socketIO.emit("unsubscribeLiveTracking");
  };

  loadLiveTracking = (data) => {
    if (data.message !== "") {
      this.setState({
        isLoadingTracking: false,
        position: [
          parseFloat(data.message.latitude.replace(",", ".")),
          parseFloat(data.message.longitude.replace(",", ".")),
        ],
        lastUpdate: moment(data.message.date).format("HH:mm DD/MM/YYYY"),
      });
    } else {
      this.setState({ isLoadingTracking: false });
    }
  };

  handleBadgesSelected = (badge) => {
    this.setState((prevState) => ({
      openDialogBadges: false,
      newPanel: {
        ...prevState.newPanel,
        badge: badge,
      },
    }));
  };

  handleChangeBoolean = (name) => (event) => {
    let value = event.currentTarget.checked;
    this.setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  handleOpenBadges = () => {
    this.setState({
      openDialogBadges: true,
    });
  };

  handleChange = (name) => (event) => {
    let value = event.currentTarget ? event.currentTarget.value : event.value;
    this.setState((prevState) => ({
      newPanel: {
        ...prevState.newPanel,
        [name]: value,
      },
    }));
  };

  validateCreate = () => {
    const { newPanel } = this.state;
    return {
      name: isValueEmptyOrNull(newPanel.name),
      routes:
        this.state.newPanel.routeIds &&
        this.state.newPanel.routeIds.length === 0,
    };
  };

  handleCreate = () => {
    const { t } = this.props;
    const errors = this.validateCreate();
    this.setState({
      formErrors: errors,
    });
    if (!Object.keys(errors).some((x) => errors[x])) {
      let newPanel = JSON.parse(JSON.stringify(this.state.newPanel));
      newPanel.badgeId = newPanel.badge ? newPanel.badge.id : 0;
      newPanel.active = this.state.active;
      this.setState({
        isCreating: true,
      });
      this.props.requestCreatePanel(newPanel);
    } else {
      SnackbarHandler.showMessage(t("inputEmpty"), "error");
    }
  };

  handleEdit = () => {
    const { t } = this.props;
    const errors = this.validateCreate();
    this.setState({
      formErrors: errors,
    });
    if (!Object.keys(errors).some((x) => errors[x])) {
      let newPanel = JSON.parse(JSON.stringify(this.state.newPanel));
      newPanel.badgeId = newPanel.badge ? newPanel.badge.id : 0;
      newPanel.active = this.state.active;

      this.setState({
        isCreating: true,
      });
      this.props.requestEditPanel(newPanel);
    } else {
      SnackbarHandler.showMessage(t("inputEmpty"), "error");
    }
  };

  handleRoutesSelected = (routes) => {
    let routesIds = [];
    routes.map((route) => {
      return routesIds.push(route.id);
    });
    this.setState((prevState) => ({
      routes: routes,
      newPanel: {
        ...prevState.newPanel,
        routeIds: routesIds,
      },
    }));
  };

  renderBadge = () => {
    const { classes, t, isDetails } = this.props;
    const { newPanel } = this.state;

    return (
      <List className={classes.listRoot}>
        <ListItem style={{ padding: 0 }}>
          {!isDetails && (
            <Fab
              size="small"
              className={classes.customFab}
              onClick={this.handleOpenBadges}
            >
              <PlusIcon />
            </Fab>
          )}
          <ListItemText
            primary={newPanel.badge ? newPanel.badge.number : t("Unspecified")}
          />
        </ListItem>
      </List>
    );
  };

  render() {
    const {
      newPanel,
      isLoadingTracking,
      openDialogBadges,
      position,
      lastUpdate,
    } = this.state;
    const { classes, isDialog, isEdit, isDetails, t, theme } = this.props;
    const routesColumns = [
      {
        name: t("name"),
        field: "name",
        options: {
          sort: true,
          filter: true,
          sortDirection: "asc",
          customBodyRender: (data) => {
            if (data.name)
              return <Typography value={data.name}>{data.name}</Typography>;
          },
        },
      },
    ];

    return (
      (<main className={!isDialog ? classes.layout : undefined}>
        <div className={!isDialog ? classes.fill : undefined}>
          <LinearProgress
            style={{
              opacity: this.state.isCreatinh ? "1" : "0",
              width: "100%",
              background: "none",
              borderBottomLeftRadius: 50,
              borderBottomRightRadius: 50,
            }}
            variant="query"
          />
          <Paper elevation={!isDialog ? 2 : 0} className={classes.paper}>
            <Avatar className={classes.customFab}>
              {this.props.isEdit ? <EditIcon /> : <PanelIcon />}
            </Avatar>
            {this.props.isEdit ? (
              <Typography component="h1" variant="h5">
                {t("EditPanel")}
              </Typography>
            ) : isDetails ? (
              <Typography component="h1" variant="h5">
                {t("details")}
              </Typography>
            ) : (
              <Typography component="h1" variant="h5">
                {t("NewMultiplePanel")}
              </Typography>
            )}

            <Divider
              style={{ width: "100%", marginTop: 10, marginBottom: 24 }}
            />

            <Grid container spacing={24}>
              <Grid item xs={12} md={6} style={{ marginBottom: 5 }}>
                <TextField
                  label={t("name")}
                  onChange={this.handleChange("name")}
                  required
                  fullWidth
                  value={newPanel.name}
                  helperText={t("inputEmpty")}
                  FormHelperTextProps={{
                    style: { opacity: this.state.formErrors.name ? 1 : 0 },
                  }}
                  error={this.state.formErrors.name}
                  InputProps={{
                    readOnly: isDetails,
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6} style={{ marginBottom: 5 }}>
                <FormControlLabel
                  control={
                    <CustomSwitch
                      checked={this.state.active}
                      onChange={this.handleChangeBoolean("active")}
                      value={newPanel.active}
                      color="primary"
                    />
                  }
                  labelPlacement="end"
                  label={t("Active")}
                  style={{
                    marginTop: "6%",
                    cursor: "default",
                    marginTop: !this.state.isDesktop ? "-45px" : "6%",
                  }}
                  disabled={isDetails}
                />
              </Grid>
            </Grid>
            <Grid container spacing={24}>
              <Grid item xs={12} md={6}>
                <DataTableSelectAction
                  handleConfirm={this.handleRoutesSelected}
                  loadDataAction={this.props.requestGetRoutes}
                  elements={this.state.routes}
                  primaryTitle={
                    this.props.isDetails ? t("Routes") : t("AssignRoutes")
                  }
                  title={t("Routes")}
                  DataTableColumns={routesColumns}
                  multipleSelect={true}
                  attribute={"name"}
                  isDetails={this.props.isDetails} //--------------------------
                  info={this.props.routes}
                  success={this.props.successGetRoutes}
                  loading={this.props.loadingRoutes}
                />

                <FormHelperText
                  style={{
                    opacity: this.state.formErrors.routes ? 1 : 0,
                  }}
                  error={this.state.formErrors.routes}
                >
                  {t("SelectAtLeastOneRoute")}
                </FormHelperText>
              </Grid>
              <Grid
                container
                item
                xs={12}
                md={6}
                spacing={24}
                direction="column"
                justifyContent="flex-start"
                alignItems="flex-start"
                style={{ display: "inline-block" }}
              >
                <Grid item xs={12} md={12}>
                  <div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        paddingRight: 15,
                        marginTop: !this.state.isDesktop ? "-20px" : "",
                      }}
                    >
                      <Typography component="h1" variant="subtitle1">
                        {t("AssociatedCard")}
                      </Typography>
                    </div>
                    <Divider style={{ marginBottom: 10 }} />
                    {this.renderBadge()}
                  </div>
                </Grid>
              </Grid>
            </Grid>

            {!isDetails && (
              <div
                className={classes.submit}
                style={{
                  position: "relative",
                  width: "100%",
                  marginBottom: "30px",
                }}
              >
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  disabled={this.state.isCreating}
                  onClick={
                    this.state.isCreating
                      ? undefined
                      : isEdit
                      ? this.handleEdit
                      : this.handleCreate
                  }
                  style={{
                    background: this.state.isSuccess ? green[500] : undefined,
                    color: theme.palette.text.main,
                  }}
                >
                  {this.state.isSuccess
                    ? isEdit
                      ? t("successEdit")
                      : t("successCreate")
                    : this.state.isCreating
                    ? ""
                    : isEdit
                    ? t("EditPanel")
                    : t("CreatePanel")}
                </Button>
                {this.state.isCreating && (
                  <CircularProgress
                    size={24}
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      marginTop: -12,
                      marginLeft: -12,
                      color: "white",
                    }}
                  />
                )}
              </div>
            )}

            <DataTableDialogAction
              open={openDialogBadges}
              onConfirm={this.handleBadgesSelected}
              onClose={() => this.setState({ openDialogBadges: false })}
              title={t("ManagerCards")}
              subTitle={t("selectAssignCard")}
              loadDataAction={this.props.requestBadges}
              info={this.props.badges}
              loading={this.props.loadingBadges}
              success={this.props.successBadges}
              rowsSelected={
                !isNullOrUndefined(newPanel.badge)
                  ? [
                      {
                        index: newPanel.badge.index,
                        page: newPanel.badge.page,
                        data: newPanel.badge.data,
                      },
                    ]
                  : []
              }
              columns={[
                {
                  name: t("number"),
                  field: "number",
                  options: {
                    filter: true,
                    sort: true,
                    sortDirection: "asc",
                  },
                },
                {
                  name: t("name"),
                  field: "name",
                  options: {
                    sort: true,
                    filter: true,
                    customBodyRender: (data) => {
                      if (data.Name)
                        return (
                          <Typography value={data.Name}>{data.Name}</Typography>
                        );
                      else
                        return <Chip label={t("Unassgned")} color="default" />;
                    },
                  },
                },
              ]}
            />
            {isDetails && isLoadingTracking ? (
              <Grid item xs={12} md={12}>
                <Typography
                  variant="h6"
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  {`${t("Loading")} GPS...`}
                </Typography>
              </Grid>
            ) : isDetails &&
              position &&
              !isNaN(position[0]) &&
              !isNaN(position[1]) ? (
              <Grid item xs={12} md={12}>
                <Typography
                  variant="h6"
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  {`${t("LastUpdate")} ${lastUpdate}`}
                </Typography>
                <div
                  style={{
                    width: "100%",
                    height: 400,
                    justifyContent: "center",
                    display: "flex",
                    marginBottom: 20,
                  }}
                >
                  <MapContainer
                    center={position}
                    zoom={15}
                    style={{
                      marginBottom: 64,
                      // padding: "15px 35px 0px 20px",
                      position: "absolute",
                      height: 400,
                      width: 1000 * 0.75,
                      bounds: 12,
                      maxBounds: 12,
                    }}
                  >
                    <LayersControl position="topright">
                      <LayersControl.BaseLayer name="OpenStreetMap.BlackAndWhite">
                        <TileLayer
                          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                          url="https://tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png"
                        />
                      </LayersControl.BaseLayer>
                      <LayersControl.BaseLayer name="OpenStreetMap.Color">
                        <TileLayer
                          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                      </LayersControl.BaseLayer>
                      <TileLayer
                        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      />
                    </LayersControl>
                    <FeatureGroup></FeatureGroup>
                    {position && <Marker position={position}></Marker>}
                  </MapContainer>
                </div>
              </Grid>
            ) : (
              isDetails && (
                <Grid item xs={12} md={12}>
                  <Typography
                    variant="h6"
                    style={{ display: "flex", justifyContent: "center" }}
                  >
                    {`${t("NoInformation")} gps`}
                  </Typography>
                </Grid>
              )
            )}
          </Paper>
        </div>
      </main>)
    );
  }
}

NewMultiplePanel.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};
// const InitalConnected = connect(null, mapDispatchToProps)(Init)

const mapStateToProps = (store) => {
  const { Panel, Badges, User } = store;
  return {
    routes: Panel.routes,
    loadingRoutes: Panel.loadingRoutes,
    successGetRoutes: Panel.successGetRoutes,
    successEditPanel: Panel.successEditPanel,
    successCreatePanel: Panel.successCreatePanel,
    successGetById: Panel.successGetById,
    loading: Panel.loading,
    panelById: Panel.panelById,
    badges: Badges.badges,
    successBadges: Badges.successBadges,
    loadingBadges: Badges.loading,
    currentUser: User.currentUser,
  };
};

const mapDispatchToPrps = {
  requestEditPanel,
  requestBadges,
  requestCreatePanel,
  requestGetById,
  requestGetRoutes,
};

const NewMultiplePanelConnected = connect(
  mapStateToProps,
  mapDispatchToPrps
)(NewMultiplePanel);

export default withTranslation()(
  withStyles(styles, { withTheme: true })(NewMultiplePanelConnected)
);
