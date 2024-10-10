import React, { Component } from "react";
import Typography from "@mui/material/Typography";
import NavBarAccessControl from "../utils/NavBarAccessControl";

class HomeAccessControl extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    NavBarAccessControl.hideLoader();
  }

  render() {
    return <Typography>Va a ser mi casa de AccessControl</Typography>;
  }
}

export default HomeAccessControl;
