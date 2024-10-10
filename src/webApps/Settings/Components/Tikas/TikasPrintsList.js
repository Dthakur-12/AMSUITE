import React from "react";
import { findDOMNode } from "react-dom";
import { withTranslation } from "react-i18next";
import { Typography } from "@mui/material";
import { withStyles } from "@mui/styles";
import { Icon, Table, Input, Button } from "semantic-ui-react";
import ApiHandler from "../../../../services/ApiHandler";
import { isNullOrUndefined } from "util";
import { isEmailValid } from "../../../../utils/HelperFunctions";
import ArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import ArrowRight from "@mui/icons-material/KeyboardArrowRight";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import CustomStyles, {
  StyledPagination,
} from "../../../../assets/styles/Settings_styles/Notifications/AludocEmailListStyles";
import { connect } from "react-redux";
import { Field, reduxForm, change, untouch } from "redux-form";
import {
  requestPrinters,
  requestCreatePrinter,
  requestDeletePrinter,
} from "../../../../actions/Tikas/Tikas_actions";
import Divider from "@mui/material/Divider";

const mapStateToProps = ({ Tikas }) => {
  return {
    printers: Tikas.printers,
    successCreatedOrDeleted: Tikas.successCreatedOrDeleted,
  };
};
const mapDispatchToPrps = {
  getPrinters: requestPrinters,
  createPrinter: requestCreatePrinter,
  deletePrinter: requestDeletePrinter,
};

class TikasPrintsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      prints: [],
      printersConst: [],
      controlId: 1,
      emailHasError: false,
      offset: 0,
      limit: 5,
    };
  }

  renderTextField = (field) => (
    <Input
      action={{
        color: "teal",
        labelPosition: "right",
        icon: "print",
        content: this.props.t("Add"),
        type: "submit",
        className: "InputTest",
        style: {
          background: this.props.theme.palette.primary.main,
        },
      }}
      style={{
        width: window.innerWidth > 900 ? "100%" : "62%",
      }}
      {...field.input}
    />
  );

  emailPageChange = (offset, e) => {
    this.setState({
      offset,
    });
  };

  handlePrinterChange = (query) => {
    const { printersConst } = this.state;
    const value = query.currentTarget.value;
    if (!isNullOrUndefined(printersConst) && printersConst.length > 0) {
      let data = Object.values(this.state.printersConst).slice();
      this.setState((state) => ({
        ...state,
        printers: data.filter((printer) =>
          printer.name.toLowerCase().includes(value.toLowerCase())
        ),
        offsetPrinters: 0,
      }));
    }
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      nextProps.printers !== prevState.printersConst ||
      nextProps.successCreatedOrDeleted !== prevState.successCreatedOrDeleted
    ) {
      return {
        printers: nextProps.printers,
        printersConst: nextProps.printers,
        successCreatedOrDeleted: nextProps.successCreatedOrDeleted,
      };
    } else return null;
  }

  componentDidMount() {
    this.loadPrinters();
    this.setState({ componentMounted: true });
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.successCreatedOrDeleted !== this.state.successCreatedOrDeleted
    ) {
      this.loadPrinters();
      const input = findDOMNode(this.title).getElementsByTagName("input")[0];
      input.focus();
      this.setState({ offset: 0 });
    }
  }

  handleCreatePrinter = ({ printerName }) => {
    this.props.createPrinter(printerName);
    this.props.dispatch(change("printListForm", "printerName", null));
    this.props.dispatch(untouch("printListForm", "printerName"));
  };

  handleDeletePrinter = (printerId) => {
    this.props.deletePrinter([printerId]);
  };

  loadPrinters = () => {
    this.props.getPrinters();
  };

  render() {
    const { classes, t, theme } = this.props;
    const { emailHasError, offset, limit, printers = [] } = this.state;
    return (
      <div>
        <Typography
          component="span"
          variant="subtitle1"
          color="inherit"
          style={{ fontSize: 20, marginBottom: 10 }}
          className={classes.printerTitle}
        >
          {t("Printers")}
        </Typography>
        <Divider className={classes.customDivider} />
        <form onSubmit={this.props.handleSubmit(this.handleCreatePrinter)}>
          <Field
            name="printerName"
            type="text"
            component={this.renderTextField}
            onChange={this.handlePrinterChange}
            ref={(input) => {
              this.title = input;
            }}
            withRef
          />
        </form>
        <Table celled style={{ marginTop: 15 }} className={classes.emailTable}>
          <Table.Header style={{ paddingTop: 0 }}>
            <Table.Row style={{ paddingTop: 0, paddingBottom: 0 }}>
              <Table.HeaderCell className={classes.tableHead}>
                {t("Printers")}
              </Table.HeaderCell>
              <Table.HeaderCell className={classes.tableHead} />
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {Object.values(printers)
              .slice(offset, offset + limit)
              .map((item, index) => {
                return (
                  <Table.Row key={index}>
                    <Table.Cell>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Typography>{item.name} </Typography>

                        <DeleteRoundedIcon
                          onClick={() => this.handleDeletePrinter(item.id)}
                          className={classes.deleteIcon}
                        />
                      </div>
                    </Table.Cell>
                  </Table.Row>
                );
              })}
          </Table.Body>
        </Table>
        <div style={{ marginTop: 15 }}>
          {Object.values(printers).length > 0 && (
            <StyledPagination
              limit={limit}
              offset={offset}
              total={printers.length}
              innerButtonCount={1}
              outerButtonCount={1}
              onClick={(e, offset) => this.emailPageChange(offset, e)}
              currentPageColor="inherit"
              otherPageColor="inherit"
              previousPageLabel={
                <ArrowLeft className={classes.iconRotateStyle} />
              }
              nextPageLabel={<ArrowRight />}
              className={classes.pagination}
            />
          )}
        </div>
      </div>
    );
  }
}

const TikasPrintsListConnected = connect(
  mapStateToProps,
  mapDispatchToPrps
)(TikasPrintsList);

export default withTranslation()(
  withStyles(CustomStyles, { withTheme: true })(
    reduxForm({ form: "printListForm" })(TikasPrintsListConnected)
  )
);
