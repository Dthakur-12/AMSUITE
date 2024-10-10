import React from "react";
import EasyAccessNotifications from "./EasyAccessNotifications";
import AludocNotifications from "./AludocNotifications";
import { withTranslation } from "react-i18next";
import { withStyles } from '@mui/styles';

import ApiHandler from "../../../../services/ApiHandler";
import { Menu } from "semantic-ui-react";
import NavBarSettings from "../../utils/NavBarSettings";
import Paper from "@mui/material/Paper";

import CustomStyles from "../../../../assets/styles/Settings_styles/Notifications/NotificationSettingsStyles";

// const iconsName = {
//   ALUDOC: "file",
//   "EASY ACCESS": "users"
// };

class NotificationSettings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      license: undefined,
      selectedControl: undefined,
      product: 1,
    };
  }

  componentDidMount() {
    const { currentUser, match } = this.props;
    NavBarSettings.hideLoader();
    this.getLicense();
    if (match) {
      if (match.params.controlId) {
        this.setState({
          selectedControlId: match.params.controlId,
          selectedControlName: match.params.controlName,
        });
      }
    }
  }

  getLicense = () => {
    ApiHandler.Setting.Setting.getLicense()
      .then(({ data }) => {
        this.setState({
          license: data,
          product: 1,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  selectProduct = (product) => {
    this.setState({
      product: product,
    });
  };

  render() {
    const { product } = this.state;
    const { classes, t } = this.props;
    return (
      <main className={classes.layout}>
        <div className={classes.fill}>
          <Paper className={classes.paper}>
            <div style={{ width: "100%" }}>
              <Menu pointing className={classes.menu}>
                <Menu.Item
                  name="file"
                  active={product === 1}
                  onClick={() => this.selectProduct(1)}
                  className={classes.menuItem}
                >
                  {/* <Icon name="file" /> */}
                  {t("CONTROLS")}
                </Menu.Item>
                <Menu.Item
                  name="user"
                  active={product === 2}
                  onClick={() => this.selectProduct(2)}
                  className={classes.menuItem}
                >
                  {/* <Icon name="users" /> */}
                  {t("STATUS")}
                </Menu.Item>
              </Menu>
            </div>
            <div className={classes.customAlignment}>
              {this.state.product === 1 && (
                <AludocNotifications
                  selectedControlId={
                    this.props.match
                      ? this.props.match.params.controlId
                      : undefined
                  }
                  selectedControlName={
                    this.props.match
                      ? this.props.match.params.controlName
                      : undefined
                  }
                />
              )}
              {
                this.state.product === 2 && <EasyAccessNotifications />
                // <Typography variant="h4">{t("CurrentlyNotAvailable")}</Typography>
              }
            </div>
          </Paper>
        </div>
      </main>
    );
  }
}

export default withTranslation()(
  withStyles(CustomStyles)(NotificationSettings)
);
