import React, { Component } from "react";
import Typography from "@mui/material/Typography";
import NavBarMustering from "../utils/NavBarMustering";

class HomeMustering extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    NavBarMustering.hideLoader();
  }

  render() {
    return <Typography>Va a ser mi casa de Mustering</Typography>;
  }
}

export default HomeMustering;
