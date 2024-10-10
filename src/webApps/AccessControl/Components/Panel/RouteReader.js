import React from "react";
import { withTranslation } from "react-i18next";
import { withStyles } from "@mui/styles";
;
import NavBarAccessControl from "../../utils/NavBarAccessControl";
import IconButton from "@mui/material/IconButton";
import { Icon, Table, Divider, Input, Button } from "semantic-ui-react";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import { isNullOrUndefined } from "util";
import ArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import ArrowRight from "@mui/icons-material/KeyboardArrowRight";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import DirectionsRoundedIcon from "@mui/icons-material/DirectionsRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import { debounce } from "throttle-debounce";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { isValueEmptyOrNull } from "../../../../utils/HelperFunctions";
import SnackbarHandler from "../../../../utils/SnackbarHandler";
import ConfirmationDialogAction from "../../../Shared/ConfirmationDialogAction";
import ImeiListIcon from "@mui/icons-material/Storage";
import {
  requestGetRoutes,
  requestCreateOrEditRoute,
  requestDeleteRoute,
} from "../../../../actions/AccessControl/panel_actions";
import { connect } from "react-redux";
import styles, {
  StyledPagination,
} from "../../../../assets/styles/AccessControl_styles/imeiStyles";

const formValues = {
  panelID: "",
  name: "",
  active: false,
  mode: 5,
  badge: undefined,
  routeIds: [],
};
// let routesPrueba = [
//   { id: 1, name: "aaa" },
//   { id: 2, name: "bbb" }
// ];
//let infoPrueba = { data: routesPrueba, dataCount: dataCount };

class RouteReader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newRoute: { id: 0, name: "" },
      offset: 0,
      limit: 5,
      searchText: "",
      editRoute: undefined,
    };
    this.changeSearchDebounce = debounce(300, (value) =>
      this.changeSearch(value)
    );
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
    NavBarAccessControl.hideLoader();
    this.getRoutes();
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      nextProps.i18n.language !== prevState.language ||
      nextProps.successGetRoutes !== prevState.successGetRoutes ||
      nextProps.successDeleteRoute !== prevState.successDeleteRoute ||
      nextProps.loadingDeleteRoute !== prevState.loadingDeleteRoute ||
      nextProps.successCreateOrEditRoute !==
        prevState.successCreateOrEditRoute ||
      nextProps.routes !== prevState.routes
    ) {
      return {
        loadingDeleteRoute: nextProps.loadingDeleteRoute,
        language: nextProps.i18n.language,
        successGetRoutes: nextProps.successGetRoutes,
        successDeleteRoute: nextProps.successDeleteRoute,
        successCreateOrEditRoute: nextProps.successCreateOrEditRoute,
        routes: nextProps.routes ? nextProps.routes.data : [],
        dataCount: nextProps.routes ? nextProps.routes.dataCount : 0,
        createResponse: nextProps.createResponse,
        editResponse: nextProps.editResponse,
      };
    } else return null;
  }

  componentDidUpdate(prevProps, prevState) {
    const { t } = this.props;
    if (
      this.state.successCreateOrEditRoute &&
      prevState.successCreateOrEditRoute !== this.state.successCreateOrEditRoute
    ) {
      if (this.state.editRoute) {
        SnackbarHandler.showMessage(t("SuccessEditRoute"));
        this.setState({ editRoute: undefined });
        this.getRoutes();
      } else {
        SnackbarHandler.showMessage(t("SuccessCreateRoute"));
        this.getRoutes();
      }
    }
    if (prevState.successCreateRoute !== this.state.successCreateRoute) {
    }

    if (prevState.successDeleteRoute !== this.state.successDeleteRoute)
      if (this.state.successDeleteRoute) {
        this.getRoutes();
        this.setState({
          openDeleteDialog: false,
          optionSelected: undefined,
        });
        SnackbarHandler.showMessage(t("SuccessDeleteRoute"));
      } else if (!this.state.loadingDeleteRoute) {
        this.getRoutes();
        this.setState({
          openDeleteDialog: false,
          optionSelected: undefined,
        });
      }
  }

  getRoutes = () => {
    const { offset, limit, searchText } = this.state;
    this.props.requestGetRoutes({
      start: offset,
      length: limit,
      order: "name asc",
      search: searchText,
    });
  };

  addRoute = () => {
    const { newRoute } = this.state;
    if (!isValueEmptyOrNull(newRoute.name)) {
      this.props.requestCreateOrEditRoute(newRoute);
    } else
      this.setState({
        hasError: true,
      });
  };

  handleEditRoute = (index) => {
    let route = this.state.routes[index];
    this.setState({
      editRoute: {
        id: route.id,
        name: route.name,
      },
    });
  };

  handleConfirmEdit = () => {
    const { editRoute } = this.state;

    if (!isValueEmptyOrNull(editRoute.name)) {
      this.props.requestCreateOrEditRoute(editRoute);
    } else
      this.setState({
        editHasError: true,
      });
  };

  handleOnDelete = (index) => {
    let routes = this.state.routes[index];
    this.setState({
      openDeleteDialog: true,
      routeToDelete: routes,
    });
  };

  routePageChange = (offset, e) => {
    this.setState(
      {
        offset,
      },
      () => this.getRoutes()
    );
  };

  changeSearch = (value) => {
    this.setState({
      isSearching: true,
    });
    this.getRoutes(false);
  };

  handleEditChange = (e) => {
    const name = e.currentTarget.value;
    this.setState((prevState) => ({
      editRoute: { ...prevState.editRoute, name },
    }));
  };

  handleRouteQueryChange = (query) => {
    const name = query.currentTarget.value;
    this.setState((prevState) => ({
      newRoute: { ...prevState.newRoute, name },
      searchText: name,
    }));
    this.changeSearchDebounce(name);
  };

  confirmDelete = () => {
    let routeIds = [this.state.routeToDelete];
    this.props.requestDeleteRoute(routeIds);
  };

  render() {
    const { classes, t, theme } = this.props;
    const {
      routes,
      offset,
      limit,
      routeToDelete,
      openDeleteDialog,
    } = this.state;
    let dataCount = 2;
    return (
      <main className={classes.layout}>
        <div className={classes.fill}>
          <Paper elevation={2} className={classes.paper}>
            <Avatar className={classes.customFab}>
              <DirectionsRoundedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              {t("Routes")}
            </Typography>
            <Divider className={classes.customDivider} />
            <Input
              action
              className={classes.imeiInput}
              style={{ width: "100%" }}
              onChange={this.handleRouteQueryChange}
            >
              <input />
              <Button className={classes.inputButton} onClick={this.addRoute}>
                <Icon name="mail" className={classes.leftIcon} />
                {t("Add")}
              </Button>
            </Input>
            <Table
              celled
              style={{ marginTop: 15 }}
              className={classes.elementTable}
            >
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell className={classes.tableHead}>
                    {t("RoutesList")}
                  </Table.HeaderCell>
                  <Table.HeaderCell className={classes.tableHead} />
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {!this.state.isDesktop &&
                  routes.map((item, index) => (
                    <Table.Row key={index}>
                      <Table.Cell>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <Typography>{item.name}</Typography>
                          <div>
                            <IconButton
                              className={classes.button}
                              aria-label="Delete"
                              size="small"
                              onClick={() => this.handleOnDelete(index)}
                            >
                              <DeleteRoundedIcon
                                className={classes.deleteIcon}
                                fontSize="inherit"
                              />
                            </IconButton>
                            <IconButton
                              className={classes.button}
                              aria-label="Edit"
                              size="small"
                              onClick={() => this.handleEditRoute(index)}
                            >
                              <EditRoundedIcon
                                className={classes.editIcon}
                                fontSize="inherit"
                              />
                            </IconButton>
                          </div>
                        </div>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                {this.state.isDesktop &&
                  routes.map((item, index) => (
                    <Table.Row key={index}>
                      <Table.Cell>{item.name}</Table.Cell>
                      <Table.Cell
                        style={{
                          width: "120px",
                          paddingTop: "2px",
                          paddingBottom: "2px",
                        }}
                      >
                        <IconButton
                          className={classes.button}
                          aria-label="Delete"
                          size="small"
                          onClick={() => this.handleOnDelete(index)}
                        >
                          <DeleteRoundedIcon
                            className={classes.deleteIcon}
                            fontSize="inherit"
                          />
                        </IconButton>
                        <IconButton
                          className={classes.button}
                          aria-label="Edit"
                          size="small"
                          onClick={() => this.handleEditRoute(index)}
                        >
                          <EditRoundedIcon
                            className={classes.editIcon}
                            fontSize="inherit"
                          />
                        </IconButton>
                      </Table.Cell>
                    </Table.Row>
                  ))}
              </Table.Body>
            </Table>
            <div style={{ marginTop: 15 }}>
              {routes.length > 0 && (
                <StyledPagination
                  limit={limit}
                  offset={offset}
                  total={dataCount}
                  innerButtonCount={1}
                  outerButtonCount={1}
                  onClick={(e, offset) => this.routePageChange(offset, e)}
                  currentPageColor="inherit"
                  otherPageColor="inherit"
                  previousPageLabel={
                    <ArrowLeft style={styles.iconRotateStyle} />
                  }
                  nextPageLabel={<ArrowRight />}
                  //className={classes.customPagination}
                />
              )}
            </div>
          </Paper>
        </div>

        <Dialog
          onClose={() => this.setState({ editRoute: undefined })}
          aria-labelledby="simple-dialog-title"
          open={!isNullOrUndefined(this.state.editRoute)}
        >
          <DialogTitle id="simple-dialog-title">{t("EditRoute")}</DialogTitle>
          <DialogContent>
            <Input
              action
              className={classes.imeiInput}
              style={{ width: "100%" }}
              onChange={this.handleEditChange}
              value={
                !isNullOrUndefined(this.state.editRoute)
                  ? this.state.editRoute.name
                  : ""
              }
            >
              <input />
              <Button
                className={classes.inputButton}
                onClick={this.handleConfirmEdit}
              >
                <Icon name="mail" className={classes.leftIcon} />
                {t("Edit")}
              </Button>
            </Input>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => this.setState({ editRoute: undefined })}
              autoFocus
              size="small"
              style={{ color: theme.palette.text.main }}
            >
              {t("cancel")}
            </Button>
          </DialogActions>
        </Dialog>

        {routeToDelete && (
          <ConfirmationDialogAction
            title={t("DeleteRoute")}
            body={
              t("TheRouteWillBeDeleted") +
              " " +
              routeToDelete.name +
              ", " +
              t("continue")
            }
            success={this.props.successDeleteRoute}
            loading={this.props.loadingDeleteRoute}
            error={this.props.error}
            deleteFunction={this.props.requestDeleteRoute}
            elementId={[routeToDelete.id]}
            updateParentFunction={() => {
              this.getRoutes();
              this.setState({
                openDeleteDialog: false,
                optionSelected: undefined,
              });
            }}
            open={this.state.openDeleteDialog}
            onClose={() => this.setState({ openDeleteDialog: false })}
          />
        )}
      </main>
    );
  }
}

const mapDispatchToProps = {
  requestGetRoutes,
  requestCreateOrEditRoute,
  requestDeleteRoute,
};

function mapStateToProps({ Panel }) {
  return {
    routes: Panel.routes,
    error: Panel.error,
    successGetRoutes: Panel.successGetRoutes,
    successCreateOrEditRoute: Panel.successCreateOrEditRoute,
    successEditRoute: Panel.successEditRoute,
    createResponse: Panel.createResponse,
    editResponse: Panel.editResponse,
    successDeleteRoute: Panel.successDeleteRoute,
    loadingDeleteRoute: Panel.loadingDeleteRoute,
  };
}

const RouteReaderConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(RouteReader);

export default withTranslation()(
  withStyles(styles, { withTheme: true })(RouteReaderConnected)
);
