import React, { Component } from "react";
import { Typography } from "@mui/material";
import NavBarEasyAccess from "../utils/NavBarEasyAccess";

class HomeEasyAccess extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    NavBarEasyAccess.hideLoader();
  }

  render() {
    return (
      <div>
        <Typography>Va a ser mi casa de EA</Typography>
      </div>
    );
  }
}

export default HomeEasyAccess;
