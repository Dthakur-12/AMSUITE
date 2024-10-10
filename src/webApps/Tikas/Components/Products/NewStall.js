import Button from "@mui/material/Button";
import green from "@mui/material/colors/green";
import LinearProgress from "@mui/material/LinearProgress";
import { withStyles } from '@mui/styles';
import PropTypes from "prop-types";
import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";
import DropFile from "../../../Shared/DropFile";
import Switch from "@mui/material/Switch";
import withNewStall from "../../../../core/Tikas/withNewStall";
import FormControlLabel from "@mui/material/FormControlLabel";
import Select from "react-select";
import AssignProducts from "./AssignProducts";

import { isNullOrUndefined } from "util";
import components from "../../../Shared/ReactSelect";
import { Table } from "semantic-ui-react";
import { compose } from "redux";
import CustomStyles from "../../../../assets/styles/Tikas_styles/Products/NewProductStyles";
import {
  Divider,
  Grid,
  Paper,
  TextField,
  Typography,
  InputLabel,
} from "@mui/material";

const NewStall = (props) => {
  const {
    classes,
    isDialog,
    isEdit,
    t,
    theme,
    invalidCharacter,
    isCreating,
    handleChangeName,
    isSuccess,
    setFile,
    handleEdit,
    handleCreate,
    isDesktop,
    formErrors = {},
    newStall,
    handleChangeBoolean,
    timeSuggestion,
    timeGroupsNames,
    handleChangeIntervalLimit,
    intervalList,
    assignP,
    handleAssignProductStock,
    handleCloseAssignProductStock,
    isDetails,
  } = props;
  const selectStyles = {
    control: (base) => ({
      ...base,
      height: 32,
      marginTop: 150,
    }),
    dropdownIndicator: (base) => ({
      ...base,
      color: theme.palette.text.main,
    }),
    input: (base) => ({
      ...base,
      color: theme.palette.text.main,
      "& input": {
        font: "inherit",
      },
      height: 30,
      marginTop: 2,
      width: "100%",
      menuList: {
        maxHeight: 100,
      },
    }),
  };
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
          {isEdit ? (
            <Typography component="h1" variant="h4">
              {t("EditStall")}
            </Typography>
          ) : isDetails ? (
            <Typography component="h1" variant="h5">
              {t("DetailsStall")}
            </Typography>
          ) : (
            <Typography component="h1" variant="h5">
              {t("NewStall")}
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
              spacing={1}
              direction="column"
              justifyContent="center"
              alignItems="center"
              style={{ display: "inline-block" }}
            >
              <Grid item xs={12} md={12} spacing={3} className={classes.grid}>
                <TextField
                  label={t("name")}
                  onChange={handleChangeName("name")}
                  value={newStall.name}
                  disabled={isDetails}
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
              <Grid item xs={12} md={12} spacing={3} className={classes.grid}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={newStall.online}
                      onChange={handleChangeBoolean}
                      color="primary"
                      value="screen"
                    />
                  }
                  disabled={isDetails}
                  labelPlacement="end"
                  label={t("isOnline")}
                  style={{
                    cursor: "default",
                  }}
                />
              </Grid>
              {!assignP && (
                <div>
                  <Grid item xs={12} md={12} className={classes.grid}>
                    <Typography
                      component="h1"
                      variant="h5"
                      style={{ marginTop: "4px", marginBottom: "15px" }}
                    >
                      {t("TimeGroups")}
                    </Typography>
                  </Grid>
                  <Grid container spacing={24}>
                    <Grid item xs={12} md={12}>
                      {timeGroupsNames.map((interval, index) => (
                        <Grid container spacing={24}>
                          <Grid item xs={12} md={12}>
                            <Grid container spacing={24}>
                              <Grid item xs={5} md={6}>
                                <InputLabel
                                  filled={true}
                                  shrink={true}
                                  animated={true}
                                  htmlFor="standard-adornment-password"
                                >
                                  {`${t(interval + "Start")}`}
                                </InputLabel>
                                <Select
                                  classes={classes}
                                  styles={selectStyles}
                                  isDisabled={isDetails}
                                  options={
                                    !isNullOrUndefined(
                                      newStall.intervalSelected[index].end
                                    )
                                      ? timeSuggestion.filter(
                                          (elem) =>
                                            elem.value <
                                            newStall.intervalSelected[index].end
                                        )
                                      : timeSuggestion
                                  }
                                  components={components}
                                  value={
                                    timeSuggestion &&
                                    timeSuggestion.map((option) =>
                                      option.value ===
                                      newStall.intervalSelected[index].start
                                        ? option
                                        : ""
                                    )
                                  }
                                  onChange={handleChangeIntervalLimit(
                                    "start",
                                    index
                                  )}
                                  placeholder={t("Start")}
                                  maxMenuHeight={200}
                                  height={32}
                                  // isLoading={isLoadingTypes}
                                  // isDisabled={isLoadingTypes}
                                />
                              </Grid>
                              <Grid item xs={5} md={6}>
                                <InputLabel
                                  filled={true}
                                  shrink={true}
                                  animated={true}
                                  // className={
                                  //  this.state.formErrorsEvent.duration
                                  //     ? classes.withError
                                  //    : ""
                                  // }
                                  htmlFor="standard-adornment-password"
                                >
                                  {`${t(interval + "End")}`}
                                </InputLabel>

                                <Select
                                  classes={classes}
                                  styles={selectStyles}
                                  isDisabled={isDetails}
                                  options={
                                    !isNullOrUndefined(
                                      newStall.intervalSelected[index].start
                                    )
                                      ? timeSuggestion.filter(
                                          (elem) =>
                                            elem.value >
                                            newStall.intervalSelected[index]
                                              .start
                                        )
                                      : timeSuggestion
                                  }
                                  components={components}
                                  value={
                                    timeSuggestion &&
                                    timeSuggestion.map((option) =>
                                      option.value ===
                                      newStall.intervalSelected[index].end
                                        ? option
                                        : ""
                                    )
                                  }
                                  onChange={handleChangeIntervalLimit(
                                    "end",
                                    index
                                  )}
                                  placeholder={t("End")}
                                  maxMenuHeight={200}
                                  height={32}
                                  // isLoading={isLoadingTypes}
                                  // isDisabled={isLoadingTypes}
                                />
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      ))}
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <Typography
                        component="h1"
                        variant="h5"
                        style={{ marginTop: "4px", marginBottom: "15px" }}
                      >
                        {t("DistibutionOfIntervals")}
                      </Typography>
                      <Table celled>
                        <Table.Header>
                          <Table.Row>
                            {timeGroupsNames.map((interval, index) => (
                              <Table.HeaderCell
                                className={
                                  index === 1
                                    ? classes.headerOne
                                    : index === 2
                                    ? classes.headerTwo
                                    : index === 3
                                    ? classes.headerThree
                                    : classes.header
                                }
                              >
                                {t(interval)}
                              </Table.HeaderCell>
                            ))}
                          </Table.Row>
                        </Table.Header>

                        <Table.Body className={classes.body}>
                          <Table.Row>
                            {timeGroupsNames.map((interval, index) => (
                              <Table.Cell>
                                <Table.Row>
                                  {intervalList[interval].map((int, index) => (
                                    <Table.Row
                                      className={
                                        index % 2
                                          ? classes.row
                                          : classes.rowPair
                                      }
                                    >
                                      {
                                        timeSuggestion.find(
                                          (elem) => elem.value === int.start
                                        ).label
                                      }
                                      -
                                      {
                                        timeSuggestion.find(
                                          (elem) => elem.value === int.end
                                        ).label
                                      }
                                    </Table.Row>
                                  ))}
                                </Table.Row>
                              </Table.Cell>
                            ))}
                          </Table.Row>
                        </Table.Body>
                      </Table>
                    </Grid>
                  </Grid>
                </div>
              )}
            </Grid>
          </Grid>
          <div
            className={classes.submit}
            style={{
              position: "relative",
              width: "100%",
            }}
          >
            {!assignP && (
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={handleAssignProductStock}
                style={{
                  background: isSuccess ? green[500] : undefined,
                  color: theme.palette.text.main,
                }}
              >
                {isDetails ? t("ViewProductStock") : t("AssignProductStock")}
              </Button>
            )}
            {assignP && (
              <div>
                {/* <Button
                  variant="contained"
                  //color="primary"
                  onClick={handleCloseAssignProductStock}
                  style={{
                    // color: "white",
                    marginRight: 15,
                    backgroundColor: theme.palette.textSecondary.main,
                    color: theme.palette.background.main,
                  }}
                >
                  {`${t("Back")}`}
                </Button> */}
                <AssignProducts
                  isDetails={isDetails}
                  isDialog={true}
                  newStall={newStall}
                  intervalList={intervalList}
                  timeSuggestion={timeSuggestion}
                  onClose={handleCloseAssignProductStock}
                  handleEdit={handleEdit}
                  handleCreate={handleCreate}
                  isCreating={isCreating}
                  isEdit={isEdit}
                  isSuccess={isSuccess}
                />
              </div>
            )}
          </div>
          {/* <div
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
                ? t("EditStall")
                : t("CreateStall")}
            </Button>
            {isCreating && (
              <CircularProgress
                size={24}
                className={classes.customCircularProgress2}
              />
            )}
          </div> */}
        </Paper>
      </div>
    </main>)
  );
};

NewStall.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

// export default withStyles(styles, { withTheme: true })(NewProduct);

const enhance = compose(
  withTranslation(),
  withStyles(CustomStyles, { withTheme: true })
);
export default withNewStall(enhance(NewStall));
