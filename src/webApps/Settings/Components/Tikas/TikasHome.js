import React from "react";
import ConsumtionLimit from "./ConsumtionLimit";
import { withTranslation } from "react-i18next";
import { withStyles } from '@mui/styles';
import PrintsList from "./TikasPrintsList";
import ApiHandler from "../../../../services/ApiHandler";
import { Menu } from "semantic-ui-react";
import NavBarSettings from "../../utils/NavBarSettings";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

import CustomStyles from "../../../../assets/styles/Settings_styles/Notifications/NotificationSettingsStyles";

// const iconsName = {
//   ALUDOC: "file",
//   "EASY ACCESS": "users"
// };

class tikasHome extends React.Component {
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
      <main className={classes.layoutTikas}>
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
                  {t("PRINTERS")}
                </Menu.Item>
                <Menu.Item
                  name="user"
                  active={product === 2}
                  onClick={() => this.selectProduct(2)}
                  className={classes.menuItem}
                >
                  {/* <Icon name="users" /> */}
                  {t("CONSUMPTIONLIMITS")}
                </Menu.Item>
              </Menu>
            </div>
            <div className={classes.customAlignment}>
              {this.state.product === 1 && (
                <Grid
                  container
                  className={classes.tikasSettingsContainer}
                  style={{
                    padding: 4,
                    marginBottom: 15,
                    justifyContent: "center",
                  }}
                >
                  <Grid
                    item
                    xs={12}
                    md={6}
                    className={classes.printersContainer}
                  >
                    <PrintsList />
                  </Grid>
                </Grid>
              )}
              {
                this.state.product === 2 && <ConsumtionLimit />
                // <Typography variant="h4">{t("CurrentlyNotAvailable")}</Typography>
              }
            </div>
          </Paper>
        </div>
      </main>
    );
  }
}

export default withTranslation()(withStyles(CustomStyles)(tikasHome));
