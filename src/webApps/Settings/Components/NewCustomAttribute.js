import React, { Component } from "react";
import CustomStyles, {
  StyledPagination,
} from "../../../assets/styles/Settings_styles/NewCustomAttributeStyles";
import { withStyles } from '@mui/styles';
import PropTypes from "prop-types";
import { withTranslation } from "react-i18next";
import Typography from "@mui/material/Typography";
import { connect } from "react-redux";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import components from "../../Shared/ReactSelect";
import Select from "react-select";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import green from "@mui/material/colors/green";
import ArtTrackIcon from "@mui/icons-material/ArtTrack";
import CircularProgress from "@mui/material/CircularProgress";
import {
  requestCreateCustomField,
  requestCustomFields,
  requestCustomFieldsIntegrator,
  requestCreateCustomFieldsTypeList,
} from "../../../actions/Settings/settings_actions";
import { isNullOrUndefined } from "util";
import SnackbarHandler from "../../../utils/SnackbarHandler";
import { isValueEmptyOrNull } from "../../../utils/HelperFunctions";

import FormHelperText from "@mui/material/FormHelperText";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Circle from "@mui/icons-material/FiberManualRecord";
import { socketIO } from "../../../utils/WebSockets";
import { Icon, Table, Divider, Input } from "semantic-ui-react";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import ArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import ArrowRight from "@mui/icons-material/KeyboardArrowRight";

const formValues = {
  fieldName: "",
  fieldType: undefined,
  visibility: 0,
};

//const operatingMode = 2;
class NewCustomAttributte extends Component {
  constructor(props) {
    super(props);
    const { t, attributeOnEdit, isEdit } = this.props;
    this.state = {
      attributeOnCreate: attributeOnEdit ? attributeOnEdit : formValues,
      selectedType: undefined,
      formErrors: {},
      attributeOnCreate: isEdit ? attributeOnEdit : formValues,
      operatingMode: Number(localStorage.getItem("operatingMode")),
      listValues: [],
      offset: 0,
      limit: 5,
      itemValue: "",
      listValuesToShow: [],
      fieldTypeSuggestion: [
        { value: 0, label: t("INT") },
        { value: 1, label: t("FLOAT") },
        { value: 2, label: t("NVARCHAR") },
        { value: 3, label: t("DATETIME") },
        { value: 4, label: t("BIT") },
        { value: 5, label: t("LIST") },
        { value: 6, label: t("NVARCHARBLOCK") },
      ],
      optionsFields: [
        { value: null, label: t("Hidden") },
        { value: 0, label: t("Visible") },
        { value: 1, label: t("Required") },
      ],
    };
  }

  componentDidMount() {
    //if (operatingMode === 0) {
    if (this.state.operatingMode !== 0) {
      this.props.requestCustomFieldsIntegrator({
        entity: this.props.entity,
        subEntity: this.props.subEntity,
      });
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      nextProps.customFieldsIntegrator !== prevState.customFieldsIntegrator ||
      nextProps.loadingCustomFieldsIntegrator !==
        prevState.loadingCustomFieldsIntegrator ||
      nextProps.isSuccess !== prevState.isSuccess ||
      nextProps.isSuccessCreate !== prevState.isSuccessCreate ||
      nextProps.isCreating !== prevState.isCreating ||
      nextProps.error !== prevState.error ||
      nextProps.msgError !== prevState.msgError
    ) {
      return {
        customFieldsIntegrator: nextProps.customFieldsIntegrator,
        loadingCustomFieldsIntegrator: nextProps.loadingCustomFieldsIntegrator,
        isSuccess: nextProps.isSuccess,
        isSuccessCreate: nextProps.isSuccessCreate,
        isCreating: nextProps.isCreating,
        error: nextProps.error,
        msgError: nextProps.msgError,
      };
    } else return null;
  }

  componentDidUpdate(prevProps, prevState) {
    const { t, currentUser } = this.props;
    if (
      this.state.loadingCustomFieldsIntegrator === false &&
      prevState.loadingCustomFieldsIntegrator !=
        this.state.loadingCustomFieldsIntegrator
    ) {
      let externalNameSuggestion = [];
      externalNameSuggestion.push({ value: -1, label: t("None") });
      if (this.state.customFieldsIntegrator)
        this.state.customFieldsIntegrator.map((field) =>
          externalNameSuggestion.push({
            value: field.externalId,
            label: field.name,
          })
        );
      this.setState({ externalNameSuggestion: externalNameSuggestion });
    }
    if (
      this.state.isSuccessCreate &&
      prevState.isSuccessCreate !== this.state.isSuccessCreate
    ) {
      if (
        (this.state.operatingMode === 0 ||
          isNullOrUndefined(this.state.attributeOnCreate.externalId) ||
          this.state.attributeOnCreate.externalId === -1) &&
        this.state.attributeOnCreate.fieldType === 5 &&
        this.state.listValues.length > 0
      ) {
        this.props.requestCreateCustomFieldsTypeList({
          customFieldId: this.props.dataId,
          values: this.state.listValues,
        });
      }
      this.props.handleClose();
      this.setState({ successCreate: true });
      // socketIO.emit("customFieldsChanged", currentUser.token);
      this.props.requestCustomFields();
      SnackbarHandler.showMessage(t("successCreate"));
      setTimeout(() => {
        this.setState({
          successCreate: false,
        });
      }, 1000);
    }
    if (this.state.error && this.state.error !== prevState.error) {
      this.setState({ successCreate: false });
      SnackbarHandler.showMessage(t(this.state.msgError), "error");
    }
  }

  handleChange = (name) => (event) => {
    let value = event.currentTarget ? event.currentTarget.value : event.value;
    this.setState((prevState) => ({
      attributeOnCreate: {
        ...prevState.attributeOnCreate,
        [name]: value,
      },
    }));
  };
  handleChangeVisibility = (value) => {
    this.setState((prevState) => ({
      attributeOnCreate: {
        ...prevState.attributeOnCreate,
        visibility: value,
      },
    }));
  };

  handleSelectChange = (name) => (selectedType) => {
    if (name === "externalName") {
      this.setState((prevState) => ({
        attributeOnCreate: {
          ...prevState.attributeOnCreate,
          [name]: selectedType.label,
          externalId: selectedType.value,
          fieldType:
            selectedType.value === -1
              ? undefined
              : this.state.customFieldsIntegrator.find(
                  (obj) => obj.externalId === selectedType.value
                ).type,
        },
      }));
    } else
      this.setState((prevState) => ({
        attributeOnCreate: {
          ...prevState.attributeOnCreate,
          [name]: selectedType.value,
        },
        selectedType,
      }));
  };

  validateForm = (newField) => {
    return {
      name: isValueEmptyOrNull(newField.fieldName),
      fieldType: isValueEmptyOrNull(newField.fieldType),
    };
  };

  handleCreate = () => {
    const { attributeOnCreate } = this.state;
    const { visibility: selectedVisibility } = attributeOnCreate;
    console.log("selectedVisibility: ", selectedVisibility);
    console.log("this.props: ", this.props);
    console.log("this.state: ", this.state);
    let newField;
    if (attributeOnCreate.externalId !== -1) {
      newField = {
        ...attributeOnCreate,
        visibility: {
          [this.props.subEntity]:
            selectedVisibility !== undefined ? selectedVisibility : 0,
        },
        entity: this.props.entity,
      };
    } else {
      newField = {
        fieldName: attributeOnCreate.fieldName,
        fieldType: attributeOnCreate.fieldType,
        entity: this.props.entity,
        visibility: {
          [this.props.subEntity]:
            selectedVisibility !== undefined ? selectedVisibility : 0,
        },
      };
    }
    const errors = this.validateForm(newField);
    this.setState({ formErrors: errors });
    if (!Object.keys(errors).some((x) => errors[x])) {
      this.props.requestCreateCustomField(newField);
    }
  };

  addItemList = (input) => {
    const { listValues, itemValue } = this.state;
    if (
      itemValue === "" ||
      listValues.some((item) => item.toLowerCase() === itemValue.toLowerCase())
    ) {
      this.setState({
        hasError: true,
      });
    } else {
      let data = this.state.listValues.slice();
      data.push(itemValue);
      this.setState({
        listValues: data,
        listValuesToShow: data,
        itemValue: "",
      });
    }
  };

  handleListValueQueryChange = (query) => {
    const { listValues } = this.state;
    const value = query.currentTarget.value;

    let data = this.state.listValues.slice();
    this.setState((prevState) => ({
      listValuesToShow:
        !isNullOrUndefined(listValues) && listValues.length > 0
          ? data.filter((itemValue) =>
              itemValue.toLowerCase().includes(value.toLowerCase())
            )
          : prevState.listValuesToShow,
      offset: 0,
      itemValue: value,
    }));
  };

  handleRemoveListValue = (item, index) => {
    const { offset } = this.state;
    let listValuesCopy = [...this.state.listValues];
    let listValuesToShowCopy = [...this.state.listValuesToShow];
    listValuesToShowCopy.splice(offset + index, 1);
    let indexToDelete = listValuesCopy.indexOf(item);
    listValuesCopy.splice(indexToDelete, 1);
    this.setState((prevState) => ({
      listValuesToShow: listValuesToShowCopy,
      listValues: listValuesCopy,
    }));
  };

  pageChange = (offset, e) => {
    this.setState({
      offset,
    });
  };

  typeList = () => {
    const { classes, t, theme } = this.props;
    const { listValues, offset, limit, listValuesToShow, itemValue } =
      this.state;

    return (
      <Paper elevation={2} className={classes.paperList}>
        <Typography component="h1" variant="h5">
          {t("List")}
        </Typography>
        <Divider className={classes.customDivider} />
        <Input
          action
          className={classes.listInput}
          style={{ width: "80%" }}
          onChange={this.handleListValueQueryChange}
          value={itemValue}
        >
          <input />
          <Button className={classes.inputButton} onClick={this.addItemList}>
            <Icon name="plus" className={classes.leftIcon} />
            {t("Add")}
          </Button>
        </Input>
        <Table
          celled
          style={{ marginTop: 15 }}
          className={classes.elementTable}
        >
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell className={classes.tableHead}>
                {t("ListValues")}
              </Table.HeaderCell>
              <Table.HeaderCell className={classes.tableHead} />
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {listValuesToShow
              .slice(offset, offset + limit)
              .map((item, index) => (
                <Table.Row key={index}>
                  <Table.Cell>{item}</Table.Cell>
                  <Table.Cell>
                    <DeleteRoundedIcon
                      onClick={() => this.handleRemoveListValue(item, index)}
                      className={classes.deleteIcon}
                    />
                  </Table.Cell>
                </Table.Row>
              ))}
          </Table.Body>
        </Table>
        <div style={{ marginTop: 15 }}>
          {listValuesToShow.length > 0 && (
            <StyledPagination
              limit={limit}
              offset={offset}
              total={listValuesToShow.length}
              innerButtonCount={1}
              outerButtonCount={1}
              onClick={(e, offset) => this.pageChange(offset, e)}
              currentPageColor="inherit"
              otherPageColor="inherit"
              previousPageLabel={
                <ArrowLeft className={classes.iconRotateStyle} />
              }
              nextPageLabel={<ArrowRight />}
              className={classes.pagination}
              //className={classes.customPagination}
            />
          )}
        </div>
      </Paper>
    );
  };

  render() {
    const { classes, t, theme, isEdit } = this.props;
    const { fieldTypeSuggestion, optionsFields, operatingMode } = this.state;
    const showList =
      (operatingMode === 0 ||
        (operatingMode !== 0 &&
          isValueEmptyOrNull(this.state.attributeOnCreate.externalId)) ||
        this.state.attributeOnCreate.externalId === -1) &&
      this.state.attributeOnCreate.fieldType === 5;

    const selectStyles = {
      dropdownIndicator: (base) => ({
        ...base,
        color: theme.palette.text.main,
      }),
      input: (base) => ({
        ...base,
        color: theme.palette.text.primary,
        "& input": {
          font: "inherit",
        },
        width: "100%",
        menuList: {
          maxHeight: 100,
        },
      }),
    };
    return (
      <main className={classes.layout}>
        <Paper elevation={0} className={classes.paper}>
          <Avatar className={classes.attributeAvatar}>
            <ArtTrackIcon />
          </Avatar>
          <Typography
            component="h1"
            variant="h5"
            style={{ marginBottom: "10%", textAlign: "center" }}
          >
            {isEdit ? t("EditCustomAttribute") : t("NewCustomAttribute")}
          </Typography>
          <Grid container spacing={24} xs={12}>
            <Grid container xs={showList ? 6 : 12}>
              {/* ------------------- NAME------------------------- */}
              <Grid
                item
                xs={showList ? 12 : 6}
                className={classes.inputContainer}
              >
                <TextField
                  required
                  label={t("name")}
                  value={this.state.attributeOnCreate.fieldName}
                  fullWidth
                  onChange={this.handleChange("fieldName")}
                  helperText={t("inputEmpty")}
                  FormHelperTextProps={{
                    style: { opacity: this.state.formErrors.name ? 1 : 0 },
                  }}
                  error={this.state.formErrors.name}
                  // disabled={isDetails}
                />
              </Grid>
              {/* ------------------- EXTERNAL NAME------------------------- */}
              <Grid
                item
                className={classes.inputContainer}
                xs={showList ? 12 : 6}
                hidden={
                  operatingMode == 0 || !this.state.externalNameSuggestion
                }
                // style={{ paddingTop: 0, marginTop: 0 }}
              >
                <div className={classes.formControl}>
                  <label className={classes.formControlLabel}>
                    {t("SelectExternalName")}
                  </label>
                  <Select
                    style={{ paddingTop: 10, marginTop: 12 }}
                    classes={classes}
                    styles={selectStyles}
                    options={this.state.externalNameSuggestion}
                    components={components}
                    onChange={this.handleSelectChange("externalName")}
                    value={this.state.externalId}
                    //placeholder={t("SelectExternalName")}
                    maxMenuHeight={200}
                    //  isDisabled={isDetails}
                  />
                </div>
              </Grid>
              {/* ------------------- FIELD TYPE ------------------------- */}
              <Grid
                item
                className={classes.inputContainer}
                xs={showList ? 12 : 6}
                // hidden={operatingMode !== 0}
                //style={{ paddingTop: 0, marginTop: 0 }}
              >
                <div className={classes.formControl}>
                  <label className={classes.formControlLabel}>
                    {t("DataType") + "*"}
                  </label>
                  <Select
                    style={{ paddingTop: 10 }}
                    classes={classes}
                    styles={selectStyles}
                    options={fieldTypeSuggestion}
                    components={components}
                    onChange={this.handleSelectChange("fieldType")}
                    value={this.state.selectedType}
                    placeholder={t("Select") + "..."}
                    maxMenuHeight={200}
                    isDisabled={
                      !isNullOrUndefined(
                        this.state.attributeOnCreate.externalId
                      ) && this.state.attributeOnCreate.externalId !== -1
                    }
                  />
                </div>
                <FormHelperText
                  style={{ opacity: this.state.formErrors.fieldType ? 1 : 0 }}
                  error={this.state.formErrors.fieldType}
                >
                  {t("inputEmpty")}
                </FormHelperText>
              </Grid>
              {/* ------------------- VISIBILITY------------------------- */}
              <Grid container xs={showList ? 12 : 6}>
                <Grid
                  item
                  xs={12}
                  className={classes.inputContainer}
                  style={{ paddingTop: 10, marginTop: 12 }}
                >
                  <Grid
                    item
                    xs={showList ? 12 : 6}
                    className={classes.alignmentGridTypography}
                  >
                    <Typography
                      component="h2"
                      variant="h4"
                      className={classes.customTypo}
                    >
                      {t("Visibility") + "*"}
                    </Typography>
                  </Grid>

                  <Grid item xs={12} md={12} className={classes.alignmentGrid}>
                    <Stepper
                      alternativeLabel
                      nonLinear
                      activeStep={this.state.attributeOnCreate.visibility}
                      className={classes.customStepper}
                    >
                      {this.state.optionsFields.map((item, index) => {
                        const props = {};
                        const buttonProps = {};
                        if (
                          this.state.attributeOnCreate.visibility === null &&
                          item.value === null
                        )
                          buttonProps.icon = (
                            <Circle className={classes.circle} />
                          );
                        if (
                          this.state.attributeOnCreate.visibility !== item.value
                        )
                          buttonProps.icon = (
                            <Circle className={classes.circleDos} />
                          );
                        else
                          buttonProps.icon = (
                            <Circle className={classes.circle} />
                          );
                        return (
                          <Step key={item.label} {...props}>
                            <StepButton
                              onClick={() =>
                                this.handleChangeVisibility(item.value)
                              }
                              className={classes.customStepButton}
                              {...buttonProps}
                            >
                              {item.label}
                            </StepButton>
                          </Step>
                        );
                      })}
                    </Stepper>
                  </Grid>
                </Grid>

                {/* {operatingMode !== 0 && (
                <Grid
                  item
                  xs={12}
                  md={showList ? 12 : 6}
                  style={{ paddingTop: 10, marginTop: 12 }}
                >
                  <div className={classes.formControl}>
                    <label className={classes.formControlLabel}>
                      {t("DataType") + "*"}
                    </label>
                    <Select
                      style={{ paddingTop: 10, marginTop: 12 }}
                      classes={classes}
                      styles={selectStyles}
                      options={fieldTypeSuggestion}
                      components={components}
                      onChange={this.handleSelectChange("fieldType")}
                      value={fieldTypeSuggestion.map((option) =>
                        isNullOrUndefined(
                          this.state.attributeOnCreate.fieldType
                        )
                          ? ""
                          : option.value ===
                            this.state.attributeOnCreate.fieldType
                          ? option
                          : ""
                      )}
                      placeholder={t("Select") + "..."}
                      maxMenuHeight={200}
                      isDisabled={
                        !isNullOrUndefined(
                          this.state.attributeOnCreate.externalId
                        ) && this.state.attributeOnCreate.externalId !== -1
                      }
                    />
                  </div>
                  <FormHelperText
                    style={{
                      opacity: this.state.formErrors.fieldType ? 1 : 0,
                    }}
                    error={this.state.formErrors.fieldType}
                  >
                    {t("inputEmpty")}
                  </FormHelperText>
                </Grid>
              )} */}
              </Grid>
            </Grid>
            <Grid
              item
              xs={6}
              style={{ paddingTop: 0, marginTop: 0 }}
              hidden={!showList}
            >
              {this.typeList()}
            </Grid>
            <Button
              fullWidth
              variant="contained"
              className={classes.primaryButton}
              color="primary"
              disabled={this.state.isCreating}
              onClick={
                this.state.isCreating
                  ? undefined
                  : isEdit
                  ? this.handleEdit
                  : this.handleCreate
              }
              style={{
                background: this.state.successCreate ? green[500] : undefined,
                color: theme.palette.text.main,
                marginTop:
                  this.state.attributeOnCreate.fieldType === 5 ? "5%" : "12%",
              }}
            >
              {this.state.successCreate
                ? isEdit
                  ? t("successEdit")
                  : t("successCreate")
                : this.state.isCreating
                ? ""
                : isEdit
                ? t("EditAttribute")
                : t("CreateAttribute")}
            </Button>
            {this.state.isCreating && (
              <CircularProgress
                size={24}
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  marginTop: -12,
                  marginLeft: -12,
                  color: theme.palette.text,
                }}
              />
            )}
          </Grid>
        </Paper>
      </main>
    );
  }
}

NewCustomAttributte.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

const mapStateToProps = ({ Settings, User }) => ({
  isCreating: Settings.isCreating,
  isSuccess: Settings.isSuccess,
  isSuccessCreate: Settings.isSuccessCreate,
  customFieldsIntegrator: Settings.customFieldsIntegrator,
  loadingCustomFieldsIntegrator: Settings.loadingCustomFieldsIntegrator,
  error: Settings.error,
  msgError: Settings.msgError,
  currentUser: User.currentUser,
  dataId: Settings.dataId,
});

const mapDispatchToProps = {
  requestCreateCustomField,
  requestCustomFieldsIntegrator,
  requestCreateCustomFieldsTypeList,
  requestCustomFields,
};

const NewCustomAttributteConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(NewCustomAttributte);

export default withTranslation()(
  withStyles(CustomStyles, { withTheme: true })(NewCustomAttributteConnected)
);
