import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import NavBarMustering from "../../../src/webApps/Mustering/utils/NavBarMustering";

const LogicComponent = (Component) =>
  (class extends React.Component {
    constructor(props) {
      super(props);
      const { data } = props;
      this.state = {
        data: data,
        activeIndex: 0,
      };
    }

    componentWillUnmount() {
      window.removeEventListener("resize", this.updateScreenMode);
    }

    updateScreenMode = () => {
      this.setState({ isDesktop: window.innerWidth > 900 });
    };

    componentDidMount() {
      this.updateScreenMode();
      NavBarMustering.hideLoader();
      this.setState((prevState) => ({
        activeIndex: prevState.data.length>0 && prevState.data[0].value === 0 ? 1 : 0,
      }));
    }

    onPieEnter = (data, index) => {
      this.setState({
        activeIndex: index,
      });
    };

    render() {
      return (
        <Component
          coreState={this.state}
          {...this.props}
          onPieEnter={this.onPieEnter}
        />
      );
    }
  });

const mapDispatchToProps = {};

const mapStateToProps = ({}) => {
  return {};
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  LogicComponent
);
