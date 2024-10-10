import React from "react";
import { Bar } from "react-chartjs-2";
import ApiHandler from "../../../../services/ApiHandler";
import LinearProgress from "@mui/material/LinearProgress";
import { withTranslation } from "react-i18next";

const initialState = t => {
  return {
    labels: [],
    datasets: [
      {
        label: t("PeopleWithMoreConsumption"),
        backgroundColor: "rgba(255,99,132,0.2)",
        borderColor: "rgba(255,99,132,1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(255,99,132,0.4)",
        hoverBorderColor: "rgba(255,99,132,1)",
        data: []
      }
    ]
  };
};

class PeopleWithMoreOrders extends React.Component {
  constructor(props) {
    super(props);
    const { startDate, endDate, count, t } = this.props;
    this.state = {
      isLoading: true,
      isLoadingNewData: false,
      dataSet: initialState(t),
      startDate: startDate,
      endDate: endDate,
      count: count
    };
  }

  getOptions = () => {
    let counts = [];
    let start = 4;
    while (start <= 10) {
      counts.push({
        value: start,
        label: start
      });
      start++;
    }
    return counts;
  };

  componentDidMount() {
    const { count, startDate, endDate } = this.props;
    this.loadPeopleWithMoreOrders(count, startDate, endDate);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { count, startDate, endDate } = nextProps;
    if (
      count !== prevState.count ||
      startDate !== prevState.startDate ||
      endDate !== prevState.endDate ||
      nextProps.i18n.language !== prevState.language
    ) {
      return { count, startDate, endDate, language: nextProps.i18n.language };
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (!this.state.orderLoading) {
      if (
        prevState.count !== this.state.count ||
        prevState.startDate !== this.state.startDate ||
        prevState.endDate !== this.state.endDate
      ) {
        this.loadPeopleWithMoreOrders(
          this.state.count,
          this.state.startDate,
          this.state.endDate
        );
      }
    }
    if (prevState.language !== this.state.language) {
      this.setState({
        ...prevState,
        dataSet: initialState(this.props.t)
      });
    }
  }

  loadPeopleWithMoreOrders = (count, startDate, endDate) => {
    this.setState({ isLoadingNewData: true });
    ApiHandler.Reports.Tikas.getPeopleWithMoreOrders(count, startDate, endDate)
      .then(response => {
        let peopleOrders = response.data.map(data => data.consumptionsQuantity);
        let peopleNames = response.data.map(
          data => data.firstName + " " + data.lastName
        );
        let newDataSet = { ...this.state.dataSet.datasets[0] };
        newDataSet.data = peopleOrders;
        this.setState(prevState => ({
          dataSet: {
            ...prevState.dataSet,
            labels: peopleNames,
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
            display: false
          }
        ],
        yAxes: [
          {
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
        <Bar data={this.state.dataSet} height={230} options={options} />
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

export default withTranslation()(PeopleWithMoreOrders);
