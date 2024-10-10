import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from '@mui/styles';

import PrintIcon from "@mui/icons-material/PrintRounded";
import Fab from "@mui/material/Fab";

class PrintButton extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { classes } = this.props;
    return (
      <Fab color="primary" className={classes.fab}>
        <PrintIcon />
      </Fab>
    );
  }
}

const styles = theme => ({
  fab: {
    margin: theme.spacing.unit
  }
});

PrintButton.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PrintButton);
