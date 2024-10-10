import React from "react";
import { withStyles } from '@mui/styles';
import { Table, Icon } from "semantic-ui-react";
import PropTypes from "prop-types";
import CustomStyles from "../../../../assets/styles/Settings_styles/License/DetailsEntitieElementStyles";

const DetailsEntitieElement = props => {
  const { classes } = props;
  const remaining = props.maxValue - props.currentValue;
  return (
    <Table.Row>
      <Table.Cell>{props.name}</Table.Cell>
      <Table.Cell>{props.maxValue}</Table.Cell>
      <Table.Cell>{props.currentValue}</Table.Cell>
      <Table.Cell className={remaining <= 0 ? classes.error : ""}>
        {remaining <= 0 && <Icon name="attention" />}
        {remaining > 0 ? remaining : 0}
      </Table.Cell>
    </Table.Row>
  );
};

DetailsEntitieElement.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(CustomStyles)(DetailsEntitieElement);
