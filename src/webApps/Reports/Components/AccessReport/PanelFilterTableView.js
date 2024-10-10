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
import { connect } from "react-redux";

class PanelsFilterTableView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
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
    } = this.props;
    return (
      <div style={{ display: "flex" }}>
        <div style={{ width: 240 }}>
          <FilterTableActions
            items={panels ? panels : []}
            itemsCount={panelsCount ? panelsCount : 0}
            selectedItems={selectedPanels}
            showProp="name"
            loadDataAction={this.props.requestGetPanels}
            store="Registers"
            dataName="registers"
            //   isLoadingData={isLoadingEntities}
            onSelect={handlePanelSelect}
            title={t("Panels")}
            open={true}
            onButtonClick={() => console.log("Button click")}
            notFixed={true}
            tabs={[{ value: 0, label: "Panel" }]}
            onTabSelect={(value) => this.props.handleTabSelect(value)}
            selectedTab={selectedTab}
            key={selectedTab}
          />
        </div>
        <div
          style={{
            width: 240,
            background: theme.palette.backgroundSecondary.main,
          }}
        >
          <Divider vertical />
          <div style={{ maxHeight: 300, width: "100%", padding: 10 }}>
            <Typography
              variant="h6"
              style={{ textAlign: "center", marginTop: 15 }}
            >
              {t("SelectedPanels")}
            </Typography>

            <div style={{ width: "100%" }}>
              {selectedPanelsObject.map((person) => (
                <Chip
                  key={person.id}
                  label={person.name}
                  onDelete={() => handleDeletePanel(person.id)}
                  className={classes.chip}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

PanelsFilterTableView.propTypes = {};

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

const PanelsFilterTableViewConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(PanelsFilterTableView);

export default withTranslation()(
  withStyles(styles, { withTheme: true })(PanelsFilterTableViewConnected)
);
