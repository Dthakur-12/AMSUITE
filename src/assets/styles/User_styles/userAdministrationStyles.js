const styles = (theme) => ({
  layout: {
    width: "400px",
    marginLeft: "auto",
    marginRight: "auto",
    [theme.breakpoints.down(380)]: {
      width: "340px",
      marginLeft: "auto",
      marginRight: "auto",
    },
    [theme.breakpoints.up(600)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  paper: {
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${
      theme.spacing.unit * 3
    }px`,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      marginBottom: theme.spacing.unit * 6,
      padding: theme.spacing.unit * 3,
    },
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  fill: {
    marginTop: theme.spacing.unit * 6,
    [theme.breakpoints.down(900)]: {
      marginTop: theme.spacing.unit * 2,
    },
  },
  root: {
    backgroundColor: /*theme.palette.background.paper*/ "transparent",
    flexGrow: 1,
  },
  tab: {
    color: theme.palette.text.main,
    "&& a": {
      maxWidth: 160,
      textAlign: "center",
      height: "100% !important",
    },
    "&& .menu": {
      height: "50px !important",
    },
  },
  customAppBar: {
    backgroundColor: theme.palette.backgroundSecondary.main,
  },
});
export default styles;
