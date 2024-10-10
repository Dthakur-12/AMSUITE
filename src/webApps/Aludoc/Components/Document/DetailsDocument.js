import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { withStyles } from '@mui/styles';
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import React from "react";
import FileComponent from "../../../Shared/FileComponent";
import { withTranslation } from "react-i18next";

import styles from "../../../../assets/styles/Aludoc_styles/Document_styles/detailsDocumentStyles.js";
import withDetailsDocuments from "../../../../core/Aludoc/withDetailsDocument";
import { compose } from "redux";

// const SelectedStateOption = {
//   0: { value: 0, label: "Correcto" },
//   1: { value: 1, label: "A revisar" },
//   2: { value: 2, label: "Rechazado" }
// };

// let page = 0
// let rowsPerPage = 10
// let activeColumnSort = 0
// let order = 'asc'

const DetailsDocument = (props) => {
  const {
    isDialog,
    classes,
    t,
    detailsDocument,
    adjuncts = [],
    downloadFile,
    SelectedStateOption,
  } = props;

  return (
    (<main className={classes.layout}>
      <div className={classes.fill}>
        <Paper elevation={!isDialog ? 2 : 0} className={classes.paper}>
          <Typography component="h1" variant="h5">
            {t("documentDetails")}
          </Typography>
          <Divider style={{ width: "100%", marginTop: 10, marginBottom: 24 }} />
          <Grid container spacing={24}>
            <Grid item xs={12} md={6}>
              <TextField
                label={t("name")}
                fullWidth
                value={detailsDocument.name}
                InputLabelProps={{
                  className: classes.textFieldLabel,
                }}
                InputProps={{
                  readOnly: true,
                  className: classes.textFieldInput,
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label={t("documentTypes")}
                value={detailsDocument.documentTypeName}
                fullWidth
                InputLabelProps={{
                  className: classes.textFieldLabel,
                }}
                InputProps={{
                  readOnly: true,
                  className: classes.textFieldInput,
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label={t("expirationDate")}
                value={new Intl.DateTimeFormat("es-ES", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                  //hour: "2-digit",
                  //minute: "2-digit",
                  hour12: false,
                }).format(Date.parse(detailsDocument.expirationDate))}
                fullWidth
                InputLabelProps={{
                  className: classes.textFieldLabel,
                }}
                InputProps={{
                  readOnly: true,
                  className: classes.textFieldInput,
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label={t("expeditionDate")}
                value={new Intl.DateTimeFormat("es-ES", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                  //hour: "2-digit",
                  //minute: "2-digit",
                  hour12: false,
                }).format(Date.parse(detailsDocument.issuedDate))}
                fullWidth
                InputLabelProps={{
                  className: classes.textFieldLabel,
                }}
                InputProps={{
                  readOnly: true,
                  className: classes.textFieldInput,
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label={t("status")}
                value={
                  new Date(detailsDocument.expirationDate) > Date.now()
                    ? SelectedStateOption[detailsDocument.status].label
                    : SelectedStateOption[2].label
                }
                fullWidth
                InputLabelProps={{
                  className: classes.textFieldLabel,
                }}
                InputProps={{
                  readOnly: true,
                  className: classes.textFieldInput,
                }}
              />
            </Grid>

            <Grid container>
              <Grid item xs={6}>
                <TextField
                  label={t("Observations")}
                  multiline
                  maxRows="7"
                  rows="6"
                  value={detailsDocument.notes}
                  className={classes.textField}
                  variant="outlined"
                  fullWidth
                  InputLabelProps={{
                    className: classes.textFieldLabel,
                  }}
                  InputProps={{
                    readOnly: true,
                    className: classes.textFieldInput,
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <div className={classes.fileContainer}>
                  {Object.keys(adjuncts).map((key) => {
                    return (
                      <FileComponent
                        canDownload
                        key={key}
                        id={key}
                        fullName={adjuncts[key]}
                        extension={adjuncts[key].split(".").pop()}
                        handleDownload={downloadFile}
                      />
                    );
                  })}
                </div>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </div>
    </main>)
  );
};

DetailsDocument.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};
// const InitalConnected = connect(null, mapDispatchToProps)(Init)

const enhance = compose(
  withTranslation(),
  withStyles(styles, { withTheme: true })
);
export default withDetailsDocuments(enhance(DetailsDocument));
