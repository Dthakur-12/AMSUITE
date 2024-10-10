import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from '@mui/styles';
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import CardIcon from "@mui/icons-material/CreditCardRounded";
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
  InputBase
} from "@mui/material";
import TypeIcon from "@mui/icons-material/FilterNoneRounded";
import NavBarAccessControl from "../../utils/NavBarAccessControl";
import ApiHandler from "../../../../services/ApiHandler";
import TableSkeletonLoader from "../../../Shared/TableSkeletonLoader";
import AddIcon from "@mui/icons-material/AddRounded";
import SearchIcon from "@mui/icons-material/SearchRounded";
import { isValueEmptyOrNull } from "../../../../utils/HelperFunctions";
import SnackbarHandler from "../../../../utils/SnackbarHandler";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import { withTranslation } from "react-i18next";
import styles from "../../../../assets/styles/AccessControl_styles/Badge_styles/badgeTypesStyles";
class BadgeTypes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      openCreateDialog: false,
      newType: {
        name: "",
        badgeClass: "1"
      }
    };
  }

  componentDidMount() {
    this.loadBadgeTypes();
  }

  loadBadgeTypes = () => {
    ApiHandler.AccessControl.Badges.getBadgeTypes(0, -1, "name asc", "")
      .then(({ data }) => {
        let badgeTypes = [];
        data.data.map(type => badgeTypes.push(type.name));
        this.setState({
          badgeTypes: badgeTypes,
          badgeTypesConst: badgeTypes,
          isLoading: false
        });
        NavBarAccessControl.hideLoader();
      })
      .catch(({ error }) => {
        console.log(error);
        this.setState({
          isLoading: false,
          badgeTypes: []
        });
        NavBarAccessControl.hideLoader();
      });
  };

  handleAdd = () => {
    this.setState({
      openCreateDialog: true
    });
  };

  handleCloseCreateDialog = () => {
    this.setState({
      openCreateDialog: false
    });
  };

  handleQueryChange = query => {
    let data = this.state.badgeTypesConst.slice();
    let value = query.currentTarget.value;
    this.setState(state => ({
      ...state,
      badgeTypes: data.filter(item =>
        item.toLowerCase().includes(value.toLowerCase())
      )
    }));
  };

  handleCreateType = () => {
    // const errors = this.validateCreate()
    // this.setState({
    //     formErrors: errors
    // })
    // if (!Object.keys(errors).some(x => errors[x]))
    // {
    const { newType } = this.state;
    const { t } = this.props;
    this.setState({
      isCreating: true
    });

    ApiHandler.AccessControl.Badges.createBadgeType(newType)
      .then(() => {
        this.setState({
          isCreating: false,
          openCreateDialog: false
        });
        SnackbarHandler.showMessage(t("createSuccessBadgeType"));
        NavBarAccessControl.showLoader();
        this.loadBadgeTypes();
      })
      .catch(({ error }) => {
        console.log(error);
        this.setState({
          isCreating: false,
          openCreateDialog: false
        });
        SnackbarHandler.showMessage(error.message, "error");
      });
  };

  handleChange = name => event => {
    let value = event.currentTarget ? event.currentTarget.value : event.value;
    this.setState(prevState => ({
      newType: {
        ...prevState.newType,
        [name]: value
      }
    }));
  };

  render() {
    const { classes, t, theme } = this.props;
    const { badgeTypes, isLoading, isCreating, newType } = this.state;
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
              {t("BadgeType")}
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
                <ListItemText primary={t("addBadgeType")} />
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
                    placeholder={`${t("search")}…`}
                    classes={{
                      root: classes.inputRoot,
                      input: classes.inputInput
                    }}
                    onChange={this.handleQueryChange}
                  />
                </div>
              </ListItem>
              {badgeTypes.map((b, index) => (
                <ListItem key={index} style={{ paddingTop: 0 }}>
                  <ListItemAvatar>
                    <Avatar className={classes.avatarList}>
                      <TypeIcon style={{ fontSize: 16 }} />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={b} />
                </ListItem>
              ))}
            </List>
          </Paper>
          <Dialog
            open={this.state.openCreateDialog}
            onClose={this.handleCloseCreateDialog}
            onBackdropClick={this.handleCloseCreateDialog}
            fullWidth
            maxWidth="sm"
          >
            <DialogTitle id="form-dialog-title">
              {t("newBadgeType")}
            </DialogTitle>
            <DialogContent>
              <Grid container item xs={12}>
                <TextField
                  autoFocus
                  margin="dense"
                  label={t("name")}
                  type="text"
                  fullWidth
                  onChange={this.handleChange("name")}
                  helperText={t("inputEmpty")}
                />
              </Grid>
              <Grid container item xs={12}>
                <div className={classes.root}>
                  <FormControl
                    component="fieldset"
                    className={classes.formControl}
                  >
                    <RadioGroup
                      aria-label="Clase de tipo de tarjeta"
                      name="badgeClass"
                      className={classes.group}
                      value={newType.badgeClass}
                      onChange={this.handleChange("badgeClass")}
                    >
                      <FormControlLabel
                        value="1"
                        control={<Radio color="primary" />}
                        label={t("employee")}
                      />
                      <FormControlLabel
                        value="2"
                        control={<Radio color="primary" />}
                        label={t("visitor")}
                      />
                    </RadioGroup>
                  </FormControl>
                </div>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={this.handleCloseCreateDialog}
                style={{ color: theme.palette.text.main }}>
                {t("cancel")}
              </Button>
              <div className={classes.wrapper}>
                <Button
                  disabled={
                    isCreating ||
                    isValueEmptyOrNull(this.state.newType) ||
                    isValueEmptyOrNull(this.state.newType.name)
                  }
                  onClick={this.handleCreateType}
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
        </div>
      </main>)
    );
  }
}
BadgeTypes.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withTranslation(
  withStyles(styles, { withTheme: true })(BadgeTypes)
);
