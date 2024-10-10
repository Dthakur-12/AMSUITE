import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import CustomStyles from "../../assets/styles/Tikas_styles/Products/ProductComponentStyles";
import { withStyles } from '@mui/styles';
import { withTranslation } from "react-i18next";
import { debounce } from "throttle-debounce";

const withProductComponent = (Component) =>
  (class extends React.Component {
    constructor(props) {
      super(props);
      const { t } = props;
      this.state = { isSelected: false };

      this.changeSearchDebounce = debounce(300, (value) =>
        this.changeSearch(value)
      );
    }

    handleEdit = (id, name, image) => {
      return () => {
        this.props.handleOnEdit(id, name, image);
      };
    };

    handleDelete = (id, name) => {
      return () => {
        this.props.handleOnDelete({ id, name });
      };
    };

    handleLicence = (entities, activity) => {
      const { currentUser } = this.props;
      return (
        Object.keys(currentUser.permits).filter((v) => {
          return (
            entities.includes(v.toString()) &&
            currentUser.permits[v].includes(parseInt(activity))
          );
        }).length > 0
      );
    };

    render() {
      const { name, image, id, viewMode } = this.props;
      const {} = this.state;
      return (
        <Component
          name={name}
          image={image}
          id={id}
          viewMode={viewMode}
          handleLicence={this.handleLicence}
          handleEdit={this.handleEdit}
          handleDelete={this.handleDelete}
        />
      );
    }
  });

const mapStateToProps = ({ User }) => {
  return {
    currentUser: User.currentUser,
  };
};

const mapDispatchToProps = {};

export default compose(
  connect(mapStateToProps, null),
  withTranslation(),
  withStyles(CustomStyles, { withTheme: true }),
  withProductComponent
);
