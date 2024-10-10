import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Grid,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import {

  withStyles,
} from "@mui/styles";
import { withTranslation } from "react-i18next";
import VisibilityComponent from "../../Shared/VisibilityComponent";
import { isValueEmptyOrNull } from "../../../utils/HelperFunctions";
import {
  requestCustomFields,
  requestDeleteField,
  requestCustomFieldsIntegrator,
  requestEditCustomFieldVisibility,
  requestCustomFieldsTypeListValues,
  requestCreateCustomFieldsTypeList,
  requestDeleteCustomFieldListValues,
} from "../../../actions/Settings/settings_actions";
import CustomStyles, {
  StyledPagination,
} from "../../../assets/styles/Settings_styles/CustomFieldDetailsStyles";
import { isNullOrUndefined } from "util";
import { Icon, Table, Divider, Input } from "semantic-ui-react";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import Paper from "@mui/material/Paper";
import ArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import ArrowRight from "@mui/icons-material/KeyboardArrowRight";
import { connect } from "react-redux";
import { socketIO } from "../../../utils/WebSockets";
import AMStuiteEnums from "../../../utils/Enums";

const fieldType = {
  0: "INT",
  1: "FLOAT",
  2: "NVARCHAR",
  3: "DATETIME",
  4: "BIT",
  5: "LIST",
};

const setVisibility = (visibility) => {
  console.log("visibility: ", visibility);
  let newVisibility = null;
  if (visibility !== null) newVisibility = Number(visibility);
  return newVisibility;
};

export class CustomFieldDetails extends React.Component {
  constructor(props) {
    super(props);
    console.log("props.field.visibility: ", props.field.visibility);
    this.state = {
      operatingMode: Number(localStorage.getItem("operatingMode")),
      listValues: [],
      listToDelete: [],
      offset: 0,
      limit: 5,
      newListValues: [],
      itemValue: "",
      listValuesToShow: [],
      newField: {
        visibility: setVisibility(props.field.visibility[AMStuiteEnums.TypeEnum[props.subEntity]]),
      },
    };
  }

  componentDidMount() {
    const { field } = this.props;
    if (isValueEmptyOrNull(field.externalName) && field.fieldType === 5) {
      this.props.requestCustomFieldsTypeListValues(field.id);
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      nextProps.currentValues !== prevState.currentValues ||
      nextProps.isSuccessListValues !== prevState.isSuccessListValues
    ) {
      return {
        currentValues: nextProps.currentValues,
        isSuccessListValues: nextProps.isSuccessListValues,
      };
    } else return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.isSuccessListValues &&
      this.state.isSuccessListValues !== prevState.isSuccessListValues
    ) {
      let initListValues = [];
      this.state.currentValues.map((elem) => initListValues.push(elem.label));

      this.setState({
        listValues: initListValues,
        listValuesToShow: initListValues,
      });
    }
    if (
      this.props.successVisibilityUpdated &&
      prevProps.successVisibilityUpdated !== this.props.successVisibilityUpdated
    ) {
      console.log('customFieldsChanged: ');
      socketIO.emit("customFieldsChanged", this.props.currentUser.token);
    }
  }

  handleChangeVisibility = (value) => {
    this.setState((prevState) => ({
      newField: {
        ...prevState.attributeOnCreate,
        visibility: value,
      },
    }));
  };

  handleClick = () => {
    const { field,  } = this.props;
    const { operatingMode } = this.state;
    const showList =
      (operatingMode === 0 ||
        (operatingMode !== 0 && isValueEmptyOrNull(field.externalName))) &&
      field.fieldType === 5;
    const visibility = {
      ...this.props.field.visibility,
      [this.props.subEntity]: this.state.newField.visibility,
    };
    this.props.requestEditCustomFieldVisibility({
      id: this.props.field.id,
      visibility,
    });
    if (showList) {
      if (this.state.newListValues.length > 0) {
        this.props.requestCreateCustomFieldsTypeList({
          customFieldId: this.props.field.id,
          values: this.state.newListValues,
        });
      }
      if (this.state.listToDelete.length > 0) {
        this.props.requestDeleteCustomFieldListValues(this.state.listToDelete);
      }
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
      let newList = this.state.newListValues.slice();
      newList.push(itemValue);
      data.push(itemValue);
      this.setState({
        listValues: data,
        newListValues: newList,
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
    let indexItem = this.state.newListValues.indexOf(item);

    if (indexItem >= 0) {
      let newListCopy = [...this.state.newListValues];
      newListCopy.splice(indexItem, 1);
      this.setState({ newListValues: newListCopy });
    } else {
      let listToDeleteCopy = [...this.state.listToDelete];

      this.state.currentValues.map((elem) => {
        if (elem.label.toLowerCase() === item.toLowerCase()) {
          listToDeleteCopy.push(elem.value);
        } else return 0;
      });

      this.setState({ listToDelete: listToDeleteCopy });
    }
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
    const {
      listValues,
      offset,
      limit,
      listValuesToShow,
      itemValue,
    } = this.state;
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
    const { field, entity, t, inputContainer, classes } = this.props;
    const { newField, operatingMode, listValuesToShow } = this.state;
    const showList =
      (operatingMode === 0 ||
        (operatingMode !== 0 && isValueEmptyOrNull(field.externalName))) &&
      field.fieldType === 5;

    return (
      <Grid container>
        <Grid container item xs={showList ? 6 : 12}>
          <Grid item xs={showList ? 12 : 6} className={classes.inputContainer}>
            <TextField
              label={t("name")}
              value={field.fieldName}
              fullWidth
              disabled={true}
            />
          </Grid>

          <Grid
            hidden={operatingMode === 0}
            item
            xs={showList ? 12 : 6}
            className={classes.inputContainer}
          >
            <TextField
              label={t("ExternalName")}
              value={
                !isValueEmptyOrNull(field.externalName)
                  ? field.externalName
                  : t("FieldNotIntegrated")
              }
              fullWidth
              disabled={true}
            />
          </Grid>
          <Grid item xs={showList ? 12 : 6} className={classes.inputContainer}>
            <TextField
              label={t("DataType")}
              value={t(fieldType[field.fieldType])}
              fullWidth
              disabled={true}
            />
          </Grid>
          <Grid item xs={showList ? 12 : 6} className={classes.inputContainer}>
            <VisibilityComponent
              fieldVisibility={newField.visibility}
              handleChangeVisibility={this.handleChangeVisibility}
            />
          </Grid>
        </Grid>

        <Grid item xs={6} className={classes.inputContainer} hidden={!showList}>
          {this.state.listValuesToShow && this.typeList()}
        </Grid>
        <Grid item xs={12} className={classes.inputContainer}>
          <Button
            fullWidth
            color="primary"
            variant="contained"
            onClick={this.handleClick}
          >
            {t("SaveChange")}
          </Button>
        </Grid>
      </Grid>
    );
  }
}

CustomFieldDetails.propTypes = {};

const mapStateToProps = ({ Settings, User }) => ({
  successVisibilityUpdated: Settings.successVisibilityUpdated,
  isSuccessListValues: Settings.isSuccessListValues,
  currentValues: Settings.currentValues,
  currentUser: User.currentUser,
});

const mapDispatchToProps = {
  requestEditCustomFieldVisibility,
  requestCustomFields,
  requestCustomFieldsTypeListValues,
  requestCreateCustomFieldsTypeList,
  requestDeleteCustomFieldListValues,
};

const CustomFieldDetailsConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomFieldDetails);

export default withTranslation()(
  withStyles(CustomStyles, { WithTheme: true })(CustomFieldDetailsConnected)
);
