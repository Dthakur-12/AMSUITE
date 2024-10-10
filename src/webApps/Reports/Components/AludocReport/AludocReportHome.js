import React from "react";
import { withTranslation } from "react-i18next";
import { withStyles } from "@mui/styles";
import ControlsChart from "./ControlsChart";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { connect } from "react-redux";
import { requestDocumentStatusGraphData } from "../../../../actions/Aludoc/documents_action";
import { requestControlPeopleGraphData } from "../../../../actions/Aludoc/controls_actions";
import DocumentsChart from "./DocumentsChart";

class AludocReportHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      documentStatusGraphData: [],
      controlPeopleGraphData: [],
      isLoading: false,
      animationEnd: false,
    };
  }

  updateScreenMode = () => {
    this.setState({ isDesktop: window.innerWidth > 900 });
  };

  componentWillUnmount = () => {
    window.removeEventListener("resize", this.updateScreenMode);
  };

  componentDidMount() {
    this.props.getControlPeopleGraphData();
    this.props.getDocumentStatusGraphData({
      entity: 0,
      skipUserVisibilityCheck: true,
      skipExpiredEntitiesCheck: true,
    });
    this.updateScreenMode();
    // this.onAnimationEnd();
  }

  // handleClick = () => {
  //   this.setState(state => ({
  //     isLoading: !state.isLoading,
  //     isSuccess: false,
  //     animationEnd: false
  //   }));
  // };

  // onAnimationEnd = () => {
  //   const element = document.getElementsByClassName("truck");
  //   // element[0].addEventListener("animationend", () => {});
  // };

  static getDerivedStateFromProps(nextProps, prevState) {
    const { documentStatusGraphData, controlPeopleGraphData } = nextProps;
    if (
      nextProps.i18n.language !== prevState.language ||
      nextProps.documentStatusGraphData !== prevState.documentStatusGraphData ||
      nextProps.controlPeopleGraphData !== prevState.controlPeopleGraphData
    ) {
      return {
        documentStatusGraphData,
        controlPeopleGraphData,
        language: nextProps.i18n.language,
      };
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    // if (!this.state.orderLoading) {
    //   if (
    //     prevState.count !== this.state.count ||
    //     prevState.startDate !== this.state.startDate ||
    //     prevState.endDate !== this.state.endDate
    //   ) {
    //     this.loadPeopleWithMoreOrders(
    //       this.state.count,
    //       this.state.startDate,
    //       this.state.endDate
    //     );
    //   }
    // }
    // if (prevState.language !== this.state.language) {
    //   this.setState({
    //     ...prevState,
    //     dataSet: initialState(this.props.t)
    //   });
    // }
  }

  render() {
    const { classes } = this.props;
    const { isDesktop } = this.state;
    return (
      <Grid container>
        <Paper className={classes.paper}>
          <Grid
            item
            xs={12}
            style={{ maxWidth: "99%", marginLeft: "0.5%", marginRight: "0.5%" }}
          >
            <ControlsChart dataSet={this.state.controlPeopleGraphData} />
          </Grid>
          <Grid item xs={isDesktop ? 6 : 12}>
            <DocumentsChart dataSet={this.state.documentStatusGraphData} />
          </Grid>
          {/* <ButtonWithLoader key={this.state.isLoading} isSuccess={this.state.isSuccess} isLoading={this.state.isLoading} onClick={this.handleClick}/>
          <Button onAnimationEnd={()=> this.console.log("----ANIMATION END 1-------")} animationEnd={this.state.animationEnd} onClick={() => this.setState({isSuccess: true})}>Success</Button> */}
        </Paper>
      </Grid>
    );
  }
}

const styles = () => ({
  paper: {
    width: "100%",
  },
});

const mapStateToProps = ({ Control, Document }) => {
  return {
    documentStatusGraphData: Document.documentStatusData,
    controlPeopleGraphData: Control.controlPeopleGraphData,
  };
};

const mapDispatchToProps = {
  getDocumentStatusGraphData: requestDocumentStatusGraphData,
  getControlPeopleGraphData: requestControlPeopleGraphData,
};

const AludocReportHomeConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(AludocReportHome);

export default withTranslation()(withStyles(styles)(AludocReportHomeConnected));
