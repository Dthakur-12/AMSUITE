import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from '@mui/styles';
import { Card, CardHeader, CardContent, Typography } from "@mui/material";
import DoorIcon from "@mui/icons-material/MeetingRoomRounded";
import { isNullOrUndefined } from "util";
import { withTranslation } from "react-i18next";
import styles from "../../../../assets/styles/AccessControl_styles/VirtualZone_Styles/viewGateCardStyles";
class ViewGateCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showInfo: true,
      errorMessage: "",
      formErrors: {},
      anchorEl: null
    };
  }

  handleOpenOptions = event => {
    this.setState({
      anchorEl: event.currentTarget
    });
  };

  handleClose = () => this.setState({ anchorEl: null });

  handleDelete = () => {
    const { gate } = this.props;
    this.handleClose();
    this.props.onDelete(gate);
  };

  render() {
    const { classes, gate, gateNumber, t, handleEdit } = this.props;
    return (
      <Card
        className={classes.badge}
        elevation={24}
        onClick={handleEdit}
        style={{ cursor: "pointer" }}
      >
        <CardHeader
          title={
            <span
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center"
              }}
            >
              <DoorIcon style={{ marginRight: 5 }} />
              <Typography>{` ${t("Door")} ${gateNumber}`}</Typography>
            </span>
          }
          className={classes.cardHeader}
        />

        <CardContent className={classes.cardContent}>
          {!isNullOrUndefined(gate.entranceReader) &&
            gate.entranceReader.label !== "" && (
              <Typography component="p" title={t("entranceReaders")}>
                {`${t("entranceReaders")} : ${gate.entranceReader.label}`}
              </Typography>
            )}
          {(isNullOrUndefined(gate.entranceReader) ||
            gate.entranceReader.label === "") && (
            <Typography component="p" title={t("entranceReaders")}>
              {t("noEntranceReader")}
            </Typography>
          )}

          {!isNullOrUndefined(gate.exitReader) && gate.exitReader.label !== "" && (
            <Typography component="p" title={t("exitReaders")}>
              {`${t("exitReaders")} : ${gate.exitReader.label}`}
            </Typography>
          )}
          {(isNullOrUndefined(gate.exitReader) ||
            gate.exitReader.label === "") && (
            <Typography component="p" title={t("exitReaders")}>
              {t("noExitReader")}
            </Typography>
          )}
        </CardContent>
      </Card>
    );
  }
}

ViewGateCard.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

// const InitalConnected = connect(null, mapDispatchToProps)(Init)

export default withTranslation()(
  withStyles(styles, { withTheme: true })(ViewGateCard)
);
