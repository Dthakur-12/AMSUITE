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
import PropTypes from "prop-types";
import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";
import styles from "../../../assets/styles/User_styles/listStyles";

import { Activity, Entities } from "../../../utils/Enums";
import ConfirmationDialog from "../../Shared/ConfirmationDialog";

import TablePagination from "@mui/material/TablePagination";
import { debounce } from "throttle-debounce";

const mapStateToProps = ({ User }) => {
  return {
    currentUser: User.currentUser,
  };
};

let page = 0;
let rowsPerPage = 10;

const initValues = { name: "" };

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      openFormDialog: false,
      elementOnEdit: undefined,
      newElement: initValues,
      openDeleteDialog: false,
      searchText: "",
    };
    this.changeSearchDebounce = debounce(500, (value) =>
      this.changeSearch(value)
    );
  }

  componentDidMount() {
    this.loadElements();
  }

  loadElements = () => {
    const { searchText } = this.state;
    const { attribute, isActiveDirectory, type } = this.props;
    this.props
      .loadData({
        start: page * rowsPerPage,
        length: (page + 1) * rowsPerPage,
        order: `${attribute} asc`, //columns[activeColumnSort].field + " " + order,
        search: searchText,
        type: type,
      })
      .then(({ data }) => {
        this.setState({
          elements: data.data,
          elementsCount: data.dataCount,
          isLoading: false,
        });
      })
      .catch(({ error }) => {
        this.setState({
          isLoading: false,
          elements: [],
        });
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
      elementOnEdit: undefined,
      newElement: { name: "" },
    });
    this.loadElements();
  };
  changeSearch = (value) => {
    this.setState({
      isSearching: true,
    });
    this.loadElements();
  };

  handleQueryChange = (query) => {
    let value = query.currentTarget.value;
    this.setState({
      searchText: value,
    });
    this.changeSearchDebounce(value);
  };

  handleElementCreated = () => {
    console.log("ENTRAAAAAAAAAAAAAAAAAAA");
    this.handleCloseFormDialog();
    this.loadElements();
  };

  handleStatusSelected = (index) => {
    const { optionSelected } = this.state;
    this.setState({
      optionSelected: optionSelected === index ? undefined : index,
    });
  };

  handleChangePage = (e) => {
    const value = e ? e.currentTarget.value : 0;
    if (value === "next") page = page + 1;
    else if (value === "previous" && page > 0) page = page - 1;
    this.loadElements();
  };

  handleChangeRowsPerPage = (e) => {
    const value = e.currentTarget.dataset.value;
    console.log("value: ", value);
    rowsPerPage = Number(value);
    this.loadElements();
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

  handleOnDelete = (item) => {
    this.setState({
      openDeleteDialog: true,
      newElement: item,
    });
  };

  handleOnEdit = (item) => {
    let newData = {};
    this.props.getElementDetails(item.id).then(({ data }) => {
      if (this.props.processExtraData)
        newData = this.props.processExtraData(data);
      this.setState({
        elementOnEdit: this.props.processExtraData ? newData : data,
        openFormDialog: true,
        newElement: this.props.processExtraData ? newData : data,
      });
    });
  };

  render() {
    const {
      classes,
      t,
      secondAttribute,
      attribute,
      primaryTitle,
      actionTitle,
    } = this.props;
    const {
      elements,
      isLoading,
      elementOnEdit,
      newElement,
      openDeleteDialog,
      elementsCount,
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
              {primaryTitle}
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
                    <ListItemText primary={actionTitle} />
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
              {isLoading && (
                <div
                  style={{
                    width: "100%",
                    justifyContent: "center",
                    display: "flex",
                  }}
                >
                  <CircularProgress color="primary" />
                </div>
              )}
              {!isLoading &&
                elements.map((b, index) => (
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
                        primary={`${b[attribute]}`}
                        secondary={secondAttribute ? b[secondAttribute] : ""}
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
              count={elementsCount ? elementsCount : 0}
              labelRowsPerPage={`${t("show")} : `}
              labelDisplayedRows={() =>
                `${page * rowsPerPage + 1} - ${(page + 1) * rowsPerPage} ${t(
                  "of"
                )} ${elementsCount}`
              }
              rowsPerPage={rowsPerPage}
              page={page}
              backIconButtonProps={{
                "aria-label": "previous page",
                disableRipple: true,
                value: "previous",
              }}
              nextIconButtonProps={{
                "aria-label": "next page",
                disableRipple: true,
                value: "next",
              }}
              onPageChange={this.handleChangePage}
              onRowsPerPageChange={this.handleChangeRowsPerPage}
              className={classes.customPagination}
            />
          </Paper>
          <ConfirmationDialog
            title={this.props.deleteTitlte}
            body={
              t("TheElementWillBeDeleted") +
              " " +
              newElement.name +
              " ," +
              t("continue")
            }
            deleteFunction={this.props.deleteFunction}
            elementId={newElement.id}
            updateParentFunction={() => {
              this.loadElements();
              this.setState({
                openDeleteDialog: false,
                optionSelected: undefined,
              });
            }}
            open={openDeleteDialog}
            onClose={() => this.setState({ openDeleteDialog: false })}
          />
          {this.props.renderComponent(
            this.state.openFormDialog,
            this.handleCloseFormDialog,
            this.handleElementCreated,
            elementOnEdit
          )}
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
