import { FormHelperText } from "@mui/material";
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
import AccountCircle from "@mui/icons-material/PortraitRounded";
//import { DatePicker } from "@mui/x-date-pickers";
import DatePicker from "react-datepicker";
import PropTypes from "prop-types";
import React, { Component } from "react";
import Select from "react-select";
import { isValueEmptyOrNull } from "../../../../utils/HelperFunctions";
import DataTableSelectAction from "../../../Shared/DataTable/DataTableSelectAction";
import DropFile from "../../../Shared/DropFile";
import components from "../../../Shared/ReactSelect";
import { withTranslation } from "react-i18next";
import { requestDocumentType } from "../../../../actions/Aludoc/documentType_action";
import {
  createRequestDocument,
  requestEditDocument,
} from "../../../../actions/Aludoc/documents_action";

import { connect } from "react-redux";
import styles from "../../../../assets/styles/Aludoc_styles/Document_styles/newDocumentStyles.js";

const formValues = {
  name: "",
  expirationDate: new Date(
    new Date().setFullYear(new Date().getFullYear() + 1)
  ),
  dischargeDate: new Date(),
  documentType: undefined,
  notes: "",
  status: undefined,
  enterprise: undefined,
  person: undefined,
  vehicle: undefined,
  documentTypeObject: undefined,
  documentFiles: {},
};

const statusOptions = (t) => ({
  0: { value: 0, label: t("correct") },
  1: { value: 1, label: t("toReview") },
  2: { value: 2, label: t("Rejected") },
  3: { value: 3, label: t("Expired"), color: "#0052CC", isDisabled: true },
});

class NewDocument extends Component {
  constructor(props) {
    super(props);
    const { initValues, enterprise, person, vehicle, t } = props;
    this.state = {
      showEnterprises: true,
      newDocument: initValues ? initValues : formValues,
      adjuncts: [],
      enterprise: enterprise,
      person: person,
      vehicle: vehicle,
      openDropFilesDialog: false,
      SelectedStateOption: statusOptions(t),
      selectedState: initValues
        ? new Date(initValues.expirationDate) > Date.now()
          ? statusOptions(t)[initValues.status]
          : statusOptions(t)[2]
        : undefined,
    };
  }

  render() {
    const {
      isDialog,
      isEdit,
      classes,
      theme,
      t,
      isDesktop,
      isCreating,
      newDocument,
      formErrors,
      handleChange,
      handleDocumentTypeSelected,
      handleChangeDate,
      handleSelectStateChange,
      states,
      columns,
      selectedState,
      handleCreate,
      handleOnEdit,
      handleOnFiles,
      handleRemoveFiles,
      handleRemoveOldFiles,
    } = this.props;
    const { loading } = this.state;

    console.log("formErrors: ", formErrors);
    const EntranceDateText = ({ value, onClick }) => (
      <TextField
        style={{ width: "100%" }}
        onClick={onClick}
        label={t("expirationDate")}
        value={value}
        required={newDocument.expirationDate}
      />
    );
    const selectStyles = {
      dropdownIndicator: (base) => ({
        ...base,
        color: theme.palette.text.main,
      }),
      input: (base) => ({
        ...base,
        "& input": {
          font: "inherit",
        },
        width: "100%",
        menuList: {
          maxHeight: 100,
        },
      }),
    };

    // const documentTypeColumns = [
    //   {
    //     name: t("name"),
    //     field: "value",
    //     options: {
    //       filter: true,
    //       sort: true,
    //       sortDirection: "asc"
    //     }
    //   },
    //   {
    //     name: t("entity"),
    //     field: "entidad",
    //     options: {
    //       filter: true,
    //       sort: true
    //     }
    //   }
    // ];
    return (
      (<main className={classes.layout}>
        <div className={!isDialog ? classes.fill : undefined}>
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
          <Paper elevation={!isDialog ? 2 : 0} className={classes.paper}>
            <Typography
              component="h1"
              variant="h5"
              style={{ paddingTop: isDesktop ? "" : "3%", paddingBottom: "3%" }}
            >
              {isEdit ? t("EditDocument") : t("NewDocument")}
            </Typography>
            <Divider
              style={{ width: "100%", marginTop: 10, marginBottom: 24 }}
            />
            <Grid container spacing={24}>
              <Grid item xs={12} md={6}>
                <TextField
                  required
                  label={t("name")}
                  onChange={handleChange("name")}
                  fullWidth
                  helperText={t("inputEmpty")}
                  FormHelperTextProps={{
                    style: { opacity: formErrors.name ? 1 : 0 },
                  }}
                  error={formErrors.name}
                  value={newDocument.name}
                />
              </Grid>
              {/* <Grid item xs={12} md={6}>
                <DatePicker
                  label={t("expirationDate")}
                  value={this.state.newDocument.expirationDate}
                  onChange={this.handleChangeDate("expirationDate")}
                  minDate={new Date()}
                  required
                  fullWidth
                  minDateMessage={t(
                    "TheExpirationDateCanNotBeLessThanTheCurrentOne"
                  )}
                  format={"DD/MM/YYYY"}
                  autoOk={true}
                />
              </Grid> */}

              <Grid item xs={12} md={6}>
                <div style={{ width: "100%" }}>
                  <DatePicker
                    selected={new Date(newDocument.expirationDate)}
                    onChange={handleChangeDate("expirationDate")}
                    customInput={<EntranceDateText />}
                    timeCaption="time"
                    dateFormat={"dd/MM/yyyy"}
                    minDate={new Date()}
                    required
                    fullWidth
                    showYearDropdown
                    scrollableYearDropdown
                  />
                </div>
              </Grid>

              <Grid
                item
                xs={12}
                md={6}
                style={{ paddingTop: 0, marginTop: "-0.7%" }}
              >
                <Select
                  classes={classes}
                  styles={selectStyles}
                  components={components}
                  options={states}
                  onChange={handleSelectStateChange("status")}
                  placeholder={t("status")}
                  maxMenuHeight={200}
                  isLoading={loading} //
                  value={selectedState}
                />
                <FormHelperText
                  style={{ opacity: formErrors.status ? 1 : 0 }}
                  error={formErrors.status}
                >
                  {selectedState && selectedState.value !== 2
                    ? isValueEmptyOrNull(selectedState.value)
                      ? t("inputEmpty")
                      : ""
                    : "El estado no puede ser Vencido"}
                </FormHelperText>
              </Grid>

              <Grid item xs={12} md={6} className={classes.grid}>
                <DataTableSelectAction
                  handleConfirm={handleDocumentTypeSelected}
                  loadDataAction={this.props.requestDocumentType}
                  element={newDocument.documentTypeObject}
                  primaryTitle={t("assignDocumentType")}
                  title={t("DocumentTypes")}
                  dataTableSubTitle={t("assignDocumentType")}
                  mdSubtitle={3}
                  DataTableColumns={columns}
                  multipleSelect={false}
                  attribute={"value"}
                  hasError={formErrors.documentType}
                  info={this.props.info}
                  success={this.props.successDocType}
                  loading={this.props.loading}
                  extraObject={{
                    companyId: this.props.person
                      ? this.props.person.originEnterprise
                      : this.props.enterprise
                      ? this.props.enterprise.id
                      : undefined,
                  }}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  id="observaciones"
                  label={t("Observations")}
                  multiline
                  maxRows="7"
                  rows="6"
                  value={newDocument.notes}
                  onChange={handleSelectStateChange("notes")}
                  className={classes.textField}
                  margin="normal"
                  variant="outlined"
                  fullWidth
                />
              </Grid>

              <Grid
                item
                xs={12}
                md={6}
                style={{
                  width: "100%",
                  display: "flex",
                  marginTop: 12,
                }}
              >
                <DropFile
                  dropzoneText={t("DragOrClickToUploadFiles")}
                  multiple={true}
                  // accept="image/*"
                  files={this.props.adjuncts}
                  oldFiles={newDocument.documentFiles}
                  onFiles={handleOnFiles}
                  onRemove={handleRemoveFiles}
                  onRemoveOldFiles={handleRemoveOldFiles}
                  areFiles
                  defaultImage={
                    <AccountCircle
                      style={{
                        fontSize: 150,
                        color: theme.palette.text.main,
                        width: "50px",
                      }}
                    />
                  }
                  variant="outlined"
                />
              </Grid>
              <Grid
                item
                xs={12}
                className={classes.submit}
                style={{
                  position: "relative",
                }}
              >
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  disabled={isCreating}
                  onClick={
                    isCreating
                      ? undefined
                      : isEdit
                      ? handleOnEdit
                      : handleCreate
                  }
                  style={{
                    background: this.props.isSuccess ? green[500] : undefined,
                    color: theme.palette.text.main,
                  }}
                >
                  {this.props.isSuccess
                    ? isEdit
                      ? t("successEdit")
                      : t("successCreate")
                    : isCreating
                    ? ""
                    : isEdit
                    ? t("EditDocument")
                    : t("CreateDocument")}
                </Button>
                {isCreating && (
                  <CircularProgress
                    size={24}
                    className={classes.customCircularProgress}
                  />
                )}
              </Grid>
            </Grid>
          </Paper>
        </div>
      </main>)
    );
  }
}

NewDocument.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

const mapDispatchToProps = {
  createRequestDocument: createRequestDocument,
  requestEditDocument: requestEditDocument,
  requestDocumentType: requestDocumentType,
};

const NewDocumentConnected = connect(null, mapDispatchToProps)(NewDocument);

export default withTranslation()(
  withStyles(styles, { withTheme: true })(NewDocumentConnected)
);
