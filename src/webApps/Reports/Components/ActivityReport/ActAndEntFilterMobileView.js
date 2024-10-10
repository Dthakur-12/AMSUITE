import React from "react";
import PropTypes from "prop-types";
import FilterTable from "../../../Shared/Filters/FilterTable";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import { withStyles } from '@mui/styles';
import { withTranslation } from "react-i18next";
import { Typography, Grid } from "@mui/material";
import Chip from "@mui/material/Chip";
import { Divider } from "semantic-ui-react";
import DataTableSelectAction from "../../../Shared/DataTable/DataTableSelectAction";

const ActAndEntFilterMobileView = (props) => {
  const {
    entities,
    selectedEntities = [],
    isLoadingEntities,
    handleSearch,
    handleSelect,
    handlePageChange,
    page,
    t,
    requestEntitiesClientSide,
    selectedActivities,
    handleActivitySelected,
    handleDeleteEntity,
    activities,
    theme,
    classes,
  } = props;
  // const entitiesObjects = entities.map((str, index) => ({
  //   name: str,
  //   id: index + 1,
  // }));
  const entitiesObjects = entities;
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div
        style={{
          width: 240,
          background: theme.palette.backgroundSecondary.main,
        }}
      >
        <div style={{ width: "100%" }}>
          <Typography
            variant="h6"
            style={{ textAlign: "center", marginTop: 25 }}
          >
            {t("Activity")}
          </Typography>
          <List style={{ padding: 20 }}>
            {activities.map((activity) => (
              <ListItem
                key={activity.id}
                style={{ padding: 0 }}
                role={undefined}
                dense
                button
                onClick={() => handleActivitySelected(activity.id)}
              >
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    style={{ padding: 0 }}
                    checked={selectedActivities.indexOf(activity.id) !== -1}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ "aria-labelledby": activity.id }}
                  />
                </ListItemIcon>
                <ListItemText id={activity.id} primary={activity.name} />
              </ListItem>
            ))}
          </List>
        </div>
        <Grid item xs={12} md={6}>
          <DataTableSelectAction
            handleConfirm={handleSelect}
            loadDataAction={requestEntitiesClientSide}
            elements={selectedEntities}
            primaryTitle={t("Entities")}
            title={t("Entities")}
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
                      return (
                        <Typography value={data.name}>{data.name}</Typography>
                      );
                  },
                },
              },
            ]}
            multipleSelect={true}
            attribute={"name"}
            info={entitiesObjects}
          />
        </Grid>
      </div>
    </div>
  );
};

ActAndEntFilterMobileView.propTypes = {};

const style = (theme) => ({
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

export default withTranslation()(
  withStyles(style, { withTheme: true })(ActAndEntFilterMobileView)
);
