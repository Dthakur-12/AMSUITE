import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import { withStyles} from "@mui/styles";
import { Label, Table } from "semantic-ui-react";
import CircularProgress from "@mui/material/CircularProgress";
import CustomStyles from "../../../assets/styles/Shared_Styles/Filters/FilterTableStyles";
import { connect } from "react-redux";
import {
  Icon,
  Input,
  Divider,
  Checkbox,
  Transition,
  Button,
} from "semantic-ui-react";
import ArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import ArrowRight from "@mui/icons-material/KeyboardArrowRight";
import { StyledPagination } from "../../../assets/styles/Settings_styles/Notifications/AludocNotificationsStyles";
import { default as classNames } from "classnames";
import { debounce } from "throttle-debounce";
import { requestPersons } from "../../../actions/EasyAccess/Person_actions";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

let store = "";
let dataName = "";
class FilterTableActions extends Component {
  constructor(props) {
    super(props);
    const { selectedTab = 0 } = this.props;
    this.state = {
      limit: 6,
      offset: 0,
      searchText: "",
      value: selectedTab,
    };
    this.changeSearchDebounce = debounce(500, (value) =>
      this.changeSearch(value)
    );
  }

  changeSearch = (value) => {
    this.setState({
      isSearching: true,
    });
    this.loadData();
  };

  onChangeSearch = (event) => {
    let value = event.currentTarget ? event.currentTarget.value : event.value;
    this.setState({
      searchText: value,
      isSearching: true,
    });
    this.changeSearchDebounce(value);
  };

  componentDidMount() {
    dataName = this.props.dataName;
    store = this.props.store;
    this.loadData();
  }

  componentDidUpdate(prevProps, prevState) {}

  loadData = () => {
    const { extraDataObject } = this.props;
    this.props.loadDataAction({
      start: this.state.offset,
      length: 6,
      order: "name asc",
      search: this.state.searchText,
      ...extraDataObject,
    });
    this.setState({
      isSearching: false,
    });
  };

  pageChange = (offset, e) => {
    this.setState(
      {
        offset,
      },
      () => {
        this.loadData();
      }
    );
  };

  handleChange = (event, value) => {
    if (this.props.tabs && this.props.tabs.length > 1) {
      this.setState({ value, offset: 0 });
      this.props.onTabSelect(value);
    }
  };

  render() {
    const {
      notFixed,
      open,
      t,
      classes,
      showProp,
      showProp2,
      selectedItems,
      onSelect,
      title,
      isLoadingData,
      items = {},
      itemsCount = {},
      tabs,
      isDesktop,
    } = this.props;
    const { offset, limit } = this.state;
    return (
      <React.Fragment>
        <div
          className={
            isDesktop
              ? classNames({
                  [classes.filterContainerFixed]: !notFixed,
                  [classes.filterContainer]: notFixed,
                  [classes.drawerOpen]: open,
                  [classes.drawerClose]: !open,
                })
              : classes.filterContainerSmall
          }
        >
          <Table celled inverted selectable className={classes.table}>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell className={classes.title}>
                  {isLoadingData && (
                    <CircularProgress size={30} className={classes.progress} />
                  )}

                  <AppBar position="static" color="default">
                    <Tabs
                      value={this.state.value}
                      onChange={this.handleChange}
                      indicatorColor="primary"
                      textColor="primary"
                      variant="fullWidth"
                    >
                      {tabs.map((tab, index) => {
                        if (index < 3)
                          return (
                            <Tab
                              value={tab.value}
                              label={t(tab.label)}
                              className={classes.tabRoot}
                              key={index}
                            />
                          );
                      })}
                    </Tabs>
                  </AppBar>

                  {/* <Typography variant="h6" style={{ textAlign: "center" }}>
                    {" "}
                    {title}
                  </Typography> */}
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              <Table.Row>
                <Input
                  icon="search"
                  className={classes.searchInput}
                  loading={this.state.isSearching}
                  //type="text"
                  iconPosition="left"
                  placeholder={`${t("search")}...`}
                  onChange={this.onChangeSearch}
                  style={{ width: "100%" }}
                />
              </Table.Row>
              {items &&
                items.map((item) => (
                  <Table.Row
                    onClick={() => {
                      onSelect({ [showProp]: item[showProp], id: item.id });
                    }}
                    key={item.id}
                    style={{ cursor: "pointer" }}
                  >
                    <Table.Cell style={{ padding: 8 }}>
                      {selectedItems.indexOf(item.id) !== -1 ? (
                        <Label ribbon className={classes.selected}>
                          {`${item[showProp]} ${
                            showProp2 && item[showProp2] ? item[showProp2] : ""
                          }`}
                        </Label>
                      ) : (
                        `${item[showProp]} ${
                          showProp2 && item[showProp2] ? item[showProp2] : ""
                        }`
                      )}
                    </Table.Cell>
                  </Table.Row>
                ))}
            </Table.Body>
            <Table.Footer></Table.Footer>
          </Table>
          <div
            className={
              isDesktop
                ? classes.paginationContainer
                : classes.paginationContainerSmall
            }
          >
            {itemsCount > 0 && (
              <StyledPagination
                limit={limit}
                offset={offset}
                total={itemsCount}
                onClick={(e, offset) => this.pageChange(offset, e)}
                currentPageColor="inherit"
                otherPageColor="inherit"
                previousPageLabel={
                  <ArrowLeft className={classes.iconRotateStyle} />
                }
                nextPageLabel={<ArrowRight />}
                className={classes.test}
                innerButtonCount={1}
                outerButtonCount={1}
                centerRipple={true}
                reduced={true}
                size="small"
              />
            )}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

// const mapStateToProps = (state) => {
//   return {
//     data: state[store][dataName],
//   };
// };

// const mapStateToProps = (state) => ({});

// const mapDispatchToProps = {
//   requestPersons: requestPersons,
// };

// const FilterTableActionsConnected = connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(FilterTableActions);

export default withTranslation()(
  withStyles(CustomStyles, { withTheme: true })(FilterTableActions)
);
