import {
  Button,
  CircularProgress,
  Collapse,
  InputBase,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import LinearProgress from "@mui/material/LinearProgress";
import Paper from "@mui/material/Paper";
import { withStyles } from '@mui/styles';
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/AddRounded";
import DeleteIcon from "@mui/icons-material/DeleteRounded";
import EditIcon from "@mui/icons-material/EditRounded";
import GroupIcon from "@mui/icons-material/GroupRounded";
import PersonIcon from "@mui/icons-material/PersonRounded";
import SearchIcon from "@mui/icons-material/SearchRounded";
import PointIcon from "@mui/icons-material/FiberManualRecord";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";
import ApiHandler from "../../../services/ApiHandler";
import { Activity, Entities } from "../../../utils/Enums";
import ConfirmationDialog from "../../Shared/ConfirmationDialog";
import NavBarUsers from "../utils/NavBarUsers";
import NewUser from "./Register/NewUser";
import TablePagination from "@mui/material/TablePagination";
import { debounce } from "throttle-debounce";
import { socketIO } from "../../../utils/WebSockets";
import styles from "../../../assets/styles/User_styles/usersStyles";

const mapStateToProps = ({ User }) => {
  return {
    currentUser: User.currentUser,
  };
};

//let page = 0;
//let rowsPerPage = 10;
//let activeColumnSort = 0;
//let order = "desc";

const initValues = { name: "" };

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      openFormDialog: false,
      userOnEdit: undefined,
      newUser: initValues,
      openDeleteDialog: false,
      searchText: "",
      page: 0,
      rowsPerPage: 10,
    };
    this.changeSearchDebounce = debounce(500, (value) =>
      this.changeSearch(value)
    );
  }

  componentWillUnmount = () => {
    socketIO.emit("unsubscribeConnectedUsers");
  };

  componentDidMount() {
    socketIO.emit("subscribeConnectedUsers", {});
    const loadConnectedUsers = this.loadConnectedUsers;
    socketIO.on("connectedUsers", function (data) {
      loadConnectedUsers(data);
    });
    this.loadUsers();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.rowsPerPage !== this.state.rowsPerPage ||
      prevState.page !== this.state.page
    ) {
      this.loadUsers();
    }
  }

  loadConnectedUsers = (data) => {
    this.setState({ connectedUsers: data.users });
  };

  loadUsers = (isSearch) => {
    const { searchText, page, rowsPerPage } = this.state;

    ApiHandler.AMSuite.User.GetUsers({
      start: isSearch ? 0 : page * rowsPerPage,
      length: rowsPerPage,
      order: "username asc", //columns[activeColumnSort].field + " " + order,
      search: searchText,
    })
      .then(({ data }) => {
        this.setState({
          users: data.data,
          usersCount: data.dataCount,
          isLoading: false,
        });
        NavBarUsers.hideLoader();
      })
      .catch(({ error }) => {
        this.setState({
          isLoading: false,
          users: [],
        });
        NavBarUsers.hideLoader();
      });
  };

  handleAdd = () => {
    this.setState({
      openFormDialog: true,
    });
  };

  handleCloseFormDialog = () => {
    this.setState({
      openFormDialog: false,
      userOnEdit: undefined,
      newUser: { name: "" },
    });
  };
  changeSearch = (value) => {
    this.setState({
      isSearching: true,
    });
    this.loadUsers(true);
  };

  handleQueryChange = (query) => {
    let value = query.currentTarget.value;
    this.setState({
      searchText: value,
    });
    this.changeSearchDebounce(value);
  };

  handleUserCreated = () => {
    this.handleCloseFormDialog();
    NavBarUsers.showLoader();
    this.loadUsers();
  };

  handleChange = (name) => (event) => {
    let value = event.currentTarget ? event.currentTarget.value : event.value;
    this.setState((prevState) => ({
      newUser: {
        ...prevState.newUser,
        [name]: value,
      },
    }));
  };

  handleStatusSelected = (index) => {
    const { optionSelected } = this.state;
    this.setState({
      optionSelected: optionSelected === index ? undefined : index,
    });
  };

  handleOnEdit = (item) => {
    ApiHandler.AMSuite.User.GetUser(item.id).then(({ data }) => {
      const activities = [1, 2, 3, 4];
      let permissions = {};
      activities.map((activity) => {
        permissions = {
          ...permissions,
          [activity]: Object.keys(data.permissions).filter((k) =>
            data.permissions[k].some((v) => parseInt(v) === activity)
          ),
        };
        return 0;
      });

      const userData = {
        ...data,
        permissions: permissions,
        fullEnterpriseVisibility: data.fullEnterpriseVisibility ? "1" : "0",
        password: "",
      };
      this.setState({
        userOnEdit: userData,
        openFormDialog: true,
        newUser: userData,
      });
    });
  };
  handleChangePage = (event, page) => {
    this.setState({ page });
  };
  handleOnDelete = (item) => {
    this.setState({
      openDeleteDialog: true,
      newUser: item,
    });
  };

  handleChangeRowsPerPage = (e) => {
    const value = Number(e.currentTarget.dataset.value);
    this.setState({ rowsPerPage: value });
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

  render() {
    const { classes, t } = this.props;
    const {
      users,
      isLoading,
      userOnEdit,
      newUser,
      openDeleteDialog,
      usersCount,
      page,
      rowsPerPage,
      connectedUsers = [],
    } = this.state;
    return (
      (<main className={classes.layout}>
        <div className={classes.fill}>
          <LinearProgress
            style={{
              opacity: this.state.isCreating ? "1" : "0",
              width: "100%",
              background: "none",
              borderBottomLeftRadius: 50,
              borderBottomRightRadius: 50,
            }}
            variant="query"
          />
          <Paper elevation={2} className={classes.paper}>
            <Avatar className={classes.avatar}>
              <GroupIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              {t("Users")}
            </Typography>
            <Divider className={classes.customDivider} />
            <List style={{ width: "100%", paddingTop: 2 }}>
              {this.handleLicence(
                [Entities.USERS.toString()],
                Activity.CREATE
              ) && (
                <div>
                  <ListItem button onClick={this.handleAdd}>
                    <ListItemAvatar>
                      <Avatar className={classes.avatarCreate}>
                        <AddIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={t("AddUser")} />
                  </ListItem>

                  <Divider className={classes.customDivider} />
                </div>
              )}

              <ListItem style={{ paddingLeft: 0, paddingRight: 0 }}>
                <div className={classes.search}>
                  <div className={classes.searchIcon}>
                    <SearchIcon />
                  </div>
                  <InputBase
                    placeholder={t("search") + "..."}
                    classes={{
                      root: classes.inputRoot,
                      input: classes.inputInput,
                    }}
                    onChange={this.handleQueryChange}
                  />
                </div>
              </ListItem>
              {isLoading ||
                (!connectedUsers && (
                  <div
                    style={{
                      width: "100%",
                      justifyContent: "center",
                      display: "flex",
                    }}
                  >
                    <CircularProgress color="primary" />
                  </div>
                ))}
              {!isLoading &&
                connectedUsers &&
                users.map((b, index) => (
                  <React.Fragment key={index}>
                    <ListItem
                      button
                      style={{}}
                      onClick={() => this.handleStatusSelected(index)}
                    >
                      <ListItemAvatar>
                        <Avatar className={classes.avatarList}>
                          <PersonIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={`${b.name} ${b.lastname}`}
                        secondary={`${b.userName} - ${b.email}`}
                      />{" "}
                      <PointIcon
                        style={{
                          color: connectedUsers.includes(b.id)
                            ? "#437043"
                            : "#743631",
                        }}
                      />
                    </ListItem>
                    <Collapse
                      in={this.state.optionSelected === index}
                      timeout="auto"
                      unmountOnExit
                    >
                      <List component="div" disablePadding>
                        <ListItem
                          style={{ paddingTop: 0, paddingBottom: 0 }}
                          className={classes.nested}
                        >
                          {this.handleLicence(
                            [Entities.USERS.toString()],
                            Activity.UPDATE
                          ) && (
                            <Button
                              onClick={() => this.handleOnEdit(b)}
                              size="small"
                              variant="contained"
                              color="primary"
                              style={{
                                boxShadow: "unset",
                                width: "50%",
                                borderRadius: 0,
                                fontSize: 12,
                              }}
                            >
                              {t("edit")}
                              <EditIcon
                                style={{ fontSize: 18, marginLeft: 10 }}
                              />
                            </Button>
                          )}
                          {this.handleLicence(
                            [Entities.USERS.toString()],
                            Activity.DELETE
                          ) && (
                            <Button
                              onClick={() => this.handleOnDelete(b)}
                              size="small"
                              variant="contained"
                              className={classes.errorButton}
                              style={{
                                color: "white",
                                boxShadow: "unset",
                                width: "50%",
                                borderRadius: 0,
                                fontSize: 12,
                              }}
                            >
                              {t("delete")}
                              <DeleteIcon
                                style={{ fontSize: 18, marginLeft: 10 }}
                              />
                            </Button>
                          )}
                        </ListItem>
                      </List>
                    </Collapse>
                  </React.Fragment>
                ))}
            </List>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={usersCount ? usersCount : 0}
              labelRowsPerPage={`${t("show")} : `}
              labelDisplayedRows={() =>
                `${page * rowsPerPage + 1} - ${(page + 1) * rowsPerPage} ${t(
                  "of"
                )} ${usersCount}`
              }
              rowsPerPage={rowsPerPage}
              page={page}
              backIconButtonProps={{
                "aria-label": "Previous Page",
                // value: "previous",
              }}
              nextIconButtonProps={{
                "aria-label": "Next Page",
                // value: "next",
              }}
              onPageChange={this.handleChangePage}
              onRowsPerPageChange={this.handleChangeRowsPerPage}
              className={classes.customPagination}
            />
          </Paper>
          <ConfirmationDialog
            title={t("DeleteUser")}
            body={
              t("TheUserWillBeDeleted") +
              " " +
              newUser.name +
              " " +
              t("continue")
            }
            deleteFunction={ApiHandler.AMSuite.User.Delete}
            elementId={newUser.id}
            updateParentFunction={() => {
              this.loadUsers();
              this.setState({
                openDeleteDialog: false,
                optionSelected: undefined,
              });
            }}
            open={openDeleteDialog}
            onClose={() => this.setState({ openDeleteDialog: false })}
          />
          <NewUser
            open={this.state.openFormDialog}
            handleClose={this.handleCloseFormDialog}
            handleUserCreated={this.handleUserCreated}
            userOnEdit={userOnEdit ? userOnEdit : undefined}
            isEdit={userOnEdit !== undefined}
          />
        </div>
      </main>)
    );
  }
}
Users.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

const UsersConnected = connect(mapStateToProps, null)(Users);

export default withTranslation()(
  withStyles(styles, { withTheme: true })(UsersConnected)
);
