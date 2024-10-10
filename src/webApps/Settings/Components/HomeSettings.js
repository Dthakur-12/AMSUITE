import React, { Component } from "react";
import Typography from "@mui/material/Typography";
import NavBarSettings from "../utils/NavBarSettings";

class HomeSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    NavBarSettings.hideLoader();
  }

  render() {
    return <Typography>Va a ser mi casa de settings</Typography>;
  }
}

export default HomeSettings;
