import Monthpicker from "@compeon/monthpicker";
import { withStyles } from '@mui/styles';
import React from "react";
import { Line } from "react-chartjs-2";
import { Header, Icon, Label } from "semantic-ui-react";
import ApiHandler from "../../../../services/ApiHandler";
import { withTranslation } from "react-i18next";
import { subMonths, addMonths } from "date-fns";
const labelsConst = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
  "20",
  "21",
  "22",
  "23",
  "24",
  "25",
  "26",
  "27",
  "28",
  "29",
  "30",
  "31",
];

const Options = {
  legend: {
    labels: {
      fontColor: "#9b9b9b",
      fontSize: 13,
      marginBottom: 3,
    },
  },
  width: "100%",
  labels: labelsConst,
  responsive: true,
  tooltips: {
    mode: "label",
  },
  elements: {
    line: {
      fill: false,
    },
  },
  scales: {
    xAxes: [
      {
        display: true,
        gridLines: {
          display: true,
        },
        labels: labelsConst,
        ticks: {
          fontColor: "#9b9b9b",
        },
      },
    ],
    yAxes: [
      {
        type: "linear",
        display: true,
        position: "left",
        id: "y-axis-1",
        gridLines: {
          display: false,
        },
        labels: {
          show: true,
        },
        ticks: {
          fontColor: "#9b9b9b",
          beginAtZero: true,
        },
      },
    ],
  },
};

//const dateNow = new Date();

// const plugins = [
//   {
//     afterDraw: (chartInstance, easing) => {
//       const ctx = chartInstance.chart.ctx;
//       ctx.fillText("", 100, 100);
//     }
//   }
// ];

class MonthlyOrdersChart extends React.Component {
  constructor(props) {
    super(props);
    const { t } = this.props;
    this.state = {
      isLoading: true,
      isLoadingNewData: false,
      dataSet: {
        datasets: [
          {
            label: t("CurrentMonthConsumptions"),
            type: "line",
            data: [],
            fill: false,
            backgroundColor: "rgba(255,99,132,0.2)",
            borderColor: "rgba(255,99,132,0.8)",
            pointBorderColor: "rgba(255,99,132,0.4)",
            pointBackgroundColor: "rgba(255,99,132,0.4)",
            pointHoverBackgroundColor: "rgba(255,99,132,1)",
            pointHoverBorderColor: "rgba(255,99,132,0.4)",
            yAxisID: "y-axis-1",
          },
          {
            type: "line",
            label: t("LastMonthConsumptions"),
            data: [],
            fill: false,
            backgroundColor: "rgba(99, 222, 255, 0.2)",
            borderColor: "rgba(99, 222, 255, 0.8)",
            hoverBackgroundColor: "rgba(99, 189, 255, 0.4)",
            hoverBorderColor: "rgba(99, 189, 255, 1",
            yAxisID: "y-axis-1",
          },
        ],
      },
      firstDate: addMonths(new Date(), 0),
      secondDate: addMonths(new Date(), 1),
    };
  }

  componentWillUnmount = () => {
    window.removeEventListener("resize", this.updateScreenMode);
  };

  updateScreenMode = () => {
    this.setState({ isDesktop: window.innerWidth > 900 });
  };

  componentDidMount() {
    this.updateScreenMode();
    this.loadMonthlyOrders([
      subMonths(this.state.firstDate, 1),
      subMonths(this.state.secondDate, 1),
    ]);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.i18n.language !== prevState.language) {
      return {
        language: nextProps.i18n.language,
      };
    } else return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.language !== this.state.language) {
      this.loadMonthlyOrders([
        new Date(
          this.state.firstDate.getFullYear(),
          this.state.firstDate.getMonth() - 1,
          1
        ),
        new Date(
          this.state.secondDate.getFullYear(),
          this.state.secondDate.getMonth() - 1,
          1
        ),
      ]);
    }
  }

  handleChange = (name) => (date) => {
    let dateSplit = date.split(".");
    let month = parseInt(dateSplit[0], 10);
    let year = parseInt(dateSplit[1], 10);

    this.setState(
      {
        [name]: new Date(year, month, 1),
      },
      () => {
        this.loadMonthlyOrders([
          new Date(
            this.state.firstDate.getFullYear(),
            this.state.firstDate.getMonth() - 1,
            1
          ),
          new Date(
            this.state.secondDate.getFullYear(),
            this.state.secondDate.getMonth() - 1,
            1
          ),
        ]);
      }
    );
  };

  loadMonthlyOrders = (months) => {
    const { t } = this.props;
    ApiHandler.Reports.Tikas.getMonthlyOrders(months)
      .then((response) => {
        let newDataSet = { ...this.state.dataSet.datasets };

        response.data.map((data, index) => {
          data.ordersQuantityByDayNumber.shift();
          newDataSet[index].label =
            t("ConsumptionsOf") + " " + data.month + "/" + data.year;
          newDataSet[index].data = data.ordersQuantityByDayNumber;
          return 0;
        });

        this.setState((prevState) => ({
          dataSet: {
            ...prevState.dataSet,
            datasets: Object.values(newDataSet),
          },
        }));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    const { firstDate, secondDate, isDesktop } = this.state;
    const { classes, t } = this.props;
    return (
      <div style={{ position: "relative", padding: 5 }}>
        {isDesktop !== undefined && (
          <Line
            data={this.state.dataSet}
            options={Options}
            // plugins={plugins}
            height={isDesktop ? 100 : 170}
          />
        )}
        <div style={{ display: "flex", marginTop: 15 }}>
          <Header as="h4" className={classes.filterTitle}>
            <Icon name="calendar" />
            <Header.Content>{t("SelectMonthsToCompare")}</Header.Content>
          </Header>
          <Monthpicker
            format="MM.YYYY"
            className={classes.monthPicker}
            onChange={this.handleChange("firstDate")}
            month={firstDate.getMonth()}
            year={firstDate.getFullYear()}
            locale="es"
            hoverColor={"#4d4f51"}
            secondaryColor={"#424242"}
            primaryColor={"#296084"}
            placement="left-start"
          >
            <Label as="a" className={classes.month1}>
              {t("Month") + " 1"}
              <Label.Detail>{`${
                firstDate.getMonth() === 0 ? 12 : firstDate.getMonth()
              }/${
                firstDate.getMonth() === 0
                  ? firstDate.getFullYear() - 1
                  : firstDate.getFullYear()
              }`}</Label.Detail>
            </Label>
          </Monthpicker>
          <Monthpicker
            format="MM.YYYY"
            onChange={this.handleChange("secondDate")}
            month={secondDate.getMonth()}
            year={secondDate.getFullYear()}
            locale="es"
            hoverColor={"#4d4f51"}
            secondaryColor={"#424242"}
            primaryColor={"#296084"}
            className={classes.monthPicker}
          >
            <Label
              as="a"
              className={classes.month2}
              ref={(input) => (this.inputElement = input)}
            >
              {t("Month") + " 2"}
              <Label.Detail>{`${
                secondDate.getMonth() === 0 ? 12 : secondDate.getMonth()
              }/${
                secondDate.getMonth() === 0
                  ? secondDate.getFullYear() - 1
                  : secondDate.getFullYear()
              }`}</Label.Detail>
            </Label>
          </Monthpicker>
        </div>
      </div>
    );
  }
}

const styles = (theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 90,
    "& div": {
      height: 30,
    },
  },
  dense: {
    marginTop: 16,
  },
  menu: {
    width: 200,
  },
  monthPicker: {
    "& .cAzTQZ": {
      zIndex: "500 !important",
      [theme.breakpoints.down(800)]: {
        right: 20,
        left: 20,
        width: "90%",
      },
    },
    "& *": {
      color: "white !important",
      [theme.breakpoints.down(800)]: {
        left: 20,
        textAlign: "center",
        width: "100%",
      },
    },
    "& .bNDNdh": {
      fill: "white !important",
      [theme.breakpoints.down(800)]: {
        right: 20,
        left: 20,
        width: "100%",
      },
    },
    "& .ihXaLu": {
      fill: "white !important",
      [theme.breakpoints.down(800)]: {
        right: 20,
        left: 20,
        width: "100%",
      },
    },
    [theme.breakpoints.down(800)]: {
      right: 20,
      left: 20,
      width: "100%",
    },
    marginLeft: 10,
  },
  month1: {
    backgroundColor: "rgba(255,99,132,0.6) !important",
  },
  month2: {
    backgroundColor: "rgba(99, 222, 255, 0.6) !important",
  },
  filterTitle: {
    marginTop: "2px !important",
    marginLeft: "10px !important",
    "& *": {
      color: "#9b9b9b",
    },
  },
});

export default withTranslation()(withStyles(styles)(MonthlyOrdersChart));
