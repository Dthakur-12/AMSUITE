import React, { Component } from "react";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import { withStyles } from '@mui/styles';
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import ApiHandler from "../../../../services/ApiHandler";
import PlusIcon from "@mui/icons-material/AddRounded";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import green from "@mui/material/colors/green";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ChevronIcon from "@mui/icons-material/ChevronRightRounded";
import DataTableDialog from "../../../Shared/DataTable/DataTableDialog";
import LinearProgress from "@mui/material/LinearProgress";
import { List, ListItemIcon } from "@mui/material";
import { isValueEmptyOrNull } from "../../../../utils/HelperFunctions";
import { isNullOrUndefined } from "util";
import SnackbarHandler from "../../../../utils/SnackbarHandler";
import NavBarAccesControl from "../../utils/NavBarAccessControl";
import Fab from "@mui/material/Fab";
import classnames from "classnames";
import { withTranslation } from "react-i18next";
import styles from "../../../../assets/styles/AccessControl_styles/AccesLevel_styles/newAccessLevelStyles";
import DataTableSelect from "../../../Shared/DataTable/DataTableSelect";
const formValues = {
  name: "",
  readers: [],
  timeZone: undefined
};

class NewAccessLevel extends Component {
  constructor(props) {
    super(props);
    const { initValues } = props;

    this.state = {
      showTimeZones: true,
      showReaders: true,
      openDialogReaders: false,
      openDialogTimeZones: false,
      newAccessLevel: initValues ? initValues : formValues,
      formErrors: {}
    };
  }

  componentDidMount() {
    NavBarAccesControl.hideLoader();
    if (this.props.isEdit || this.props.isDetails) {
      const { newAccessLevel } = this.state;
      ApiHandler.AccessControl.AccessLevels.getAccessLevel(newAccessLevel.id)
        .then(({ data }) => {
          this.setState(prevState => ({
            newAccessLevel: {
              ...prevState.newStatus,
              name: data.name,
              readers: data.readersObject,
              timeZone: data.timeZonesObject[0],
              Id: data.id
            }
          }));
        })
        .catch(err => {
          console.log(err);
        });
    }
  }

  handleTimeZoneSelected = timeZone => {
    this.setState(prevState => ({
      openDialogTimeZones: false,
      newAccessLevel: {
        ...prevState.newAccessLevel,
        timeZone: timeZone
      }
    }));
  };

  handleReaderSelected = reader => {
    this.setState(prevState => ({
      openDialogReaders: false,
      newAccessLevel: {
        ...prevState.newAccessLevel,
        readers: reader
      }
    }));
  };

  handleOpenTimeZones = () => {
    this.setState({
      openDialogTimeZones: true
    });
  };
  handleOpenReaders = () => {
    this.setState({
      openDialogReaders: true
    });
  };

  handleChange = name => event => {
    let value = event.currentTarget ? event.currentTarget.value : event.value;
    this.setState(prevState => ({
      newAccessLevel: {
        ...prevState.newAccessLevel,
        [name]: value
      }
    }));
  };

  validateCreate = () => {
    const { newAccessLevel } = this.state;
    return {
      name: isValueEmptyOrNull(newAccessLevel.name),
      readers: newAccessLevel.readers.length === 0,
      timeZone: isNullOrUndefined(newAccessLevel.timeZone)
    };
  };

  handleCreate = () => {
    const { t } = this.props;
    const errors = this.validateCreate();
    this.setState({
      formErrors: errors
    });
    if (!Object.keys(errors).some(x => errors[x])) {
      let newAccessLevel = JSON.parse(
        JSON.stringify(this.state.newAccessLevel)
      );
      newAccessLevel.readers = newAccessLevel.readers.map(r => r.id);

      newAccessLevel.TimeZones = [newAccessLevel.timeZone.id];
      this.setState({
        isCreating: true
      });
      ApiHandler.AccessControl.AccessLevels.createAccessLevel(newAccessLevel)
        .then(() => {
          this.setState({
            isCreating: false,
            isSuccess: true
          });
          SnackbarHandler.showMessage(t("createSuccessAccessLevel"));
          setTimeout(() => {
            this.setState({
              isSuccess: false,
              isCreating: false,
              newAccessLevel: formValues
            });
          }, 1000);
        })
        .catch(({ error }) => {
          this.setState({
            isSuccess: false,
            isCreating: false
          });
          SnackbarHandler.showMessage(error.message, "error");
        });
    } else {
      SnackbarHandler.showMessage(t("inputIncomplete"), "error");
    }
  };

  handleEdit = () => {
    const { t } = this.props;
    const errors = this.validateCreate();
    this.setState({
      formErrors: errors
    });
    if (!Object.keys(errors).some(x => errors[x])) {
      let newAccessLevel = JSON.parse(
        JSON.stringify(this.state.newAccessLevel)
      );
      newAccessLevel.readers = newAccessLevel.readers.map(r => r.id);
      newAccessLevel.TimeZones = [newAccessLevel.timeZone.id];

      this.setState({
        isCreating: true
      });
      ApiHandler.AccessControl.AccessLevels.editAccessLevel(newAccessLevel)
        .then(() => {
          this.setState({
            isCreating: false,
            isSuccess: true
          });
          SnackbarHandler.showMessage(t("editSuccessAccessLevel"));
          this.props.updateParent();
          this.props.onEdit();
          setTimeout(() => {
            this.setState({
              isSuccess: false,
              isCreating: false,
              newAccessLevel: formValues
            });
          }, 1000);
        })
        .catch(({ error }) => {
          this.setState({
            isSuccess: false,
            isCreating: false
          });
          SnackbarHandler.showMessage(error.message, "error");
        });
    } else {
      SnackbarHandler.showMessage(t("inputIncomplete"), "error");
    }
  };

  renderReaders = () => {
    const { classes, isDetails, t } = this.props;
    const { newAccessLevel } = this.state;

    if (isValueEmptyOrNull(newAccessLevel.readers)) return <span />;
    return (
      (<List className={classes.listRoot}>
        <ListItem style={{ padding: 0 }}>
          {!isDetails && (
            <Fab
              size="small"
              color="default"
              className={classes.customFab}
              onClick={this.handleOpenReaders}
            >
              <PlusIcon />
            </Fab>
          )}
          {!isDetails && (
            <ListItemText
              disableTypography
              inset
              primary={
                <Typography
                  type="body2"
                  className={
                    this.state.formErrors.readers ? classes.withError : ""
                  }
                >
                  {t("Readers") +
                    (newAccessLevel.readers.length !== 0
                      ? ": " + newAccessLevel.readers.length
                      : "")}
                </Typography>
              }
            />
          )}
          {
            <IconButton
              className={classnames(classes.expand, {
                [classes.expandOpen]: this.state.showReaders
              })}
              disabled={newAccessLevel.readers.length === 0}
              onClick={() =>
                this.setState({ showReaders: !this.state.showReaders })
              }
              size="large">
              <ExpandMore />
            </IconButton>
          }
        </ListItem>
        <Collapse in={this.state.showReaders} timeout="auto" unmountOnExit>
          <List dense component="div" disablePadding>
            {newAccessLevel.readers.map(reader => (
              <ListItem key={reader.id} className={classes.nested}>
                <ListItemIcon>
                  <ChevronIcon />
                </ListItemIcon>
                <ListItemText inset primary={reader.name} />
              </ListItem>
            ))}
          </List>
        </Collapse>
      </List>)
    );
  };

  render() {
    const {
      newAccessLevel,
      openDialogReaders,
      openDialogTimeZones
    } = this.state;
    const { classes, isDialog, isDetails, t, isEdit, theme } = this.props;

    return (
      <main className={!isDialog ? classes.layout : undefined}>
        <div className={!isDialog ? classes.fill : undefined}>
          <LinearProgress
            style={{
              opacity: this.state.isCreatinh ? "1" : "0",
              width: "100%",
              background: "none",
              borderBottomLeftRadius: 50,
              borderBottomRightRadius: 50
            }}
            variant="query"
          />
          <Paper elevation={!isDialog ? 2 : 0} className={classes.paper}>
            <Avatar className={classes.avatar}>
              <PlusIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              {t("newAccessLevelResource")}
            </Typography>

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
                  helperText={t("inputEmpty")}
                  FormHelperTextProps={{
                    style: { opacity: this.state.formErrors.name ? 1 : 0 }
                  }}
                  error={this.state.formErrors.name}
                  disabled={isDetails}
                  value={this.state.newAccessLevel.name}
                />
              </Grid>

              <Grid container item xs={12} md={12} spacing={24}>
                <Grid item xs={12} md={6}>
                  <div>
                    <DataTableSelect
                      handleConfirm={this.handleTimeZoneSelected}
                      loadDataFunction={
                        ApiHandler.AccessControl.TimeZones.getTimeZones
                      }
                      element={newAccessLevel.timeZone}
                      primaryTitle={t("managerTimeZone")}
                      title={t("managerTimeZone")}
                      dataTableSubTitle={t("selectTheTimeZoneToAssign")}
                      mdSubtitle={3}
                      DataTableColumns={[
                        {
                          name: t("name"),
                          field: "name",
                          options: {
                            sort: true,
                            filter: true,
                            sortDirection: "asc",
                            customBodyRender: data => {
                              if (data.name)
                                return (
                                  <Typography value={data.name}>
                                    {data.name}
                                  </Typography>
                                );
                            }
                          }
                        }
                      ]}
                      multipleSelect={false}
                      attribute={"name"}
                      hasError={this.state.formErrors.timeZone}
                    />
                  </div>
                </Grid>

                <Grid item xs={12} md={6}>
                  <div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        paddingRight: 15
                      }}
                    >
                      <Typography component="h1" variant="subtitle1">
                        {t("readerToAssign")}
                      </Typography>
                      {isValueEmptyOrNull(newAccessLevel.readers) && (
                        <CircularProgress
                          size={20}
                          style={{ color: "white" }}
                        />
                      )}
                    </div>
                    <Divider className={classes.customDivider} />
                    {this.renderReaders()}
                  </div>
                </Grid>
              </Grid>
            </Grid>

            {!isDetails && (
              <div
                className={classes.submit}
                style={{ position: "relative", width: "100%" }}
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
                    color: "white"
                  }}
                >
                  {this.state.isSuccess
                    ? isEdit
                      ? t("successEdit")
                      : t("successCreate")
                    : this.state.isCreating
                    ? ""
                    : isEdit
                    ? t("EditAccessLevel")
                    : t("createAccessLevel")}
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
                      color: "white"
                    }}
                  />
                )}
              </div>
            )}
          </Paper>

          {!isValueEmptyOrNull(newAccessLevel.readers) && (
            <DataTableDialog
              open={openDialogReaders}
              onConfirm={this.handleReaderSelected}
              onClose={() => this.setState({ openDialogReaders: false })}
              title={t("managerReader")}
              subTitle={t("selectTheReadersToAssign")}
              loadDataFunction={ApiHandler.EasyAccess.Readers.getReaders}
              rowsSelected={newAccessLevel.readers}
              multipleSelect={true}
              columns={[
                {
                  name: t("name"),
                  field: "name",
                  options: {
                    sort: true,
                    filter: true,
                    sortDirection: "asc",
                    customBodyRender: data => {
                      if (data.name)
                        return (
                          <Typography value={data.name}>{data.name}</Typography>
                        );
                    }
                  }
                }
              ]}
            />
          )}
        </div>
      </main>
    );
  }
}

NewAccessLevel.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};
// const InitalConnected = connect(null, mapDispatchToProps)(Init)

export default withTranslation()(
  withStyles(styles, { withTheme: true })(NewAccessLevel)
);
