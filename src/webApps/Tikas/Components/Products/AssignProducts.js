import withAssignProducts from "../../../../core/Tikas/withAssignProducts";
import green from "@mui/material/colors/green";

import React from "react";
import { compose } from "redux";
import { withStyles } from '@mui/styles';
import { withTranslation } from "react-i18next";
import PropTypes from "prop-types";
import Chip from "@mui/material/Chip";
import CheckedIcon from "@mui/icons-material/CheckRounded";
import AppBar from "@mui/material/AppBar";
import SwipeableViews from "react-swipeable-views";
import Tab from "@mui/material/Tab";
import TableIntervalsProducts from "./TableIntervalsProducts";
import Button from "@mui/material/Button";

import {
  Icon,
  Input,
  Divider,
  Checkbox,
  Label,
  Table,
} from "semantic-ui-react";
import {
  Avatar,
  CircularProgress,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import Tabs from "@mui/material/Tabs";
import { isNullOrUndefined } from "util";
import ArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import ArrowRight from "@mui/icons-material/KeyboardArrowRight";
import CustomStyles, {
  StyledPagination,
} from "../../../../assets/styles/Tikas_styles/Products/AssignProductsStyles";
import { isValueEmptyOrNull } from "../../../../utils/HelperFunctions";

function TabContainer({ children, dir, isDesktop }) {
  return (
    <Typography
      component="div"
      dir={dir}
      style={{ padding: isDesktop ? 8 * 3 : "8px 0 0 0" }}
    >
      {children}
    </Typography>
  );
}
TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired,
};

const AssignProducts = (props) => {
  const {
    t,
    isDialog,
    theme,
    classes,
    products,
    handleQueryChange,
    searchText,
    handleSelectProduct,
    limit,
    offset,
    pageChange,
    isLoadingData,
    selectedProducts,
    selectedProductsIds,
    handleDelete,
    value,
    handleChangeIndex,
    handleChange,
    groupsNames,
    handleChangeStock,
    handleConfirm,
    handleSelectInterval,
    selectedInterval,
    newStall,
    isCreating,
    isEdit,
    handleEdit,
    handleCreate,
    isSuccess,
    isDetails,
    onClose,
  } = props;

  let items = products.slice(offset, offset + limit);

  return (
    <main className={!isDialog ? classes.layout : undefined}>
      <div className={!isDialog ? classes.fill : undefined}>
        <Paper elevation={!isDialog ? 2 : 0} className={classes.paper}>
          <Grid container spacing={24}>
            <Grid item xs={3} md={3} hidden={isDetails}>
              <Typography component="h1" variant="h5">
                {t("Products")}
              </Typography>
              <Input
                icon="search"
                className={classes.searchInput}
                //type="text"
                value={searchText}
                iconPosition="left"
                placeholder={`${t("search")}...`}
                onChange={handleQueryChange}
              />
              <div>
                <Table celled inverted selectable className={classes.table}>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell className={classes.title}>
                        {isLoadingData && (
                          <CircularProgress
                            size={30}
                            className={classes.progress}
                          />
                        )}
                        <Typography variant="h6">
                          {" "}
                          {t(
                            "AssignProducts"
                          )}
                        </Typography>
                      </Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body style={{ position: "relative" }}>
                    {items.map((item) => {
                      return (
                        <Table.Row
                          onClick={() => {
                            handleSelectProduct(item.id, item.name);
                          }}
                          key={item.id}
                          style={{ cursor: "pointer" }}
                        >
                          <Table.Cell>
                            {selectedProductsIds[groupsNames[value]].includes(
                              item.id
                            ) ? (
                              <Chip
                                key={item.id}
                                label={item.name}
                                color="primary"
                                onDelete={() => handleDelete(item.id)}
                                className={classes.chip}
                                avatar={
                                  <Avatar>
                                    <CheckedIcon />
                                  </Avatar>
                                }
                              />
                            ) : (
                              item["name"]
                            )}
                          </Table.Cell>
                        </Table.Row>
                      );
                    })}
                  </Table.Body>
                </Table>
              </div>
              <div style={{ marginTop: 15 }}>
                {products.length > 0 && (
                  <StyledPagination
                    limit={limit}
                    offset={offset}
                    total={products.length}
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
            </Grid>
            <Grid item xs={isDetails ? 12 : 9} md={isDetails ? 12 : 9}>
              <AppBar position="relative" className={classes.customAppBar}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  indicatorColor="primary"
                  textColor="primary"
                  variant="fullWidth"
                  centered
                >
                  <Tab
                    label={t("Breakfast")}
                    className={classes.tab}
                    disabled={isNullOrUndefined(
                      newStall.intervalSelected[0].start
                    )}
                  />
                  <Tab
                    label={t("Lunch")}
                    className={classes.tab}
                    disabled={isNullOrUndefined(
                      newStall.intervalSelected[1].start
                    )}
                  />
                  <Tab
                    label={t("Snack")}
                    className={classes.tab}
                    disabled={isNullOrUndefined(
                      newStall.intervalSelected[2].start
                    )}
                  />
                  <Tab
                    label={t("Dinner")}
                    className={classes.tab}
                    disabled={isNullOrUndefined(
                      newStall.intervalSelected[3].start
                    )}
                  />
                </Tabs>
              </AppBar>
              <SwipeableViews
                axis={theme.direction === "rtl" ? "x-reverse" : "x"}
                index={value}
                onChangeIndex={handleChangeIndex}
              >
                <TabContainer dir={theme.direction}>
                  <TableIntervalsProducts
                    isDetails={isDetails}
                    products={selectedProducts[groupsNames[0]]}
                    handleChangeStock={handleChangeStock}
                  />
                </TabContainer>
                <TabContainer dir={theme.direction}>
                  <TableIntervalsProducts
                    isDetails={isDetails}
                    products={selectedProducts[groupsNames[1]]}
                    handleChangeStock={handleChangeStock}
                  />
                </TabContainer>
                <TabContainer dir={theme.direction}>
                  <TableIntervalsProducts
                    isDetails={isDetails}
                    products={selectedProducts[groupsNames[2]]}
                    handleChangeStock={handleChangeStock}
                  />
                </TabContainer>
                <TabContainer dir={theme.direction}>
                  <TableIntervalsProducts
                    isDetails={isDetails}
                    products={selectedProducts[groupsNames[3]]}
                    handleChangeStock={handleChangeStock}
                  />
                </TabContainer>
              </SwipeableViews>
            </Grid>
          </Grid>

          <div
            className={classes.submit}
            style={{
              marginTop: 10,
              position: "relative",
              width: "100%",
            }}
          >
            <div>
              <Button
                variant="contained"
                //color="primary"
                onClick={onClose}
                style={{
                  // color: "white",
                  marginRight: 15,
                  marginBottom: 10,
                  backgroundColor: theme.palette.textSecondary.main,
                  color: theme.palette.background.main,
                }}
              >
                {`${t("Back")}`}
              </Button>
            </div>
            {!isDetails && (
              <Button
                fullWidth
                variant="contained"
                color="primary"
                disabled={isCreating}
                onClick={
                  isCreating
                    ? undefined
                    : isEdit
                    ? () => handleEdit(selectedProducts)
                    : () => handleCreate(selectedProducts)
                }
                style={{
                  background: isSuccess ? green[500] : undefined,
                  color: theme.palette.text.main,
                }}
              >
                {isSuccess
                  ? isEdit
                    ? t("successEdit")
                    : t("successCreate")
                  : isCreating
                  ? ""
                  : isEdit
                  ? t("EditStall")
                  : t("CreateStall")}
              </Button>
            )}
            {isCreating && (
              <CircularProgress
                size={24}
                className={classes.customCircularProgress2}
              />
            )}
          </div>
        </Paper>
      </div>
    </main>
  );
};

AssignProducts.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

const enhance = compose(
  withTranslation(),
  withStyles(CustomStyles, { withTheme: true })
);

export default withAssignProducts(enhance(AssignProducts));
