import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import LinearProgress from "@mui/material/LinearProgress";
import Paper from "@mui/material/Paper";
import { withStyles } from '@mui/styles';
import Switch from "@mui/material/Switch";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import React, { Component } from "react";
import NavBarAludoc from "../../utils/NavBarAludoc";
import DocumentList from "./Documents";
import withDocuments from "../../../../core/Aludoc/withDocuments";
import { withTranslation } from "react-i18next";
import styles from "../../../../assets/styles/Aludoc_styles/Document_styles/detailsEnterpriseStyles.js";
const formValues = {
  id: "",
  name: "",
  rut: "",
  address: "",
  phone: "",
  email: "",
  receivesVisits: false,
};

const DocumentsWrapper = withDocuments(DocumentList);
class DetailsEnterprise extends Component {
  constructor(props) {
    super(props);
    const { initValues } = props;
    this.state = {
      showEnterprises: true,
      newEnterprise: initValues ? initValues : formValues,
      adjunct: [],
      openDropFilesDialog: false,
      formErrors: {},
    };
  }

  componentDidMount() {
    NavBarAludoc.hideLoader();
  }

  updateParent = () => {
    this.props.updateParent();
  };

  render() {
    const { isDialog, classes, isDetails, enterprise, t } = this.props;
    return (
      (<main className={!isDialog ? classes.layout : undefined}>
        <div className={!isDialog ? classes.fill : undefined}>
          <LinearProgress
            style={{
              opacity: this.state.isCreating ? "1" : "0",
              width: "100%",
              background: "none",
              borderBottomLeftRadius: 50,
              borderBottomRightRadius: 50,
            }}
            variant="query"
          />
          <Paper elevation={!isDialog ? 2 : 0} className={classes.paper}>
            <Avatar />
            <Typography component="h1" variant="h5">
              {t("details")}
            </Typography>
            <Divider
              style={{ width: "100%", marginTop: 10, marginBottom: 24 }}
            />
            <Grid container spacing={24} justifyContent={"center"}>
              <Grid container spacing={24} item xs={12} md={8}>
                <Grid item xs={12} md={4}>
                  <TextField
                    required
                    label={t("RUT")}
                    fullWidth
                    value={this.state.newEnterprise.rut}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Grid>

                <Grid item xs={12} md={4}>
                  <TextField
                    required
                    label={t("name")}
                    fullWidth
                    value={this.state.newEnterprise.name}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Grid>

                <Grid item xs={12} md={4}>
                  <TextField
                    required
                    label={t("address")}
                    fullWidth
                    value={this.state.newEnterprise.address}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Grid>

                <Grid item xs={12} md={4}>
                  <TextField
                    required
                    label={t("Phone")}
                    fullWidth
                    value={this.state.newEnterprise.phone}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Grid>

                <Grid item xs={12} md={4}>
                  <TextField
                    required
                    label={t("email")}
                    fullWidth
                    value={this.state.newEnterprise.email}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Grid>

                <Grid item xs={12} md={4} style={{ marginBottom: 5 }}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={this.state.newEnterprise.receivesVisits}
                        value={this.state.newEnterprise.receivesVisits}
                        color="primary"
                        classes={{
                          switchBase: classes.colorSwitchBase,
                          checked: classes.colorChecked,
                          bar: classes.colorBar,
                        }}
                      />
                    }
                    labelPlacement="start"
                    label={t("receiveVisits")}
                    style={{ marginTop: "6%", cursor: "default" }}
                    disabled={isDetails}
                  />
                </Grid>
              </Grid>
              <Grid
                container
                spacing={24}
                justifyContent={"center"}
                item
                xs={12}
                md={8}
              >
                <DocumentsWrapper
                  enterprise={enterprise}
                  updateParent={this.props.updateParent}
                />
              </Grid>
            </Grid>
          </Paper>
        </div>
      </main>)
    );
  }
}

DetailsEnterprise.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};
// const InitalConnected = connect(null, mapDispatchToProps)(Init)

export default withTranslation()(
  withStyles(styles, { withTheme: true })(DetailsEnterprise)
);
