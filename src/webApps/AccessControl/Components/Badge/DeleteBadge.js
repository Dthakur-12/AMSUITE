import React, { Component } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import ApiHandler from "../../../../services/ApiHandler";
import SnackbarHandler from "../../../../utils/SnackbarHandler";
import { withTranslation } from "react-i18next";

class AlertDialog extends Component {
  constructor(props) {
    super(props);
    const { initValues } = props;
    this.state = {
      open: false,
      badgeOnDelete: initValues ? initValues : undefined
    };
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleOnDeleteConfirm = () => {
    const { t } = this.props;
    let badge = this.state.badgeOnDelete;
    ApiHandler.AccessControl.Badges.deleteBadge(badge.id)
      .then(() => {
        SnackbarHandler.showMessage(t("badgeDeleted"));
        this.setState({ open: false });
      })
      .catch(error => {
        this.setState({
          isCreating: false
        });
        SnackbarHandler.showMessage(error.error, "error");
      });
  };

  render() {
    const { badgeOnDelete } = this.state;
    const { t } = this.props;
    return (
      <div>
        <DialogTitle id="alert-dialog-title">{t("deleteBadge")}</DialogTitle>

        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {`${t("youSureDeleteBadge")} ${badgeOnDelete.number}`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleOnDelete} color="primary">
            {t("accept")}
          </Button>
          <Button onClick={this.handleClose} color="primary" autoFocus>
            {t("cancel")}
          </Button>
        </DialogActions>
      </div>
    );
  }
}

export default withTranslation()(AlertDialog);
