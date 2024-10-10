import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";
import { compose } from "redux";
import { FieldTypes } from "../../../utils/Enums";
import {
  requestGetCustomFieldsMobileVisibilities,
  requestUpdateCustomFieldsMobileVisibilities,
} from "../../../actions/Settings/settings_actions";
import { Switch } from "@mui/material";

const getDisplayName = (WrappedComponent) => {
  return WrappedComponent.displayName || WrappedComponent.name || "Component";
};

const withCustomFieldsAdministrationView = (Component) =>
  (class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        columns: this.translateColumns(this.props.t),
        customFieldConfiguration: {},
        options: {
          responsive: "scrollFullHeight",
          selectableRows: "none",
          elevation: 0,
          serverSide: true,
          rowHover: false,
          pagination: false,
          search: false,
          sort: false,
          download: false,
          filter: false,
          print: false,
          viewColumns: false,
          // searchText: this.state.searchText,
          // onTableChange: this.onTableChange,
          textLabels: {
            body: {
              noMatch: this.props.t("dontSearchRegister"),
              toolTip: this.props.t("order"),
            },
            toolbar: {
              search: this.props.t("search"),
            },
            filter: {
              all: this.props.t("all"),
              title: this.props.t("filter"),
              reset: this.props.t("cleanFilter"),
            },
            viewColumns: {
              title: this.props.t("showColumns"),
              titleAria: this.props.t("showHideColumns"),
            },
          },
        },
      };
    }

    translateColumns = (t) => {
      return [
        {
          label: t("name"),
          name: "fieldName",
          options: {
            filter: true,
            sort: true,
          },
        },
        {
          label: t("MobileVisibilityVisitor"),
          name: "visitorVisibility",
          options: {
            filter: false,
            sort: false,
            customBodyRender: (value, tableMeta, updateValue) => {
              const { customFieldsMobileVisibility = [] } = this.props;
              const { rowIndex, columnIndex, rowData, tableData } = tableMeta;
              console.log(
                "customFieldsMobileVisibility[rowIndex].customFieldvisibility ",
                customFieldsMobileVisibility[rowIndex].customFieldvisibility[
                  "VISITOR"
                ]
              );
              return (
                <Switch
                  checked={value || false}
                  onChange={this.changeVisibility(tableMeta, updateValue)}
                  disabled={
                    customFieldsMobileVisibility[rowIndex]
                      .customFieldvisibility["VISITOR"] === null ||
                    customFieldsMobileVisibility[rowIndex]
                      .customFieldvisibility["VISITOR"] === undefined
                  }
                  name="visitorVisibility"
                  color="primary"
                />
              );
            },
          },
        },
        {
          label: t("MolbileVisibilityEmployee"),
          name: "employeeVisibility",
          options: {
            filter: false,
            sort: false,
            customBodyRender: (value = false, tableMeta, updateValue) => {
              const { customFieldsMobileVisibility = [] } = this.props;
              const { rowIndex, columnIndex, rowData, tableData } = tableMeta;
              return (
                <Switch
                  checked={value}
                  onChange={this.changeVisibility(tableMeta, updateValue)}
                  disabled={
                    customFieldsMobileVisibility[rowIndex]
                      .customFieldvisibility["EMPLOYEE"] === null ||
                    customFieldsMobileVisibility[rowIndex]
                      .customFieldvisibility["EMPLOYEE"] === undefined
                  }
                  name="employeeVisibility"
                  color="primary"
                />
              );
            },
          },
        },
      ];
    };

    componentDidMount() {
      this.props.requestGetCustomFieldsMobileVisibilities();
    }

    componentDidUpdate(prevProps, prevState) {
      if (prevProps.i18n.language !== this.props.i18n.language)
        this.setState({
          columns: this.translateColumns(this.props.t),
        });
      if (
        this.props.successUpdateCustomFieldsMobileVisibilities &&
        this.props.successUpdateCustomFieldsMobileVisibilities !=
          prevProps.successUpdateCustomFieldsMobileVisibilities
      ) {
        this.setState({ success: true });
        setTimeout(() => {
          this.setState({ success: false });
        }, 1000);
      }
    }

    changeVisibility = (tableMeta, updateValue) => (event) => {
      const checked = event.target.checked;
      const { customFieldsMobileVisibility = [] } = this.props;
      const { rowIndex, columnIndex, rowData, tableData } = tableMeta;
      updateValue(checked);
      this.setState((prevState) => ({
        customFieldConfiguration: {
          ...prevState.customFieldConfiguration,
          [rowIndex]: {
            id: customFieldsMobileVisibility[rowIndex].id,
            fieldName: rowData[0],
            visitorVisibility:
              columnIndex === 1 ? checked : rowData[1] || false,
            employeeVisibility:
              columnIndex === 2 ? checked : rowData[2] || false,
          },
        },
      }));
    };

    handleSaveConfiguration = () => {
      console.log(this.state.customFieldConfiguration);
      const values = Object.values(this.state.customFieldConfiguration);
      console.log("values: ", values);
      this.props.requestUpdateCustomFieldsMobileVisibilities(
        JSON.stringify(values)
      );
    };

    render() {
      const { columns, options, success } = this.state;

      return (
        <Component
          columns={columns || []}
          options={options}
          customFieldsMobileVisibility={this.props.customFieldsMobileVisibility}
          handleSaveConfiguration={this.handleSaveConfiguration}
          isSuccess={success}
          {...this.props}
        />
      );
    }
  });

withCustomFieldsAdministrationView.displayName = `withCustomFieldsAdministrationView(${getDisplayName(
  Component
)})`;

const mapStateToProps = ({ Settings }) => ({
  customFieldsMobileVisibility: Settings.customFieldsMobileVisibility,
  isCreating: Settings.isCreating,
  successUpdateCustomFieldsMobileVisibilities:
    Settings.successUpdateCustomFieldsMobileVisibilities,
});

const mapDispatchToProps = {
  requestGetCustomFieldsMobileVisibilities,
  requestUpdateCustomFieldsMobileVisibilities,
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withTranslation(),
  withCustomFieldsAdministrationView
);
