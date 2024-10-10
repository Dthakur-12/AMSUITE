import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { requestGetPanels } from "../../../../actions/AccessControl/panel_actions";
import { withStyles } from '@mui/styles';
import { withTranslation } from "react-i18next";
import { Search, Grid, Header, Segment } from "semantic-ui-react";
import PointIcon from "@mui/icons-material/FiberManualRecord";
import { ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { debounce } from "throttle-debounce";

const initialState = { isLoading: false, results: [], value: "" };

class SearchModule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      results: [],
      value: "",
      offset: 0,
    };
    this.changeSearchDebounce = debounce(500, (value) =>
      this.changeSearch(value)
    );
  }
  static propTypes = {
    prop: PropTypes,
  };

  changeSearch = (value) => {
    this.setState({
      isSearching: true,
    });
    this.getPanels();
  };

  resultRenderer = ({ name, login, typeName }) => {
    const { theme } = this.props;
    return (
      <ListItem style={{ background: theme.palette.background.main }}>
        <ListItemIcon>
          <PointIcon
            style={login == true ? { color: "#437043" } : { color: "#743631" }}
          />
        </ListItemIcon>
        <ListItemText
          style={{ color: theme.palette.text.main }}
          inset
          primary={name}
        />
      </ListItem>
    );
  };

  getPanels = () => {
    const { offset, value } = this.state;
    this.props.requestGetPanels({
      start: offset,
      length: 5,
      order: "name asc",
      search: value,
      completeData: true,
    });
  };

  handleResultSelect = (e, { result }) => {
    this.setState({ value: result.name });
    this.props.handlePanelClick({
      panelId: result.id,
      panelName: result.name,
    });
  };

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value });
    this.changeSearchDebounce(value);
  };

  render() {
    const { isLoading, value, results } = this.state;
    return (
      <Grid>
        <Grid.Column width={12}>
          <Search
            // loading={isLoading}
            onResultSelect={this.handleResultSelect}
            onSearchChange={this.handleSearchChange}
            resultRenderer={this.resultRenderer}
            results={this.props.panels}
            value={value}
            {...this.props}
          />
        </Grid.Column>
      </Grid>
    );
  }
}

const mapStateToProps = ({ Panel, User }) => {
  return {
    panels: Panel.panels,
    panelsCount: Panel.panelsCount,
  };
};

const mapDispatchToProps = {
  requestGetPanels,
};

const SearchModuleConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchModule);

const styles = (theme) => ({});

export default withTranslation()(
  withStyles(styles, { withTheme: true })(SearchModuleConnected)
);
