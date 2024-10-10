import InputBase from "@mui/material/InputBase";
import LinearProgress from "@mui/material/LinearProgress";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { withStyles } from '@mui/styles';
import React from "react";
import { Line } from "react-chartjs-2";
import ApiHandler from "../../../../services/ApiHandler";
import { withTranslation } from "react-i18next";

const BootstrapInput = withStyles(theme => ({
  root: {
    "label + &": {
      marginTop: theme.spacing.unit * 3
    },
    position: "absolute",
    right: 10
  },
  input: {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #9b9b9b",
    color: "#9b9b9b",
    fontSize: 13,
    width: "auto",
    padding: "5px 24px 5px 5px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(","),
    "&:focus": {
      borderRadius: 4,
      borderColor: "rgba(255,99,132,0.8)",
      boxShadow: "0 0 0 0.2rem rgba(255,99,132,0.25)"
    }
  }
}))(InputBase);

const initialState = t => {
  return {
    labels: [
      t("ShortJanuary"),
      t("ShortFebruary"),
      t("ShortMarch"),
      t("ShortApril"),
      t("ShortMay"),
      t("ShortJune"),
      t("ShortJuly"),
      t("ShortAugust"),
      t("ShortSeptember"),
      t("ShortOctover"),
      t("ShortNovember"),
      t("ShortDecember")
    ],
    datasets: [
      {
        label: t("ConsumptionsOfTheYear"),
        fill: false,
        lineTension: 0.1,
        backgroundColor: "rgba(255,99,132,0.2)",
        borderColor: "rgba(255,99,132,0.8)",
        borderWidth: 2,
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "rgba(255,99,132,1)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(255,99,132,1)",
        pointHoverBorderColor: "rgba(255,99,132,0.4)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: []
      }
    ]
  };
};

const dateNow = new Date();
class AnnualOrdersChart extends React.Component {
  constructor(props) {
    super(props);
    const { t } = this.props;
    this.state = {
      isLoading: true,
      isLoadingNewData: true,
      isLoadingYears: true,
      dataSet: initialState(t),
      year: dateNow.getFullYear(),
      years: [
        { value: 1, label: "Empresa" },
        { value: 2, label: "Vehiculo" },
        { value: 3, label: "Persona" }
      ]
    };
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.i18n.language !== prevState.language) {
      return {
        language: nextProps.i18n.language
      };
    } else return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.language !== this.state.language) {
      this.setState({
        ...prevState,
        dataSet: initialState(this.props.t)
      });
    }
  }

  componentDidMount() {
    let dateNow = new Date();
    this.loadAnnualOrders(dateNow.getFullYear());
    let years = this.getOptions();
    this.setState({
      years: years,
      isLoadingYears: false
    });
  }

  handleChange = name => event => {
    let value = event.target ? event.target.value : event.value;
    this.setState(prevState => ({
      ...prevState,
      [name]: value
    }));
    this.loadAnnualOrders(value);
  };

  getOptions = () => {
    let years = [];
    let dateNow = new Date();
    let startYear = dateNow.getFullYear() - 10;
    let endYear = dateNow.getFullYear();
    while (startYear <= endYear) {
      years.push({
        value: startYear,
        label: startYear
      });
      startYear++;
    }
    return years;
  };

  loadAnnualOrders = year => {
    this.setState({ isLoadingNewData: true });
    ApiHandler.Reports.Tikas.getAnnualOrders(year)
      .then(response => {
        let annualOrders = [];
        response.data.map(data => {
          return new Date(data.year, data.month, 1) <= new Date()
            ? annualOrders.push(data.ordersQuantityByDayNumber[0])
            : null;
        });
        let newDataSet = { ...this.state.dataSet.datasets[0] };
        newDataSet.data = annualOrders;
        this.setState(prevState => ({
          dataSet: {
            ...prevState.dataSet,
            datasets: [newDataSet]
          },
          isLoadingNewData: false
        }));
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    const { years, year } = this.state;
    const options = {
      legend: {
        labels: {
          fontColor: "#9b9b9b",
          fontSize: 13
        }
      },
      scales: {
        xAxes: [
          {
            display: true,
            ticks: {
              fontColor: "#9b9b9b"
            }
          }
        ],
        yAxes: [
          {
            type: "linear",
            display: true,
            position: "left",
            ticks: {
              fontColor: "#9b9b9b",
              beginAtZero: true
            }
          }
        ]
      }
    };
    return (
      <div style={{ position: "relative", padding: 5 }}>
        <Line data={this.state.dataSet} height={230} options={options} />
        <div
          style={{
            width: "80px",
            height: 20,
            position: "absolute",
            right: 0,
            top: 5
          }}
        >
          <Select
            value={year}
            onChange={this.handleChange("year")}
            input={<BootstrapInput name="age" id="age-customized-select" />}
            // options = {this.state.years}
          >
            {years.map(year => (
              <MenuItem key={year.value} value={year.value}>
                {year.label}
              </MenuItem>
            ))}
          </Select>
        </div>
        <LinearProgress
          style={{
            opacity: this.state.isLoadingNewData ? "1" : "0",
            width: "100%",
            background: "none",
            padding: 0,
            position: "absolute",
            zIndex: 1,
            bottom: 0,
            marginLeft: "-5px"
          }}
          variant="query"
        />
      </div>
    );
  }
}
const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  margin: {
    margin: theme.spacing.unit
  },
  bootstrapFormLabel: {
    fontSize: 18
  }
});
export default withTranslation()(
  withStyles(styles, { withTheme: true })(AnnualOrdersChart)
);
