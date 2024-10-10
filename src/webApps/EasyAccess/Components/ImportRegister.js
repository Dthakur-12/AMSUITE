import React, { Component } from "react";
import Typography from "@mui/material/Typography";
import NavBarEasyAccess from "../utils/NavBarEasyAccess";

class ImportRegister extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    NavBarEasyAccess.hideLoader();
  }

  render() {
    return <Typography>ImportRegister EA</Typography>;
  }
}

export default ImportRegister;
