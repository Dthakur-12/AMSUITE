import React from "react";
import PropTypes from "prop-types";
import FilterTable from "../../../Shared/Filters/FilterTable";
import {
  List,
  Grid,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import { withStyles } from '@mui/styles';
import { withTranslation } from "react-i18next";
import { Typography } from "@mui/material";
import Chip from "@mui/material/Chip";
import { Divider } from "semantic-ui-react";

const ActAndEntFilterView = (props) => {
  const {
    entities,
    selectedEntities,
    isLoadingEntities,
    handleSearch,
    handleSelect,
    handlePageChange,
    page,
    t,
    selectedActivities,
    handleActivitySelected,
    handleDeleteEntity,
    activities,
    theme,
    classes,
  } = props;
  return (
    <Grid className={classes.actAndEntContainer}>
      <Grid className={classes.tableContainer}>
        <FilterTable
          items={entities.slice(page, page + 6)}
          itemsCount={entities.length}
          selectedItems={selectedEntities}
          showProp="name"
          isLoadingData={isLoadingEntities}
          onSelect={handleSelect}
          title={t("Entities")}
          open={true}
          onButtonClick={() => console.log("Button click")}
          onSearchChange={handleSearch}
          pageChange={handlePageChange}
          notFixed={true}
          offset={page}
        />
      </Grid>
      <Grid className={classes.activitiesContainer}>
        <Grid style={{ width: "100%" }}>
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
        </Grid>
        <Divider vertical />
        <Grid style={{ maxHeight: 300, width: "100%", padding: 10 }}>
          <Typography
            variant="h6"
            style={{ textAlign: "center", marginTop: 15 }}
          >
            {t("SelectedEntities")}
          </Typography>

          <Grid style={{ width: "100%" }}>
            {entities.map((entity) => {
              if (selectedEntities.indexOf(entity.id) !== -1)
                return (
                  <Chip
                    key={entity.id}
                    label={entity.name}
                    onDelete={() => handleDeleteEntity(entity.id)}
                    className={classes.chip}
                  />
                );
            })}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

ActAndEntFilterView.propTypes = {};

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
  activitiesContainer: {
    width: 240,
    background: theme.palette.backgroundSecondary.main,
  },
  actAndEntContainer: {
    display: "flex",
    [theme.breakpoints.down('lg')]: {
      flexDirection: "column",
    },
  },
  tableContainer: { width: 240 },
});

export default withTranslation()(
  withStyles(style, { withTheme: true })(ActAndEntFilterView)
);
