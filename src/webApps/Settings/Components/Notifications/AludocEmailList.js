import React from "react";
import { withTranslation } from "react-i18next";
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

class AludocEmailList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      emails: [],
      controlId: 1,
      emailHasError: false,
      offset: 0,
      offsetEmails: 0,
      limit: 5,
      email: "",
    };
  }

  static getDerivedStateFromProps(props, current_state) {
    const { controlId } = props;
    if (current_state.controlId !== controlId) {
      return {
        controlId,
      };
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.controlId !== this.state.controlId) {
      this.getControlEmails(this.state.controlId);
    }
  }

  componentDidMount() {
    this.getControlEmails(this.props.controlId);
  }

  getControlEmails = (id) => {
    ApiHandler.Setting.NotificationSettings.getControlEmails(id).then(
      (response) => {
        this.setState({
          emails: response.data,
          emailsConst: response.data,
        });
      }
    );
  };

  emailPageChange = (offsetEmails, e) => {
    this.setState({
      offsetEmails,
    });
  };

  addEmail = (input) => {
    const { email, controlId } = this.state;
    if (isEmailValid(email)) {
      ApiHandler.Setting.NotificationSettings.setControlEmails(
        this.state.controlId,
        [email],
        false
      ).then((data) => {
        this.getControlEmails(controlId);
      });
    } else
      this.setState({
        hasError: true,
      });
  };

  handleRemoveEmail = (item, index) => {
    const { offsetEmails } = this.state;
    let emailsCopy = [...this.state.emails];
    let emailsConstCopy = [...this.state.emailsConst];
    let email = this.state.emails[index];
    emailsCopy.splice(offsetEmails + index, 1);
    let indexToDelete = emailsConstCopy.indexOf(item);
    emailsConstCopy.splice(indexToDelete, 1);
    this.setState((prevState) => ({
      emails: emailsCopy,
    }));
    ApiHandler.Setting.NotificationSettings.setControlEmails(
      this.state.controlId,
      emailsConstCopy,
      true
    )
      .then((data) => {
        this.getControlEmails(this.state.controlId);
        this.setState((prevState) => ({
          itemValue: "",
        }));
      })

      .catch((e) => {
        emailsCopy.push(email);
        this.setState((prevState) => ({
          emails: emailsCopy,
          itemValue: "",
        }));
      });
  };

  handleEmailQueryChange = (query) => {
    const { emailsConst } = this.state;
    const value = query.currentTarget.value;
    this.setState({
      email: value,
    });
    if (!isNullOrUndefined(emailsConst) && emailsConst.length > 0) {
      let data = this.state.emailsConst.slice();
      this.setState((state) => ({
        ...state,
        emails: data.filter((email) =>
          email.toLowerCase().includes(value.toLowerCase())
        ),
        offsetEmails: 0,
        itemValue: value,
      }));
    }
  };

  render() {
    const { classes, t } = this.props;
    const {
      emails,
      emailHasError,
      offset,
      limit,
      offsetEmails,
      itemValue,
    } = this.state;
    return (
      <div>
        <Input
          action
          className={classes.emailInput}
          style={{ width: "60%" }}
          onChange={this.handleEmailQueryChange}
          error={emailHasError}
          value={itemValue}
        >
          <input />
          <Button className={classes.inputButton} onClick={this.addEmail}>
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
            {emails
              .slice(offsetEmails, offsetEmails + limit)
              .map((item, index) => (
                <Table.Row key={index}>
                  <Table.Cell>{item}</Table.Cell>
                  <Table.Cell>
                    <DeleteRoundedIcon
                      onClick={() => this.handleRemoveEmail(item, index)}
                      className={classes.deleteIcon}
                    />
                  </Table.Cell>
                </Table.Row>
              ))}
          </Table.Body>
        </Table>
        <div style={{ marginTop: 15 }}>
          {emails.length > 0 && (
            <StyledPagination
              limit={limit}
              offset={offsetEmails}
              total={emails.length}
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

export default withTranslation()(withStyles(CustomStyles)(AludocEmailList));
