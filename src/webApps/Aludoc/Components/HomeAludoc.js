import React, { Component } from "react";
import Typography from "@mui/material/Typography";
import NavBarAludoc from "../utils/NavBarAludoc";

class HomeAludoc extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    NavBarAludoc.hideLoader();
  }

  render() {
    return <Typography>Va a ser mi casa de Aludoc</Typography>;
  }
}

export default HomeAludoc;
