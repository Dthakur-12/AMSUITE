import React, { Component } from "react";
import { connect } from "react-redux";

export class TestExcel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: undefined,
    };
  }
  render() {
    return <div></div>;
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(TestExcel);
