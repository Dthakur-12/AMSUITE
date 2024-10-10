import React from "react";
import { Bar } from "react-chartjs-2";
import LinearProgress from "@mui/material/LinearProgress";
import { withTranslation } from "react-i18next";
import { Typography } from "@mui/material";

const initialState = (t, data = []) => {
  return {
    labels: data.idName ? data.idName.map((c) => c.name) : [],
    datasets: [
      {
        label: t("Expired"),
        backgroundColor: "rgba(172, 5, 4, 0.2)",
        borderColor: "rgba(172, 5, 4,0.8)",
        hoverBackgroundColor: "rgba(172, 5, 4, 0.4)",
        hoverBorderColor: "rgba(172, 5, 4,1)",
        borderWidth: 1,
        data: data.danger,
      },
      {
        label: t("correct"),
        backgroundColor: "rgba(5, 172, 4, 0.2)",
        borderColor: "rgba(5, 172, 4,0.8)",
        hoverBackgroundColor: "rgba(5, 172, 4, 0.4)",
        hoverBorderColor: "rgba(5, 172, 4,1)",
        borderWidth: 1,
        data: data.success,
      },
      {
        label: t("toReview"),
        backgroundColor: "rgba(172, 172, 4, 0.2)",
        borderColor: "rgba(172, 172, 4,0.8)",
        hoverBackgroundColor: "rgba(172, 172, 4, 0.4)",
        hoverBorderColor: "rgba(172, 172, 4,1)",
        borderWidth: 1,
        data: data.warning,
      },
    ],
    // datasets: [
    //   {
    //     label: t("ControlsDocumentation"),
    //     backgroundColor: "rgba(255,99,132,0.2)",
    //     borderColor: "rgba(255,99,132,1)",
    //     borderWidth: 1,
    //     hoverBackgroundColor: "rgba(255,99,132,0.4)",
    //     hoverBorderColor: "rgba(255,99,132,1)",
    //     data: []
    //   }
    // ]
  };
};

const options = {
  legend: {
    labels: {
      fontColor: "#9b9b9b",
      fontSize: 13,
    },
  },
  responsive: true,
  scales: {
    xAxes: [
      {
        stacked: true,
      },
    ],
    yAxes: [
      {
        stacked: true,
      },
    ],
  },
};

const ControlsChart = (props) => {
  const isDesktop = window.innerWidth > 900;
  const { dataSet, isLoadingNewData, t } = props;
  return (
    <div style={{ position: "relative", padding: 5 }}>
      <Typography variant={isDesktop ? "h4" : "h6"}>
        {t("DocumentationStatusByControl")}
      </Typography>
      <Bar
        data={initialState(t, dataSet)}
        height={isDesktop ? 120 : 260}
        options={options}
      />
      <LinearProgress
        style={{
          opacity: isLoadingNewData ? "1" : "0",
          width: "100%",
          background: "none",
          padding: 0,
          position: "absolute",
          zIndex: 1,
          bottom: 0,
          marginLeft: "-5px",
        }}
        variant="query"
      />
    </div>
  );
};

export default withTranslation()(ControlsChart);
