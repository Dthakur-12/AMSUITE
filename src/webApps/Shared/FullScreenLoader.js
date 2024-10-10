import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from '@mui/styles';
import CircularProgress from "@mui/material/CircularProgress";
import CustomStyles from "../../assets/styles/Shared_Styles/FullScreenLoaderStyles";
import Fade from "@mui/material/Fade";

class FullScreenLoader extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { classes, isLoading } = this.props;
    return (
      <Fade in={isLoading} className={classes.contentLoader}>
        <div style={{ pointerEvents: isLoading ? "inherit" : "none" }}>
          <CircularProgress className={classes.circularProgress} size={50} />
        </div>
      </Fade>
    );
  }
}

FullScreenLoader.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(CustomStyles, { withTheme: true })(FullScreenLoader);
