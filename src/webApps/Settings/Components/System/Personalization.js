import React, { Component } from "react";
import { connect } from "react-redux";
import { withStyles } from '@mui/styles';
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { Divider } from "semantic-ui-react";
import { Button as ButtonSemantic } from "semantic-ui-react";
import InputLabel from "@mui/material/InputLabel";
import LinearProgress from "@mui/material/LinearProgress";
import { withTranslation } from "react-i18next";
import {
  requestTestConnection,
  addSettings
} from "../../../../actions/Settings/system_actions";
import { ChromePicker } from "react-color";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CustomStyles from "../../../../assets/styles/Settings_styles/System/PersonalizationStyles";
import ImageSelector from "./ImageSelectors";

const mapStateToProps = ({ Settings }) => {
  return {
    settings: Settings.settings
  };
};

const mapDispatchToProps = {
  AddSettings: addSettings,
  testConnection: requestTestConnection
};

class Personalization extends Component {
  constructor(props) {
    const { settings } = props;
    const { systemSettings } = settings;
    const {
      colorPrimary,
      colorBackground,
      colorBackgroundSecondary,
      colorText,
      colorTextSecondary
    } = systemSettings;
    super(props);
    this.state = {
      step: 1,
      colorPrimary,
      colorBackground,
      colorBackgroundSecondary,
      colorText,
      colorTextSecondary
    };
  }

  setStep = step => {
    this.setState({
      step
    });
  };

  handleColor = (name, hex) => {
    const { handleChangeColor } = this.props;
    this.setState({
      [name]: hex
    });
    handleChangeColor(name, hex);
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleClose = () => {
    this.setState({
      anchorEl: null
    });
  };

  handleOpen = event => {
    this.setState({
      anchorEl: event.currentTarget
    });
  };

  handleCloseBackground = () => {
    this.setState({
      anchorElBackground: null
    });
  };

  handleOpenBackground = event => {
    this.setState({
      anchorElBackground: event.currentTarget
    });
  };
  handleCloseBackgroundSecondary = () => {
    this.setState({
      anchorElBackgroundSecondary: null
    });
  };

  handleOpenBackgroundSecondary = event => {
    this.setState({
      anchorElBackgroundSecondary: event.currentTarget
    });
  };
  handleCloseText = () => {
    this.setState({
      anchorElText: null
    });
  };

  handleOpenText = event => {
    this.setState({
      anchorElText: event.currentTarget
    });
  };
  handleCloseTextSecondary = () => {
    this.setState({
      anchorElTextSecondary: null
    });
  };

  handleOpenTextSecondary = event => {
    this.setState({
      anchorElTextSecondary: event.currentTarget
    });
  };
  restoreColor = () => {
    const { restoreColor } = this.props;
    this.setState({
      colorPrimary: "#296084",
      colorBackground: "#303030",
      colorBackgroundSecondary: "#424242",
      colorText: "#ffffff",
      colorTextSecondary: "#c6c6c6"
    });
    restoreColor({
      colorPrimary: "#296084",
      colorBackground: "#303030",
      colorBackgroundSecondary: "#424242",
      colorText: "#ffffff",
      colorTextSecondary: "#c6c6c6"
    });
  };

  render() {
    const {
      classes,
      t,
      isCreating,
      setImageDefault,
      setFile,
      handleOnFiles,
      isLoadingImg,
      setLogo,
      setDefaultLogo,
      handleOnLogoFiles
    } = this.props;
    const {
      anchorEl,
      anchorElBackground,
      anchorElBackgroundSecondary,
      anchorElText,
      anchorElTextSecondary
    } = this.state;
    const openPrimary = Boolean(anchorEl);
    const openText = Boolean(anchorElText);
    const openTextSecondary = Boolean(anchorElTextSecondary);
    const openBackground = Boolean(anchorElBackground);
    const openBackgroundSecondary = Boolean(anchorElBackgroundSecondary);
    return (
      <main style={{ marginTop: "4%" }}>
        <div>
          <LinearProgress
            style={{
              opacity: isCreating ? "1" : "0"
            }}
            className={classes.customLinearProgress}
            variant="query"
          />
          <Paper className={classes.paper}>
            <Grid container spacing={24}>
              <Grid style={{ margin: "13px", width: "100%" }}>
                <Divider horizontal>
                  <InputLabel className={classes.customInpuntLabel}>
                    {t("Look&Feel")}
                  </InputLabel>
                </Divider>

                <Grid
                  container
                  spacing={24}
                  style={{
                    marginBottom: 25,
                    marginTop: 5
                  }}
                >
                  <Grid item xs={12} md={6}>
                    <Typography className={classes.customTypo}>
                      {t("SelectPrimaryColor")}
                    </Typography>
                    <ButtonSemantic
                      aria-owns={openPrimary ? "simple-popper" : undefined}
                      onClick={this.handleOpen}
                      style={{
                        backgroundColor: this.state.colorPrimary
                      }}
                      className={classes.buttonShadow}
                    >
                      {t("Primary")}
                    </ButtonSemantic>
                    <Popover
                      id="simple-popper"
                      open={openPrimary}
                      anchorEl={anchorEl}
                      onClose={this.handleClose}
                      style={{ marginLeft: 5 }}
                      anchorOrigin={{
                        vertical: "top",
                        horizontal: "right"
                      }}
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "left"
                      }}
                    >
                      <ChromePicker
                        onChangeComplete={({ hex }) =>
                          this.handleColor("colorPrimary", hex)
                        }
                        color={this.state.colorPrimary}
                      />
                    </Popover>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography className={classes.customTypo}>
                      {t("SelectBackgroundColor")}
                    </Typography>
                    <ButtonSemantic
                      aria-owns={openBackground ? "simple-popper" : undefined}
                      onClick={this.handleOpenBackground}
                      style={{
                        backgroundColor: this.state.colorBackground
                      }}
                      className={classes.buttonShadow}
                    >
                      {t("Background")}
                    </ButtonSemantic>
                    <Popover
                      id="simple-popper"
                      open={openBackground}
                      anchorEl={anchorElBackground}
                      onClose={this.handleCloseBackground}
                      style={{ marginLeft: 5 }}
                      anchorOrigin={{
                        vertical: "top",
                        horizontal: "right"
                      }}
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "left"
                      }}
                    >
                      <ChromePicker
                        onChangeComplete={({ hex }) =>
                          this.handleColor("colorBackground", hex)
                        }
                        color={this.state.colorBackground}
                      />
                    </Popover>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography className={classes.customTypo}>
                      {t("SelectBackgroundSecondaryColor")}
                    </Typography>
                    <ButtonSemantic
                      aria-owns={openBackground ? "simple-popper" : undefined}
                      onClick={this.handleOpenBackgroundSecondary}
                      style={{
                        backgroundColor: this.state.colorBackgroundSecondary
                      }}
                      className={classes.buttonShadow}
                    >
                      {t("BackgroundSecondary")}
                    </ButtonSemantic>
                    <Popover
                      id="simple-popper"
                      open={openBackgroundSecondary}
                      anchorEl={anchorElBackgroundSecondary}
                      onClose={this.handleCloseBackgroundSecondary}
                      style={{ marginLeft: 5 }}
                      anchorOrigin={{
                        vertical: "top",
                        horizontal: "right"
                      }}
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "left"
                      }}
                    >
                      <ChromePicker
                        onChangeComplete={({ hex }) =>
                          this.handleColor("colorBackgroundSecondary", hex)
                        }
                        color={this.state.colorBackgroundSecondary}
                      />
                    </Popover>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography className={classes.customTypo}>
                      {t("SelectTextColor")}
                    </Typography>
                    <ButtonSemantic
                      aria-owns={openText ? "simple-popper" : undefined}
                      onClick={this.handleOpenText}
                      style={{
                        backgroundColor: this.state.colorText
                      }}
                      className={classes.buttonShadow}
                    >
                      {t("Text")}
                    </ButtonSemantic>
                    <Popover
                      id="simple-popper"
                      open={openText}
                      anchorEl={anchorElText}
                      onClose={this.handleCloseText}
                      style={{ marginLeft: 5 }}
                      anchorOrigin={{
                        vertical: "top",
                        horizontal: "right"
                      }}
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "left"
                      }}
                    >
                      <ChromePicker
                        onChangeComplete={({ hex }) =>
                          this.handleColor("colorText", hex)
                        }
                        color={this.state.colorText}
                      />
                    </Popover>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography className={classes.customTypo}>
                      {t("SelectTextSecondaryColor")}
                    </Typography>
                    <ButtonSemantic
                      aria-owns={
                        openTextSecondary ? "simple-popper" : undefined
                      }
                      onClick={this.handleOpenTextSecondary}
                      style={{
                        backgroundColor: this.state.colorTextSecondary
                      }}
                      className={classes.buttonShadow}
                    >
                      {t("TextSecondary")}
                    </ButtonSemantic>
                    <Popover
                      id="simple-popper"
                      open={openTextSecondary}
                      anchorEl={anchorElTextSecondary}
                      onClose={this.handleCloseTextSecondary}
                      style={{ marginLeft: 5 }}
                      anchorOrigin={{
                        vertical: "top",
                        horizontal: "right"
                      }}
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "left"
                      }}
                    >
                      <ChromePicker
                        onChangeComplete={({ hex }) =>
                          this.handleColor("colorTextSecondary", hex)
                        }
                        color={this.state.colorTextSecondary}
                      />
                    </Popover>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    md={12}
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      marginTop: "5%"
                    }}
                  >
                    <Button
                      fullWidth
                      variant="contained"
                      color="primary"
                      onClick={this.restoreColor}
                    >
                      {t("Restore")}
                    </Button>
                  </Grid>
                </Grid>
                <Divider horizontal style={{ marginBottom: "25px" }}>
                  <InputLabel className={classes.customInpuntLabel}>
                    {t("Preview")}
                  </InputLabel>
                </Divider>
                <Grid
                  container
                  spacing={24}
                  style={{
                    padding: 65,
                    backgroundColor: this.state.colorBackground
                  }}
                >
                  <Card
                    style={{
                      backgroundColor:
                        this.state.colorBackgroundSecondary + " !important"
                    }}
                  >
                    <div
                      style={{
                        background: this.state.colorBackgroundSecondary
                      }}
                    >
                      <CardContent>
                        <h1 style={{ color: this.state.colorText }}>
                          {t("Title")}
                        </h1>
                        <h3 style={{ color: this.state.colorTextSecondary }}>
                          {t("Subtitle")}
                        </h3>
                        <p style={{ color: this.state.colorText }}>
                          Lorem ipsum dolor sit amet consectetur adipiscing elit
                          malesuada, luctus cursus ultrices neque tincidunt
                          ultricies purus euismod, nisl torquent justo iaculis
                          libero ut placerat. Etiam est posuere mattis proin
                          augue pulvinar elementum tortor mi suscipit ligula,
                          tempus lectus molestie odio quis vel hendrerit
                          phasellus nisl habitant, faucibus neque cras nunc
                          pellentesque euismod senectus turpis venenatis sed.
                          Volutpat imperdiet luctus ornare aliquet venenatis
                          ante euismod, sapien enim mattis ullamcorper lectus
                          eros suscipit, a tincidunt commodo turpis aptent et.
                        </p>
                      </CardContent>
                      <CardActions>
                        <ButtonSemantic
                          size="small"
                          style={{
                            marginLeft: "11px",
                            marginBottom: "15px",
                            color: this.state.colorText,
                            backgroundColor: this.state.colorPrimary
                          }}
                        >
                          {t("Text")}
                        </ButtonSemantic>
                      </CardActions>
                    </div>
                  </Card>
                </Grid>
              </Grid>
              <ImageSelector
                InputLabel={InputLabel}
                isLoadingImg={isLoadingImg}
                setImageDefault={setImageDefault}
                setFile={setFile}
                handleOnFiles={handleOnFiles}
                setDefaultLogo={setDefaultLogo}
                setLogo={setLogo}
                handleOnLogoFiles={handleOnLogoFiles}
              />
            </Grid>
          </Paper>
        </div>
      </main>
    );
  }
}

const PersonalizationConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(Personalization);

export default withTranslation()(
  withStyles(CustomStyles, { withTheme: true })(PersonalizationConnected)
);
