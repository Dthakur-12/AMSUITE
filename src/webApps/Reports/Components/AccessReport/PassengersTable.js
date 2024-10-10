import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import { withStyles } from "@mui/styles";
import { Typography, IconButton } from "@mui/material";
import MUIDataTable from "mui-datatables";

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
  const { t, data = [], dataCount } = props;
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
      label: t("Route"),
      name: "routeName",
      options: {
        sort: true,
      },
    },
    {
      label: t("enterprise"),
      name: "companyName",
      options: {
        sort: true,
      },
    },
    {
      label: t("Badge"),
      name: "badgeNumber",
      options: {
        sort: true,
      },
    },
    {
      label: t("AccessTime"),
      name: "accessEventTime",
      options: {
        sort: true,
        customBodyRender: (data, meta) => {
          return (
            <Typography>
              {new Intl.DateTimeFormat("es-ES", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              }).format(Date.parse(data))}
            </Typography>
          );
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
