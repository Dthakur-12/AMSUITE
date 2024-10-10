import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { isEmailValid } from "../../utils/HelperFunctions";
import ApiHandler from "../../services/ApiHandler";
import { isNullOrUndefined } from "util";
import { withTranslation } from "react-i18next";
import { debounce } from "throttle-debounce";
import NavBarTikas from "../../webApps/Tikas/utils/NavBarTikas";
import NewStall from "../../webApps/Tikas/Components/Products/NewStall";

const withAssignProducs = (Component) =>
  (class extends React.Component {
    constructor(props) {
      super(props);
      const { newStall } = this.props;
      this.state = {
        groupsNames: ["Breakfast", "Lunch", "Snack", "Dinner"],
        selectedProducts: { Breakfast: [], Lunch: [], Snack: [], Dinner: [] },
        limit: 10,
        offset: 0,
        isLoadingData: true,
        products: [],
        selectedInterval: 0,
        selectedProductsIds: {
          Breakfast: [],
          Lunch: [],
          Snack: [],
          Dinner: [],
        },
        value: !isNullOrUndefined(newStall.intervalSelected[0].start)
          ? 0
          : !isNullOrUndefined(newStall.intervalSelected[1].start)
          ? 1
          : !isNullOrUndefined(newStall.intervalSelected[2].start)
          ? 2
          : 3,
      };
    }

    calculateStock = (stock, data) => {
      const groupsNames = ["Breakfast", "Lunch", "Snack", "Dinner"];
      let selectedProduct = { Breakfast: [], Lunch: [], Snack: [], Dinner: [] };

      stock.map((elem) =>
        selectedProduct[groupsNames[elem.timeGroup]].push({
          id: elem.product,
          name: data.filter((e) => e.id === elem.product)[0].name,
          stock: elem.lapseQuantity,
        })
      );
      return selectedProduct;
    };

    calculaProductsIds = (stock) => {
      const groupsNames = ["Breakfast", "Lunch", "Snack", "Dinner"];
      let selectedIds = { Breakfast: [], Lunch: [], Snack: [], Dinner: [] };
      stock.map((
        elem //console.log("elem: ", elem)
      ) => selectedIds[groupsNames[elem.timeGroup]].push(elem.product));
      return selectedIds;
    };

    loadProducts = () => {
      ApiHandler.Tikas.Products.getProducts()
        .then(({ data }) => {
          this.setState({
            selectedProductsIds: this.props.newStall.stock
              ? this.calculaProductsIds(this.props.newStall.stock)
              : { Breakfast: [], Lunch: [], Snack: [], Dinner: [] },
            selectedProducts: this.props.newStall.stock
              ? this.calculateStock(this.props.newStall.stock, data)
              : { Breakfast: [], Lunch: [], Snack: [], Dinner: [] },
            products: data ? data : [],
            productConst: data,
            isLoading: false,
            isLoadingData: false,
          });
          NavBarTikas.hideLoader();
        })
        .catch(({ error }) => {
          console.log(error);
          this.setState({
            isLoading: false,
            isLoadingData: false,
            products: [],
          });
          NavBarTikas.hideLoader();
        });
    };

    componentDidMount() {
      this.loadProducts();
    }
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

    changeSearch = (value) => {
      this.setState({
        isSearching: true,
        offset: 0,
      });
      this.loadProducts();
    };

    handleSelectProduct = (id, name) => {
      if (
        !this.state.selectedProductsIds[
          this.state.groupsNames[this.state.value]
        ].includes(id)
      ) {
        let selected = this.state.selectedProducts[
          this.state.groupsNames[this.state.value]
        ].slice();
        let selectedIds = this.state.selectedProductsIds[
          this.state.groupsNames[this.state.value]
        ].slice();

        selected.push({ id: id, name: name, stock: 0 });
        selectedIds.push(id);
        this.setState((prevState) => ({
          selectedProducts: {
            ...prevState.selectedProducts,
            [this.state.groupsNames[this.state.value]]: selected,
          },
          selectedProductsIds: {
            ...prevState.selectedProductsIds,
            [this.state.groupsNames[this.state.value]]: selectedIds,
          },
        }));
      }
    };

    handleDelete = (id) => {
      let selected = this.state.selectedProducts[
        this.state.groupsNames[this.state.value]
      ].filter((elem) => elem.id !== id);

      let selectedIds = this.state.selectedProductsIds[
        this.state.groupsNames[this.state.value]
      ].filter((elem) => elem !== id);
      this.setState((prevState) => ({
        selectedProducts: {
          ...prevState.selectedProducts,
          [this.state.groupsNames[this.state.value]]: selected,
        },
        selectedProductsIds: {
          ...prevState.selectedProductsIds,
          [this.state.groupsNames[this.state.value]]: selectedIds,
        },
      }));
    };

    pageChange = (offset, e) => {
      this.setState({
        offset,
      });
    };
    handleChangeIndex = (index) => {
      this.setState({ value: index });
    };

    handleChange = (event, value) => {
      this.setState((prevState) => ({
        value,
        selectedInterval:
          prevState.value === value ? prevState.selectedInterval : 0,
      }));
    };

    handleChangeStock = (prod, name) => (event) => {
      let value = event.currentTarget ? event.currentTarget.value : event.value;
      let arrayCopy = this.state.selectedProducts[
        this.state.groupsNames[this.state.value]
      ].slice();
      const index = arrayCopy.findIndex(
        (elem) => Number(elem.id) === Number(prod)
      );

      arrayCopy[index] = { id: prod, name: name, stock: value };

      this.setState((prevState) => ({
        selectedProducts: {
          ...prevState.selectedProducts,
          [this.state.groupsNames[this.state.value]]: arrayCopy,
        },
      }));
    };

    render() {
      const {
        products,
        searchText,
        limit,
        offset,
        isLoadingData,
        selectedProducts,
        selectedProductsIds,
        value,
        groupsNames,
        selectedInterval,
      } = this.state;
      return (
        <Component
          groupsNames={groupsNames}
          products={products}
          selectedProducts={selectedProducts}
          searchText={searchText}
          limit={limit}
          offset={offset}
          isLoadingData={isLoadingData}
          value={value}
          selectedInterval={selectedInterval}
          selectedProductsIds={selectedProductsIds}
          pageChange={this.pageChange}
          handleQueryChange={this.handleQueryChange}
          handleSelectProduct={this.handleSelectProduct}
          handleDelete={this.handleDelete}
          handleChangeIndex={this.handleChangeIndex}
          handleChange={this.handleChange}
          handleChangeStock={this.handleChangeStock}
          {...this.props}
        />
      );
    }
  });

const mapStateToProps = ({}) => {
  return {};
};

const mapDispatchToProps = {};

export default compose(
  connect(mapStateToProps, null),
  withTranslation(),
  withAssignProducs
);
