import { withStyles } from '@mui/styles';
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import React from "react";
import { Image } from "semantic-ui-react";
import CustomStyles from "../../../../assets/styles/Settings_styles/License/DetailsProductElemetStyles";

const DetailsProductElemet = props => {
  const { classes } = props;
  return (
    // <Label as='a'  className={classes.label}>
    //     {props.name}
    // </Label>
    (<div className={classes.card}>
      <Image className={classes.image} circular size="tiny" src={props.icon} />
      <div className={classes.textContainer}>
        <Typography variant="h6">{props.name}</Typography>
      </div>
    </div>)
  );
};

DetailsProductElemet.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(CustomStyles)(DetailsProductElemet);
