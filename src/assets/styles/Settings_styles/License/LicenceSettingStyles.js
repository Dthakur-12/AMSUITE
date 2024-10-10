const styles = (theme) => ({
  circularProgress: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -25,
    marginLeft: -50,
  },
  contentLoader: {
    display: "flex",
    position: "absolute",
    top: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "#d0d0d080",
    zIndex: 9,
  },
  step: {
    color: theme.palette.background.main + " !important",
    backgroundColor: theme.palette.text.main + " !important",
    "&:after": {
      backgroundColor: theme.palette.text.main + " !important",
    },
    "&.active": {
      color: theme.palette.text.main + " !important",
    },
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    minHeight: "300px",
    width: "100%",
    position: "relative",
  },
  fill: {
    marginTop: theme.spacing.unit * 6,
    width: "100%",
    [theme.breakpoints.down(900)]: {
      marginTop: 0,
    },
  },
  button: {
    height: 80,
    width: "100%",
    padding: 15,
    background: "#296084",
  },
  stepper: {
    minHeight: "300px",
    width: "100%",
  },
});

export default styles;
