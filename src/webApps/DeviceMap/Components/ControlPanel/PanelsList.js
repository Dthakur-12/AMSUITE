import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import { Label, Table } from "semantic-ui-react";
import CircularProgress from "@mui/material/CircularProgress";
import CustomStyles from "../../../../assets/styles/Shared_Styles/Filters/FilterTableStyles";
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
import { StyledPagination } from "../../../../assets/styles/Settings_styles/Notifications/AludocNotificationsStyles";
import { default as classNames } from "classnames";
import { debounce } from "throttle-debounce";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { requestGetPanels } from "../../../../actions/AccessControl/panel_actions";
import { LocationOn, GpsNotFixed, GpsOff } from "@mui/icons-material";
import {
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import {

  withStyles,
} from "@mui/styles";
import "./iconStyles.css";
let store = "";
let dataName = "";
class PanelsList extends Component {
  constructor(props) {
    super(props);
    const { selectedTab = 0 } = this.props;
    this.state = {
      offset: 0,
      searchText: "",
      value: selectedTab,
      expanded: 1,
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
    });
    this.changeSearchDebounce(value);
  };

  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate(prevProps, prevState) {}

  loadData = () => {
    const { extraDataObject } = this.props;
    this.props.requestGetPanels({
      start: this.state.offset,
      length: 6,
      order: "name asc",
      search: this.state.searchText,
      ...extraDataObject,
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
      selectedPanel,
      handleChangePanels,
    } = this.props;
    const { offset, expanded } = this.state;
    const { panels = [], panelsCount } = this.props;

    return (
      (<React.Fragment>
        <div
        //   className={classNames({
        //     [classes.filterContainerFixed]: !notFixed,
        //     [classes.filterContainer]: notFixed,
        //     [classes.drawerOpen]: open,
        //     [classes.drawerClose]: !open,
        //   })}
        >
          {panels.map((panel, index) => {
            return (
              (<Accordion
                square
                expanded={selectedPanel == panel.id}
                onChange={() => this.props.handleChangePanels(panel.id)}
              >
                <AccordionSummary>
                  <Typography>{panel.name} </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <IconButton className={classes.button} aria-label="Delete" size="large">
                    <LocationOn />
                  </IconButton>
                  <IconButton
                    className={classes.button}
                    aria-label="Delete"
                    disabled
                    color="primary"
                    size="large">
                    <GpsNotFixed />
                  </IconButton>
                  <IconButton
                    color="secondary"
                    className={classes.button}
                    aria-label="Add an alarm"
                    size="large">
                    <GpsOff />
                  </IconButton>
                </AccordionDetails>
              </Accordion>)
            );
          })}
          <div className={classes.paginationContainer}>
            {itemsCount > 0 && (
              <StyledPagination
                limit={10}
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
      </React.Fragment>)
    );
  }
}

const mapStateToProps = ({ Panel }) => ({
  panels: Panel.panels,
  panelsCount: Panel.panelsCount,
});

const mapDispatchToProps = {
  requestGetPanels: requestGetPanels,
};

const PanelsListConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(PanelsList);

export default withTranslation()(
  withStyles(CustomStyles, { withTheme: true })(PanelsListConnected)
);
