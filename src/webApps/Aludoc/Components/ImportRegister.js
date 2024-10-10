import React, { Component } from "react";
import NavBarAludoc from "../utils/NavBarAludoc";
import Typography from "@mui/material/Typography";

class ImportRegister extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    NavBarAludoc.hideLoader();
  }

  render() {
    return <Typography>ImportRegister ALUDOC</Typography>;
  }
}

export default ImportRegister;
