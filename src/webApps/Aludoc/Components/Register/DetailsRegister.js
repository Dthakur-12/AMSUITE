import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import LinearProgress from "@mui/material/LinearProgress";
import Paper from "@mui/material/Paper";
import { withStyles } from '@mui/styles';
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import React, { Component } from "react";
import NavBarAludoc from "../../utils/NavBarAludoc";
import DocumentList from "../Document/Documents";
import withDocuments from "../../../../core/Aludoc/withDocuments";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import VehicleIcon from "@mui/icons-material/LocalShipping";
import CardIcon from "@mui/icons-material/CreditCard";
import {
  isValueEmptyOrNull,
  isArrayEmptyOrNull,
} from "../../../../utils/HelperFunctions";
import { isNullOrUndefined } from "util";
import { withTranslation } from "react-i18next";
import { requestBadgesByRegister } from "../../../../actions/EasyAccess/Register_actions";
import styles from "../../../../assets/styles/Aludoc_styles/Register_styles/detailsRegisterStyles";
const mapStateToProps = ({ Registers }) => {
  return {
    badges: Registers.badges,
    successBdgsRegisters: Registers.successBdgsRegisters,
  };
};
const mapDispatchToProps = {
  requestBadgesByRegister: requestBadgesByRegister,
};

const DocumentsWrapper = withDocuments(DocumentList);

class DetailsRegister extends Component {
  constructor(props) {
    super(props);
    const { register } = props;
    this.state = {
      showEnterprises: true,
      register: register,
      adjunct: [],
      openDropFilesDialog: false,
      formErrors: {},
      ocultar: false,
    };
  }

  componentDidMount() {
    NavBarAludoc.hideLoader();
    this.props.requestBadgesByRegister(this.state.register.id);
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      nextProps.successBdgsRegisters !== prevState.successBdgsRegisters ||
      nextProps.badges !== prevState.badges
    ) {
      return {
        successBdgsRegisters: nextProps.successBdgsRegisters,
        badges: nextProps.badges,
      };
    } else return null;
  }

  componentDidUpdate(prevProps, prevState) {
    const { successBdgsRegisters, badges } = this.state;
    if (
      successBdgsRegisters &&
      successBdgsRegisters !== prevState.successBdgsRegisters
    ) {
      this.setState((prevState) => ({
        register: {
          ...prevState.register,
          badges: badges.dataReturn,
        },
      }));
    }
  }

  render() {
    const { isDialog, classes, register, t, documentId } = this.props;
    return (!isNullOrUndefined(register) && (<main className={!isDialog ? classes.layout : undefined}>
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
          <Typography component="h1" variant="h5">
            {t("details")}
          </Typography>
          <Divider
            style={{ width: "100%", marginTop: 10, marginBottom: 24 }}
          />
          <Grid container spacing={24} justifyContent={"center"}>
            <Grid container spacing={24} item xs={12} md={8}>
              <Grid item xs={12} md={4}>
                <TextField
                  label={t("name")}
                  fullWidth
                  value={
                    !isValueEmptyOrNull(register.name)
                      ? register.name
                      : t("undefined")
                  }
                  InputLabelProps={{
                    className: classes.textFieldLabel,
                  }}
                  InputProps={{
                    readOnly: true,
                    className: classes.textFieldInput,
                  }}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  label={t("LastName")}
                  fullWidth
                  value={
                    !isValueEmptyOrNull(register.lastname)
                      ? register.lastname
                      : t("undefined")
                  }
                  InputLabelProps={{
                    className: classes.textFieldLabel,
                  }}
                  InputProps={{
                    readOnly: true,
                    className: classes.textFieldInput,
                  }}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  label={t("dni")}
                  fullWidth
                  value={
                    !isValueEmptyOrNull(register.document)
                      ? register.document
                      : t("undefined")
                  }
                  InputLabelProps={{
                    className: classes.textFieldLabel,
                  }}
                  InputProps={{
                    readOnly: true,
                    className: classes.textFieldInput,
                  }}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  label={t("phone")}
                  fullWidth
                  value={
                    !isValueEmptyOrNull(register.phone)
                      ? register.phone
                      : t("undefined")
                  }
                  InputLabelProps={{
                    className: classes.textFieldLabel,
                  }}
                  InputProps={{
                    readOnly: true,
                    className: classes.textFieldInput,
                  }}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  label={t("email")}
                  fullWidth
                  value={
                    !isValueEmptyOrNull(register.email)
                      ? register.email
                      : t("undefined")
                  }
                  InputLabelProps={{
                    className: classes.textFieldLabel,
                  }}
                  InputProps={{
                    readOnly: true,
                    className: classes.textFieldInput,
                  }}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  label={t("originEnterprise")}
                  fullWidth
                  value={
                    !isValueEmptyOrNull(register.originEnterpriseName)
                      ? register.originEnterpriseName
                      : t("undefined")
                  }
                  InputLabelProps={{
                    className: classes.textFieldLabel,
                  }}
                  InputProps={{
                    readOnly: true,
                    className: classes.textFieldInput,
                  }}
                />
              </Grid>
              {register.type !== 0 && (
                <Grid item xs={12} md={4}>
                  <TextField
                    label={t("visitEnterprise")}
                    fullWidth
                    value={
                      !isValueEmptyOrNull(register.visitEnterpriseName)
                        ? register.visitEnterpriseName
                        : t("undefined")
                    }
                    InputLabelProps={{
                      className: classes.textFieldLabel,
                    }}
                    InputProps={{
                      readOnly: true,
                      className: classes.textFieldInput,
                    }}
                  />
                </Grid>
              )}
              <Grid item xs={12} md={4}>
                <TextField
                  label={t("status")}
                  fullWidth
                  value={
                    !isValueEmptyOrNull(register.statusName)
                      ? register.statusName
                      : t("undefined")
                  }
                  InputLabelProps={{
                    className: classes.textFieldLabel,
                  }}
                  InputProps={{
                    readOnly: true,
                    className: classes.textFieldInput,
                  }}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  label={t("DateAdmission")}
                  fullWidth
                  value={
                    !isValueEmptyOrNull(register.ingressDate)
                      ? new Intl.DateTimeFormat("es-ES", {
                          year: "numeric",
                          month: "2-digit",
                          day: "2-digit",
                        }).format(Date.parse(register.ingressDate))
                      : t("undefined")
                  }
                  InputLabelProps={{
                    className: classes.textFieldLabel,
                  }}
                  InputProps={{
                    readOnly: true,
                    className: classes.textFieldInput,
                  }}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  label={t("DateExit")}
                  fullWidth
                  value={
                    !isValueEmptyOrNull(register.egressDate)
                      ? new Intl.DateTimeFormat("es-ES", {
                          year: "numeric",
                          month: "2-digit",
                          day: "2-digit",
                        }).format(Date.parse(register.egressDate))
                      : t("undefined")
                  }
                  InputLabelProps={{
                    className: classes.textFieldLabel,
                  }}
                  InputProps={{
                    readOnly: true,
                    className: classes.textFieldInput,
                  }}
                />
              </Grid>
            </Grid>
            <Grid container spacing={24} item xs={12} md={8}>
              {this.state.ocultar && (
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" className={classes.listTitle}>
                    {t("vehicles")}
                  </Typography>
                  <div className={classes.listContainer}>
                    <List>
                      {!isNullOrUndefined(this.state.register.vehicles) &&
                        this.state.register.vehicles.map((vehicle) => {
                          return (
                            <ListItem key={vehicle.id}>
                              <ListItemIcon>
                                <VehicleIcon />
                              </ListItemIcon>
                              <ListItemText primary={vehicle.plate} />
                            </ListItem>
                          );
                        })}
                      {isArrayEmptyOrNull(this.state.register.vehicles) && (
                        <ListItem>
                          <ListItemText
                            primary={t("WithoutAssignedVehicles")}
                          />
                        </ListItem>
                      )}
                    </List>
                  </div>
                </Grid>
              )}

              <Grid item xs={12} md={6}>
                <Typography variant="h6" className={classes.listTitle}>
                  {t("Badges")}
                </Typography>
                <div className={classes.listContainer}>
                  <List>
                    {!isNullOrUndefined(this.state.register.badges) &&
                      this.state.register.badges.map((badge) => {
                        return (
                          <ListItem key={badge.id}>
                            <ListItemIcon>
                              <CardIcon />
                            </ListItemIcon>
                            <ListItemText primary={badge.number} />
                          </ListItem>
                        );
                      })}
                    {isArrayEmptyOrNull(this.state.register.badges) && (
                      <ListItem>
                        <ListItemText primary={t("WithoutAssignedCards")} />
                      </ListItem>
                    )}
                  </List>
                </div>
              </Grid>
            </Grid>

            <Grid
              container
              spacing={24}
              justifyContent={"center"}
              item
              xs={12}
              md={8}
            >
              <DocumentsWrapper
                register={register}
                documentId={documentId}
                updateParent={this.props.updateParent}
              />
            </Grid>
          </Grid>
        </Paper>
      </div>
    </main>));
  }
}

DetailsRegister.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};
// const InitalConnected = connect(null, mapDispatchToProps)(Init)

const DetailsRegisterConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(DetailsRegister);

export default withTranslation()(
  withStyles(styles, { withTheme: true })(DetailsRegisterConnected)
);
