import React, { Component } from "react";
import Typography from "@mui/material/Typography";
import NavBarAludoc from "../../utils/NavBarAludoc";

class NewVehicle extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    NavBarAludoc.hideLoader();
  }

  render() {
    return <Typography>NewVehicle ALUDOC</Typography>;
  }
}

export default NewVehicle;
