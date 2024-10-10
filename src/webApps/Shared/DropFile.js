import React, { Component } from "react";
import Dropzone from "react-dropzone";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import { withStyles } from '@mui/styles';
import UploadCloudIcon from "@mui/icons-material/CloudUploadRounded";
import SnackbarHandler from "../../utils/SnackbarHandler";
import { isNullOrUndefined } from "util";
import { withTranslation } from "react-i18next";
import FileComponent from "./FileComponent";
import CustomStyles from "../../assets/styles/Shared_Styles/DropFileStyles";

class DropFile extends Component {
  constructor(props) {
    super(props);
    const {
      title,
      dropzoneText,
      multiple,
      accept,
      defaultImage,
      files,
      isDisable,
    } = props;

    this.state = {
      title,
      dropzoneText,
      files: isNullOrUndefined(files) ? [] : files,
      multiple,
      accept,
      defaultImage,
      isDisable,
    };
  }

  componentDidMount() {}

  componentWillUnmount() {
    if (isNullOrUndefined(this.props.noRevokeURL)) {
      this.state.files.forEach((f) => URL.revokeObjectURL(f.preview));
    }
  }

  handleClose = () => {
    this.props.onClose();
    this.state.files.forEach((f) => URL.revokeObjectURL(f.preview));
    this.setState({ files: [] });
  };

  onDrop = (files, rejectedFiles) => {
    if (rejectedFiles.length !== 0) {
      SnackbarHandler.showMessage("¡Formato de archivo no valido!", "error");
    } else {
      this.setState({
        files: files.map((file) =>
          Object.assign(file, {
            preview:
              typeof file === "string" ? file : URL.createObjectURL(file),
          })
        ),
      });

      this.props.onFiles(files);
      // SnackbarHandler.showMessage("¡Archivo subido con éxito!");
    }
  };

  render() {
    const {
      dropzoneText,
      multiple,
      accept,
      defaultImage,
      isDisable,
    } = this.state;
    const { files = [] } = this.props;
    const {
      classes,
      areFiles,
      onRemove,
      onRemoveOldFiles,
      oldFiles = [],
    } = this.props;

    const thumbs = files.map((file, index) => {
      return (
        <div className={classes.thumb} key={index}>
          <div className={classes.thumbInner}>
            <img alt="preview" src={file.preview} className={classes.img} />
          </div>
        </div>
      );
    });
    // {file.preview && (  )}
    return (
      <div
        style={
          this.props.forTikas
            ? {}
            : {
                width: "100%",
              }
        }
      >
        {!areFiles && (
          <div style={{ display: "flex", width: "100%", height: "100%" }}>
            {!isDisable && (
              <Dropzone
                className={classes.dropzoneWithImage}
                accept={accept}
                onDrop={this.onDrop.bind(this)}
                inputProps={{
                  style: { width: "100%" },
                }}
                multiple={multiple}
              >
                <Typography className={classes.typo}>{dropzoneText}</Typography>
                <UploadCloudIcon
                  fontSize="large"
                  className={classes.customCloud}
                />
              </Dropzone>
            )}
            <aside
              className={classes.thumbsContainer}
              style={{ marginLeft: "0px" }}
            >
              {files.length === 0 && (
                <div className={classes.thumb}>
                  <div className={classes.thumbInner}>{defaultImage}</div>
                </div>
              )}
              {files.length !== 0 && thumbs}
            </aside>
          </div>
        )}
        {areFiles && (
          <div className={classes.fileDiv}>
            {!isDisable && (
              <Dropzone
                className={classes.dropzone}
                accept={accept}
                onDrop={this.onDrop.bind(this)}
                inputProps={{
                  style: { width: "100%" },
                }}
                multiple={multiple}
              >
                <Typography className={classes.typo}>{dropzoneText}</Typography>
                <UploadCloudIcon fontSize="large" />
              </Dropzone>
            )}
            <aside className={classes.fileContent}>
              {!isNullOrUndefined(oldFiles) &&
                Object.keys(oldFiles).map((key) => {
                  return (
                    <FileComponent
                      canDelete
                      className={classes.fileComponent}
                      key={key}
                      id={key}
                      handleRemove={onRemoveOldFiles}
                      fullName={oldFiles[key]}
                      extension={oldFiles[key].split(".").pop()}
                    />
                  );
                })}
              {this.props.files.map((file, index) => {
                return (
                  <FileComponent
                    canDelete
                    className={classes.fileComponent}
                    key={index}
                    id={index}
                    handleRemove={onRemove}
                    fullName={file[0].name}
                    extension={file[0].name.split(".").pop()}
                  />
                );
              })}
            </aside>
          </div>
        )}
      </div>
    );
  }
}

DropFile.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withTranslation()(
  withStyles(CustomStyles, { withTheme: true })(DropFile)
);
