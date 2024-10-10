import React, { Component } from "react";
import Dropzone from "react-dropzone";
import {
  Divider,
  DialogContent,
  DialogActions,
  Button
} from "@mui/material";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import { withStyles } from '@mui/styles';
import UploadCloudIcon from "@mui/icons-material/CloudUploadRounded";
import SnackbarHandler from "../../utils/SnackbarHandler";
import { withTranslation } from "react-i18next";
import CustomStyles from "../../assets/styles/Shared_Styles/DropFilesDialogStyles";

class DropFilesDialog extends Component {
  constructor(props) {
    super(props);
    const { title, dropzoneText, multiple, accept, defaultImage } = props;
    this.state = {
      title,
      dropzoneText,
      files: [],
      open: false,
      multiple,
      accept,
      defaultImage
    };
  }

  componentDidMount() {}

  componentWillUnmount() {
    this.state.files.forEach(f => URL.revokeObjectURL(f.preview));
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { open } = nextProps;
    if (open !== prevState.open) {
      return {
        open: open
      };
    } else return null;
  }

  handleClose = () => {
    this.props.onClose();
    this.state.files.forEach(f => URL.revokeObjectURL(f.preview));
    this.setState({ files: [] });
  };

  onFiles = () => {
    this.props.onFiles(this.state.filesDate);
    this.state.files.forEach(f => URL.revokeObjectURL(f.preview));
    this.setState({ files: [], filesDate: [] });
  };

  onDrop = (files, rejectedFiles) => {
    const { t } = this.prop;
    if (rejectedFiles.length !== 0) {
      SnackbarHandler.showMessage(t("InvalidFormatArchive"), "error");
    } else {
      this.setState({
        files: files.map(file =>
          Object.assign(file, { preview: URL.createObjectURL(file) })
        ),
        filesDate: files
      });
      SnackbarHandler.showMessage(t("SuccessUpdateArchive"));
    }
  };

  render() {
    const {
      title,
      dropzoneText,
      files,
      open,
      multiple,
      accept,
      defaultImage
    } = this.state;
    const { classes, t } = this.props;

    const thumbs = files.map((file, index) => (
      <div className={classes.thumb} key={index}>
        <div className={classes.thumbInner}>
          <img alt="preview" src={file.preview} className={classes.img} />
        </div>
      </div>
    ));

    return (
      <Dialog
        onClose={this.props.onClose}
        style={{ zIndex: 1700 }}
        open={open ? open : false}
        onBackdropClick={this.handleClose}
      >
        <DialogTitle style={{ paddingBottom: 10 }}>{title}</DialogTitle>
        <Divider />
        <DialogContent style={{ padding: 24, display: "flex" }}>
          <Dropzone
            className={classes.dropzone}
            accept={accept}
            onDrop={this.onDrop.bind(this)}
            inputProps={{
              style: { width: "100%" }
            }}
            multiple={multiple}
          >
            <Typography style={{ textAlign: "center" }}>
              {dropzoneText}
            </Typography>
            <UploadCloudIcon
              fontSize="large"
              className={classes.customUploadCloudIcon}
            />
          </Dropzone>
          <aside className={classes.thumbsContainer}>
            {files.length === 0 && (
              <div className={classes.thumb}>
                <div className={classes.thumbInner}>{defaultImage}</div>
              </div>
            )}
            {files.length !== 0 && thumbs}
          </aside>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose}>{t("cancel")}</Button>
          <Button onClick={this.onFiles}>{t("confirm")}</Button>
        </DialogActions>
      </Dialog>
    );
  }
}

DropFilesDialog.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withTranslation()(
  withStyles(CustomStyles, { withTheme: true })(DropFilesDialog)
);
