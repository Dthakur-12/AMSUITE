import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  List,
  ListItem,
  ListItemText,
  Collapse,
  Button,
  StepButton,
  Stepper,
  Step,
  Dialog
} from "@mui/material";
import {

  withStyles,
} from "@mui/styles";
import { withTranslation } from "react-i18next";
import DeleteIcon from "@mui/icons-material/DeleteRounded";
import DetailsIcon from "@mui/icons-material/FormatListBulletedRounded";
import CustomStyles from "../../../assets/styles/Settings_styles/AdministrationFieldsStyles";
import AMStuiteEnums from "../../../utils/Enums";

export const FieldList = (props) => {
  const {
    classes,
    t,
    page,
    rowsPerPage,
    customFields = {},
    entity,
    subEntity,
  } = props;
    
  return (
    <div>
      {customFields[entity] &&
        customFields[entity]
        .filter((field) => field.visibility[AMStuiteEnums.TypeEnum[subEntity]] !== undefined)
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map((a, index) => (
            <React.Fragment key={index}>
              <ListItem
                button
                style={{}}
                onClick={() => props.handleFieldSelected(index)}
              >
                <ListItemText primary={`${a.fieldName} `} />{" "}
              </ListItem>
              <Collapse
                in={props.fieldSelected === index}
                timeout="auto"
                unmountOnExit
              >
                <div style={{ display: "flex" }}>
                  <Button
                    onClick={() => props.handleOnDelete(a)}
                    size="small"
                    variant="contained"
                    className={classes.errorButton}
                    style={{
                      color: "white",
                      boxShadow: "unset",
                      width: "50%",
                      height: "3em",
                      borderRadius: 0,
                      fontSize: 12,
                    }}
                  >
                    {t("delete")}
                    <DeleteIcon style={{ fontSize: 18, marginLeft: 10 }} />
                  </Button>
                  <Button
                    onClick={() => props.handleOnDetails(a)}
                    size="small"
                    color="primary"
                    variant="contained"
                    className={classes.detailsButton}
                    style={{
                      color: "white",
                      boxShadow: "unset",
                      width: "50%",
                      height: "3em",
                      borderRadius: 0,
                      fontSize: 12,
                    }}
                  >
                    {t("details")}
                    <DetailsIcon style={{ fontSize: 18, marginLeft: 10 }} />
                  </Button>
                </div>
              </Collapse>

            </React.Fragment>
          ))}

    </div>
  );
};

FieldList.propTypes = {
  prop: PropTypes,
};

const mapStateToProps = ({ Settings }) => ({
  customFields: Settings.customFields,
});

const mapDispatchToProps = {};

const connectedFieldList = connect(
  mapStateToProps,
  mapDispatchToProps
)(FieldList);

export default withTranslation()(
  withStyles(CustomStyles, { withTheme: true })(connectedFieldList)
);
