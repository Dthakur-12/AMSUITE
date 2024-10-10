import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withStyles } from '@mui/styles';
import NavBarMustering from "../../utils/NavBarMustering";
import BusinessIcon from "@mui/icons-material/BusinessRounded";
import Typography from "@mui/material/Typography";
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
import LinearProgress from "@mui/material/LinearProgress";
import { List, ListItemIcon } from "@mui/material";
import { isValueEmptyOrNull } from "../../../../utils/HelperFunctions";
import SnackbarHandler from "../../../../utils/SnackbarHandler";
import Fab from "@mui/material/Fab";
import classnames from "classnames";
import DataTableDialog from "../../../Shared/DataTable/DataTableDialog";
import { withTranslation } from "react-i18next";
import styles from "../../../../assets/styles/Mustering_styles/Zone_styles/newZoneStyles";
const mapStateToProps = ({ User }) => {
  return {
    currentUser: User.currentUser,
  };
};

class NewArea extends Component {
  constructor(props) {
    super(props);
    const { initValues, currentUser } = props;
    this.state = {
      isLoadingEnterprises: true,
      isLoadingStatus: true,
      openDialogReaders: false,
      currentUser: currentUser,
      newArea: initValues
        ? initValues
        : {
            readers: [],
            name: "",
          },
      showReader: true,
      entranceReader: [],
      formErrors: {},
    };
  }

  componentDidMount() {
    NavBarMustering.hideLoader();
  }

  handleOpenReader = () => {
    this.setState({
      openDialogReaders: true,
    });
  };

  handleChange = (event) => {
    let name = event.target.name;
    let value = event.currentTarget ? event.currentTarget.value : event.value;
    this.setState((prevState) => ({
      newArea: {
        ...prevState.newArea,
        [name]: value,
      },
    }));
  };

  handleCreate = () => {
    const { newArea } = this.state;
    const { t } = this.props;
    const errors = this.validateCreate();
    this.handleReadersSelected(newArea.readers);
    const readersIds = newArea.readers.map((r) => r.id);
    this.setState({
      formErrors: errors,
    });
    if (!Object.keys(errors).some((x) => errors[x])) {
      ApiHandler.Mustering.Zones.createMusterZone(newArea.name)
        .then((data) => {
          if (readersIds.length > 0) {
            ApiHandler.Mustering.Zones.editReaderOfMusterZone(
              readersIds,
              data.data
            )
              .then((data) => {
                this.setState({
                  isCreating: false,
                  isSuccess: true,
                });
                SnackbarHandler.showMessage(t("SuccessCreateZone"));
                NavBarMustering.showLoader();
                NavBarMustering.appNavigation.history.replace("/zones");
                setTimeout(() => {
                  this.setState({
                    isSuccess: false,
                  });
                }, 1000);
              })
              .catch(({ error }) => {
                SnackbarHandler.showMessage(t(error.errorData), "error");
                this.setState({
                  isCreating: false,
                  isSuccess: false,
                });
              });
          } else {
            this.setState({
              isCreating: false,
              isSuccess: true,
            });
            SnackbarHandler.showMessage(t("SuccessCreateZone"));
            NavBarMustering.showLoader();
            NavBarMustering.appNavigation.history.replace("/zones");
            setTimeout(() => {
              this.setState({
                isSuccess: false,
              });
            }, 1000);
          }
        })
        .catch(({ error }) => {
          SnackbarHandler.showMessage(t(error.errorData), "error");
          this.setState({
            isCreating: false,
            isSuccess: false,
          });
        });
    }
  };

  handleEdit = () => {
    const { newArea } = this.state;
    const { t } = this.props;
    this.handleReadersSelected(newArea.readers);
    const readersIds = newArea.readers.map((r) => r.id);
    const errors = this.validateCreate();
    this.setState({
      formErrors: errors,
    });
    if (!Object.keys(errors).some((x) => errors[x])) {
      ApiHandler.Mustering.Zones.createMusterZone(newArea.name, newArea.id)
        .then((data) => {
          ApiHandler.Mustering.Zones.editReaderOfMusterZone(
            readersIds,
            newArea.id
          )
            .then((data) => {
              this.setState({
                isCreating: false,
                isSuccess: true,
              });
              SnackbarHandler.showMessage(t("SuccessEditZone"));
              this.props.updateParent();
              NavBarMustering.appNavigation.history.replace("/zones");
              setTimeout(() => {
                this.setState({
                  isSuccess: false,
                  isCreating: false,
                });
              }, 1000);
            })
            .catch(({ error }) => {
              console.log(error);
              SnackbarHandler.showMessage(error.message, "error");
              this.setState({
                isCreating: false,
                isSuccess: false,
              });
            });
        })
        .catch(({ error }) => {
          console.log(error);
          SnackbarHandler.showMessage(error.message, "error");
          this.setState({
            isCreating: false,
            isSuccess: false,
          });
        });
    } else {
      SnackbarHandler.showMessage(t("NameNotEmpty"), "error");
    }
  };

  handleReadersSelected = (readers) => {
    let readersId = readers.map((reader) => {
      return reader.id;
    });
    this.setState((prevState) => ({
      openDialogReaders: false,
      newArea: {
        ...prevState.newArea,
        readers: readers,
        readersIds: readersId,
      },
    }));
  };

  validateCreate = () => {
    const { newArea } = this.state;
    return {
      name: isValueEmptyOrNull(newArea.name),
    };
  };

  render() {
    const { classes, isDialog, isEdit, t, theme } = this.props;
    const { newArea, openDialogReaders } = this.state;

    return (
      (<main className={!isDialog ? classes.layout : undefined}>
        <div className={!isDialog ? classes.fill : undefined}>
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
          <Paper elevation={!isDialog ? 2 : 0} className={classes.paper}>
            <Avatar className={classes.avatar}>
              <BusinessIcon />
            </Avatar>
            {this.props.isEdit ? (
              <Typography component="h1" variant="h5">
                {t("EditZone")}
              </Typography>
            ) : (
              <Typography component="h1" variant="h5">
                {t("newArea")}
              </Typography>
            )}
            <Divider
              style={{ width: "100%", marginTop: 10, marginBottom: 24 }}
            />
            <Grid container spacing={24}>
              <Grid item xs={12} md={12} className={classes.grid}>
                <TextField
                  required
                  label={t("name")}
                  fullWidth
                  value={newArea.name}
                  onChange={this.handleChange}
                  name={"name"}
                  helperText={t("inputEmpty")}
                  FormHelperTextProps={{
                    style: { opacity: this.state.formErrors.name ? 1 : 0 },
                  }}
                  error={this.state.formErrors.name}
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <Typography component="h1" variant="subtitle1">
                  {t("MusterZones")}
                </Typography>
                <Divider style={{ marginBottom: 10 }} />
                <List className={classes.listRoot}>
                  <ListItem style={{ padding: 0 }}>
                    <Fab
                      size="small"
                      className={classes.fab}
                      onClick={() => this.handleOpenReader()}
                    >
                      <PlusIcon className={classes.fabIcon} />
                    </Fab>
                    <ListItemText
                      inset
                      primary={
                        t("MusterZones") +
                        (newArea.readers.length !== 0
                          ? ": " + newArea.readers.length
                          : "")
                      }
                    />
                    {
                      <IconButton
                        className={classnames(classes.expand, {
                          [classes.expandOpen]: this.state.showReader,
                        })}
                        disabled={newArea.readers.length === 0}
                        onClick={() =>
                          this.setState({ showReader: !this.state.showReader })
                        }
                        size="large">
                        <ExpandMore />
                      </IconButton>
                    }
                  </ListItem>
                  <Collapse
                    in={this.state.showReader}
                    timeout="auto"
                    unmountOnExit
                  >
                    <List dense component="div" disablePadding>
                      {newArea.readers.map((reader) => (
                        <ListItem key={reader.id} className={classes.nested}>
                          <ListItemIcon>
                            <ChevronIcon />
                          </ListItemIcon>
                          <ListItemText inset primary={reader.name} />
                        </ListItem>
                      ))}
                    </List>
                  </Collapse>
                </List>
              </Grid>
            </Grid>
            <div
              className={classes.submit}
              style={{
                position: "relative",
                width: "100%",
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
                  ? t("EditZone")
                  : t("CreateZone")}
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
          </Paper>
          <DataTableDialog
            open={openDialogReaders}
            onConfirm={this.handleReadersSelected}
            onClose={() => this.setState({ openDialogReaders: false })}
            title={t("ManageReaders")}
            subTitle={t("selectTheReadersToAssign")}
            loadDataFunction={
              ApiHandler.Mustering.Zones.getAllReadersAndReaderOfZone
            }
            extraData={newArea.id}
            rowsSelected={newArea.readers}
            multipleSelect={true}
            columns={[
              {
                name: t("name"),
                field: "name",
                options: {
                  filter: true,
                  sort: true,
                  sortDirection: "asc",
                },
              },
              {
                name: t("Type"),
                field: "type",
                options: {
                  filter: true,
                  sort: true,
                },
              },
              {
                name: t("panel"),
                field: "panel",
                options: {
                  filter: true,
                  sort: true,
                },
              },
            ]}
          />
        </div>
      </main>)
    );
  }
}

// const InitalConnected = connect(null, mapDispatchToProps)(Init)

NewArea.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

const NewAreaConnected = connect(mapStateToProps, null)(NewArea);

export default withTranslation()(
  withStyles(styles, { withTheme: true })(NewAreaConnected)
);
