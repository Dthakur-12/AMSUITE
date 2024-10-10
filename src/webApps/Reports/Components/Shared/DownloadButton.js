import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from '@mui/styles';
import CloudIcon from "@mui/icons-material/CloudDownloadRounded";
import Fab from "@mui/material/Fab";

class DownloadButton extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { classes } = this.props;
    return (
      <Fab
        color="primary"
        className={classes.fab}
      >
        <CloudIcon />
      </Fab>
    );
  }
}

const styles = theme => ({
  fab: {
    margin: theme.spacing.unit
  }
});

DownloadButton.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DownloadButton);
