import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import AMStuiteEnums, { FieldTypes } from "../../../utils/Enums";
import { Form, TextArea } from "semantic-ui-react";
import {
  handleFieldChange,
  handleDateFieldChange,
} from "../../../actions/Shared/custom_form_actions";
import { requestCustomFieldsTypeListValues } from "../../../actions/Settings/settings_actions";
import {
  Grid,
  TextField,
  FormControlLabel,
  Switch,
  Typography,
  FormHelperText,
} from "@mui/material";
import {
  withStyles,

} from "@mui/styles";
import DatePicker from "react-datepicker";
import { isNullOrUndefined } from "util";
import Select from "react-select";
import components from "../../Shared/ReactSelect";
import styles from "../../../assets/styles/Shared_Styles/ReactSelect/SelectStyles";
import { withTranslation } from "react-i18next";
import InputAdornment from "@mui/material/InputAdornment";

const onFieldChange = (event, handleFieldChange) => {
  const name = event.target.name;
  const value = event.target.value;
  handleFieldChange({ [name]: value });
};

const onTextFieldChange = (event, handleFieldChange, fieldName) => {
  const value = event.target.value;
  handleFieldChange({ [fieldName]: value });
};

const onSelectFieldChange = (name, handleFieldChange) => (option) => {
  handleFieldChange({ [name]: option.value });
};

const onSwitchChange = (event, handleFieldChange) => {
  let name = event.target.name;
  let value = event.currentTarget.checked;
  handleFieldChange({ [name]: +value });
};

const handleDateChange = (e, name, handleDateFieldChange) => {
  let value = new Date(e);
  handleDateFieldChange({ [name]: value });
};

function justNumbers(e) {
  let keynum = window.event ? window.event.keyCode : e.which;
  if (keynum === 8 || keynum === 46) return true;
  return /\d/.test(String.fromCharCode(keynum));
}

const getPersonGroupsJoinVisibility = (
  visibility,
  personGroups,
  visibilityType
) => {
  let result = true;
  if (isNullOrUndefined(personGroups)) return null;
  switch (visibilityType) {
    case "required":
      return personGroups.some((personGroup) => visibility[personGroup]);
    case "hidden":
      return !personGroups.some((personGroup) => {
        return visibility[personGroup] !== null;
      })
        ? null
        : false;
    default:
      return true;
  }
};

const renderNumberInput = (fieldProps, props) => {
  const {
    formValues,
    handleFieldChange,
    entity,
    personGroups,
    errors = {},
    classes,
  } = props;
  const { fieldName, visibility = {}, label } = fieldProps;
  let personGroupVisibility = getPersonGroupsJoinVisibility(
    visibility,
    personGroups,
    "required"
  );

  return (
    <TextField
      style={{ margitnTop: "20px" }}
      required={visibility[entity] || personGroupVisibility}
      label={label}
      name={fieldName}
      fullWidth
      onChange={(e) => onFieldChange(e, handleFieldChange)}
      value={formValues[fieldName] ? formValues[fieldName] : ""}
      helperText={props.t("inputEmpty")}
      FormHelperTextProps={{
        style: { opacity: errors[fieldName] ? 1 : 0 },
      }}
      disabled={props.isDetails}
      error={errors[fieldName]}
      key={fieldProps.fieldName}
      onKeyPress={(event) => {
        if (!justNumbers(event)) event.preventDefault();
      }}
      InputProps={{
        // startAdornment: <InputAdornment position="start"></InputAdornment>,
        classes: {
          root:
            fieldName && fieldName.length > 40
              ? props.classes.inputRoot
              : props.classes.simpleInputRoot,
        },
      }}
      InputLabelProps={{
        classes: {
          root:
            fieldName && fieldName.length > 40
              ? props.classes.labelRoot
              : props.classes.simpleLabelRoot,
          focused: props.classes.labelFocused,
        },
      }}
    />
  );
};

const renderTextInput = (fieldProps, props) => {
  const {
    formValues,
    handleFieldChange,
    entity,
    personGroups,
    t,
    errors = {},
    classes,
  } = props;
  const { fieldName, visibility = {}, label } = fieldProps;
  let personGroupVisibility = getPersonGroupsJoinVisibility(
    visibility,
    personGroups,
    "required"
  );
  return (
    <TextField
      required={visibility[entity] || personGroupVisibility}
      label={label}
      name={fieldName}
      fullWidth
      onChange={(e) => onFieldChange(e, handleFieldChange)}
      value={formValues[fieldName] ? formValues[fieldName] : ""}
      helperText={t("inputEmpty")}
      disabled={props.isDetails}
      FormHelperTextProps={{
        style: { opacity: errors[fieldName] ? 1 : 0 },
      }}
      error={errors[fieldName]}
      key={fieldProps.fieldName}
      InputProps={{
        // startAdornment: <InputAdornment position="start"></InputAdornment>,
        classes: {
          root:
            fieldName && fieldName.length > 40
              ? props.classes.inputRoot
              : props.classes.simpleInputRoot,
        },
      }}
      InputLabelProps={{
        classes: {
          root:
            fieldName && fieldName.length > 40
              ? props.classes.labelRoot
              : props.classes.simpleLabelRoot,
          focused: props.classes.labelFocused,
        },
      }}
    />
  );
};

const renderTextBlockInput = (fieldProps, props) => {
  const {
    formValues,
    handleFieldChange,
    entity,
    personGroups,
    t,
    errors = {},
    classes,
    theme,
  } = props;
  const { fieldName, visibility = {}, label } = fieldProps;
  let personGroupVisibility = getPersonGroupsJoinVisibility(
    visibility,
    personGroups,
    "required"
  );

  return (
    <Form style={{ color: theme.palette.text.main }}>
      <label>
        {visibility[entity] || personGroupVisibility ? label + " *" : label}
      </label>
      <Form.Field
        control="textarea"
        value={formValues[fieldName] ? formValues[fieldName] : ""}
        disabled={props.isDetails}
        onChange={(e) => onTextFieldChange(e, handleFieldChange, fieldName)}
        style={{
          minHeight: 50,
          height: 70,
          color: theme.palette.text.main,
          borderColor: theme.palette.text.main,
          backgroundColor: theme.palette.backgroundSecondary.main,
        }}
        error={errors[fieldName]}
      />
    </Form>
  );
};

const getSelectTheme = (props) => {
  const { theme } = props;
  return {
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
      width: "100%",

      menuList: {
        maxHeight: 100,
      },
    }),
  };
};

const renderSelect = (fieldProps, props) => {
  const {
    customFieldsListValues = {},
    formValues,
    handleFieldChange,
    classes,
    personGroups,
    t,
    entity,
  } = props;
  const { visibility = {} } = fieldProps;
  const valuesSuggestions = customFieldsListValues[fieldProps.id];
  const selectStyles = getSelectTheme(props);
  let personGroupVisibility = getPersonGroupsJoinVisibility(
    visibility,
    personGroups,
    "required"
  );
  return (
    <>
      <div className={classes.formControl} key={fieldProps.fieldName}>
        <label className={classes.formControlLabel}>
          {visibility[entity] || personGroupVisibility
            ? fieldProps.label + " *"
            : fieldProps.label}
        </label>
        <Select
          className={classes.select}
          classes={classes}
          styles={selectStyles}
          options={valuesSuggestions}
          components={components}
          value={
            valuesSuggestions &&
            valuesSuggestions.map((option) =>
              option.value == formValues[fieldProps.fieldName] ? option : ""
            )
          }
          onChange={onSelectFieldChange(
            fieldProps.fieldName,
            handleFieldChange
          )}
          //placeholder={fieldProps.label}
          placeholder={t("Select") + "..."}
          maxMenuHeight={200}
          isDisabled={props.isDetails}
        />
      </div>
      <FormHelperText
        style={{
          opacity: props.errors && props.errors[fieldProps.fieldName] ? 1 : 0,
        }}
        error={props.errors && props.errors[fieldProps.fieldName]}
      >
        {props.t("inputEmpty")}
      </FormHelperText>
    </>
  );
};

const renderSwitcher = (fieldProps, props) => {
  const { formValues, handleFieldChange, entity } = props;
  const { fieldName, visibility = {}, label } = fieldProps;
  return (
    <FormControlLabel
      control={
        <Switch
          checked={Boolean(Number(formValues[fieldName]))}
          value={Boolean(Number(formValues[fieldName]))}
          name={fieldName}
          color="primary"
          onChange={(e) => onSwitchChange(e, handleFieldChange)}
          key={fieldName}
          isDisable={props.isDetails}
        />
      }
      label={label}
      key={fieldName}
    />
  );
};

//renderDateTimePicker

const getSelectedDate = (selectedDate) => {
  return selectedDate ? new Date(selectedDate) : undefined;
};

const DateText = ({
  value,
  onClick,
  fieldProps,
  isDisable,
  props,
  errors = {},
}) => (
  <TextField
    style={{ width: "100%", mariginTop: "30px" }}
    onClick={() => {
      if (!isDisable) return onClick();
    }}
    label={fieldProps.label}
    name={fieldProps.fieldName}
    FormHelperTextProps={{
      style: { opacity: errors[fieldProps.fieldName] ? 1 : 0 },
    }}
    error={errors[fieldProps.fieldName]}
    key={fieldProps.fieldName}
    value={value}
    required={
      fieldProps.visibility[props.entity] ||
      fieldProps.visibility[props.personGroups]
    }
    disabled={isDisable}
    InputProps={{
      // startAdornment: <InputAdornment position="start"></InputAdornment>,
      classes: {
        root:
          fieldProps.fieldName && fieldProps.fieldName.length > 40
            ? props.classes.inputRoot
            : props.classes.simpleInputRoot,
      },
    }}
    InputLabelProps={{
      classes: {
        root:
          fieldProps.fieldName && fieldProps.fieldName.length > 40
            ? props.classes.labelRoot
            : props.classes.simpleLabelRoot,
        focused: props.classes.labelFocused,
      },
    }}
  />
);

const renderDateTimePicker = (fieldProps, props) => {
  return (
    <div style={{ width: "100%" }}>
      <DatePicker
        selected={getSelectedDate(props.formDateValues[fieldProps.fieldName])}
        onChange={(e) =>
          handleDateChange(e, fieldProps.fieldName, props.handleDateFieldChange)
        }
        name={fieldProps.fieldName}
        showTimeSelect
        showYearDropdown
        scrollableYearDropdown
        timeIntervals={15}
        timeCaption="time"
        dateFormat={"yyyy/MM/dd hh:mm a"}
        calendarClassName={props.classes.reactDatePicker}
        customInput={
          <DateText
            fieldProps={fieldProps}
            isDisable={props.isDetails}
            props={props}
            errors={props.errors}
          />
        }
        isDisable={props.isDetails}
      />
      <FormHelperText
        style={{
          opacity: props.errors && props.errors[fieldProps.fieldName] ? 1 : 0,
        }}
        error={props.errors && props.errors[fieldProps.fieldName]}
      >
        {props.t("inputEmpty")}
      </FormHelperText>
    </div>
  );
};

function removeAccents(str) {
  str = str.replace(/\s/g, "");
  str = str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  return str.replace(/[.,\/#!$%\^&\*;:{}=\-+@'_`~()]/g, "");
}

const renderFormField = (fieldProps, props) => {
  const newFieldProps = {
    ...fieldProps,
    label: fieldProps.fieldName,
    fieldName: removeAccents(fieldProps.fieldName.toUpperCase()),
  };

  switch (fieldProps.fieldType) {
    case FieldTypes.INT:
    case FieldTypes.FLOAT:
      return renderNumberInput(newFieldProps, props);

    case FieldTypes.NVARCHAR:
      return renderTextInput(newFieldProps, props);
    case FieldTypes.NVARCHARBLOCK:
      return renderTextBlockInput(newFieldProps, props);

    case FieldTypes.LIST:
      return renderSelect(newFieldProps, props);

    case FieldTypes.DATETIME:
      return renderDateTimePicker(newFieldProps, props);

    case FieldTypes.BIT:
      return renderSwitcher(newFieldProps, props);
  }
};

export const CustomForm = (props) => {
  const { customFields = [], entity, personGroups } = props;

  return (
    <Fragment>
      {customFields.map((field) => {
        let personGroupVisibility = getPersonGroupsJoinVisibility(
          field.visibility,
          personGroups,
          "hidden"
        );
        return (
          <Grid
            item
            xs={12}
            md={6}
            className={props.classes.grid}
            style={{ marginTop: 0 }}
            hidden={
              isNullOrUndefined(field.visibility[AMStuiteEnums.TypeEnum[entity]]) &&
              isNullOrUndefined(personGroupVisibility)
            }
          >
            {renderFormField(field, props)}
          </Grid>
        );
      })}
    </Fragment>
  );
};

CustomForm.propTypes = {
  customFields: PropTypes.array.isRequired,
  entity: PropTypes.string.isRequired,
};

const mapStateToProps = ({ CustomForm, Settings }) => ({
  formValues: CustomForm.formValues ? CustomForm.formValues : {},
  formDateValues: CustomForm.formDateValues ? CustomForm.formDateValues : {},
  customFieldsListValues: Settings.customFieldsListValues,
});

const mapDispatchToProps = {
  handleFieldChange,
  handleDateFieldChange,
  requestCustomFieldsTypeListValues,
};

const connectedCustomForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomForm);

export default withTranslation()(
  withStyles(styles, { withTheme: true })(connectedCustomForm)
);
