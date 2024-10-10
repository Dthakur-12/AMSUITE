import React from "react";
import { Pie } from "react-chartjs-2";
import LinearProgress from "@mui/material/LinearProgress";
import { withTranslation } from "react-i18next";
import { Typography } from "@mui/material";

const initialState = (t, data = []) => {
  return {
    labels: [t("correct"), t("toReview"), t("Expired")],
    datasets: [
      {
        data: Object.values(data),
        backgroundColor: [
          "rgba(5, 172, 4, 0.2)",
          "rgba(172, 172, 4, 0.2)",
          "rgba(172, 5, 4, 0.2)",
        ],
        hoverBackgroundColor: [
          "rgba(5, 172, 4, 0.4)",
          "rgba(172, 172, 4, 0.4)",
          "rgba(172, 5, 4, 0.4)",
        ],
        label: "My dataset", // for legend
      },
    ],
  };
};

const options = {
  responsive: true,
  width: "100%",
};

const DocumentChart = (props) => {
  const { dataSet, isLoadingNewData, t } = props;
  const isDesktop = window.innerWidth > 900;
  return (
    <div style={{ position: "relative", padding: 5, marginBottom: 8 }}>
      <Typography
        variant={isDesktop ? "h4" : "h6"}
        style={{ textAlign: "center" }}
      >
        {t("SystemDocumentStatus")}
      </Typography>
      <Pie
        data={initialState(t, dataSet)}
        height={isDesktop ? 140 : 250}
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

export default withTranslation()(DocumentChart);
