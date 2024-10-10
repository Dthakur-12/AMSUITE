import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from '@mui/styles';
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { CircularProgress } from "@mui/material";
import SnackbarHandler from "../../utils/SnackbarHandler";
import { isNullOrUndefined } from "util";
import { withTranslation } from "react-i18next";
import CustomStyles from "../../assets/styles/Shared_Styles/ConfirmationDialogStyles";

function Transition(props) {
  return <Slide direction="down" {...props} />;
}

class ConfirmationDialog extends Component {
  constructor(props) {
    super(props);
    const { open } = props;
    this.state = {
      open
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { open } = nextProps;
    if (open !== prevState.open) {
      return {
        open: open
      };
    } else return null;
  }

  handleConfirm = () => {
    const {
      deleteFunction,
      elementId,
      updateParentFunction,
      confirmFunction
    } = this.props;
    this.setState({
      isLoading: true
    });

    if (!isNullOrUndefined(deleteFunction)) {
      deleteFunction(elementId)
        .then(() => {
          if (!isNullOrUndefined(updateParentFunction)) updateParentFunction();
          this.handleClose();
        })
        .catch(error => {
          SnackbarHandler.showMessage(error.error, "error");
          this.setState({ isLoading: false });
        });
    } else {
      confirmFunction(elementId)
        .then(() => {
          if (!isNullOrUndefined(updateParentFunction)) updateParentFunction();
          this.handleClose();
        })
        .catch(error => {
          SnackbarHandler.showMessage(error.error, "error");
          this.setState({ isLoading: false });
        });
    }
  };

  handleClose = () => {
    this.setState({ open: false, isLoading: false });
    this.props.onClose();
  };

  render() {
    const { open } = this.state;
    const { title, body, t, classes } = this.props;
    return (
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={this.handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          {title ? title : ""}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {body}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} className={classes.cancelButton}>
            {t("cancel")}
          </Button>
          <div style={{ position: "relative" }}>
            <Button
              disabled={this.state.isLoading}
              onClick={this.handleConfirm}
              //color="primary"
              variant="contained"
              className={classes.confirmButton}
            >
              {t("confirm")}
            </Button>
            {this.state.isLoading && (
              <CircularProgress
                size={24}
                className={classes.customCircularProgress}
              />
            )}
          </div>
        </DialogActions>
      </Dialog>
    );
  }
}

ConfirmationDialog.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withTranslation()(withStyles(CustomStyles)(ConfirmationDialog));
