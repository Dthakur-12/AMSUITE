import React from "react";
import SnackbarContent from "@mui/material/SnackbarContent";
import { withStyles } from '@mui/styles';
import classNames from "classnames";
import CloseIcon from "@mui/icons-material/Close";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import WarningIcon from "@mui/icons-material/Warning";
import ErrorIcon from "@mui/icons-material/Error";
import InfoIcon from "@mui/icons-material/Info";
import IconButton from "@mui/material/IconButton";
import CustomStyles from "../../assets/styles/Shared_Styles/MySnackbarContentStyles";
import GetAppIcon from "@mui/icons-material/GetApp";

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
};

function MySnackbarContent(props) {
  const {
    classes,
    className,
    message,
    onClose,
    variant,
    download,
    onDownload,
    ...other
  } = props;
  const Icon = variantIcon[variant];
  return (
    (<SnackbarContent
      className={classNames(classes[variant], className)}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.message}>
          <Icon className={classNames(classes.icon, classes.iconVariant)} />
          {message}
        </span>
      }
      action={
        download
          ? [
              <IconButton
                // key="close"
                //aria-label="Close"
                color="inherit"
                className={classes.close}
                onClick={onDownload}
                size="large">
                <GetAppIcon className={classes.icon} />
              </IconButton>,
              <IconButton
                key="close"
                aria-label="Close"
                color="inherit"
                className={classes.close}
                onClick={onClose}
                size="large">
                <CloseIcon className={classes.icon} />
              </IconButton>,
            ]
          : [
              <IconButton
                key="close"
                aria-label="Close"
                color="inherit"
                className={classes.close}
                onClick={onClose}
                size="large">
                <CloseIcon className={classes.icon} />
              </IconButton>,
            ]
      }
      {...other}
    />)
  );
}

export default withStyles(CustomStyles, { withTheme: true })(MySnackbarContent);
