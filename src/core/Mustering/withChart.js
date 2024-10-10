import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import NavBarMustering from "../../../src/webApps/Mustering/utils/NavBarMustering";

const LogicComponent = (Component) =>
  (class extends React.Component {
    constructor(props) {
      super(props);
      const { options, data } = props;
      this.state = {
        data: data,
        options,
        selectedItem: -1,
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
    }

    render() {
      return <Component {...this.props} isDesktop={this.state.isDesktop} />;
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
