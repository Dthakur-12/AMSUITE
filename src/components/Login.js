
import React from "react";
import PropTypes from "prop-types";
import green from "@mui/material/colors/green";
import {
  Avatar,
  Button,
  FormControl,
  Input,
  InputLabel,
  Paper,
  Typography,
  Popper,
  CircularProgress,
  LinearProgress,
  FormHelperText,
  InputAdornment,
  IconButton,
  Divider,
  MenuItem,
  MenuList,
  Grow,
  ClickAwayListener,
} from "@mui/material";
import LockIcon from "@mui/icons-material/LockOutlined";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import stylesfunc from "../assets/styles/AMSuite_styles/loginStyles";
import { useTheme } from "@mui/material/styles";

const Login = (props) => {
  const {
    settings,
    Login,
    redirect,
    isLogin,
    LoginActiveDirectory,
    isLoginButtonActiveDirectory,
    handleCloseLanguage,
    isLoginButton,
    handleChange,
    isSuccess,
    formErrors,
    passwordHidden,
    errorMessage,
    handlePasswordHidden,
    keyPress,
    isADLogin,
    isDesktop,
    LoginSAML,
    anchorElLanguage,
    handleMenuLanguage,
    changeLanguage,
    language,
    newLogin,
  } = props;

  const { t } = useTranslation();
  const navigate = useNavigate();
  const theme = useTheme();
  const styles = stylesfunc(theme);

  const openLanguage = Boolean(anchorElLanguage);

  return (
    <div>
      <ClickAwayListener onClickAway={handleCloseLanguage}>
        <div style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}>
          <Button
            aria-controls={openLanguage ? "menu-list-grow" : undefined}
            aria-haspopup="true"
            onClick={handleMenuLanguage}
            disableRipple
            color="inherit"
            sx={{
              right: "16px",
              top: "16px",
              boxShadow: "none",
              textTransform: "none",
              padding: "6px 12px",
              marginBottom: "4px",
            }}
          >
            {t(language)}
            <KeyboardArrowDown />
          </Button>

          <Popper
            open={openLanguage}
            anchorEl={anchorElLanguage}
            transition
            disablePortal
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                id="menu-list-grow"
                sx={{
                  transformOrigin:
                    placement === "bottom" ? "center top" : "center bottom",
                }}
              >
                <Paper>
                  <MenuList>
                    <MenuItem onClick={() => changeLanguage("es")}>
                      {t("spanish")}
                    </MenuItem>
                    <MenuItem onClick={() => changeLanguage("en")}>
                      {t("english")}
                    </MenuItem>
                    <MenuItem onClick={() => changeLanguage("fr")}>
                      {t("french")}
                    </MenuItem>
                    <MenuItem onClick={() => changeLanguage("pr")}>
                      {t("portugues")}
                    </MenuItem>
                  </MenuList>
                </Paper>
              </Grow>
            )}
          </Popper>
        </div>
      </ClickAwayListener>
      
      <div style={styles.main}>
        <div style={styles.fill}>
          <LinearProgress
            sx={{
              opacity: isLogin ? "1" : "0",
              width: "100%",
              background: "none",
              borderBottomLeftRadius: 50,
              borderBottomRightRadius: 50,
            }}
            variant="query"
          />
          
          <Paper sx={isDesktop ? styles.paper : styles.paperMobile}>
            <Avatar sx={styles.avatar}>
              <LockIcon sx={styles.buttonIcon} />
            </Avatar>
            <Typography component="h1" variant="h5">
              {t("logIn")}
            </Typography>
            
            <form style={styles.form}>
              <FormControl margin="normal" fullWidth>
                <InputLabel error={formErrors.email}>
                  {settings &&
                  settings.systemSettings.enable_AD &&
                  settings.systemSettings.enable_AMSuiteLogin
                    ? `${t("ActiveDirectoryAccount")}, ${t("userOrEmail")}`
                    : settings && settings.systemSettings.enable_AD
                    ? t("ActiveDirectoryAccount")
                    : t("UserOrEmail")}
                </InputLabel>
                <Input
                  error={formErrors.email}
                  id="email-input"
                  type="text"
                  autoFocus
                  onChange={handleChange("email")}
                />
                <FormHelperText
                  sx={{ opacity: formErrors.email ? 1 : 0 }}
                  error={formErrors.email}
                >
                  {newLogin.email && newLogin.email !== ""
                    ? t("invalidUserOrEmail")
                    : t("inputEmpty")}
                </FormHelperText>
              </FormControl>

              <FormControl margin="normal" fullWidth>
                <InputLabel
                  error={formErrors.password}
                  htmlFor="adornment-password"
                >
                  {t("password")}
                </InputLabel>
                <Input
                  error={formErrors.password}
                  id="adornment-password"
                  type={!passwordHidden ? "text" : "password"}
                  onChange={handleChange("password")}
                  autoComplete="current-password"
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="Toggle password visibility"
                        onClick={handlePasswordHidden}
                        size="large"
                      >
                        {!passwordHidden ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }
                  onKeyDown={keyPress}
                />
                <FormHelperText
                  sx={{ opacity: formErrors.password ? 1 : 0 }}
                  error={formErrors.password}
                >
                  {t("inputEmpty")}
                </FormHelperText>
              </FormControl>

              {errorMessage && (
                <FormHelperText error>{t("wrongUserPass")}</FormHelperText>
              )}

              <div style={{ display: "flex" }}>
                {settings && settings.systemSettings.enable_AD && (
                  <div
                    style={{
                      position: "relative",
                      width: !settings.systemSettings.enable_AMSuiteLogin
                        ? "100%"
                        : "50%",
                    }}
                  >
                    <Button
                      fullWidth
                      variant="contained"
                      color="primary"
                      disabled={isLoginButtonActiveDirectory}
                      onClick={isLogin ? undefined : LoginActiveDirectory}
                      sx={{
                        background: isSuccess && isADLogin ? green[500] : undefined,
                      }}
                    >
                      {isSuccess
                        ? t("successLogIn")
                        : isLoginButtonActiveDirectory
                        ? ""
                        : t("logInWithAD")}
                    </Button>
                    {isLoginButtonActiveDirectory && (
                      <CircularProgress
                        size={24}
                        sx={styles.customCircularProgress}
                      />
                    )}
                  </div>
                )}

                {settings && settings.systemSettings.enable_AMSuiteLogin && (
                  <div
                    style={{
                      marginLeft: !settings.systemSettings.enable_AD ? 0 : "2%",
                      position: "relative",
                      width: !settings.systemSettings.enable_AD
                        ? "100%"
                        : "50%",
                    }}
                  >
                    <Button
                      fullWidth
                      variant="contained"
                      color="primary"
                      disabled={isLoginButton}
                      onClick={isLogin ? undefined : Login}
                      sx={{
                        background: isSuccess && !isADLogin ? green[500] : undefined,
                      }}
                    >
                      {isSuccess
                        ? t("successLogIn")
                        : isLoginButton
                        ? ""
                        : t("logInWith")}
                    </Button>
                    {isLoginButton && (
                      <CircularProgress
                        size={24}
                        sx={styles.customCircularProgress}
                      />
                    )}
                  </div>
                )}
              </div>

              {settings &&
                settings.systemSettings.showVisitorSelfRegistration && (
                  <Divider sx={{ width: "100%", marginTop: 20, marginBottom: 20 }} />
                )}

              {settings &&
                settings.systemSettings.showVisitorSelfRegistration && (
                  <div style={{ position: "relative", width: "100%" }}>
                    <Button
                      fullWidth
                      variant="contained"
                      color="primary"
                      onClick={redirect}
                      sx={{ background: undefined }}
                    >
                      {t("AutoRegister")}
                    </Button>
                  </div>
                )}
            </form>
          </Paper>
        </div>
      </div>
    </div>
  );
};

Login.propTypes = {
  settings: PropTypes.object.isRequired,
  Login: PropTypes.func.isRequired,
  redirect: PropTypes.func.isRequired,
  isLogin: PropTypes.bool.isRequired,
  LoginActiveDirectory: PropTypes.func.isRequired,
  isLoginButtonActiveDirectory: PropTypes.bool.isRequired,
  handleCloseLanguage: PropTypes.func.isRequired,
  isLoginButton: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
  isSuccess: PropTypes.bool.isRequired,
  formErrors: PropTypes.object.isRequired,
  passwordHidden: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string.isRequired,
  handlePasswordHidden: PropTypes.func.isRequired,
  keyPress: PropTypes.func.isRequired,
  isADLogin: PropTypes.bool.isRequired,
  isDesktop: PropTypes.bool.isRequired,
  LoginSAML: PropTypes.func.isRequired,
  anchorElLanguage: PropTypes.object,
  handleMenuLanguage: PropTypes.func.isRequired,
  changeLanguage: PropTypes.func.isRequired,
  language: PropTypes.string.isRequired,
  newLogin: PropTypes.object.isRequired,
};

export default Login;

