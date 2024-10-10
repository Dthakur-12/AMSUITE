import React from "react";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/DeleteRounded";
import RoomRoundedIcon from "@mui/icons-material/RoomRounded";
import EditIcon from "@mui/icons-material/EditRounded";
import Exit from "@mui/icons-material/ExitToApp";
import MessageIcon from "@mui/icons-material/Message";
import DetailsIcon from "@mui/icons-material/FormatListBulletedRounded";
import { withStyles } from '@mui/styles';
import { withTranslation } from "react-i18next";
import CustomStyles from "../../../assets/styles/Shared_Styles/DataTable/CustomToolBarSelectPanelStyles";

class CustomToolbarSelect extends React.Component {
  constructor(props) {
    super(props);
    const { selectedRows } = props;
    this.state = {
      selectedRows,
    };
  }

  handleDelete = () => {
    const { onDelete, selectedRows } = this.props;
    if (selectedRows.data.length > 1)
      onDelete(selectedRows.data.map((x) => x.dataIndex));
    else onDelete([selectedRows.data[0].dataIndex]);
  };
  handleHistoryGPS = () => {
    const { onHistoryGPS, selectedRows } = this.props;
    onHistoryGPS(selectedRows.data[0].dataIndex);
  };
  handleDetails = () => {
    const { onDetails, selectedRows } = this.props;
    onDetails(selectedRows.data[0].dataIndex);
  };
  handleEdit = () => {
    const { onEdit, selectedRows } = this.props;
    onEdit(selectedRows.data[0].dataIndex);
  };

  handleMessages = () => {
    const { onMessages, selectedRows, data } = this.props;
    onMessages(selectedRows.data[0].dataIndex);
  };

  handleForceLogout = () => {
    const { onForceLogout, selectedRows } = this.props;
    onForceLogout(selectedRows.data[0].dataIndex);
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const { selectedRows } = nextProps;
    if (selectedRows !== prevState.selectedRows) {
      return {
        selectedRows: selectedRows,
      };
    } else return null;
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateScreenMode);
  }

  updateScreenMode = () => {
    this.setState({ isDesktop: window.innerWidth > 900 });
  };

  componentDidMount() {
    this.updateScreenMode();
    window.addEventListener("resize", this.updateScreenMode);
  }

  render() {
    const { classes, t, data, permitsToDelete, permitsToEdit } = this.props;
    const { selectedRows } = this.state;
    return (
      (<div style={this.state.isDesktop ? {} : { width: 216 }}>
        {permitsToDelete && (
          <Tooltip title={t("delete")}>
            <IconButton className={classes.iconButton} onClick={this.handleDelete} size="large">
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        )}
        {selectedRows.data.length < 2 && (
          <span>
            <Tooltip title={t("HistoryGPS")}>
              <IconButton
                className={classes.iconButton}
                onClick={this.handleHistoryGPS}
                size="large">
                <RoomRoundedIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title={t("details")}>
              <IconButton className={classes.iconButton} onClick={this.handleDetails} size="large">
                <DetailsIcon />
              </IconButton>
            </Tooltip>

            {permitsToEdit && (
              <span>
                <Tooltip title={t("edit")}>
                  <IconButton className={classes.iconButton} onClick={this.handleEdit} size="large">
                    <EditIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title={t("ForceLogout")}>
                  <IconButton
                    className={classes.iconButton}
                    onClick={this.handleForceLogout}
                    size="large">
                    <Exit />
                  </IconButton>
                </Tooltip>
                {data[selectedRows.data[0].dataIndex].typeName === "Device" && (
                  <Tooltip title={t("Messages")}>
                    <IconButton className={classes.iconButton} onClick={this.handleMessages} size="large">
                      <MessageIcon />
                    </IconButton>
                  </Tooltip>
                )}
              </span>
            )}

            {/* <Tooltip title={t("LiveTracking")}>
            <IconButton
              className={classes.iconButton}
              onClick={this.handleDetails}
            >
              <Place />
            </IconButton>
          </Tooltip>
          <Tooltip title={t("HistoricalTracking")}>
            <IconButton
              className={classes.iconButton}
              onClick={this.handleDetails}
            >
              <History />
            </IconButton>
          </Tooltip> */}
          </span>
        )}
      </div>)
    );
  }
}

export default withTranslation()(
  withStyles(CustomStyles, {
    name: "CustomToolbarSelect",
  })(CustomToolbarSelect)
);
