import React, { Component } from "react";
import Typography from "@mui/material/Typography";
import NavBarAludoc from "../utils/NavBarAludoc";

class Requirements extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    NavBarAludoc.hideLoader();
  }

  render() {
    return <Typography>Requirements ALUDOC</Typography>;
  }
}

export default Requirements;
