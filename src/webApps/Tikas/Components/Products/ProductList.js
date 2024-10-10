import { Dialog, InputBase, List, ListItem } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Checkbox from "@mui/material/Checkbox";
import Divider from "@mui/material/Divider";
import Fab from "@mui/material/Fab";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import LinearProgress from "@mui/material/LinearProgress";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import Select from "@mui/material/Select";
import { withStyles } from '@mui/styles';
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import Plus from "@mui/icons-material/Add";
import CardIcon from "@mui/icons-material/CreditCardRounded";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import ArrowRight from "@mui/icons-material/KeyboardArrowRight";
import SearchIcon from "@mui/icons-material/SearchRounded";
import ListIcon from "@mui/icons-material/ViewList";
import GridIcon from "@mui/icons-material/ViewModule";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import PropTypes from "prop-types";
import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import { Icon } from "semantic-ui-react";
import { isNullOrUndefined } from "util";
import ApiHandler from "../../../../services/ApiHandler";
import { Activity, Entities } from "../../../../utils/Enums";
import { isArrayEmptyOrNull } from "../../../../utils/HelperFunctions";
import ConfirmationDialog from "../../../Shared/ConfirmationDialog";
import TableSkeletonLoader from "../../../Shared/TableSkeletonLoader";
import ProductForm from "./newProduct";
import NewStall from "./NewStall";
import AssignProducts from "./AssignProducts";
import ProductComponent from "./ProductComponent";
import CustomStyles, {
  BootstrapInput,
  StyledPagination,
} from "../../../../assets/styles/Tikas_styles/Products/ProductListStyles";
import withProductList from "../../../../core/Tikas/withProductList";

import { compose } from "redux";

const ProductList = (props) => {
  const {
    classes,
    t,
    products,
    isLoading,
    productOnEdit,
    productToDelete,
    openDeleteDialog,
    offset,
    productOnCreate,
    limit,
    checked,
    openDeleteSelectedDialog,
    viewMode,
    isCreating,
    handleQueryChange,
    handleLicence,
    selectAll,
    routeChange,
    width,
    handleViewModeChange,
    handleSelectChange,
    handleToggle,
    handleOnEdit,
    handleOnDelete,
    handleClick,
    loadProductList,
    handleAdd,
    openDeleteSelectDialogFunction,
    closeDeleteSelectDialogFunction,
    handleCloseProductOnEdit,
    handleCloseProductOnCreate,
    handleCloseDeleteDialog,
    updateParentSeletDialog,
    updateParentDialog,
    openStall,
    openNewStall,
    handleCloseNewStall,
  } = props;
  if (isLoading)
    return (
      <main className={classes.layout}>
        <div className={classes.fill}>
          <div className={classes.skeletonLoader}>
            <TableSkeletonLoader />
          </div>
        </div>
      </main>
    );
  return (
    (<main className={classes.layout}>
      <div className={classes.fill}>
        <LinearProgress
          style={{
            opacity: isCreating ? "1" : "0",
            width: "100%",
            background: "none",
            borderBottomLeftRadius: 50,
            borderBottomRightRadius: 50,
          }}
          variant="query"
        />
        <Grid container direction="column" alignItems="center">
          <Grid
            container
            item
            xs={12}
            md={8}
            direction="column"
            justifyContent="center"
            alignItems="stretch"
            style={{ display: "inline-block" }}
          >
            <Paper elevation={2} className={classes.paper}>
              <Avatar className={classes.avatar}>
                <CardIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                {t("Products")}
              </Typography>
              <Divider className={classes.customDivider} />
              <List style={{ width: "100%", paddingTop: 2 }}>
                <ListItem style={{ paddingLeft: 0, paddingRight: 0 }}>
                  <div className={classes.search}>
                    <div className={classes.searchIcon}>
                      <SearchIcon />
                    </div>
                    <InputBase
                      placeholder={t("search") + "..."}
                      classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput,
                      }}
                      onChange={handleQueryChange}
                    />
                  </div>
                </ListItem>

                <Grid item xs={12}>
                  <div className={classes.toggleContainer}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          onChange={selectAll}
                          classes={{
                            root: classes.checkRoot,
                            checked: classes.checked,
                          }}
                        />
                      }
                      label={t("SelectAll")}
                    />
                    <div className={classes.rightMenu}>
                      {!isArrayEmptyOrNull(checked) &&
                        handleLicence(
                          [Entities.PRODUCTS.toString()],
                          Activity.DELETE
                        ) && (
                          <Tooltip
                            style={{ marginRight: 10, width: 40 }}
                            title={t("DeleteSelected")}
                          >
                            <IconButton
                              onClick={openDeleteSelectDialogFunction}
                              className={classes.customButton}
                              size="large">
                              <DeleteIcon />
                            </IconButton>
                          </Tooltip>
                        )}

                      {width > 800 && (
                        <ToggleButtonGroup
                          value={viewMode}
                          className={classes.toggleButton}
                          exclusive
                          onChange={handleViewModeChange}
                        >
                          <ToggleButton
                            value="grid"
                            className={classes.customToggleButton}
                          >
                            <GridIcon />
                          </ToggleButton>
                          <ToggleButton value="list">
                            <ListIcon />
                          </ToggleButton>
                        </ToggleButtonGroup>
                      )}
                      {width > 800 && (
                        <FormControl className={classes.margin}>
                          <Select
                            value={limit}
                            onChange={handleSelectChange("limit")}
                            input={
                              <BootstrapInput
                                name="age"
                                id="age-customized-select"
                              />
                            }
                          >
                            <MenuItem value={8}>8</MenuItem>
                            <MenuItem value={16}>16</MenuItem>
                            <MenuItem value={24}>24</MenuItem>
                          </Select>
                        </FormControl>
                      )}
                    </div>
                  </div>
                </Grid>
                <Grid container>
                  {products.slice(offset, offset + limit).map((b, index) => (
                    <Grid
                      item
                      xs={12}
                      md={viewMode === "grid" ? 3 : 12}
                      key={index}
                    >
                      <React.Fragment>
                        <ListItem
                          button
                          className={classes.listItem}
                          onClick={handleToggle(b.id)}
                        >
                          <Checkbox
                            checked={checked.indexOf(b.id) !== -1}
                            tabIndex={-1}
                            disableRipple
                            className={classes.checkBox}
                            classes={{
                              root: classes.checkRoot,
                              checked: classes.checked,
                            }}
                          />
                          <ProductComponent
                            handleOnEdit={handleOnEdit}
                            handleOnDelete={handleOnDelete}
                            name={b.name}
                            id={b.id}
                            image={
                              b.image
                                ? "data:image/jpeg;base64," + b.image
                                : undefined
                            }
                            viewMode={viewMode}
                          />
                        </ListItem>
                      </React.Fragment>
                    </Grid>
                  ))}
                </Grid>
              </List>
              {!isNullOrUndefined(products) && (
                <StyledPagination
                  limit={limit}
                  offset={offset}
                  total={products.length}
                  onClick={(e, offset) => handleClick(offset, e)}
                  currentPageColor="inherit"
                  otherPageColor="inherit"
                  previousPageLabel={
                    <ArrowLeft className={classes.iconRotateStyle} />
                  }
                  nextPageLabel={<ArrowRight />}
                  className={classes.test}
                />
              )}
            </Paper>
          </Grid>
          {
            <div className={classes.bottomActions}>
              {handleLicence(
                [Entities.PRODUCTS.toString()],
                Activity.CREATE
              ) && (
                <Tooltip title={t("NewProduct")} placement="top-start">
                  <Fab
                    color="primary"
                    aria-label="Report"
                    className={classes.fab}
                    onClick={handleAdd}
                  >
                    <Plus style={{ fontSize: "3em" }} name="filter" />
                  </Fab>
                </Tooltip>
              )}
              {handleLicence([Entities.REPORTS_TIKAS.toString()]) && (
                <Tooltip title={t("Reports")} placement="top-start">
                  <Fab
                    color="primary"
                    aria-label="Report"
                    className={classes.fab}
                    onClick={routeChange}
                  >
                    <Icon name="chart bar" className={classes.icon} />
                  </Fab>
                </Tooltip>
              )}
              {handleLicence([Entities.REPORTS_TIKAS.toString()]) && (
                <Tooltip title={t("NewStall")} placement="top-start">
                  <Fab
                    color="primary"
                    aria-label="Report"
                    className={classes.fab}
                    onClick={openNewStall}
                  >
                    <span style={{ fontSize: "3em" }} class="material-icons">
                      add_business
                    </span>
                  </Fab>
                </Tooltip>
              )}
            </div>
          }
        </Grid>

        <Dialog
          open={!isNullOrUndefined(productOnEdit)}
          onClose={handleCloseProductOnEdit}
          maxWidth="md"
          fullWidth
          scroll="paper"
        >
          <ProductForm
            isDialog
            updateParent={() => loadProductList()}
            onCreate={handleCloseProductOnEdit}
            initValues={productOnEdit}
            image={productOnEdit ? productOnEdit.image : undefined}
            isEdit
          />
        </Dialog>

        <Dialog
          open={!isNullOrUndefined(productOnCreate)}
          onClose={handleCloseProductOnCreate}
          maxWidth="md"
          fullWidth
          scroll="paper"
        >
          <ProductForm
            isDialog
            updateParent={() => loadProductList()}
            onCreate={handleCloseProductOnCreate}
          />
        </Dialog>
        <Dialog
          open={openStall}
          onClose={handleCloseNewStall}
          maxWidth="md"
          fullWidth
          scroll="paper"
        >
          <NewStall
            isDialog
            updateParent={() => loadProductList()}
            onCreate={handleCloseNewStall}
          />
        </Dialog>

        <ConfirmationDialog
          title={t("DeleteProduct")}
          body={
            t("TheProductWillBeDeleted") +
            " " +
            productToDelete.name +
            ", " +
            t("continue")
          }
          deleteFunction={ApiHandler.Tikas.Products.deleteProducts}
          elementId={[productToDelete.id]}
          updateParentFunction={updateParentDialog}
          open={openDeleteDialog}
          onClose={handleCloseDeleteDialog}
        />

        <ConfirmationDialog
          title={t("DeleteProduct")}
          body={
            checked.length > 1
              ? t("WillBeRemoved") +
                " " +
                checked.length +
                " " +
                t("Products") +
                ", " +
                t("continue")
              : t("WillBeRemoved2") +
                " " +
                checked.length +
                " " +
                t("Product") +
                ", " +
                t("continue")
          }
          deleteFunction={ApiHandler.Tikas.Products.deleteProducts}
          elementId={checked}
          updateParentFunction={updateParentSeletDialog}
          open={openDeleteSelectedDialog}
          onClose={closeDeleteSelectDialogFunction}
        />
      </div>
    </main>)
  );
};
ProductList.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

const enhance = compose(
  withTranslation(),
  withStyles(CustomStyles, { withTheme: true })
);

export default withProductList(enhance(ProductList));
