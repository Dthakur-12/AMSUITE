import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import {  Typography, TableRow } from "@mui/material";
import { withStyles} from "@mui/styles";
import { Label, Table } from "semantic-ui-react";
import CircularProgress from "@mui/material/CircularProgress";
import CustomStyles from "../../../assets/styles/Shared_Styles/Filters/FilterTableStyles";
import { connect } from "react-redux";
import {
  Icon,
  Input,
  Divider,
  Checkbox,
  Transition,
  Button
} from "semantic-ui-react";
import ArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import ArrowRight from "@mui/icons-material/KeyboardArrowRight";
import { StyledPagination } from "../../../assets/styles/Settings_styles/Notifications/AludocNotificationsStyles";
import { default as classNames } from "classnames";

const FilterTable = props => {
  const {
    classes,
    t,
    showProp,
    title,
    items,
    itemsCount,
    offset = 0,
    open,
    isLoadingData,
    selectedItems,
    pageChange,
    onSelect,
    notFixed
  } = props;

  return (
    <React.Fragment>
      <div
        className={classNames({
          [classes.filterContainerFixed]: !notFixed,
          [classes.filterContainer]: notFixed,  
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open
        })}
      >
        <Table celled inverted selectable className={classes.table}>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell className={classes.title}>
                {isLoadingData && (
                  <CircularProgress size={30} className={classes.progress} />
                )}
                <Typography variant="h6" style={{ textAlign: "center" }}>
                  {" "}
                  {title}
                </Typography>
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              <Input
                icon="search"
                className={classes.searchInput}
                //type="text"
                iconPosition="left"
                placeholder={`${t("search")}...`}
                onChange={props.onSearchChange}
                style={{ width: "100%" }}
              />
            </Table.Row>
            {props.items.map(item => (
              <Table.Row
                onClick={() => {
                  onSelect(item.id);
                }}
                key={item.id}
                style={{ cursor: "pointer" }}
              >
                <Table.Cell style={{padding:8}}>
                  {selectedItems.indexOf(item.id) !== -1 ? (
                    <Label ribbon className={classes.selected}>
                      {item[showProp]}
                    </Label>
                  ) : (
                    item[showProp]
                  )}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
          <Table.Footer></Table.Footer>
        </Table>
        <div className={classes.paginationContainer}>
          {items.length > 0 && (
            <StyledPagination
              limit={10}
              offset={offset}
              total={itemsCount}
              onClick={(e, offset) => pageChange(offset, e)}
              currentPageColor="inherit"
              otherPageColor="inherit"
              previousPageLabel={
                <ArrowLeft className={classes.iconRotateStyle} />
              }
              nextPageLabel={<ArrowRight />}
              className={classes.test}
              innerButtonCount={1}
              outerButtonCount={1}
            />
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default withTranslation()(withStyles(CustomStyles)(FilterTable));
