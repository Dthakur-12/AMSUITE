import React from "react";
import { emphasize } from "@mui/system";
import { withStyles } from "@mui/styles";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import Paper from "@mui/material/Paper";
import Select from "react-select";

import Typography from "@mui/material/Typography";
import components from "../../../Shared/ReactSelect";
import Grid from "@mui/material/Grid";
import ContactsWithInfectedPerson from "./ContactsWithInfectedPerson";
import InfectedHistory from "./InfectedHistory";
import EnterpriseHistory from "./EnterpriseHistory";

class TemperatureReport extends React.Component {
  constructor(props) {
    super(props);
    const { t } = this.props;
    this.state = {
      SelectedReportOption: this.reportOptions(t),
      selectedReport: "",
    };
  }

  reportOptions = (t) => ({
    0: { value: 0, label: t("RegistryPerPerson") },
    1: { value: 1, label: t("RegistryPerEnterprise") },
    2: { value: 2, label: t("ListOfPotentialInfected") },
  });

  handleSelectReportChange = (name) => (event) => {
    let value = event.currentTarget ? event.currentTarget.value : event.value;
    this.setState((prevState) => ({
      selectedReport: this.state.SelectedReportOption[event.value],
      report: value,
    }));
  };

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateScreenMode);
  }

  updateScreenMode = () => {
    this.setState({
      isDesktop: window.innerWidth > 900,
    });
  };

  componentDidMount() {
    // connectSocket();
    this.updateScreenMode();
    window.addEventListener("resize", this.updateScreenMode);
  }

  render() {
    const { t, classes, theme } = this.props;
    const { selectedReport, SelectedReportOption } = this.state;
    const selectStyles = {
      input: (base) => ({
        ...base,
        color: theme.palette.text.primary,
        "& input": {
          font: "inherit",
        },
        width: "100%",
        menuList: {
          maxHeight: 100,
        },
      }),
    };
    console.log("ENTRA ACA????");
    return (
      <div>
        <Paper>
          <Grid
            container
            spacing={24}
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Grid
              item
              xs={12}
              md={4}
              style={
                this.state.isDesktop
                  ? { marginLeft: 25 }
                  : {
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }
              }
            >
              <div
                className={classes.formControl}
                style={
                  this.state.isDesktop
                    ? { margin: 20, paddingBottom: "40px" }
                    : { marginTop: 30, maxWidth: "90%" }
                }
              >
                <label className={classes.formControlLabel}>
                  {t("SelectReport")}
                </label>
                <Select
                  classes={classes}
                  className={classes.select}
                  components={components}
                  styles={selectStyles}
                  options={Object.values(SelectedReportOption)}
                  onChange={this.handleSelectReportChange("report")}
                  placeholder={t("Reports")}
                  maxMenuHeight={200}
                  isLoading={false}
                  value={selectedReport}
                />
              </div>
            </Grid>
          </Grid>
          {this.state.report === 0 && <InfectedHistory />}
          {this.state.report === 1 && <EnterpriseHistory />}
          {this.state.report === 2 && <ContactsWithInfectedPerson />}
        </Paper>
      </div>
    );
  }
}

const styles = (theme) => ({
  //Select css
  valueContainer: {
    display: "flex",
    flex: 1,
    alignItems: "center",
    overflow: "hidden",
  },
  chip: {
    margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`,
  },
  chipFocused: {
    backgroundColor: emphasize(
      theme.palette.mode === "light"
        ? theme.palette.grey[300]
        : theme.palette.grey[700],
      0.08
    ),
  },
  noOptionsMessage: {
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
  },
  singleValue: {
    fontSize: 16,
    width: "100%",
  },
  placeholder: {
    position: "absolute",
    left: 2,
    fontSize: 16,
  },
  paperSelect: {
    position: "absolute",
    zIndex: 99,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.grey[300],
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  listRoot: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    padding: 0,
  },
  nested: {
    paddingLeft: 0,
  },
  grid: {
    paddingBottom: "0px !important",
    paddingTop: "0px !important",
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
  withError: {
    color: "#f44336 !important",
  },
  center: {
    display: "flex",
    justifyContent: "center",
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  contentLoader: {
    display: "flex",
    position: "absolute",
    top: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "#d0d0d080",
  },
  circularProgress: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -25,
    marginLeft: -50,
  },
  formControlLabel: {
    top: 0,
    left: 0,
    position: "absolute",
    color: theme.palette.textSecondary.main,
    padding: 0,
    fontSize: "0.8rem",
    fontFamily: "'Lato', sans-serif",
    lineHeight: 1,
  },
  formControl: {
    // margin: 20,
    border: 0,
    display: "inline-flex",
    padding: 0,
    position: "relative",
    minWidth: 0,
    flexDirection: "column",
    verticalAlign: "top",
    width: "100%",
  },
  select: {
    paddingTop: 10,
  },
  input: {
    display: "flex",
    padding: 0,
  },
  //fin select css
});

const mapStateToProps = ({}) => {
  return {};
};

const mapDispatchToProps = {};

const TemperatureReportConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(TemperatureReport);

export default withTranslation()(
  withStyles(styles, { withTheme: true })(TemperatureReportConnected)
);
