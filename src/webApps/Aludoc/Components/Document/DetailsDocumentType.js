import React, { Component } from "react";
import Typography from "@mui/material/Typography";
import { withStyles } from '@mui/styles';
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import LinearProgress from "@mui/material/LinearProgress";
import PropTypes from "prop-types";
import BusinessIcon from "@mui/icons-material/BusinessRounded";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ChevronIcon from "@mui/icons-material/ChevronRightRounded";
import { List, ListItemIcon } from "@mui/material";
import { withTranslation } from "react-i18next";
import styles from "../../../../assets/styles/Aludoc_styles/Document_styles/detailsDocumentTypeStyles.js";
import { compose } from "redux";
import withDetailsDocumentTypes from "../../../../core/Aludoc/withDetailsDocumentTypes";

const DetailsDocumentType = (props) => {
  const { isDialog, classes, t, documentType } = props;

  return (
    <main className={!isDialog ? classes.layout : undefined}>
      <div className={!isDialog ? classes.fill : undefined}>
        <LinearProgress
          style={{
            opacity: "0",
            width: "100%",
            background: "none",
            borderBottomLeftRadius: 50,
            borderBottomRightRadius: 50,
          }}
          variant="query"
        />
        <Paper elevation={!isDialog ? 2 : 0} className={classes.paper}>
          <Avatar className={classes.avatar}>
            <BusinessIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {`${t("documentType")}: ${documentType.value}`}
          </Typography>
          <Divider style={{ width: "100%", marginTop: 10, marginBottom: 24 }} />
          <Grid container spacing={24} className={classes.center}>
            <Grid item xs={12} md={12}>
              <Typography component="h5" variant="h5">
                {t("Companies")}
              </Typography>
              <Divider style={{ marginBottom: 10 }} />
              <List className={classes.listRoot}>
                <List dense component="div" disablePadding>
                  {documentType.enterprises.map((enterprise) => {
                    return (
                      <ListItem key={enterprise.id} className={classes.nested}>
                        <ListItemIcon>
                          <ChevronIcon />
                        </ListItemIcon>
                        <ListItemText inset primary={enterprise.name} />
                      </ListItem>
                    );
                  })}
                </List>
              </List>
            </Grid>
          </Grid>
        </Paper>
      </div>
    </main>
  );
};

DetailsDocumentType.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};
// const InitalConnected = connect(null, mapDispatchToProps)(Init)

const enhance = compose(
  withTranslation(),
  withStyles(styles, { withTheme: true })
);
export default withDetailsDocumentTypes(enhance(DetailsDocumentType));
