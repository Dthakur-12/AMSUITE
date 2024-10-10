import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import { withStyles } from "@mui/styles";
;
import { Typography } from "@mui/material";

import MUIDataTable from "mui-datatables";

let page = 0;
let rowsPerPage = 15;

const changePage = newPage => {
  page = newPage;
};

const changeRowsPerPage = newRowsPerPage => {
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

const EventPersonList = props => {
  const { t, data, dataCount, showErrors } = props;
  const columns = [
    {
      label: t("name"),
      name: "name",
      options: {
        sort: true
      }
    },
    {
      label: t("LastName"),
      name: "lastname",
      options: {
        sort: true
      }
    },
    {
      label: t("enterprise"),
      name: "originCompanyName",
      options: {
        sort: true
      }
    },
    {
      label: t("Email"),
      name: "email",
      options: {
        sort: true
      }
    },
    {
      label: t("Phone"),
      name: "phone",
      options: {
        sort: true
      }
    },
    {
      label: t("Document"),
      name: "document",
      options: {
        sort: true
      }
    }
  ];

  if (showErrors) {
    columns.push({
      label: t("Comments"),
      name: "comments",
      option: {
        sort: false,
        customBodyRender: data => {
          if (data.name)
            return <Typography value={data.name}>{data.name}</Typography>;
        }
      }
    });
    columns.splice(2, 1);
  }

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
        toolTip: t("order")
      },
      pagination: {
        next: t("nextPage"),
        previous: t("beforePage"),
        rowsPerPage: `${t("show")} : `,
        displayRows: t("of")
      },
      viewColumns: {
        title: t("showColumns"),
        titleAria: t("showHideColumns")
      }
    }
  };

  return (
    <div style={{ position: "relative" }}>
      <MUIDataTable data={data} columns={columns} options={options} />
    </div>
  );
};

export default withTranslation()(
  withStyles({}, { withTheme: true })(EventPersonList)
);
