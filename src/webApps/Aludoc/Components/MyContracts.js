import React, { Component } from "react";
import NavBarAludoc from "../utils/NavBarAludoc";
import Typography from "@mui/material/Typography";

class MyContracts extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    NavBarAludoc.hideLoader();
  }

  render() {
    return <Typography>MyContracts ALUDOC</Typography>;
  }
}

export default MyContracts;
