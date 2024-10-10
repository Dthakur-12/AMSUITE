import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import Typography from "@mui/material/Typography";
import PointIcon from "@mui/icons-material/FiberManualRecord";
import SnackbarHandler from "../../utils/SnackbarHandler";
import NavBarTikas from "../../webApps/Tikas/utils/NavBarTikas";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { ListItemIcon } from "@mui/material";
import { withStyles } from '@mui/styles';
import CustomStyles, {
  BootstrapInput,
  StyledPagination,
} from "../../assets/styles/Tikas_styles/Products/ProductListStyles";
import ApiHandler from "../../services/ApiHandler";
import AmSuiteNavBar from "../../utils/AmSuiteNavBar";
import { isNullOrUndefined } from "util";

import { withTranslation } from "react-i18next";
import { debounce } from "throttle-debounce";
import moment from "moment";

const initValues = { name: "" };

const withProductList = (Component) =>
  (class extends React.Component {
    constructor(props) {
      super(props);
      this.routeChange = this.routeChange.bind(this);
      this.state = {
        isLoading: true,
        openFormDialog: false,
        productOnEdit: undefined,
        newProduct: initValues,
        openDeleteDialog: false,
        openDeleteSelectedDialog: false,
        productToDelete: [],
        checked: [],
        offset: 0,
        limit: 8,
        width: 0,
        height: 0,
        openStall: false,
      };

      this.changeSearchDebounce = debounce(300, (value) =>
        this.changeSearch(value)
      );
    }
    componentDidMount() {
      this.loadProductList();
      this.updateWindowDimensions();
    }

    // componentDidUpdate(prevProps, prevState) {
    //   if (window.innerWidth !== prevState.width) {
    //     this.updateWindowDimensions();
    //   }
    // }

    updateWindowDimensions() {
      this.setState({
        width: window.innerWidth,
        height: window.innerHeight,
        viewMode: window.innerWidth < 800 ? "list" : "grid",
      });
    }

    routeChange() {
      AmSuiteNavBar.appNavigation.history.push("/reports/tikas");
    }

    loadProductList = () => {
      ApiHandler.Tikas.Products.getProducts(true)
        .then(({ data }) => {
          this.setState({
            products: data,
            productConst: data,
            isLoading: false,
          });
          NavBarTikas.hideLoader();
        })
        .catch(({ error }) => {
          console.log(error);
          this.setState({
            isLoading: false,
            products: [],
          });
          NavBarTikas.hideLoader();
        });
    };

    handleClick(offset, e) {
      this.setState({ offset });
    }

    handleToggle = (value) => () => {
      const { checked } = this.state;
      const currentIndex = checked.indexOf(value);
      const newChecked = [...checked];

      if (currentIndex === -1) {
        newChecked.push(value);
      } else {
        newChecked.splice(currentIndex, 1);
      }

      this.setState({
        checked: newChecked,
      });
    };

    handleAdd = () => {
      this.setState({
        productOnCreate: true,
      });
    };

    openNewStall = () => {
      this.setState({ openStall: true });
    };

    handleCloseFormDialog = () => {
      this.setState({
        openFormDialog: false,
        productOnEdit: undefined,
        newProduct: initValues,
      });
    };
    openDeleteSelectDialogFunction = () => {
      this.setState({
        openDeleteSelectedDialog: true,
      });
    };
    closeDeleteSelectDialogFunction = () => {
      this.setState({
        openDeleteSelectedDialog: false,
      });
    };

    handleQueryChange = (query) => {
      let data = this.state.productConst.slice();
      let value = query.currentTarget.value;
      this.setState((state) => ({
        ...state,
        products: data.filter((item) =>
          item.name.toLowerCase().includes(value.toLowerCase())
        ),
        offset: 0,
      }));
    };

    handleChange = (name) => (event) => {
      let value = event.currentTarget ? event.currentTarget.value : event.value;
      this.setState((prevState) => ({
        newProduct: {
          ...prevState.newProduct,
          [name]: value,
        },
      }));
    };

    handleSelectChange = (name) => (event) => {
      let value = event.target.value;
      this.setState({
        limit: value,
        offset: 0,
      });
    };

    handleViewModeChange = (event, viewMode) => this.setState({ viewMode });

    //   handleStatusSelected = index => {
    //     const { optionSelected } = this.state;
    //     this.setState({
    //       optionSelected: optionSelected === index ? undefined : index
    //     });
    //   };

    handleOnEdit = (id, name, image) => {
      this.setState({
        productOnEdit: { id, name, image },
        openFormDialog: true,
        newProduct: { id, name, image },
      });
    };
    handleCloseProductOnEdit = () => {
      this.setState({ productOnEdit: undefined });
    };

    handleCloseProductOnCreate = () => {
      this.setState({ productOnCreate: undefined });
    };

    handleCloseNewStall = () => {
      this.setState({ openStall: false });
    };

    selectAll = (event) => {
      const { checked, productConst } = this.state;
      const newChecked = [...checked];
      if (event.target.checked) {
        productConst.map((b) => newChecked.push(b.id));
        this.setState({
          checked: newChecked,
        });
      } else {
        this.setState({
          checked: [],
        });
      }
    };

    handleOnDelete = (item) => {
      this.setState({
        openDeleteDialog: true,
        productToDelete: item,
      });
    };
    handleCloseDeleteDialog = () => {
      this.setState({ openDeleteDialog: false });
    };

    handleLicence = (entities, activity) => {
      const { currentUser } = this.props;
      return (
        Object.keys(currentUser.permits).filter((v) => {
          return entities.includes(v.toString()) && activity != null
            ? currentUser.permits[v].includes(parseInt(activity))
            : true;
        }).length > 0
      );
    };

    updateParentSeletDialog = () => {
      this.loadProductList();
      this.setState({
        openDeleteSelectedDialog: false,
        optionSelected: undefined,
      });
    };

    updateParentDialog = () => {
      this.loadProductList();
      this.setState({
        openDeleteDialog: false,
        optionSelected: undefined,
      });
    };

    render() {
      const {
        products,
        isLoading,
        productOnEdit,
        productToDelete,
        openDeleteDialog,
        offset,
        productOnCreate,
        limit,
        checked,
        openDeleteSelectedDialog,
        viewMode,
        isCreating,
        width,
        openStall,
      } = this.state;
      return (
        <Component
          openStall={openStall}
          products={products}
          isLoading={isLoading}
          productOnEdit={productOnEdit}
          productToDelete={productToDelete}
          openDeleteDialog={openDeleteDialog}
          offset={offset}
          productOnCreate={productOnCreate}
          limit={limit}
          checked={checked}
          openDeleteSelectedDialog={openDeleteSelectedDialog}
          viewMode={viewMode}
          isCreating={isCreating}
          width={width}
          handleLicence={this.handleLicence}
          handleQueryChange={this.handleQueryChange}
          handleViewModeChange={this.handleViewModeChange}
          handleSelectChange={this.handleSelectChange}
          selectAll={this.selectAll}
          routeChange={this.routeChange}
          handleToggle={this.handleToggle}
          handleOnEdit={this.handleOnEdit}
          handleOnDelete={this.handleOnDelete}
          handleClick={this.handleClick}
          handleAdd={this.handleAdd}
          loadProductList={this.loadProductList}
          openDeleteSelectDialogFunction={this.openDeleteSelectDialogFunction}
          handleCloseProductOnEdit={this.handleCloseProductOnEdit}
          handleCloseProductOnCreate={this.handleCloseProductOnCreate}
          updateParentSeletDialog={this.updateParentSeletDialog}
          updateParentDialog={this.updateParentDialog}
          closeDeleteSelectDialogFunction={this.closeDeleteSelectDialogFunction}
          handleCloseDeleteDialog={this.handleCloseDeleteDialog}
          openNewStall={this.openNewStall}
          handleCloseNewStall={this.handleCloseNewStall}
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
  withProductList
);
