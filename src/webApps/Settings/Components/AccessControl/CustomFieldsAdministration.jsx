import {  Button } from "@mui/material";
import {  withStyles } from "@mui/styles";
import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";
import { compose } from "redux";
import withCustomFields from "../../../../core/Settings/AccessControl/withCustomFields";
import withCustomFieldsAdministrationView from "../../../../core/Settings/AccessControl/withCustomFieldsAdministrationView";
import MUIDataTable from "mui-datatables";
import green from "@mui/material/colors/green";
import CircularProgress from "@mui/material/CircularProgress";

const CustomFieldsAdministration = (props) => {
  const {
    customFieldsMobileVisibility = [],
    t,
    columns,
    options,
    isCreating,
    isSuccess,
    handleSaveConfiguration,
    theme,
  } = props;
  console.log("customFieldsMobileVisibility: ", customFieldsMobileVisibility);

  return (
    <div style={{ width: "100%" }}>
      <MUIDataTable
        data={customFieldsMobileVisibility}
        columns={columns}
        options={options}
      />
      <Button
        color="primary"
        variant="contained"
        fullWidth
        onClick={handleSaveConfiguration}
        style={{
          background: isSuccess ? green[500] : theme.palette.primary.main,marginTop: 20
        }}
      >
        {isSuccess ? t("successEdit") : t("Save")}
        {isCreating && (
          <CircularProgress
            size={24}
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              marginTop: -12,
              marginLeft: -12,
              color: theme.palette.text.main,
            }}
          />
        )}
      </Button>
    </div>
  );
};

const styles = (theme) => ({});

export default compose(
  withCustomFieldsAdministrationView,
  withStyles(styles, { withTheme: true }),
  withTranslation()
)(CustomFieldsAdministration);
