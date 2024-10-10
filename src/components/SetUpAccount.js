import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { withStyles } from '@mui/styles';
import CircularProgress from "@mui/material/CircularProgress";
import green from "@mui/material/colors/green";
import LinearProgress from "@mui/material/LinearProgress";
import FormHelperText from "@mui/material/FormHelperText";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { Icon } from "semantic-ui-react";
import { isValueEmptyOrNull } from "../utils/HelperFunctions";
import SnackbarHandler from "../utils/SnackbarHandler";
import ApiHandler from "../services/ApiHandler";
import { withTranslation } from "react-i18next";
import { addWeb } from "../actions/AMSuite/web_actions";
import { login } from "../actions/Users/user_actions";
import styles from "../assets/styles/AMSuite_styles/setUpAccountStyles";
const mapDispatchToProps = {
  onNavigation: addWeb,
  onLogin: login
};

const mapStateToProps = ({ User }) => {
  return {
    currentUser: User.currentUser
  };
};

class SetUpAccount extends Component {
  constructor(props) {
    const { currentUser } = props;
    super(props);
    this.state = {
      formErrors: {},
      user: { ...currentUser, password: "", repeatedPassword: "" },
      passwordHidden: true,
      repeatedPasswordHidden: true
    };
  }
  handleEdit = () => {
    const { t } = this.props;
    const { user } = this.state;
    const errors = this.validate();
    this.setState({
      formErrors: errors
    });
    if (!Object.keys(errors).some(x => errors[x])) {
      ApiHandler.AMSuite.User.UpdateMyUser(user)
        .then(() => {
          this.setState({
            isCreating: false,
            isSuccess: true
          });
          SnackbarHandler.showMessage(t("SuccessEditUsers"));

          this.props.onLogin(user);
          localStorage.setItem("user", JSON.stringify(user));
          setTimeout(() => {
            this.setState({
              isSuccess: false
            });
          }, 1000);
        })
        .catch(({ error }) => {
          SnackbarHandler.showMessage(error.message, "error");
          this.setState({
            isCreating: false,
            isSuccess: false
          });
        });
    }
  };
  handleChange = name => event => {
    let value = event.currentTarget ? event.currentTarget.value : event.value;
    this.setState(prevState => ({
      user: {
        ...prevState.user,
        [name]: value
      }
    }));
  };

  validate = () => {
    const { user } = this.state;
    return {
      name: isValueEmptyOrNull(user.name),
      lastname: isValueEmptyOrNull(user.lastname),
      passwordEmpty: isValueEmptyOrNull(user.password),
      repeatedPasswordEmpty: isValueEmptyOrNull(user.repeatedPassword),
      repeatedPassword: user.repeatedPassword !== user.password,
      password: user.repeatedPassword !== user.password
    };
  };

  keyPress = e => {
    if (e.keyCode === 13) this.Login();
  };

  render() {
    const { classes, t, isDialog, isEdit } = this.props;
    const { user } = this.state;
    return (
      (<main className={!isDialog ? classes.layout : undefined}>
        <div className={!isDialog ? classes.fill : undefined}>
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
          <Paper elevation={!isDialog ? 2 : 0} className={classes.paper}>
            <Avatar className={classes.avatar}>
              <Icon name="user" style={{ margin: 0 }} />
            </Avatar>
            <Typography component="h1" variant="h5">
              {t("EditUser")}
            </Typography>
            <Divider
              style={{ width: "100%", marginTop: 10, marginBottom: 24 }}
            />
            <Grid container spacing={24}>
              <Grid item xs={12} md={6} className={classes.grid}>
                <TextField
                  required
                  label={t("name")}
                  value={user.name}
                  fullWidth
                  onChange={this.handleChange("name")}
                  helperText={t("inputEmpty")}
                  FormHelperTextProps={{
                    style: { opacity: this.state.formErrors.name ? 1 : 0 }
                  }}
                  error={this.state.formErrors.name}
                />
              </Grid>
              <Grid item xs={12} md={6} className={classes.grid}>
                <TextField
                  required
                  label={t("LastName")}
                  value={user.lastname}
                  fullWidth
                  onChange={this.handleChange("lastname")}
                  helperText={t("inputEmpty")}
                  FormHelperTextProps={{
                    style: {
                      opacity: this.state.formErrors.lastname ? 1 : 0
                    }
                  }}
                  error={this.state.formErrors.lastname}
                />
              </Grid>
              <React.Fragment>
                <Grid item xs={12} md={6} className={classes.grid}>
                  <FormControl margin="normal" style={{ margin: 0 }} fullWidth>
                    <InputLabel
                      error={this.state.formErrors.password}
                      htmlFor="adornment-password"
                    >
                      {t("NewPassword")}
                    </InputLabel>
                    <Input
                      error={this.state.formErrors.password}
                      id="adornment-password"
                      type={!this.state.passwordHidden ? "text" : "password"}
                      onChange={this.handleChange("password")}
                      value={user.password}
                      autoComplete="current-password"
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="Toggle password visibility"
                            onClick={() =>
                              this.setState({
                                passwordHidden: !this.state.passwordHidden
                              })
                            }
                            size="large">
                            {!this.state.passwordHidden ? (
                              <Visibility />
                            ) : (
                              <VisibilityOff />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                    <FormHelperText
                      style={{
                        opacity:
                          this.state.formErrors.password ||
                          this.state.formErrors.passwordEmpty
                            ? 1
                            : 0
                      }}
                      error={true}
                      id="adornment-password"
                    >
                      {this.state.formErrors.passwordEmpty
                        ? t("inputEmpty")
                        : t("PasswordNotEquals")}
                    </FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6} className={classes.grid}>
                  <FormControl margin="normal" style={{ margin: 0 }} fullWidth>
                    <InputLabel
                      error={this.state.formErrors.password}
                      htmlFor="adornment-password"
                    >
                      {t("ConfirmPassword")}
                    </InputLabel>
                    <Input
                      error={this.state.formErrors.password}
                      id="adornment-password"
                      type={
                        !this.state.repeatedPasswordHidden ? "text" : "password"
                      }
                      onChange={this.handleChange("repeatedPassword")}
                      value={user.repeatedPassword}
                      autoComplete="current-password"
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="Toggle password visibility"
                            onClick={() =>
                              this.setState({
                                repeatedPasswordHidden: !this.state
                                  .repeatedPasswordHidden
                              })
                            }
                            size="large">
                            {!this.state.repeatedPasswordHidden ? (
                              <Visibility />
                            ) : (
                              <VisibilityOff />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                    <FormHelperText
                      style={{
                        opacity:
                          this.state.formErrors.repeatedPassword ||
                          this.state.formErrors.repeatedPasswordEmpty
                            ? 1
                            : 0
                      }}
                      error={true}
                      id="adornment-password"
                    >
                      {this.state.formErrors.repeatedPasswordEmpty
                        ? t("inputEmpty")
                        : t("PasswordNotEquals")}
                    </FormHelperText>
                  </FormControl>

                  {/* <TextField
                    type="password"
                    label={"Confirmar nueva contraseña"}
                    value={user.repeatedPassword}
                    onChange={this.handleChange("repeatedPassword")}
                    fullWidth
                    //helperText={t("inputEmpty")}
                    FormHelperTextProps={{
                      style: {
                        opacity: this.state.formErrors.repeatedPassword ? 1 : 0
                      }
                    }}
                    error={this.state.formErrors.repeatedPassword}
                  /> */}
                </Grid>
              </React.Fragment>
            </Grid>
            <div
              className={classes.submit}
              style={{
                position: "relative",
                width: "100%"
              }}
            >
              <Button
                fullWidth
                variant="contained"
                color="primary"
                disabled={this.state.isCreating}
                onClick={this.handleEdit}
                style={{
                  background: this.state.isSuccess ? green[500] : undefined,
                  color: "white"
                }}
              >
                {this.state.isSuccess
                  ? isEdit
                    ? t("successEdit")
                    : t("successEdit")
                  : this.state.isCreating
                  ? ""
                  : t("EditUser")}
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
          </Paper>
        </div>
      </main>)
    );
  }
}

SetUpAccount.propTypes = {
  classes: PropTypes.object.isRequired
};
const SetUpAccountConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(SetUpAccount));

export default withTranslation()(SetUpAccountConnected);
