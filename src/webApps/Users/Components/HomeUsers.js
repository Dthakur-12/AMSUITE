import { withStyles } from "@mui/styles";
import PropTypes from "prop-types";
import React, { Component } from "react";
import NavBarUsers from "../utils/NavBarUsers";
import Users from "./Users";

class HomeUsers extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    NavBarUsers.hideLoader();
  }

  changeForm = () => {
    alert("clicked");
  };

  render() {
    const { classes } = this.props;
    return <Users />;
  }
}

HomeUsers.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

const styles = () => ({
  container: {
    padding: `50px`
  }
});

export default withStyles(styles, { withTheme: true })(HomeUsers);
