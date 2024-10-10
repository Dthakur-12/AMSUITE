import React, { Component } from "react";
import Typography from "@mui/material/Typography";
import NavBarAludoc from "../utils/NavBarAludoc";

class Status extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    NavBarAludoc.hideLoader();
  }

  render() {
    return <Typography>Status ALUDOC</Typography>;
  }
}

export default Status;
