import React from "react";
import { withTranslation } from "react-i18next";
import { Typography } from "@mui/material";
import { withStyles } from "@mui/styles";
import { Label, Table } from "semantic-ui-react";
import CircularProgress from "@mui/material/CircularProgress";
import CustomStyles from "../../../../assets/styles/Settings_styles/Notifications/AludocControlTableStyles";

const AludocControlTable = (props) => {
  const {
    classes,
    selectedControl,
    items = [],
    handleSelectControl,
    t,
    showProp,
    isLoadingData,
  } = props;
  return (
    <div>
      <Table celled inverted selectable className={classes.table}>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell className={classes.title}>
              {isLoadingData && (
                <CircularProgress size={30} className={classes.progress} />
              )}
              <Typography variant="h6"> {t("Control")}</Typography>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body style={{ position: "relative" }}>
          {items.map((item) => {
            return (
              <Table.Row
                onClick={() => {
                  handleSelectControl(item.id, item.name);
                }}
                key={item.id}
                style={{ cursor: "pointer" }}
              >
                <Table.Cell>
                  {selectedControl == item.id ? (
                    <Label ribbon className={classes.selected}>
                      {item[showProp]}
                    </Label>
                  ) : (
                    item[showProp]
                  )}
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </div>
  );
};

export default withTranslation()(withStyles(CustomStyles)(AludocControlTable));
