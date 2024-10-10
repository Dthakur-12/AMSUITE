import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from '@mui/styles';
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import CardIcon from "@mui/icons-material/CreditCardRounded";
import DeleteIcon from "@mui/icons-material/DeleteRounded";
import EditIcon from "@mui/icons-material/EditRounded";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import LinearProgress from "@mui/material/LinearProgress";
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  TextField,
  DialogActions,
  CircularProgress,
  InputBase,
  Collapse
} from "@mui/material";
import StatusIcon from "@mui/icons-material/FilterNoneRounded";
import NavBarAccessControl from "../../utils/NavBarAccessControl";
import ApiHandler from "../../../../services/ApiHandler";
import TableSkeletonLoader from "../../../Shared/TableSkeletonLoader";
import AddIcon from "@mui/icons-material/AddRounded";
import SearchIcon from "@mui/icons-material/SearchRounded";
import { isValueEmptyOrNull } from "../../../../utils/HelperFunctions";
import SnackbarHandler from "../../../../utils/SnackbarHandler";
import { isNullOrUndefined } from "util";
import ConfirmationDialog from "../../../Shared/ConfirmationDialog";
import { withTranslation } from "react-i18next";
import styles from "../../../../assets/styles/AccessControl_styles/Badge_styles/badgeStatusStyle";

const initValues = { name: "" };

class BadgeStatus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      openFormDialog: false,
      badgeStatusOnEdit: undefined,
      newStatus: initValues,
      openDeleteDialog: false
    };
  }

  componentDidMount() {
    this.loadBadgeStatus();
  }

  loadBadgeStatus = () => {
    ApiHandler.AccessControl.Badges.getAllBadgeStatus()
      .then(({ data }) => {
        this.setState({
          badgeStatus: data,
          badgeStatusConst: data,
          isLoading: false
        });
        NavBarAccessControl.hideLoader();
      })
      .catch(({ error }) => {
        console.log(error);
        this.setState({
          isLoading: false,
          badgeStatus: []
        });
        NavBarAccessControl.hideLoader();
      });
  };

  handleAdd = () => {
    this.setState({
      openFormDialog: true
    });
  };

  handleCloseFormDialog = () => {
    this.setState({
      openFormDialog: false,
      badgeStatusOnEdit: undefined,
      newStatus: initValues
    });
  };

  handleQueryChange = query => {
    let data = this.state.badgeStatusConst.slice();
    let value = query.currentTarget.value;
    this.setState(state => ({
      ...state,
      badgeStatus: data.filter(item =>
        item.toLowerCase().includes(value.toLowerCase())
      )
    }));
  };

  handleCreateStatus = () => {
    const { newStatus } = this.state;
    const { t } = this.props;
    this.setState({
      isCreating: true
    });
    ApiHandler.EasyAccess.Badges.createBadgeStatus(newStatus)
      .then(() => {
        this.setState({
          isCreating: false,
          optionSelected: undefined
        });
        this.handleCloseFormDialog();
        SnackbarHandler.showMessage(t("createSuccessStatus"));
        NavBarAccessControl.showLoader();
        this.loadBadgeStatus();
      })
      .catch(({ error }) => {
        console.log(error);
        this.setState({
          isCreating: false
        });
        this.handleCloseFormDialog();
        SnackbarHandler.showMessage(error.message, "error");
      });
  };

  handleEditStatus = () => {
    const { newStatus, badgeStatusOnEdit } = this.state;
    const { t } = this.props;
    this.setState({
      isCreating: true
    });
    let editValues = JSON.parse(JSON.stringify(newStatus));
    editValues.id = badgeStatusOnEdit.id;
    ApiHandler.EasyAccess.Badges.editBadgeStatus(editValues)
      .then(() => {
        this.setState({
          isCreating: false,
          optionSelected: undefined
        });
        this.handleCloseFormDialog();
        SnackbarHandler.showMessage(t("editSuccessStatus"));
        NavBarAccessControl.showLoader();
        this.loadBadgeStatus();
      })
      .catch(({ error }) => {
        console.log(error);
        this.setState({
          isCreating: false
        });
        this.handleCloseFormDialog();
        SnackbarHandler.showMessage(error.message, "error");
      });
  };

  handleChange = name => event => {
    let value = event.currentTarget ? event.currentTarget.value : event.value;
    this.setState(prevState => ({
      newStatus: {
        ...prevState.newStatus,
        [name]: value
      }
    }));
  };

  handleStatusSelected = index => {
    const { optionSelected } = this.state;
    this.setState({
      optionSelected: optionSelected === index ? undefined : index
    });
  };

  handleOnEdit = item => {
    this.setState({
      badgeStatusOnEdit: item,
      openFormDialog: true,
      newStatus: item
    });
  };

  handleOnDelete = item => {
    this.setState({
      openDeleteDialog: true,
      newStatus: item
    });
  };

  render() {
    const { classes, t, theme } = this.props;
    const {
      badgeStatus,
      isLoading,
      isCreating,
      badgeStatusOnEdit,
      newStatus,
      openDeleteDialog
    } = this.state;
    if (isLoading)
      return (
        <main className={classes.layout}>
          <div className={classes.fill}>
            <div className={classes.skeletonLoader}>
              <TableSkeletonLoader />
            </div>
          </div>
        </main>
      );
    return (
      (<main className={classes.layout}>
        <div className={classes.fill}>
          <LinearProgress
            style={{
              opacity: this.state.isCreating ? "1" : "0",
              width: "100%",
              background: "none",
              borderBottomLeftRadius: 50,
              borderBottomRightRadius: 50
            }}
            variant="query"
          />
          <Paper elevation={2} className={classes.paper}>
            <Avatar className={classes.avatar}>
              <CardIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              {t("cardStatus")}
            </Typography>
            <Divider
              style={{ width: "100%", marginTop: 10, marginBottom: 0 }}
            />
            <List style={{ width: "100%", paddingTop: 2 }}>
              <ListItem button onClick={this.handleAdd}>
                <ListItemAvatar>
                  <Avatar className={classes.avatarCreate}>
                    <AddIcon color="action" />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={t("addStatus")} />
              </ListItem>
              <Divider
                style={{ width: "100%", marginTop: 2, marginBottom: 2 }}
              />
              <ListItem style={{ paddingLeft: 0, paddingRight: 0 }}>
                <div className={classes.search}>
                  <div className={classes.searchIcon}>
                    <SearchIcon color="secondary" />
                  </div>
                  <InputBase
                    placeholder={t("search") + "..."}
                    classes={{
                      root: classes.inputRoot,
                      input: classes.inputInput
                    }}
                    onChange={this.handleQueryChange}
                  />
                </div>
              </ListItem>
              {badgeStatus.map((b, index) => (
                <React.Fragment key={index}>
                  <ListItem
                    button
                    style={{}}
                    onClick={() => this.handleStatusSelected(index)}
                  >
                    <ListItemAvatar>
                      <Avatar className={classes.avatarList}>
                        <StatusIcon style={{ fontSize: 16 }} />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={b.name} />
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
                        <Button
                          onClick={() => this.handleOnEdit(b)}
                          size="small"
                          variant="contained"
                          color="primary"
                          style={{
                            boxShadow: "unset",
                            width: "50%",
                            borderRadius: 0,
                            fontSize: 12
                          }}
                        >
                          {t("edit")}
                          <EditIcon style={{ fontSize: 18, marginLeft: 10 }} />
                        </Button>
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
                            fontSize: 12
                          }}
                        >
                          {t("delete")}
                          <DeleteIcon
                            style={{ fontSize: 18, marginLeft: 10 }}
                          />
                        </Button>
                      </ListItem>
                    </List>
                  </Collapse>
                </React.Fragment>
              ))}
            </List>
          </Paper>
          <Dialog
            open={this.state.openFormDialog}
            onClose={this.handleCloseFormDialog}
            onBackdropClick={this.handleCloseFormDialog}
            fullWidth
            maxWidth="sm"
          >
            <DialogTitle id="form-dialog-title">
              {isNullOrUndefined(badgeStatusOnEdit)
                ? t("newStatus")
                : t("editStatus")}
            </DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                label={t("name")}
                type="text"
                fullWidth
                onChange={this.handleChange("name")}
                value={newStatus.name}
                helperText={t("inputEmpty")}
              />
            </DialogContent>
            <DialogActions>
              <Button
                onClick={this.handleCloseFormDialog}
                style={{ color: theme.palette.text.main }}>
                {t("cancel")}
              </Button>
              <div className={classes.wrapper}>
                <Button
                  disabled={isCreating || isValueEmptyOrNull(newStatus.name)}
                  onClick={
                    isNullOrUndefined(badgeStatusOnEdit)
                      ? this.handleCreateStatus
                      : this.handleEditStatus
                  }
                  variant="contained"
                  color="primary"
                >
                  {t("confirm")}
                </Button>
                {isCreating && (
                  <CircularProgress
                    size={24}
                    className={classes.buttonProgress}
                  />
                )}
              </div>
            </DialogActions>
          </Dialog>
          <ConfirmationDialog
            title={t("deleteStatus")}
            body={`${t("confirmDeleteStatus")} ${newStatus.name}, ${t(
              "continue"
            )}`}
            deleteFunction={ApiHandler.EasyAccess.Badges.deleteStatus}
            elementId={newStatus.id}
            updateParentFunction={() => {
              this.loadBadgeStatus();
              this.setState({
                openDeleteDialog: false,
                optionSelected: undefined
              });
            }}
            open={openDeleteDialog}
            onClose={() => this.setState({ openDeleteDialog: false })}
          />
        </div>
      </main>)
    );
  }
}
BadgeStatus.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withTranslation()(
  withStyles(styles, { withTheme: true })(BadgeStatus)
);
