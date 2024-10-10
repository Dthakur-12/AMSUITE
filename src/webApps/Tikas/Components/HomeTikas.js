import React, { Component } from "react";
import Typography from "@mui/material/Typography";
import NavBarTikas from "../utils/NavBarTikas";

class HomeTikas extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    NavBarTikas.hideLoader();
  }

  render() {
    return <Typography>Va a ser mi casa de Tikas</Typography>;
  }
}

export default HomeTikas;
