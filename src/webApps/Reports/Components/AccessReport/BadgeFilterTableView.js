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
import Hidden from "@mui/material/Hidden";
import Chip from "@mui/material/Chip";
import { Divider } from "semantic-ui-react";
import { requestBadges } from "../../../../actions/EasyAccess/Badges_actions";
import DataTableSelectAction from "../../../Shared/DataTable/DataTableSelectAction";
import { connect } from "react-redux";

class PanelsFilterTableView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      selectedBadges,
      selectedBadgesObject,
      handleBadgeSelect,
      handleBadgeTableSelect,
      t,
      handleDeleteBadge,
      theme,
      classes,
      badges,
      badgesCount,
      selectedTab,
    } = this.props;
    return (
      (<div style={{ display: "flex" }}>
        <Hidden mdDown>
          <div style={{ width: 240 }}>
            <FilterTableActions
              items={badges ? badges : []}
              itemsCount={badgesCount ? badgesCount : 0}
              selectedItems={selectedBadges}
              showProp="number"
              loadDataAction={this.props.requestBadges}
              store="Badges"
              dataName="badges"
              //   isLoadingData={isLoadingEntities}
              onSelect={handleBadgeSelect}
              title={t("Badges")}
              open={true}
              onButtonClick={() => console.log("Button click")}
              notFixed={true}
              tabs={[{ value: 0, label: t("Badges") }]}
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
                {t("SelectedBadges")}
              </Typography>

              <div style={{ width: "100%" }}>
                {selectedBadgesObject.map((badge) => {
                  return (
                    <Chip
                      key={badge.id}
                      label={badge.number}
                      onDelete={() => handleDeleteBadge(badge.id)}
                      className={classes.chip}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </Hidden>
        <Hidden smUp>
          <DataTableSelectAction
            handleConfirm={handleBadgeTableSelect}
            loadDataAction={this.props.requestBadges}
            elements={selectedBadgesObject}
            primaryTitle={t("Badges")}
            title={t("Badges")}
            DataTableColumns={[
              {
                name: t("number"),
                field: "number",
                options: {
                  sort: true,
                  filter: true,
                  sortDirection: "asc",
                  customBodyRender: (data) => {
                    if (data.number)
                      return (
                        <Typography value={data.number}>
                          {data.number}
                        </Typography>
                      );
                  },
                },
              },
            ]}
            multipleSelect={true}
            attribute={"number"}
            info={{
              data: badges,
              dataCount: badgesCount,
            }}
          />
        </Hidden>
      </div>)
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

const mapStateToProps = ({ Badges }) => ({
  badges: Badges.badges ? Badges.badges.data : undefined,
  badgesCount: Badges.badges ? Badges.badges.dataCount : undefined,
});

const mapDispatchToProps = {
  requestBadges: requestBadges,
};

const PanelsFilterTableViewConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(PanelsFilterTableView);

export default withTranslation()(
  withStyles(styles, { withTheme: true })(PanelsFilterTableViewConnected)
);
