import React from "react";
import { withStyles } from '@mui/styles';
import Typography from "@mui/material/Typography";
import { Icon, Button } from "semantic-ui-react";
import CustomStyles from "../../assets/styles/Shared_Styles/FileComponentStyles";

const SelectIcon = ({ extension }) => {
  switch (extension) {
    case "":
      return <Icon name="file outline" size="huge" inverted />;
    case "jpg":
      return <Icon name="file image outline" size="huge" inverted />;
    case "png":
      return <Icon name="file image outline" size="huge" inverted />;
    case "txt":
      return <Icon name="file word outline" size="huge" inverted />;
    case "doc":
      return <Icon name="file pdf outline" size="huge" inverted />;
    case "pdf":
      return <Icon name="file pdf outline" size="huge" inverted />;
    default:
      return <Icon name="file outline" size="huge" inverted />;
  }
};

const getMimeType = ext => {
  switch (ext) {
    case "pdf":
      return "application/pdf";
    case "jpg":
      return "image/jpeg";
    case "png":
      return "image/png";
    case "txt":
      return "text/plain";
    case "doc":
      return "application/msword";
    default:
      return "text/plain";
  }
};

const FileComponent = props => {
  const {
    classes,
    handleRemove,
    fullName,
    extension,
    id,
    canDelete,
    canDownload,
    handleDownload
  } = props;
  return (
    <div className={classes.fileComponent}>
      <SelectIcon extension={extension} />
      <Typography className={classes.customTypo}>{fullName}</Typography>
      {canDelete && (
        <Button
          size={"mini"}
          onClick={() => handleRemove(id)}
          className={classes.closeIcon}
          circular
          icon="close"
        />
      )}
      {canDownload && (
        <Button
          size={"mini"}
          onClick={() => handleDownload(id, fullName, getMimeType(extension))}
          className={classes.downloadIcon}
          circular
          icon="download"
        />
      )}
    </div>
  );
};

export default withStyles(CustomStyles, { withTheme: true })(FileComponent);
