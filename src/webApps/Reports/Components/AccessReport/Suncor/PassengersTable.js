import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import { withStyles } from "@mui/styles";
import { Typography, IconButton } from "@mui/material";
import MUIDataTable from "mui-datatables";
import moment from "moment";

let page = 0;
let rowsPerPage = 15;
let activeColumnSort = 5;

const changePage = (newPage) => {
  page = newPage;
};

const changeRowsPerPage = (newRowsPerPage) => {
  rowsPerPage = newRowsPerPage;
};

const onTableChange = (action, tableState) => {
  switch (action) {
    case "changePage":
      changePage(tableState.page);
      break;
    case "changeRowsPerPage":
      changeRowsPerPage(tableState.rowsPerPage);
      break;
    default:
  }
};

const PassengersTable = (props) => {
  const { t, data = [], dataCount, i18n } = props;
  const { language } = i18n;
  const columns = [
    {
      label: t("name"),
      name: "name",
      options: {
        sort: true,
      },
    },
    {
      label: t("LastName"),
      name: "lastName",
      options: {
        sort: true,
      },
    },
    {
      label: t("Seat"),
      name: "seat",
      options: {
        sort: true,
      },
    },
    {
      label: t("SeatAssignedTime"),
      name: "seatAssigned",
      options: {
        sort: true,
        customBodyRender: (data, meta) => {
          const formattedDate =
            language === "es"
              ? moment(data).lang(language).format("DD/MM/YYYY HH:mm")
              : moment(data).lang(language).format("MM/DD/YYYY HH:mm");
          return data ? formattedDate : "";
        },
      },
    },
    {
      label: t("SeatUnassignedTime"),
      name: "seatUnassigned",
      options: {
        sort: true,
        customBodyRender: (data, meta) => {
          const formattedDate =
            language === "es"
              ? moment(data).lang(language).format("DD/MM/YYYY HH:mm")
              : moment(data).lang(language).format("MM/DD/YYYY HH:mm");
          return data ? formattedDate : "";
        },
      },
    },
  ];

  const options = {
    responsive: "scrollFullHeight",
    serverSide: false,
    rowsPerPage: rowsPerPage,
    count: dataCount,
    page: page,
    selectableRows: "none",
    download: false,
    filter: false,
    search: false,
    print: false,
    selectableRowsHeader: false,
    rowHover: false,
    viewColumns: false,
    rowsPerPageOptions: [5, 20, 100],
    rowsPerPage: 5,
    onTableChange: onTableChange,
    textLabels: {
      body: {
        noMatch: t("dontSearchRegister"),
        toolTip: t("order"),
      },
      pagination: {
        next: t("nextPage"),
        previous: t("beforePage"),
        rowsPerPage: `${t("show")} : `,
        displayRows: t("of"),
      },
      viewColumns: {
        title: t("showColumns"),
        titleAria: t("showHideColumns"),
      },
    },
  };

  return (
    <div>
      <MUIDataTable data={data} columns={columns} options={options} />
    </div>
  );
};

export default withTranslation()(
  withStyles({}, { withTheme: true })(PassengersTable)
);
