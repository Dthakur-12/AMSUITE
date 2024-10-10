import React from "react";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/DeleteRounded";
import EditIcon from "@mui/icons-material/EditRounded";
import DetailsIcon from "@mui/icons-material/FormatListBulletedRounded";
import { withStyles } from '@mui/styles';
//import AddAccessLevelIcon from "@mui/icons-material/CalendarToday";
import { Icon } from "semantic-ui-react";
import { withTranslation } from "react-i18next";
import CustomStyles from "../../../assets/styles/Shared_Styles/DataTable/CustomToolBarSelectReaderStyles";

class CustomToolbarSelectReader extends React.Component {
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
      onDelete(selectedRows.data.map((x) => x.index));
    else onDelete([selectedRows.data[0].index]);
  };
  handleDetails = () => {
    const { onDetails, selectedRows } = this.props;
    onDetails(selectedRows.data[0].index);
  };
  handleEdit = () => {
    const { onEdit, selectedRows } = this.props;
    onEdit(selectedRows.data[0].index);
  };

  handleAssignAccessLevels = () => {
    const { onAssignAccessLevel, selectedRows } = this.props;
    onAssignAccessLevel(selectedRows.data[0].index);
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const { selectedRows } = nextProps;
    if (selectedRows !== prevState.selectedRows) {
      return {
        selectedRows: selectedRows,
      };
    } else return null;
  }

  render() {
    const { classes, t, onEdit, onDelete, onAssignAccessLevel } = this.props;
    const { selectedRows } = this.state;
    return (
      (<div>
        {/* {onDelete && (
          <Tooltip title={t("delete")}>
            <IconButton
              className={classes.iconButton}
              onClick={this.handleDelete}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        )} */}
        {selectedRows.data.length < 2 && (
          <span>
            {onEdit && (
              <Tooltip title={t("edit")}>
                <IconButton className={classes.iconButton} onClick={this.handleEdit} size="large">
                  <EditIcon />
                </IconButton>
              </Tooltip>
            )}
            <Tooltip title={t("details")}>
              <IconButton className={classes.iconButton} onClick={this.handleDetails} size="large">
                <DetailsIcon />
              </IconButton>
            </Tooltip>
            {onAssignAccessLevel && (
              <Tooltip title={t("AssignAccessLevel")}>
                <IconButton
                  className={classes.iconButton}
                  onClick={this.handleAssignAccessLevels}
                  style={{ paddingBottom: "15px" }}
                  size="large">
                  <Icon name="address card" style={{ margin: 0 }} />
                </IconButton>
              </Tooltip>
            )}
          </span>
        )}
      </div>)
    );
  }
}

export default withTranslation()(
  withStyles(CustomStyles, {
    name: "CustomToolbarSelect",
  })(CustomToolbarSelectReader)
);
