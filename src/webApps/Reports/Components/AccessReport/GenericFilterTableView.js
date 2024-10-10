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
import DataTableSelectAction from "../../../Shared/DataTable/DataTableSelectAction";
import { connect } from "react-redux";

class PanelsFilterTableView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      selectedItems,
      selectedItemsObject,
      handleItemSelect,
      handleItemTableSelect,
      t,
      handleDeleteItem,
      theme,
      classes,
      items,
      itemsCount,
      selectedTab,
    } = this.props;
    return (
      (<div style={{ display: "flex" }}>
        <Hidden mdDown>
          <div style={{ width: 240 }}>
            <FilterTableActions
              items={items ? items : []}
              itemsCount={itemsCount ? itemsCount : 0}
              selectedItems={selectedItems}
              showProp={this.props.showProp}
              loadDataAction={this.props.handleRequestItems}
              store={this.props.store}
              dataName={this.props.showProp}
              //   isLoadingData={isLoadingEntities}
              onSelect={handleItemSelect}
              title={t(this.props.title)}
              open={true}
              onButtonClick={() => console.log("Button click")}
              notFixed={true}
              tabs={[{ value: 0, label: t(this.props.title) }]}
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
                {t("SelectedItems")}
              </Typography>

              <div style={{ width: "100%" }}>
                {selectedItemsObject.map((item) => {
                  return (
                    <Chip
                      key={item.id}
                      label={item[this.props.showProp]}
                      onDelete={() => handleDeleteItem(item.id)}
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
            handleConfirm={handleItemTableSelect}
            loadDataAction={this.props.handleRequestItems}
            elements={selectedItemsObject}
            primaryTitle={t(this.props.title)}
            title={t(this.props.title)}
            DataTableColumns={[
              {
                name: t("name"),
                field: "name",
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
            attribute={this.props.showProp}
            info={{
              data: items,
              dataCount: itemsCount,
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

const mapStateToProps = (store, ownProps) => {
  const { reducer, property } = ownProps;
  return {
    items: store[reducer][property] ? store[reducer][property].data : undefined,
    itemsCount: store[reducer][property]
      ? store[reducer][property].dataCount
      : undefined,
  };
};

const mapDispatchToProps = {};

const PanelsFilterTableViewConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(PanelsFilterTableView);

export default withTranslation()(
  withStyles(styles, { withTheme: true })(PanelsFilterTableViewConnected)
);
