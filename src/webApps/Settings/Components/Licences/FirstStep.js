import { Button } from "@mui/material";
import { withStyles } from '@mui/styles';
import PropTypes from "prop-types";
import React from "react";
import { withTranslation } from "react-i18next";
import { Icon, Input, Message } from "semantic-ui-react";
import CustomStyles from "../../../../assets/styles/Settings_styles/License/FirstStepStyles";

class FirstStep extends React.Component {
  copyToClipboard = e => {
    this.tokenInput.select();
    document.execCommand("copy");
    e.target.focus();
  };

  render() {
    const { classes, t } = this.props;
    return (
      <div style={{ padding: 12 }}>
        <Button className={classes.button}>{t("GenerateToken")}</Button>
        {document.queryCommandSupported("copy") && (
          <Input
            ref={tokenInput => (this.tokenInput = tokenInput)}
            value={this.props.token}
            action
            className={classes.tokenInput}
          >
            <input />
            <Button
              className={classes.inputButton}
              onClick={this.copyToClipboard}
            >
              <Icon name="copy" className={classes.leftIcon} />
              {t("Copy")}
            </Button>
            <Button
              className={classes.inputButton}
              onClick={this.props.handleDownloadToken}
              style={{ borderRadius: "0 5px 5px 0" }}
            >
              <Icon name="download" className={classes.leftIcon} />
              {t("Download")}
            </Button>
          </Input>
        )}
        <Message info>
          <Message.Header>
            <Icon name="copy" className={classes.leftIcon} />
            Token
          </Message.Header>
          <Message.Content>{t("TokenDescription")}</Message.Content>
        </Message>
      </div>
    );
  }
}

FirstStep.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withTranslation()(withStyles(CustomStyles)(FirstStep));
