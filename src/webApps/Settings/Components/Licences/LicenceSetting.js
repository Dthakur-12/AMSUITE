// import {
//   Dialog,
//   Grid,
//   Slide,
//   DialogTitle,
//   DialogContent,
//   DialogContentText,
//   DialogActions,
//   Button,
//   withMobileDialog,
// } from "@mui/material";
// import Paper from "@mui/material/Paper";
// import AppBar from "@mui/material/AppBar";
// import CircularProgress from "@mui/material/CircularProgress";
// import Fade from "@mui/material/Fade";
// import IconButton from "@mui/material/IconButton";
// import { withStyles } from '@mui/styles';
// import Toolbar from "@mui/material/Toolbar";
// import Typography from "@mui/material/Typography";
// import CloseIcon from "@mui/icons-material/Close";
// import AccountCircle from "@mui/icons-material/PortraitRounded";
// import PropTypes from "prop-types";
// import React, { Component } from "react";
// import { withTranslation } from "react-i18next";
// import { Icon, Step } from "semantic-ui-react";
// import { isNullOrUndefined } from "util";
// import ApiHandler from "../../../../services/ApiHandler";
// import { isValueEmptyOrNull } from "../../../../utils/HelperFunctions";
// import SnackbarHandler from "../../../../utils/SnackbarHandler";
// import NavBarSettings from "../../utils/NavBarSettings";
// import DetailsLicense from "./DetailsLicense";
// import FirstStep from "./FirstStep";
// import SecondStep from "./SecondStep";
// import ThirdStep from "./ThirdStep";
// import CustomStyles from "../../../../assets/styles/Settings_styles/License/LicenceSettingStyles";
// import { requestGetUnlicensedIMEIs } from "../../../../actions/Settings/license_actions";
// import ConfirmationDialogAction from "../../../Shared/ConfirmationDialogAction";
// import { connect } from "react-redux";
// function Transition(props) {
//   return <Slide direction="down" {...props} />;
// }

// class LicenceSetting extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       step: 1,
//       haveLicence: false,
//       license: undefined,
//       isLoadingData: true,
//       token: "",
//     };
//   }

//   componentDidMount() {
//     NavBarSettings.hideLoader();
//     this.getToken();
//     this.checkLicense();
//   }

//   checkLicense = () => {
//     ApiHandler.Setting.Setting.checkLicense()
//       .then(({ data }) => {
//         this.setState({
//           haveLicence: data.result,
//           isLoadingData: false,
//         });
//         this.getLicense();
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };

//   getLicense = () => {
//     ApiHandler.Setting.Setting.getLicense()
//       .then(({ data }) => {
//         if (data && data.licenseId > 0)
//           this.setState({
//             license: data,
//             step: 3,
//             isLoadingData: false,
//           });
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };

//   onDrop = (files, rejectedFiles) => {
//     const { t } = this.props;
//     if (rejectedFiles.length !== 0) {
//       SnackbarHandler.showMessage(t("InvalidFormatArchive"), "error");
//     } else {
//       this.setState({
//         files: files.map((file) =>
//           Object.assign(file, {
//             preview:
//               typeof file === "string" ? file : URL.createObjectURL(file),
//           })
//         ),
//       });
//       this.handleOnFiles(files);
//       SnackbarHandler.showMessage(t("FileUploadedSuccessfully"));
//     }
//   };

//   setStep = (step) => {
//     this.setState({
//       step,
//     });
//   };

//   setImageDefault = () => {
//     if (this.state.isLoadingImg) {
//       return (
//         <CircularProgress
//           size={50}
//           style={{
//             top: "50%",
//             left: "50%",
//             color: "white",
//           }}
//         />
//       );
//     } else {
//       return (
//         <AccountCircle
//           style={{
//             fontSize: 150,
//             color: "white",
//           }}
//         />
//       );
//     }
//   };

//   handleOnFiles = (files) => {
//     this.setState({
//       file: files[0],
//     });
//   };

//   setFiles = () => {
//     if (isValueEmptyOrNull(this.state.file)) {
//       if (isValueEmptyOrNull(this.state.url)) {
//         return undefined;
//       } else {
//         return [{ preview: this.state.url }];
//       }
//     } else {
//       return [{ preview: this.state.file.preview }];
//     }
//   };

//   downloadToken = () => {
//     ApiHandler.Setting.Setting.downloadToken()
//       .then((data) => {
//         require("downloadjs")(
//           data.data,
//           "AMSuite-LicenseRequest.key",
//           "text/plain"
//         );
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };

//   getToken = () => {
//     ApiHandler.Setting.Setting.getToken()
//       .then((data) => {
//         this.setState({
//           token: data.data,
//         });
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };

//   activeLicense = () => {
//     this.setState({ isLoadingData: true });
//     // this.props.requestGetUnlicensedIMEIs();
//     ApiHandler.Setting.Setting.activeLicense(this.state.file, false)
//       .then((data) => {
//         this.checkLicense();
//         this.setState({
//           file: undefined,
//         });
//       })
//       .catch((error) => {
//         this.setState({
//           isLoadingData: false,
//           unlicensedIMEIs: error.errorData,
//         });
//       });
//   };

//   handleConfirm = () => {
//     this.setState({ isLoadingData: true, unlicensedIMEIs: undefined });
//     // this.props.requestGetUnlicensedIMEIs();
//     ApiHandler.Setting.Setting.activeLicense(this.state.file, true)
//       .then((data) => {
//         this.checkLicense();
//         this.setState({
//           file: undefined,
//         });
//       })
//       .catch((error) => {
//         this.setState({
//           isLoadingData: false,
//         });
//       });
//   };

//   handleClose = () => {
//     this.setState({ unlicensedIMEIs: undefined });
//   };

//   render() {
//     const { classes, t, fullScreen } = this.props;
//     const {
//       step,
//       haveLicence,
//       licenseDetails,
//       isLoadingData,
//       unlicensedIMEIs,
//     } = this.state;
//     return (
//       (<div>
//         <Grid
//           item
//           container
//           direction="row"
//           justifyContent="center"
//           alignItems="center"
//           xs={12}
//         >
//           <Grid container item xs={12} md={8}>
//             <div className={classes.fill}>
//               <Paper
//                 elevation={2}
//                 className={classes.paper}
//                 style={{ position: "relative" }}
//               >
//                 {!isLoadingData && (
//                   <Grid container item xs={12}>
//                     <Grid item xs={12} md={5}>
//                       <Step.Group className={classes.stepper} vertical>
//                         <Step
//                           active={step === 1}
//                           link
//                           onClick={() => this.setStep(1)}
//                           className={classes.step}
//                         >
//                           <Icon name="download" />
//                           <Step.Content>
//                             <Step.Title>{t("LicenseApplication")}</Step.Title>
//                             <Step.Description className={classes.step}>
//                               {t("TokenDownload")}
//                             </Step.Description>
//                           </Step.Content>
//                         </Step>
//                         <Step
//                           active={step === 2}
//                           link
//                           onClick={() => this.setStep(2)}
//                           className={classes.step}
//                         >
//                           <Icon name="upload" />
//                           <Step.Content>
//                             <Step.Title>{t("ActivateLicense")}</Step.Title>
//                             <Step.Description className={classes.step}>
//                               {t("LoadNewLicense")}
//                             </Step.Description>
//                           </Step.Content>
//                         </Step>
//                         <Step
//                           active={step === 3}
//                           disabled={!haveLicence}
//                           link
//                           onClick={() => this.setStep(3)}
//                           className={classes.step}
//                         >
//                           <Icon name="check" />
//                           <Step.Content>
//                             <Step.Title>{t("LicenseStatus")}</Step.Title>
//                             <Step.Description className={classes.step}>
//                               {!isNullOrUndefined(this.state.license) &&
//                               haveLicence
//                                 ? t("LicenseActive")
//                                 : isNullOrUndefined(this.state.license)
//                                 ? t("NoLicense")
//                                 : t("LicenseExpired")}
//                             </Step.Description>
//                           </Step.Content>
//                         </Step>
//                       </Step.Group>
//                     </Grid>
//                     <Grid item xs={12} md={7} style={{ position: "relative" }}>
//                       {step === 1 && (
//                         <FirstStep
//                           token={this.state.token}
//                           handleDownloadToken={this.downloadToken}
//                         />
//                       )}
//                       {step === 2 && (
//                         <SecondStep
//                           handleOnFiles={this.handleOnFiles}
//                           setImageDefault={this.setImageDefault}
//                           files={this.setFiles()}
//                           onDrop={this.onDrop}
//                           file={this.state.file}
//                           handleActiveLicense={this.activeLicense}
//                         />
//                       )}
//                       {step === 3 && (
//                         <ThirdStep
//                           license={this.state.license}
//                           onOpen={() =>
//                             this.setState({
//                               licenseDetails: this.state.license,
//                             })
//                           }
//                         />
//                       )}
//                     </Grid>
//                   </Grid>
//                 )}
//                 <Fade in={isLoadingData} className={classes.contentLoader}>
//                   <div
//                     style={{
//                       pointerEvents: isLoadingData ? "inherit" : "none",
//                     }}
//                   >
//                     <CircularProgress
//                       className={classes.circularProgress}
//                       size={50}
//                     />
//                   </div>
//                 </Fade>
//               </Paper>
//             </div>
//           </Grid>
//         </Grid>
//         <Dialog
//           open={!isNullOrUndefined(licenseDetails)}
//           TransitionComponent={Transition}
//           onClose={() => this.setState({ licenseDetails: undefined })}
//           maxWidth="md"
//           fullScreen
//           scroll="paper"
//         >
//           <AppBar className={classes.appBar}>
//             <Toolbar>
//               <IconButton
//                 color="inherit"
//                 onClick={() => this.setState({ licenseDetails: undefined })}
//                 aria-label="Close"
//                 size="large">
//                 <CloseIcon />
//               </IconButton>
//               <Typography variant="h6" color="inherit" className={classes.flex}>
//                 {t("LicenseID")}
//                 {!isNullOrUndefined(licenseDetails) &&
//                   ` ${this.state.licenseDetails.licenseId}`}
//               </Typography>
//             </Toolbar>
//           </AppBar>
//           <DetailsLicense
//             isDialog
//             onClose={() => this.setState({ licenseDetails: undefined })}
//             license={licenseDetails}
//             limit={
//               !isNullOrUndefined(licenseDetails)
//                 ? Math.ceil(Object.keys(licenseDetails.entities).length / 3)
//                 : 0
//             }
//           />
//         </Dialog>
//         <Dialog
//           fullScreen={fullScreen}
//           open={
//             !isNullOrUndefined(unlicensedIMEIs) && unlicensedIMEIs.length > 0
//           }
//           onClose={this.handleClose}
//           aria-labelledby="responsive-dialog-title"
//           maxWidth="sm"
//           scroll="body"
//         >
//           <DialogTitle id="responsive-dialog-title">
//             {t("UnlicensedIMEIs")}
//           </DialogTitle>
//           <DialogContent>
//             {!isNullOrUndefined(unlicensedIMEIs) &&
//               unlicensedIMEIs.map((imei) => (
//                 <DialogContentText>{imei}</DialogContentText>
//               ))}
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={this.handleClose} variant="contained">
//               {t("cancel")}
//             </Button>
//             <Button
//               onClick={this.handleConfirm}
//               color="primary"
//               variant="contained"
//               autoFocus
//             >
//               {t("Confirm")}
//             </Button>
//           </DialogActions>
//         </Dialog>
//       </div>)
//     );
//   }
// }

// LicenceSetting.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

// const mapStateToProps = ({ License }) => ({
//   unlicensedIMEIs: License.unlicensedIMEIs,
// });

// const mapDispatchToProps = {
//   requestGetUnlicensedIMEIs,
// };

// const LicenseSettingConnected = connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(LicenceSetting);

// export default withTranslation()(
//   withStyles(CustomStyles)(withMobileDialog()(LicenseSettingConnected))
// );


import {
  Dialog,
  Grid,
  Slide,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import AppBar from "@mui/material/AppBar";
import CircularProgress from "@mui/material/CircularProgress";
import Fade from "@mui/material/Fade";
import IconButton from "@mui/material/IconButton";
import { withStyles } from '@mui/styles';
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import AccountCircle from "@mui/icons-material/PortraitRounded";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import { Icon, Step } from "semantic-ui-react";
import { isNullOrUndefined } from "util";
import ApiHandler from "../../../../services/ApiHandler";
import { isValueEmptyOrNull } from "../../../../utils/HelperFunctions";
import SnackbarHandler from "../../../../utils/SnackbarHandler";
import NavBarSettings from "../../utils/NavBarSettings";
import DetailsLicense from "./DetailsLicense";
import FirstStep from "./FirstStep";
import SecondStep from "./SecondStep";
import ThirdStep from "./ThirdStep";
import CustomStyles from "../../../../assets/styles/Settings_styles/License/LicenceSettingStyles";
import { requestGetUnlicensedIMEIs } from "../../../../actions/Settings/license_actions";
import ConfirmationDialogAction from "../../../Shared/ConfirmationDialogAction";
import { connect } from "react-redux";
import { withTheme } from "@mui/styles"; // <-- Import withTheme

function Transition(props) {
  return <Slide direction="down" {...props} />;
}

class LicenceSetting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 1,
      haveLicence: false,
      license: undefined,
      isLoadingData: true,
      token: "",
      fullScreen: false,
    };
  }

  componentDidMount() {
    NavBarSettings.hideLoader();
    this.getToken();
    this.checkLicense();
    this.updateFullScreen();
    window.addEventListener('resize', this.updateFullScreen);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateFullScreen);
  }

  updateFullScreen = () => {
    const { theme } = this.props;
    const fullScreen = window.matchMedia(theme.breakpoints.down('sm').replace('@media ', '')).matches;
    this.setState({ fullScreen });
  };

  checkLicense = () => {
    ApiHandler.Setting.Setting.checkLicense()
      .then(({ data }) => {
        this.setState({
          haveLicence: data.result,
          isLoadingData: false,
        });
        this.getLicense();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  getLicense = () => {
    ApiHandler.Setting.Setting.getLicense()
      .then(({ data }) => {
        if (data && data.licenseId > 0)
          this.setState({
            license: data,
            step: 3,
            isLoadingData: false,
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  onDrop = (files, rejectedFiles) => {
    const { t } = this.props;
    if (rejectedFiles.length !== 0) {
      SnackbarHandler.showMessage(t("InvalidFormatArchive"), "error");
    } else {
      this.setState({
        files: files.map((file) =>
          Object.assign(file, {
            preview:
              typeof file === "string" ? file : URL.createObjectURL(file),
          })
        ),
      });
      this.handleOnFiles(files);
      SnackbarHandler.showMessage(t("FileUploadedSuccessfully"));
    }
  };

  setStep = (step) => {
    this.setState({
      step,
    });
  };

  setImageDefault = () => {
    if (this.state.isLoadingImg) {
      return (
        <CircularProgress
          size={50}
          style={{
            top: "50%",
            left: "50%",
            color: "white",
          }}
        />
      );
    } else {
      return (
        <AccountCircle
          style={{
            fontSize: 150,
            color: "white",
          }}
        />
      );
    }
  };

  handleOnFiles = (files) => {
    this.setState({
      file: files[0],
    });
  };

  setFiles = () => {
    if (isValueEmptyOrNull(this.state.file)) {
      if (isValueEmptyOrNull(this.state.url)) {
        return undefined;
      } else {
        return [{ preview: this.state.url }];
      }
    } else {
      return [{ preview: this.state.file.preview }];
    }
  };

  downloadToken = () => {
    ApiHandler.Setting.Setting.downloadToken()
      .then((data) => {
        require("downloadjs")(
          data.data,
          "AMSuite-LicenseRequest.key",
          "text/plain"
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  getToken = () => {
    ApiHandler.Setting.Setting.getToken()
      .then((data) => {
        this.setState({
          token: data.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  activeLicense = () => {
    this.setState({ isLoadingData: true });
    ApiHandler.Setting.Setting.activeLicense(this.state.file, false)
      .then((data) => {
        this.checkLicense();
        this.setState({
          file: undefined,
        });
      })
      .catch((error) => {
        this.setState({
          isLoadingData: false,
          unlicensedIMEIs: error.errorData,
        });
      });
  };

  handleConfirm = () => {
    this.setState({ isLoadingData: true, unlicensedIMEIs: undefined });
    ApiHandler.Setting.Setting.activeLicense(this.state.file, true)
      .then((data) => {
        this.checkLicense();
        this.setState({
          file: undefined,
        });
      })
      .catch((error) => {
        this.setState({
          isLoadingData: false,
        });
      });
  };

  handleClose = () => {
    this.setState({ unlicensedIMEIs: undefined });
  };

  render() {
    const { classes, t } = this.props;
    const {
      step,
      haveLicence,
      licenseDetails,
      isLoadingData,
      unlicensedIMEIs,
      fullScreen,
    } = this.state;
    return (
      <div>
        <Grid
          item
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          xs={12}
        >
          <Grid container item xs={12} md={8}>
            <div className={classes.fill}>
              <Paper
                elevation={2}
                className={classes.paper}
                style={{ position: "relative" }}
              >
                {!isLoadingData && (
                  <Grid container item xs={12}>
                    <Grid item xs={12} md={5}>
                      <Step.Group className={classes.stepper} vertical>
                        <Step
                          active={step === 1}
                          link
                          onClick={() => this.setStep(1)}
                          className={classes.step}
                        >
                          <Icon name="download" />
                          <Step.Content>
                            <Step.Title>{t("LicenseApplication")}</Step.Title>
                            <Step.Description className={classes.step}>
                              {t("TokenDownload")}
                            </Step.Description>
                          </Step.Content>
                        </Step>
                        <Step
                          active={step === 2}
                          link
                          onClick={() => this.setStep(2)}
                          className={classes.step}
                        >
                          <Icon name="upload" />
                          <Step.Content>
                            <Step.Title>{t("ActivateLicense")}</Step.Title>
                            <Step.Description className={classes.step}>
                              {t("LoadNewLicense")}
                            </Step.Description>
                          </Step.Content>
                        </Step>
                        <Step
                          active={step === 3}
                          disabled={!haveLicence}
                          link
                          onClick={() => this.setStep(3)}
                          className={classes.step}
                        >
                          <Icon name="check" />
                          <Step.Content>
                            <Step.Title>{t("LicenseStatus")}</Step.Title>
                            <Step.Description className={classes.step}>
                              {!isNullOrUndefined(this.state.license) &&
                              haveLicence
                                ? t("LicenseActive")
                                : isNullOrUndefined(this.state.license)
                                ? t("NoLicense")
                                : t("LicenseExpired")}
                            </Step.Description>
                          </Step.Content>
                        </Step>
                      </Step.Group>
                    </Grid>
                    <Grid item xs={12} md={7} style={{ position: "relative" }}>
                      {step === 1 && (
                        <FirstStep
                          token={this.state.token}
                          handleDownloadToken={this.downloadToken}
                        />
                      )}
                      {step === 2 && (
                        <SecondStep
                          handleOnFiles={this.handleOnFiles}
                          setImageDefault={this.setImageDefault}
                          files={this.setFiles()}
                          onDrop={this.onDrop}
                          file={this.state.file}
                          handleActiveLicense={this.activeLicense}
                        />
                      )}
                      {step === 3 && (
                        <ThirdStep
                          license={this.state.license}
                          onOpen={() =>
                            this.setState({
                              licenseDetails: this.state.license,
                            })
                          }
                        />
                      )}
                    </Grid>
                  </Grid>
                )}
                <Fade in={isLoadingData} className={classes.contentLoader}>
                  <div
                    style={{
                      pointerEvents: isLoadingData ? "inherit" : "none",
                    }}
                  >
                    <CircularProgress
                      className={classes.circularProgress}
                      size={50}
                    />
                  </div>
                </Fade>
              </Paper>
            </div>
          </Grid>
        </Grid>
        <Dialog
          open={!isNullOrUndefined(licenseDetails)}
          TransitionComponent={Transition}
          onClose={() => this.setState({ licenseDetails: undefined })}
          maxWidth="md"
          fullScreen={fullScreen}
          scroll="paper"
        >
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton
                color="inherit"
                onClick={() => this.setState({ licenseDetails: undefined })}
                aria-label="Close"
                size="large"
              >
                <CloseIcon />
              </IconButton>
              <Typography variant="h6" color="inherit" className={classes.flex}>
                {t("LicenseID")}
                {!isNullOrUndefined(licenseDetails) &&
                  ` ${this.state.licenseDetails.licenseId}`}
              </Typography>
            </Toolbar>
          </AppBar>
          <DetailsLicense
            isDialog
            onClose={() => this.setState({ licenseDetails: undefined })}
            license={licenseDetails}
            limit={
              !isNullOrUndefined(licenseDetails)
                ? Math.ceil(Object.keys(licenseDetails.entities).length / 3)
                : 0
            }
          />
        </Dialog>
        <Dialog
          fullScreen={fullScreen}
          open={
            !isNullOrUndefined(unlicensedIMEIs) && unlicensedIMEIs.length > 0
          }
          onClose={this.handleClose}
          aria-labelledby="responsive-dialog-title"
          maxWidth="sm"
          scroll="body"
        >
          <DialogTitle id="responsive-dialog-title">
            {t("UnlicensedIMEIs")}
          </DialogTitle>
          <DialogContent>
            {!isNullOrUndefined(unlicensedIMEIs) &&
              unlicensedIMEIs.map((imei) => (
                <DialogContentText>{imei}</DialogContentText>
              ))}
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} variant="contained">
              {t("cancel")}
            </Button>
            <Button
              onClick={this.handleConfirm}
              color="primary"
              variant="contained"
              autoFocus
            >
              {t("Confirm")}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

LicenceSetting.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired, // <-- Add theme prop validation
};

const mapStateToProps = ({ License }) => ({
  unlicensedIMEIs: License.unlicensedIMEIs,
});

const mapDispatchToProps = {
  requestGetUnlicensedIMEIs,
};

const LicenseSettingConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(LicenceSetting);

export default withTranslation()(
  withTheme(withStyles(CustomStyles)(LicenseSettingConnected)) // <-- Wrap withTheme HOC
);

