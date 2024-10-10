import React from "react";
import PropTypes from "prop-types";
import { withTranslation } from "react-i18next";
import {  Typography } from "@mui/material";
import { withStyles} from "@mui/styles";
import { Label, Table, Input } from "semantic-ui-react";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import ArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import ArrowRight from "@mui/icons-material/KeyboardArrowRight";
import CustomStyles, {
  StyledPagination,
} from "../../../assets/styles/Settings_styles/Notifications/AludocNotificationsStyles";
import { connect } from "react-redux";

class AludocItemTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: "",
      offset: 0,
      length: 10,
    };
  }

  componentDidMount = () => {
    this.loadData();
  };

  loadData = () => {
    const { offset, length, searchText } = this.state;
    this.props.requestData({
      start: offset,
      length: length,
      order: "name asc",
      search: searchText,
      ...this.props.extraData,
    });
  };

  handlePageChange = (e, value) => {
    console.log("e: ", e);
    console.log("offset: ", value);
    this.setState(
      {
        offset: value,
      },
      () => this.loadData()
    );
  };

  handleSearchChange = (e, { value }) => {
    console.log("e: ", e);
    console.log("offset: ", value);
    this.setState(
      {
        searchText: value,
        offset: 0,
      },
      () => this.loadData()
    );
  };

  pageChange = (offset, e) => {
    this.setState(
      {
        offset,
      },
      () => this.loadData()
    );
  };

  render() {
    const {
      classes,
      selectedItem = {},
      items = { data: [], dataCount: 0 },
      handleSelectItem,
      t,
      showProp,
      isLoadingData,
      title,
    } = this.props;
    const { length, offset, searchText } = this.state;
    return (
      <Grid container>
        <Typography className={classes.message}>{title}</Typography>

        <Input
          icon="search"
          className={classes.searchInput}
          //type="text"
          value={this.state.searchText}
          iconPosition="left"
          placeholder={`${t("search")}...`}
          onChange={this.handleSearchChange}
        />

        <Table celled inverted selectable className={classes.table}>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell className={classes.title}>
                {isLoadingData && (
                  <CircularProgress size={30} className={classes.progress} />
                )}
                <Typography variant="h6"> {title}</Typography>
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body style={{ position: "relative" }}>
            {items.data.map((item) => {
              return (
                <Table.Row
                  onClick={() => {
                    handleSelectItem(item);
                  }}
                  key={item.id}
                  style={{ cursor: "pointer" }}
                >
                  <Table.Cell>
                    {selectedItem.id == item.id ? (
                      <Label ribbon className={classes.selected}>
                        {item[showProp]}
                      </Label>
                    ) : (
                      item[showProp]
                    )}
                  </Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>

        <div style={{ marginTop: 15 }}>
          {items.dataCount > 0 && (
            <StyledPagination
              limit={length}
              offset={offset}
              total={items.dataCount}
              onClick={this.handlePageChange}
              currentPageColor="inherit"
              otherPageColor="inherit"
              previousPageLabel={
                <ArrowLeft className={classes.iconRotateStyle} />
              }
              nextPageLabel={<ArrowRight />}
              className={classes.test}
              innerButtonCount={1}
              outerButtonCount={1}
            />
          )}
        </div>
      </Grid>
    );
  }
}

AludocItemTable.propTypes = {
  storeName: PropTypes.string.isRequired,
  storeAttr: PropTypes.string.isRequired,
  requestData: PropTypes.func.isRequired,
  handleSelectItem: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  items: state[ownProps.storeName][ownProps.storeAttr],
});

const mapDispatchToProps = {};

const ConnectedAludocItemTable = connect(
  mapStateToProps,
  mapDispatchToProps
)(AludocItemTable);

export default withTranslation()(
  withStyles(CustomStyles)(ConnectedAludocItemTable)
);
