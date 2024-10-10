import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import { withStyles } from '@mui/styles';
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import PropTypes from "prop-types";
import React from "react";
import { Activity, Entities } from "../../../../utils/Enums";
import CustomStyles from "../../../../assets/styles/Tikas_styles/Products/ProductComponentStyles";
import withProductComponent from "../../../../core/Tikas/withProductComponent";
import { withTranslation } from "react-i18next";

import { compose } from "redux";

const ProductComponent = (props) => {
  const {
    classes,
    name,
    image,
    id,
    viewMode,
    handleLicence,
    handleEdit,
    handleDelete,
  } = props;
  return (
    (<Card className={classes.card}>
      <Grid container>
        <Grid
          item
          xs={viewMode === "grid" ? 12 : 3}
          md={viewMode === "grid" ? 12 : 3}
        >
          <CardMedia
            className={classes.cover}
            style={
              viewMode === "grid" ? { height: "150px" } : { height: "40px" }
            }
            image={image}
            title=""
          />
        </Grid>
        <Grid
          item
          xs={viewMode === "grid" ? 12 : 9}
          md={viewMode === "grid" ? 12 : 9}
        >
          <div
            className={
              viewMode === "grid" ? classes.details : classes.detailsListView
            }
            style={
              viewMode === "grid" ? { height: "100px" } : { height: "40px" }
            }
          >
            <CardContent
              className={classes.content}
              style={viewMode === "grid" ? { textAlign: "center" } : {}}
            >
              <Typography component="h6" variant="h6" className={classes.title}>
                {name}
              </Typography>
            </CardContent>
            <div className={classes.controls}>
              {handleLicence(
                [Entities.PRODUCTS.toString()],
                Activity.UPDATE
              ) && (
                <IconButton
                  className={classes.customColorIcon}
                  aria-label="Edit"
                  onClick={handleEdit(id, name, image)}
                  size="large">
                  <EditIcon />
                </IconButton>
              )}
              {handleLicence(
                [Entities.PRODUCTS.toString()],
                Activity.DELETE
              ) && (
                <IconButton
                  className={classes.customColorIcon}
                  aria-label="Delete"
                  onClick={handleDelete(id, name)}
                  size="large">
                  <DeleteIcon />
                </IconButton>
              )}
            </div>
          </div>
        </Grid>
      </Grid>
    </Card>)
  );
};

ProductComponent.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  handleOnEdit: PropTypes.func.isRequired,
  handleOnDelete: PropTypes.func.isRequired,
};

const enhance = compose(
  withTranslation(),
  withStyles(CustomStyles, { withTheme: true })
);

export default withProductComponent(enhance(ProductComponent));
