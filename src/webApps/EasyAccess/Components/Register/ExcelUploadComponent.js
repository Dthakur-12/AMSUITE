import React, { Component } from "react";
import { connect } from "react-redux";
import EventPersonList from "./EventPersonList";
import { OutTable, ExcelRenderer } from "react-excel-renderer";
import {
  Typography,
  IconButton,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  DialogActions,
  CircularProgress,
  Fade,
  Grid,
  Badge,
  Tooltip,
} from "@mui/material";
import {
  
  withStyles,
} from "@mui/styles";
import {
  isValueEmptyOrNull,
  isEmailValid2,
  camelize,
} from "../../../../utils/HelperFunctions";
import NavBarEasyAccess from "../../utils/NavBarEasyAccess";
import SnackbarHandler from "../../../../utils/SnackbarHandler";
import { requestEnterprises } from "../../../../actions/EasyAccess/Enterprise_actions";
import { requestGetStatuses } from "../../../../actions/EasyAccess/status_actions";
import { withTranslation } from "react-i18next";
import styles from "../../../../assets/styles/EasyAccess_styles/Register_styles/newPersonStyle";
import Select from "react-select";
import components from "../../../Shared/ReactSelect";
import DataTableSelectAction from "../../../Shared/DataTable/DataTableSelectAction";
import DownloadIcon from "@mui/icons-material/GetApp";

import PublishIcon from "@mui/icons-material/Publish";
import { Icon } from "semantic-ui-react";
import PersonAddDisabledIcon from "@mui/icons-material/PersonAddDisabled";
export class ExcelUploadComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      personList: [],
      personsWithErrors: [],
      showPersonWithErrors: false,
      showConfirmExcelData: false,
      cols: [],
      rows: [],
      colsName: [],
      isLoadingStatus: false,
      formErrors: {},
    };
  }

  componentDidMount() {
    NavBarEasyAccess.hideLoader();
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      nextProps.settings !== prevState.settings ||
      nextProps.successGetStatuses !== prevState.successGetStatuses ||
      nextProps.successXls !== prevState.successXls ||
      nextProps.successXlsTemplate !== prevState.successXlsTemplate
    ) {
      return {
        visitorSettings: nextProps.settings
          ? nextProps.settings.visitorSettings
          : {},
        successXls: nextProps.successXls,
        successXlsTemplate: nextProps.successXlsTemplate,
      };
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { statuses, successGetStatuses } = this.state;
    const { t } = this.props;
    if (
      this.state.successXls &&
      prevProps.successXls !== this.state.successXls
    ) {
      let persons =
        "data:application/vnd.ms-excel" + ";base64," + this.props.dataXls.data;
      require("downloadjs")(
        persons,
        `${this.props.t("PeopleToCorrect")}.xls`,
        "application/vnd.ms-excel"
      );
    }
    if (
      this.state.successXlsTemplate &&
      prevProps.successXlsTemplate !== this.state.successXlsTemplate
    ) {
      let template =
        "data:application/vnd.ms-excel" + ";base64," + this.props.dataXls.data;
      require("downloadjs")(
        template,
        `${this.props.t("peopleToLoad")}.xls`,
        "application/vnd.ms-excel"
      );
    }
  }

  validateColumns = (excelIndex, columns) => {
    const columnsErrors = [];
    const expectedColumns = [
      "Nombre",
      "Apellido",
      "Correo electrónico",
      "Teléfono",
      "Documento",
    ];
    const expectedEnglishColumn = [
      "Name",
      "Last name",
      "Email",
      "Phone number",
      "SSNO",
    ];
    [...Array(5).keys()].map((key) => {
      if (
        columns[key] !== expectedColumns[key] &&
        columns[key] !== expectedEnglishColumn[key]
      )
        columnsErrors.push(excelIndex[key]);
    });
    return columnsErrors;
  };

  validatePerson = (newPerson) => {
    const { visitorSettings } = this.state;
    let name = visitorSettings.name ? isValueEmptyOrNull(newPerson[0]) : false;
    let lastname = visitorSettings.lastName
      ? isValueEmptyOrNull(newPerson[1])
      : false;
    let email = visitorSettings.email
      ? !isEmailValid2(newPerson[2])
      : !isValueEmptyOrNull(newPerson[2]) && !isEmailValid2(newPerson[2]);
    let phone = visitorSettings.phone
      ? isValueEmptyOrNull(newPerson[3])
      : false;
    let document = visitorSettings.dni
      ? isValueEmptyOrNull(newPerson[4])
      : false;
    return {
      name: name,
      lastname: lastname,
      email: email,
      phone: phone,
      document: document,
    };
  };

  processErrors = (errors, prs) => {
    const { t } = this.props;
    let errorMsj = t("ErrorsWereDetectedIn") + ": \n";
    Object.keys(errors).map((key, index) => {
      if (errors[key])
        errorMsj =
          this.state.colsName[index] === "Email" &&
          !isValueEmptyOrNull(prs.email)
            ? errorMsj + `${t("invalidEmail")},\n`
            : errorMsj + `${this.state.colsName[index]}, \n`;
      // else if (errors[key])
      //   errorMsj =
      //     errorMsj + `${this.state.colsName[index]}:${t("invalidEmail")},\n`;
    });
    return errorMsj.slice(0, -2);
  };

  processData = () => {
    const newPersonsList = [];
    const personsWithErrors = [];
    const { cols, colsName, rows } = this.state;
    rows.map((row) => {
      const isEmpty = row.every((x) => isValueEmptyOrNull(x));
      if (isEmpty) return;
      let newPerson = {
        name: row[0],
        lastname: row[1],
        email: row[2],
        phone: row[3],
        document: row[4],
        originCompanyId: this.state.originEnterprise.id,
        statusId: this.state.status.id,
        originCompanyName: this.state.originEnterprise.name,
      };
      const errors = this.validatePerson(row);
      if (!Object.keys(errors).some((x) => errors[x])) {
        newPersonsList.push(newPerson);
      } else {
        newPerson.comments = this.processErrors(errors, newPerson);
        personsWithErrors.push(newPerson);
      }
    });
    this.props.addPersonsList(newPersonsList);
    this.setState({
      // personList: newPersonsList,
      status: undefined,
      originEnterprise: undefined,
      personsWithErrors: personsWithErrors,
      showPersonWithErrors: personsWithErrors.length > 0,
    });
  };

  fileHandler = (event) => {
    let fileObj = event.target.files[0]; //just pass the fileObj as parameter
    ExcelRenderer(fileObj, (err, resp) => {
      if (err) {
        console.log(err);
      } else {
        const rows = resp.rows;
        const columns = rows.shift();
        const columnsErrors = this.validateColumns(resp.cols, columns);
        if (columnsErrors.length > 0) {
          SnackbarHandler.showMessage(this.props.t("InvalidFormat"), "error");
          return;
        }
        this.setState({
          cols: resp.cols,
          rows: rows,
          colsName: columns,
          showConfirmExcelData: true,
        });
        // this.processData(resp.cols, columns, rows);
      }
    });
  };

  validateExcelExtraData = () => {
    let originEnterprise = isValueEmptyOrNull(this.state.originEnterprise);
    let status = isValueEmptyOrNull(this.state.status);
    return {
      status,
      originEnterprise,
    };
  };

  handleOnConfirm = () => {
    const errors = this.validateExcelExtraData();
    this.setState({
      formErrors: errors,
    });
    if (!Object.keys(errors).some((x) => errors[x])) {
      this.setState({
        showConfirmExcelData: false,
      });
      this.processData();
    } else {
      SnackbarHandler.showMessage(this.props.t("inputIncomplete"), "error");
    }
  };

  handleClose = (name) => {
    this.setState({
      [name]: false,
    });
  };

  handleChange = (name) => (event) => {
    let value = event.currentTarget ? event.currentTarget.value : event.value;
    this.setState((prevState) => ({
      [name]: value,
    }));
  };

  handleEnterpriseSelected = (name, enterprise) => {
    this.setState((prevState) => ({
      [name]: enterprise,
      formErrors: {
        ...prevState.formErrors,
        [name]: undefined,
      },
    }));
  };

  handleStatusSelected = (name, status) => {
    this.setState((prevState) => ({
      [name]: status,
      formErrors: {
        ...prevState.formErrors,
        [name]: undefined,
      },
    }));
  };

  render() {
    const { t, classes, theme } = this.props;
    const { personsWithErrors = [] } = this.state;
    return (
      (<React.Fragment>
        <Grid item xs={12} className={classes.uploadPersonsContaienr}>
          <input
            type="file"
            onChange={this.fileHandler.bind(this)}
            style={{ display: "none" }}
            id="contained-button-file"
            accept=".xls,.xlsx"
          />
          <label htmlFor="contained-button-file" atyle={{ display: "flex" }}>
            <Button
              className={classes.fileInput}
              color="primary"
              variant="contained"
              component="span"
            >
              {t("UploadPersons")}
            </Button>
          </label>
          {personsWithErrors.length > 0 && (
            <Tooltip title={t("ShowPersonsWithErrors")} placement="top">
              <Badge
                color="secondary"
                badgeContent={personsWithErrors.length}
                className={classes.margin}
              >
                <IconButton
                  aria-label="download"
                  color="primary"
                  style={{ color: "red" }}
                  onClick={() => this.setState({ showPersonWithErrors: true })}
                  size="large">
                  <PersonAddDisabledIcon />
                </IconButton>
              </Badge>
            </Tooltip>
          )}
          <Typography
            variant="subtitle1"
            className={classes.dwTemplateDescription}
          >
            {t("DwTemplateDescription")}
          </Typography>
          <Tooltip title={t("DownloadXmlTemplate")} placement="top">
            <IconButton
              aria-label="download"
              color="primary"
              style={{ padding: 0 }}
              onClick={() => this.props.downloadExcelTemplate()}
              size="large">
              <DownloadIcon />
            </IconButton>
          </Tooltip>
        </Grid>
        <Dialog
          open={this.state.showPersonWithErrors}
          onClose={() => this.handleClose("showPersonWithErrors")}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">
            {t("PersonsWithErrors")}
            <Tooltip
              title={t("DownloadData")}
              placement="top"
              style={{ zIndex: "5001 !important" }}
            >
              <IconButton
                aria-label="delete"
                color="primary"
                style={{
                  position: "absolute",
                  top: 10,
                  right: 10,
                  zIndex: 1001,
                }}
                onClick={() =>
                  this.props.downloadPeopleWithErrors(
                    this.state.personsWithErrors
                  )
                }
                size="large">
                <DownloadIcon />
              </IconButton>
            </Tooltip>
          </DialogTitle>
          <DialogContent style={{ padding: 0, width: 600 }}>
            <EventPersonList
              data={this.state.personsWithErrors}
              dataCount={this.state.personsWithErrors.length}
              showErrors={true}
            />
          </DialogContent>
        </Dialog>
        <Dialog
          open={this.state.showConfirmExcelData}
          onClose={() => this.handleClose("showConfirmExcelData")}
          aria-labelledby="form-dialog-title"
          fullWidth={true}
          maxWidth="sm"
          scroll="body"
        >
          <DialogTitle id="form-dialog-title">
            {t("CompleteTheInformation")}
          </DialogTitle>
          <DialogContent scroll="body" style={{ height: 200 }}>
            <Grid container spacing={24}>
              <Grid item xs={12} md={6}>
                <DataTableSelectAction
                  handleConfirm={(enterprise) =>
                    this.handleEnterpriseSelected(
                      "originEnterprise",
                      enterprise
                    )
                  }
                  loadDataAction={this.props.requestEnterprises}
                  element={this.state.originEnterprise}
                  primaryTitle={t("originEnterprise")}
                  title={t("originEnterprise")}
                  multipleSelect={false}
                  attribute={"name"}
                  isDetails={this.props.isDetails}
                  info={this.props.enterprises}
                  success={this.props.successEnterprise}
                  loading={this.props.loadingEnterprises}
                  hasError={this.state.formErrors.originEnterprise}
                  DataTableColumns={[
                    {
                      name: t("name"),
                      field: "name",
                      options: {
                        sort: true,
                        filter: true,
                        sortDirection: "asc",
                        customBodyRender: (data) => {
                          if (data.name)
                            return (
                              <Typography value={data.name}>
                                {data.name}
                              </Typography>
                            );
                        },
                      },
                    },
                  ]}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <DataTableSelectAction
                  handleConfirm={(status) =>
                    this.handleStatusSelected("status", status)
                  }
                  loadDataAction={this.props.requestGetStatuses}
                  element={this.state.status}
                  primaryTitle={t("status")}
                  title={t("status")}
                  multipleSelect={false}
                  attribute={"name"}
                  isDetails={this.props.isDetails}
                  info={this.props.statuses}
                  success={this.props.successGetStatuses}
                  loading={this.props.isLoadingStatus}
                  hasError={this.state.formErrors.status}
                  DataTableColumns={[
                    {
                      name: t("name"),
                      field: "name",
                      options: {
                        sort: true,
                        filter: true,
                        sortDirection: "asc",
                        customBodyRender: (data) => {
                          if (data.name)
                            return (
                              <Typography value={data.name}>
                                {data.name}
                              </Typography>
                            );
                        },
                      },
                    },
                  ]}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => this.handleClose("showConfirmExcelData")}
              color="primary"
            >
              {t("Cancel")}
            </Button>
            <Button onClick={this.handleOnConfirm} color="primary">
              {t("Confirm")}
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>)
    );
  }
}

const mapStateToProps = (Store) => {
  const { Settings, Enterprise, Status, Persons } = Store;
  return {
    settings: Settings.settings,
    enterprises: Enterprise.enterprises,
    statuses: Status.statuses,
    successGetStatuses: Status.successGetStatuses,
    dataXls: Persons.dataXls,
    successXls: Persons.successXls,
    successXlsTemplate: Persons.successXlsTemplate,
    successCreateEvent: Persons.successCreateEvent,
  };
};

const mapDispatchToProps = {
  requestEnterprises,
  requestGetStatuses,
};

const ExcelUploadComponentConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(ExcelUploadComponent);
export default withTranslation()(
  withStyles(styles, { withTheme: true })(ExcelUploadComponentConnected)
);
