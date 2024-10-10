import React, { Component } from "react";
import Select from "react-select";
import components from "../../../Shared/ReactSelect";
import { FormHelperText } from "@mui/material";
import { withTranslation } from "react-i18next";
class ChangeStatusBadge extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  handleChange = name => event => {
    let value = event.currentTarget ? event.currentTarget.value : event.value;
    this.setState(prevState => ({
      newStatus: {
        ...prevState.newStatus,
        [name]: value
      }
    }));
  };
  render() {
    const { t } = this.props;
    return (
      <FormControl>
        <Select
          classes={classes}
          styles={selectStyles}
          options={enterpriseSuggestions}
          components={components}
          value={this.state.Enterprise}
          onChange={this.handleChange("Enterprise")}
          placeholder={t("changeStatusBadgeTo")}
          maxMenuHeight={200}
          isLoading={isLoadingEnterprises}
          isDisabled={isLoadingEnterprises}
        />
        <FormHelperText
          style={{ opacity: this.state.formErrors.Enterprise ? 1 : 0 }}
          error={this.state.formErrors.Enterprise}
        >
          {t("inputEmpty")}
        </FormHelperText>
      </FormControl>
    );
  }
}

export default withTranslation()(ChangeStatusBadge);
