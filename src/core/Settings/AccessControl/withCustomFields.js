import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";
import { compose } from "redux";
import { FieldTypes } from "../../../utils/Enums";
import {
  requestCustomFieldsTypeListValues,
  requestCustomFields,
  updateCustomFieldStore,
} from "../../../actions/Settings/settings_actions";

const getDisplayName = (WrappedComponent) => {
  return WrappedComponent.displayName || WrappedComponent.name || "Component";
};

const withCustomFields = (Component) =>
  (class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        systemDTO: { loginSAML: false },
      };
    }

    loadSelectsOptions = () => {
      const { customFields, requestCustomFieldsTypeListValues } = this.props;
      if (customFields && customFields.cardholders)
        customFields.cardholders.map((field) => {
          if (field.fieldType === FieldTypes.LIST) {
            requestCustomFieldsTypeListValues(field.id);
          }
        });
    };

    componentDidMount() {
      this.props.requestCustomFields({});
    }

    componentDidUpdate(prevProps, prevState) {
      const { successCustomFields } = this.props;
      if (
        successCustomFields &&
        successCustomFields !== prevProps.successCustomFields
      )
        this.loadSelectsOptions();
    }

    render() {
      const { customFields = {}, customFieldsListValues = {} } = this.props;
      return (
        <Component
          cardholdersCustomFields={customFields.cardholders || []}
          badgesCustomFields={customFields.badges || []}
          customFieldsListValues={customFieldsListValues}
          {...this.props}
        />
      );
    }
  });

withCustomFields.displayName = `withCustomFields(${getDisplayName(Component)})`;

const mapStateToProps = ({ Settings }) => ({
  customFields: Settings.customFields,
  successCustomFields: Settings.successCustomFields,
  customFieldsListValues: Settings.customFieldsListValues,
});

const mapDispatchToProps = {
  requestCustomFieldsTypeListValues,
  requestCustomFields,
  updateCustomFieldStore,
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withTranslation(),
  withCustomFields
);
