import React from "react";
import PropTypes from "prop-types";
import { Table } from "semantic-ui-react";
import { withStyles } from "@mui/styles";
import { withTranslation } from "react-i18next";

const DifferenceTable = props => {
  const { data, t, theme, classes } = props;
  const before = JSON.parse(data.before);
  const after = JSON.parse(data.after);
  return (
    <div>
      <Table celled style={{ border: 0 }}>
        <Table.Header className={classes.header}>
          <Table.Row>
            <Table.HeaderCell className={classes.headerCell}>
              {t("Attribute")}
            </Table.HeaderCell>
            <Table.HeaderCell className={classes.headerCell}>
              {t("Before")}
            </Table.HeaderCell>
            <Table.HeaderCell className={classes.headerCell}>
              {t("After")}
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {Object.keys(before).map(key => (
            <Table.Row className={classes.body}>
              <Table.Cell>{key}</Table.Cell>
              <Table.Cell negative>{before[key]}</Table.Cell>
              <Table.Cell positive>{after[key]}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};

const style = theme => ({
  headerCell: {
    background: theme.palette.background.main + " !important",
    color: theme.palette.text.main + " !important"
  },
  header: {
    background: theme.palette.background.main + " !important"
  },
  body: {
    background: theme.palette.backgroundSecondary.main,
    color: theme.palette.text.main
  }
});

export default withTranslation()(
  withStyles(style, { withTheme: true })(DifferenceTable)
);
