import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import green from "@mui/material/colors/green";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import LinearProgress from "@mui/material/LinearProgress";
import Paper from "@mui/material/Paper";
import { withStyles } from '@mui/styles';
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import FoodIcon from "@mui/icons-material/Fastfood";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";
import DropFile from "../../../Shared/DropFile";
import withNewProduct from "../../../../core/Tikas/withNewProduct";

import { compose } from "redux";
import CustomStyles from "../../../../assets/styles/Tikas_styles/Products/NewProductStyles";

const NewProduct = (props) => {
  const {
    classes,
    isDialog,
    isEdit,
    t,
    theme,
    newProduct,
    invalidCharacter,
    isCreating,
    handleChangeName,
    deleteFile,
    isSuccess,
    setFile,
    handleOnFiles,
    setImageDefault,
    handleEdit,
    handleCreate,
    isDesktop,
    formErrors = {},
    isLoadingImg,
    prueba,
  } = props;
  console.log("impFile: ", setFile);

  return (
    (<main className={!isDialog ? classes.layout : undefined}>
      <div className={!isDialog ? classes.fill : undefined}>
        <LinearProgress
          style={{
            opacity: isCreating ? "1" : "0",
          }}
          className={classes.customLinearProgress}
          variant="query"
        />
        <Paper elevation={!isDialog ? 2 : 0} className={classes.paper}>
          {/* <Avatar className={classes.avatar}> <FoodIcon /> </Avatar> */}
          {isEdit ? (
            <Typography component="h1" variant="h5">
              {t("EditProduct")}
            </Typography>
          ) : (
            <Typography component="h1" variant="h5">
              {t("NewProduct")}
            </Typography>
          )}
          <Divider className={classes.customDivider} />
          <Grid
            container
            spacing={24}
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            <Grid
              container
              item
              xs={12}
              md={8}
              spacing={24}
              direction="column"
              justifyContent="center"
              alignItems="center"
              style={{ display: "inline-block" }}
            >
              <Grid item xs={12} md={12} className={classes.grid}>
                <TextField
                  label={t("name")}
                  onChange={handleChangeName("name")}
                  value={newProduct.name}
                  fullWidth
                  helperText={
                    invalidCharacter ? t("InvalidCharacter") : t("inputEmpty")
                  }
                  FormHelperTextProps={{
                    style: {
                      opacity: formErrors.name || invalidCharacter ? 1 : 0,
                    },
                  }}
                  error={formErrors.name || invalidCharacter}
                />
              </Grid>

              <Grid item xs={12} md={12} className={classes.customGrid}>
                {!isLoadingImg && (
                  <DropFile
                    forTikas={!isDesktop}
                    dropzoneText={t("DragOrClickImage")}
                    multiple={false}
                    accept="image/*"
                    onFiles={handleOnFiles}
                    local={false}
                    defaultImage={setImageDefault}
                    files={setFile()}
                  />
                )}
              </Grid>
              <Grid item xs={12} md={12} className={classes.bigAFstyle}>
                <Button onClick={deleteFile} className={classes.customButton}>
                  {t("DeletePhoto")}
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <div
            className={classes.submit}
            style={{
              position: "relative",
              width: "100%",
            }}
          >
            <Button
              fullWidth
              variant="contained"
              color="primary"
              disabled={isCreating}
              onClick={
                isCreating ? undefined : isEdit ? handleEdit : handleCreate
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
                ? t("EditProduct")
                : t("CreateProduct")}
            </Button>
            {isCreating && (
              <CircularProgress
                size={24}
                className={classes.customCircularProgress2}
              />
            )}
          </div>
        </Paper>
      </div>
    </main>)
  );
};

NewProduct.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

// export default withStyles(styles, { withTheme: true })(NewProduct);

const enhance = compose(
  withTranslation(),
  withStyles(CustomStyles, { withTheme: true })
);
export default withNewProduct(enhance(NewProduct));
