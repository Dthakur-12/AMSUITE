import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import SnackbarHandler from "../../utils/SnackbarHandler";
import CircularProgress from "@mui/material/CircularProgress";
import CustomStyles from "../../assets/styles/Tikas_styles/Products/NewProductStyles";

import { withStyles } from '@mui/styles';
import AccountCircle from "@mui/icons-material/PortraitRounded";
import ApiHandler from "../../services/ApiHandler";
import { isValueEmptyOrNull } from "../../utils/HelperFunctions";

import { withTranslation } from "react-i18next";
import { debounce } from "throttle-debounce";

const formValues = {
  name: "",
  photo: undefined,
};

const withNewProduct = (Component) =>
  (class extends React.Component {
    constructor(props) {
      super(props);
      const { currentUser, initValues, image } = this.props;
      this.state = {
        url: image ? image : undefined,
        isLoadingImg: false,
        currentUser: currentUser,
        newProduct: initValues ? initValues : formValues,
        formErrors: {},
        imageDelete: false,
      };

      this.changeSearchDebounce = debounce(300, (value) =>
        this.changeSearch(value)
      );
    }

    componentWillUnmount() {
      window.removeEventListener("resize", this.updateScreenMode);
    }

    updateScreenMode = () => {
      this.setState({ isDesktop: window.innerWidth > 900 });
    };

    componentDidMount() {
      this.updateScreenMode();
      window.addEventListener("resize", this.updateScreenMode);
    }

    loadImage = () => {
      const { newProduct } = this.state;
      if (newProduct.id > 0) {
        ApiHandler.Tikas.Products.getImage(newProduct.id)
          .then(({ data }) => {
            this.setState({
              url: data,
              isLoadingImg: false,
            });
          })
          .catch((error) => {});
      } else {
        this.setState({
          isLoadingImg: false,
        });
      }
    };
    handleOnFiles = (files) => {
      this.setState({
        file: files[0],
      });
    };

    handleChangeName = (name) => (event) => {
      let value = event.currentTarget ? event.currentTarget.value : event.value;
      value.includes("/")
        ? this.setState({ invalidCharacter: true })
        : this.setState({ invalidCharacter: false });
      this.setState((prevState) => ({
        newProduct: {
          ...prevState.newProduct,
          name: value.includes("/") ? prevState.newProduct.name : value,
        },
      }));
    };

    setFile = () => {
      if (isValueEmptyOrNull(this.state.file)) {
        if (isValueEmptyOrNull(this.state.url)) {
          return undefined;
        } else {
          return [{ preview: this.state.url }];
        }
      } else {
        return [{ preview: this.state.file.preview }];
      }
    };

    deleteFile = () => {
      this.setState({
        url: undefined,
        file: undefined,
        imageDelete: true,
      });
    };

    handleCreate = () => {
      const errors = this.validateCreate();
      const { t } = this.props;
      this.setState({
        formErrors: errors,
      });
      if (!Object.keys(errors).some((x) => errors[x])) {
        this.setState({
          isCreating: true,
        });
        let newProduct = JSON.parse(JSON.stringify(this.state.newProduct));

        ApiHandler.Tikas.Products.createProductWithImage(
          newProduct.name,
          this.state.file
        )
          .then(() => {
            this.setState({
              file: undefined,
            });
            SnackbarHandler.showMessage(t("ProductSuccessfullyCreated"));
            this.setState({
              isCreating: false,
              isSuccess: true,
            });
            setTimeout(() => {
              this.setState({
                isSuccess: false,
                newProduct: formValues,
              });
            }, 1000);
            this.props.updateParent();
            this.props.onCreate();
          })
          .catch((error) => {
            this.setState({
              isCreating: false,
            });
            SnackbarHandler.showMessage(error.error, "error");
          });
        setTimeout(() => {
          this.setState({
            isSuccess: false,
          });
        }, 1000);
      } else {
        SnackbarHandler.showMessage(t("inputIncomplete"), "error");
      }
    };
    setImageDefault() {
      const { classes } = this.props;
      if (this.state.isLoadingImg) {
        return (
          <CircularProgress
            size={50}
            className={classes.customCircularProgress}
          />
        );
      } else {
        return <AccountCircle className={classes.customAccountCircle} />;
      }
    }

    handleEdit = () => {
      const { t } = this.props;
      const errors = this.validateCreate();
      this.setState({
        formErrors: errors,
      });
      if (!Object.keys(errors).some((x) => errors[x])) {
        this.setState({
          isCreating: true,
        });
        let newProduct = JSON.parse(JSON.stringify(this.state.newProduct));
        let updateImage =
          this.state.imageDelete || this.state.file !== undefined;
        ApiHandler.Tikas.Products.editProduct(
          newProduct.id,
          newProduct.name,
          updateImage,
          this.state.file
        )
          .then(() => {
            SnackbarHandler.showMessage(t("ProductSuccessfullyEdited"));
            this.setState({
              isCreating: false,
              isSuccess: true,
            });
            setTimeout(() => {
              this.setState({
                isSuccess: false,
                newProduct: formValues,
              });
            }, 1000);
            this.props.updateParent();
            this.props.onCreate();
          })
          .catch((error) => {
            this.setState({
              isCreating: false,
            });
            SnackbarHandler.showMessage(error.error, "error");
          });
        setTimeout(() => {
          this.setState({
            isSuccess: false,
          });
        }, 1000);
      } else {
        SnackbarHandler.showMessage(t("inputIncomplete"), "error");
      }
    };

    validateCreate = () => {
      const { newProduct } = this.state;
      return {
        name: isValueEmptyOrNull(newProduct.name),
      };
    };

    render() {
      const {
        isCreating,
        newProduct,
        invalidCharacter,
        formErrors,
        isSuccess,
        deleteFile,
        isDesktop,
        isLoadingImg,
      } = this.state;
      const { isDialog, isEdit } = this.props;

      return (
        <Component
          prueba={"probando"}
          isDialog={isDialog}
          isCreating={isCreating}
          newProduct={newProduct}
          invalidCharacter={invalidCharacter}
          deleteFile={this.deleteFile}
          isSuccess={isSuccess}
          formErrors={formErrors}
          isDesktop={isDesktop}
          isLoadingImg={isLoadingImg}
          isEdit={isEdit}
          handleChangeName={this.handleChangeName}
          setFile={this.setFile}
          handleOnFiles={this.handleOnFiles}
          setImageDefault={this.setImageDefault}
          handleEdit={this.handleEdit}
          handleCreate={this.handleCreate}
        />
      );
    }
  });

const mapStateToProps = ({ User }) => {
  return {
    currentUser: User.currentUser,
  };
};

export default compose(
  connect(mapStateToProps, null),
  withTranslation(),
  withStyles(CustomStyles, { withTheme: true }),
  withNewProduct
);
