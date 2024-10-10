import React, { Component } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { Typography } from "@mui/material";
import { withStyles } from "@mui/styles";
import CustomStyles from "../../assets/styles/Shared_Styles/TableSkeletonLoaderStyles";

class TableSkeletonLoader extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  randomWith = () => {
    //let random = Math.floor(Math.random() * 30 + 10);
    return 100;
  };

  render() {
    const { theme, classes } = this.props;
    return (
      <div className={classes.mainDiv}>
        <SkeletonTheme
          color={theme.palette.backgroundSecondary.main}
          highlightColor={theme.palette.background.main}
        >
          <Typography variant="h4">
            <Skeleton />
          </Typography>
          <br />
          <Typography>
            <Skeleton count={12} />
          </Typography>
        </SkeletonTheme>
      </div>
    );
  }
}

export default withStyles(CustomStyles, { withTheme: true })(
  TableSkeletonLoader
);
