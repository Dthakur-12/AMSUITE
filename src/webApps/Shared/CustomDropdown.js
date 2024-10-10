import { withStyles } from "@mui/styles";
import React from "react";
import { Dropdown } from "semantic-ui-react";

const CustomDropdown = props => {
  let defaultValue = -1;
  if (props.options)
    props.options.map((data, index) =>
      data.key === props.value ? (defaultValue = index) : ""
    );
  if (defaultValue != -1) {
    return (
      <Dropdown
        placeholder={props.placeholder}
        search
        selection
        onChange={props.handleChange}
        options={props.options ? props.options : []}
        loading={props.isLoading}
        value={
          props.options && props.options[defaultValue]
            ? props.options[defaultValue].value
            : props.placeholder
        }
      />
    );
  } else {
    return (
      <Dropdown
        placeholder={props.placeholder}
        search
        selection
        onChange={props.handleChange}
        options={props.options ? props.options : []}
        loading={props.isLoading}
      />
    );
  }
};

export default withStyles({}, { withTheme: true })(CustomDropdown);
