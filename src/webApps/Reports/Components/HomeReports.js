import {
  Collapse,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Grid,
} from "@mui/material";
import { withStyles } from '@mui/styles';
import BarChartIcon from "@mui/icons-material/BarChart";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import DashboardIcon from "@mui/icons-material/Dashboard";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import DepartureBoard from "@mui/icons-material/DepartureBoard";
import BusinessIcon from "@mui/icons-material/BusinessRounded";
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun"
import People from "@mui/icons-material/People";
import { default as classNames, default as classnames } from "classnames";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { isNullOrUndefined } from "util";
import NavBarReports from "../utils/NavBarReports";
import AccessReport from "./AccessReport/AccessReport";
import EnterpriseReport from "./EnterpriseReport/EnterpriseReport";
import AludocReport from "./AludocReport/AludocReport";
import TemperatureReport from "./TemperatureReport/TemperatureReport";
import VisitsReport from "./PersonReport/visitsReport";
import ActivtyReport from "./ActivityReport/ActivityReport";
import { Icon } from "semantic-ui-react";
import { Entities } from "../../../utils/Enums";
import { connect } from "react-redux";

import TikasReport from "./TikasReport/TikasReport";
import { requestGetLicense } from "../../../actions/Settings/license_actions";
import { withTranslation } from "react-i18next";
import BusValidationReport from "./BusValidationReport/BusValidationReport";
import { AirportShuttle } from "@mui/icons-material";
import BusScanReport from "./BusValidationReport/BusScanReport";
import WebReport from "./WebReport/WebReport"

const mapStateToProps = ({ User, License }) => {
  const { license } = License;
  return {
    licensedProducts: license ? license.productNames : [],
    currentUser: User.currentUser,
  };
};

const mapDispatchToProps = {
  requestGetLicense,
};

// Si no funciona usar el de debajo
function addDays(date, days) {
  let aux = new Date(date.valueOf());
  aux.setDate(date.getDate() + days);
  return aux;
}

// Date.prototype.addDays = function(days) {
//   let date = new Date(this.valueOf());
//   date.setDate(date.getDate() + days);
//   return date;
// };

const drawerWidth = 240;

const menuIndex = 0;
const docIndex = 1;
const assistanceIndex = 2;
const activityIndex = 3;
const accessIndex = 4;
const tikasIndex = 5;
const enterpriseIndex = 7;
const visitsIndex = 8;
const temperatureIndex = 6;
const busValIndex = 9;
const busScanIndex = 10;
const reportViewIndex = 11;
const dateNow = new Date();

class HomeReports extends Component {
  constructor(props) {
    super(props);
    const { t, match } = props;
    this.state = {
      open: false,
      aludocReportExpiredDate:
        match && Object.keys(match.params).length > 0
          ? addDays(dateNow, parseInt(match.params.days)) //dateNow.addDays(parseInt(match.params.days))
          : undefined,
      reportIndexSelected: 3,
      reports: this.translateReports(t),
    };
  }
  translateReports = (t) => {
    return [
      {
        name: "Menú",
        description: "",
        entities: [],
        products: [],
        icon: <DashboardIcon />,
        index: menuIndex,
      },
      {
        name: t("Documentation"),
        description: t("DetailDocumentation"),
        entities: [Entities.REPORTS_ALUDOC.toString()],
        products: "ALUDOC",
        icon: <Icon name="file alternate" size="large" />,
        index: docIndex,
      },
      {
        name: t("UserActivity"),
        description: t("UserActivity"),
        entities: [
          Entities.REPORTS_ALUTEL_MOBILE.toString(),
          Entities.REPORTS_EASYACCESS.toString(),
          Entities.REPORTS_TIKAS.toString(),
          Entities.REPORTS_MUSTERING.toString(),
          Entities.REPORTS_ALUDOC.toString(),
        ],
        products: "",
        icon: <BarChartIcon />,
        index: activityIndex,
      },
      {
        name: "Tikas",
        description: t("DetailOfConsumed"),
        entities: [Entities.REPORTS_TIKAS.toString()],
        products: "TIKAS",
        icon: <CreditCardIcon />,
        index: tikasIndex,
      },
      {
        name: t("AccessReport"),
        description: t("AccessReport"),
        entities: [
          Entities.REPORTS_ALUTEL_MOBILE.toString(),
          Entities.REPORTS_EASYACCESS.toString(),
        ],
        products: "",
        icon: <DepartureBoard />,
        index: accessIndex,
      },
      {
        name: t("Enterprise"),
        description: t("Enterprise"),
        entities: [
          // Entities.REPORTS_ALUTEL_MOBILE.toString(),
          Entities.REPORTS_EASYACCESS.toString(),
        ],
        products: "",
        icon: <BusinessIcon />,
        index: enterpriseIndex,
      },
      {
        name: t("musteringReportView"),
        description: t("musteringReportView"),
        entities: [
          // Entities.REPORTS_ALUTEL_MOBILE.toString(),
          Entities.REPORTS_EASYACCESS.toString(),
        ],
        products: "",
        icon: <DirectionsRunIcon />,
        index: reportViewIndex,
      },
      {
        name: t("BusValidationReport"),
        description: t("BusValidationReport"),
        entities: [
          // Entities.REPORTS_ALUTEL_MOBILE.toString(),
          Entities.REPORTS_EASYACCESS.toString(),
        ],
        products: "",
        icon: <DirectionsBusIcon />,
        index: busValIndex,
      },
      {
        name: t("BusScanReport"),
        description: t("BusScanReport"),
        entities: [
          Entities.REPORTS_ALUTEL_MOBILE.toString(),
          // Entities.REPORTS_EASYACCESS.toString(),
        ],
        products: "",
        icon: <AirportShuttle />,
        index: busScanIndex,
      },
      {
        name: t("Visit"),
        description: t("Visit"),
        entities: [
          // Entities.REPORTS_ALUTEL_MOBILE.toString(),
          Entities.REPORTS_EASYACCESS.toString(),
        ],
        products: "",
        icon: <People />,
        index: visitsIndex,
      },
      // {
      //   name: t("Temperature"),
      //   description: t("PeopleTemperature"),
      //   entities: [Entities.REPORTS_ALUTEL_MOBILE.toString()],
      //   products: "",
      //   icon: <Icon name="thermometer three quarters" size="large" />,
      //   index: temperatureIndex,
      // },
    ];
  };
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.i18n.language !== prevState.language) {
      return {
        language: nextProps.i18n.language,
      };
    } else return null;
  }
  componentDidUpdate(prevProps, prevState) {
    console.log("component updated");

    if (prevState.language !== this.state.language) {
      this.setState({
        ...prevState,
        reports: this.translateReports(this.props.t),
      });
    }
  }

  handleView = () => {
    // if (this.handleLicence([Entities.REPORTS_ALUDOC.toString()])) return 1;
    // if (this.handleLicence([Entities.REPORTS_EASYACCESS.toString()])) {

    //  return 2;
    if (this.handleLicence([Entities.REPORTS_ALUTEL_MOBILE.toString()]))
      return 3;
    else if (this.handleLicence([Entities.REPORTS_ALUDOC.toString()])) return 1;
    // if (this.handleLicence([Entities.REPORTS_ALUTEL_MOBILE.toString()]))
    //  return 3;
    // if (this.handleLicence([Entities.REPORTS_TIKAS.toString()])) return 5;
    else return 6;
  };
  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  componentDidMount() {
    const { indexSelected, requestGetLicense } = this.props;
    requestGetLicense();
    if (!isNullOrUndefined(indexSelected)) {
      this.setState({
        reportIndexSelected: indexSelected,
      });
    }
    NavBarReports.hideLoader();
  }

  handleChangeReport = (index) => {
    this.setState({
      reportIndexSelected: index,
    });
  };

  handleLicence = (entities) => {
    const { currentUser } = this.props;
    return (
      Object.keys(currentUser.permits).filter((v) => {
        return entities.includes(v.toString());
      }).length > 0
    );
  };

  handleProductLicence = (product) => {
    const { licensedProducts } = this.props;
    return licensedProducts.some((l) => l === product) || product === "";
  };

  render() {
    const { classes, t } = this.props;
    return (
      (<Grid container className={classes.root}>
        <Drawer
          variant="permanent"
          classes={{
            paper: classNames({
              [classes.drawerOpen]: this.state.open,
              [classes.drawerClose]: !this.state.open,
            }),
          }}
          open={this.state.open}
        >
          <Grid className={classes.toolbarIcon}>
            <IconButton
              className={classnames(classes.expand, {
                [classes.expandOpen]: !this.state.open,
              })}
              onClick={
                this.state.open ? this.handleDrawerClose : this.handleDrawerOpen
              }
              size="large">
              <ChevronLeftIcon />
            </IconButton>
          </Grid>
          <Divider />
          <List key={t("Documentation")}>
            {this.state.reports.map(
              (report, index) =>
                this.handleProductLicence(report.products) &&
                this.handleLicence(report.entities) && (
                  <ListItem
                    onClick={() => this.handleChangeReport(report.index)}
                    button
                    key={report.index}
                    selected={report.index === this.state.reportIndexSelected}
                    title={report.description}
                  >
                    <ListItemIcon>{report.icon}</ListItemIcon>
                    <ListItemText
                      primary={report.name}
                      secondary={report.description}
                      style={{ paddingRight: 0 }}
                      secondaryTypographyProps={{
                        noWrap: true,
                        title: report.description,
                        style: { color: "white", opacity: 0.7 },
                      }}
                    />
                  </ListItem>
                )
            )}
          </List>
        </Drawer>
        <Grid
          style={{ height: "100%" }}
          className={classNames(
            classes.content,
            this.state.open && classes.contentShift
          )}
        >
          <Collapse
            in={this.state.reportIndexSelected === menuIndex}
            unmountOnExit
          >
            <AccessReport />
          </Collapse>
          <Collapse
            in={this.state.reportIndexSelected === docIndex}
            unmountOnExit
          >
            <AludocReport expiredDate={this.state.aludocReportExpiredDate} />
          </Collapse>
          <Collapse in={this.state.reportIndexSelected === 3} unmountOnExit>
            <ActivtyReport />
          </Collapse>
          <Collapse in={this.state.reportIndexSelected === 6} unmountOnExit>
            <TemperatureReport />
          </Collapse>
          <Collapse
            in={this.state.reportIndexSelected === accessIndex}
            unmountOnExit
          >
            <AccessReport />
          </Collapse>
          <Collapse 
            in={this.state.reportIndexSelected === busValIndex} 
            unmountOnExit
          >
            <BusValidationReport />
          </Collapse>
          <Collapse
            in={this.state.reportIndexSelected === tikasIndex}
            unmountOnExit
          >
            <TikasReport />
          </Collapse>
          <Collapse
            in={this.state.reportIndexSelected === enterpriseIndex}
            unmountOnExit
          >
            <EnterpriseReport />
          </Collapse>
          <Collapse
            in={this.state.reportIndexSelected === visitsIndex}
            unmountOnExit
          >
            <VisitsReport />
          </Collapse>
          <Collapse
            in={this.state.reportIndexSelected === busScanIndex}
            unmountOnExit
          >
            <BusScanReport />
          </Collapse>
          <Collapse
            in={this.state.reportIndexSelected === reportViewIndex}
            unmountOnExit
          >
            <WebReport />
          </Collapse>
        </Grid>
      </Grid>)
    );
  }
}

const styles = (theme) => ({
  root: {
    display: "flex",
    height: "100%",
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
    justifyContent: "flex-end",
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    minHight: "100vh",
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: `calc(100% - ${144}px)`,
    [theme.breakpoints.down('lg')]: {
      padding: 5,
    },
    //marginLeft: 72
  },
  contentShift: {
    //marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth + 72}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  title: {
    flexGrow: 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    overflowX: "hidden",
    position: "initial",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    display: "flex",
    flexGrow: 1,
    flex: 1,
    //minHeight: "100%",
    zIndex: 1399,
    backgroundColor: theme.palette.secondary.main,
  },
  drawerOpen: {
    width: drawerWidth,
    position: "initial",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    left: 72,
    top: 62,
    height: "200%",
  },
  drawerClose: {
    position: "initial",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing.unit * 7 + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing.unit * 9 + 1,
    },
    left: 72,
    top: 62,
    height: "110%",
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing.unit * 9,
    },
    display: "flex",
    flexGrow: 1,
    flex: 1,
    minHeight: "100vh",
    minWidth: "70px",
  },

  chartContainer: {
    marginLeft: -22,
  },
  tableContainer: {
    height: 320,
  },
  h5: {
    marginBottom: theme.spacing.unit * 2,
  },
  expand: {
    transform: "rotate(0deg)",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
});

HomeReports.propTypes = {
  classes: PropTypes.object.isRequired,
};

const HomeReportsConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeReports);

export default withTranslation()(withStyles(styles)(HomeReportsConnected));
