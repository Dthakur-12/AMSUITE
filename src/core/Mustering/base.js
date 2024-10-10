import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withTranslation } from "react-i18next";
// import { withStyles } from "@mui/styles";

// Logic Component

const LogicComponent = (Component) =>
  (class extends React.Component {
    constructor(props) {}

    render() {
      return <Component {...this.props} />;
    }
  });

const mapDispatchToProps = {};

const mapStateToProps = ({}) => {
  return {};
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withTranslation(),
  LogicComponent
);

// View Component

const ViewComponent = (props) => {
  const { t, data } = props;
  return <div />;
};

const enhance = compose(
  withTranslation(),
  withStyles(styles, { withTheme: true })
);
export default LogicComponent(enhance(ViewComponent));
