import React from "react";
import PropTypes from "prop-types";
import FilterTableActions from "../../../Shared/Filters/FilterTableActions";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import { withStyles } from '@mui/styles';
import { withTranslation } from "react-i18next";
import { Typography } from "@mui/material";
import Chip from "@mui/material/Chip";
import { Divider } from "semantic-ui-react";
import { requestGetPanels } from "../../../../actions/AccessControl/panel_actions";
import DataTableSelectAction from "../../../Shared/DataTable/DataTableSelectAction";
import { connect } from "react-redux";

const PanelFilterTableMobileView = (props) => {
  const {
    selectedPanels,
    selectedPanelsObject,
    handlePanelSelect,
    t,
    handleDeletePanel,
    theme,
    classes,
    panels,
    panelsCount,
    selectedTab,
    requestGetPanels,
  } = props;

  return (
    <div style={{ display: "flex" }}>
      <DataTableSelectAction
        handleConfirm={handlePanelSelect}
        loadDataAction={props.requestGetPanels}
        elements={selectedPanels}
        primaryTitle={t("Panels")}
        title={t("Panels")}
        DataTableColumns={[
          {
            name: t("name"),
            field: "name",
            options: {
              sort: true,
              filter: true,
              sortDirection: "asc",
              customBodyRender: (data) => {
                if (data.name)
                  return <Typography value={data.name}>{data.name}</Typography>;
              },
            },
          },
        ]}
        multipleSelect={true}
        attribute={"name"}
        info={{
          data: panels,
          dataCount: panelsCount,
        }}
      />
    </div>
  );
};

const styles = (theme) => ({
  chip: {
    "& svg": {
      margin: 0,
    },
    "& span": {
      paddingRight: 4,
    },
    height: 20,
    margin: 5,
  },
});

const mapStateToProps = ({ Panel }) => ({
  panels: Panel.panels,
  panelsCount: Panel.panelsCount,
});

const mapDispatchToProps = {
  requestGetPanels: requestGetPanels,
};

const PanelFilterTableMobileViewConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(PanelFilterTableMobileView);

export default withTranslation()(
  withStyles(styles, { withTheme: true })(PanelFilterTableMobileViewConnected)
);
