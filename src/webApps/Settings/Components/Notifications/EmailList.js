import React from "react";
import { withTranslation } from "react-i18next";
import { withStyles } from "@mui/styles";
import { Icon, Table, Input, Button } from "semantic-ui-react";
import { isNullOrUndefined } from "util";
import { isEmailValid } from "../../../../utils/HelperFunctions";
import ArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import ArrowRight from "@mui/icons-material/KeyboardArrowRight";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import CustomStyles, {
  StyledPagination,
} from "../../../../assets/styles/Settings_styles/Notifications/AludocEmailListStyles";

class EmailList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      emails: [],
      emailsToSend: [],
      controlId: 1,
      emailHasError: false,
      offset: 0,
      limit: 5,
      email: "",
    };
  }

  static getDerivedStateFromProps(props, current_state) {
    // const { controlId } = props;
    // if (current_state.controlId !== controlId) {
    //   return {
    //     controlId
    //   };
    // }
    // return null;
  }

  componentDidUpdate(prevProps, prevState) {
    // if (prevState.controlId !== this.state.controlId) {
    //   //  this.getControlEmails(this.state.controlId);
    // }
  }

  componentDidMount() {}

  // emailPageChange = (offset, e) => {
  //   this.setState({
  //     offset
  //   });
  // };

  // addEmail = input => {
  //   const { email, emailsToSend } = this.state;

  //   if (isEmailValid(email)) {
  //     let data = [];
  //     if (emailsToSend.length > 0) {
  //       let dataAux = this.state.emailsToSend.slice();
  //       data = dataAux.filter(e => e.toLowerCase() !== email.toLowerCase());
  //     }
  //     data.push(email);

  //     this.setState(state => ({
  //       ...state,
  //       emails: data,
  //       emailsToSend: data,
  //       offset: 0
  //     }));
  //   }
  // };

  // handleRemoveEmail = index => {
  //   let emailsCopy = [...this.state.emailsToSend];
  //   emailsCopy.splice(index, 1);
  //   this.setState(prevState => ({
  //     emails: emailsCopy,
  //     emailsToSend: emailsCopy
  //   }));
  // };

  // handleEmailQueryChange = query => {
  //   const value = query.currentTarget.value;
  //   let data = this.state.emailsToSend.slice();
  //   this.setState({
  //     email: value,
  //     emails: data.filter(email =>
  //       email.toLowerCase().includes(value.toLowerCase())
  //     )
  //   });
  // };

  render() {
    const { classes, t, offset, emails } = this.props;
    const { emailHasError, limit } = this.state;
    return (
      <div>
        <Input
          action
          className={classes.emailInput}
          style={{ width: "100%", display: "flex", justifyContent: "centre" }}
          onChange={this.props.handleEmailQueryChange}
          error={emailHasError}
          fullWidth
        >
          <input />
          <Button className={classes.inputButton} onClick={this.props.addEmail}>
            <Icon name="mail" className={classes.leftIcon} />
            {t("Add")}
          </Button>
        </Input>
        <Table celled style={{ marginTop: 15 }} className={classes.emailTable}>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell className={classes.tableHead}>
                {t("email")}
              </Table.HeaderCell>
              <Table.HeaderCell className={classes.tableHead} />
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {this.props.emails
              .slice(offset, offset + limit)
              .map((item, index) => (
                <Table.Row key={index}>
                  <Table.Cell>{item}</Table.Cell>
                  <Table.Cell>
                    <DeleteRoundedIcon
                      onClick={() => this.props.handleRemoveEmail(item, index)}
                      className={classes.deleteIcon}
                    />
                  </Table.Cell>
                </Table.Row>
              ))}
          </Table.Body>
        </Table>
        <div style={{ marginTop: 15 }}>
          {this.props.emails.length > 0 && (
            <StyledPagination
              limit={limit}
              offset={offset}
              total={emails.length}
              innerButtonCount={1}
              outerButtonCount={1}
              onClick={(e, offset) => this.props.emailPageChange(offset, e)}
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

export default withTranslation()(withStyles(CustomStyles)(EmailList));
