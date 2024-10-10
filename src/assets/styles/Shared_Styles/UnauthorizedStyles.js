const styles = theme => ({
  typoDiv: {
    display: "flex",
    flexDirection: "row",
    verticalAlign: "center",
    justifyContent: "center",
    alignItems: "center"
  },
  rootDiv: {
    background: theme.palette.background.main,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    verticalAlign: "center",
    flex: 1,
    flexGrow: 1,
    minHeight: "100vh"
  },
  mainDiv: {
    // backgroundColor: theme.palette.background.main,
    display: "flex",
    flexDirection: "column",
    verticalAlign: "center",
    justifyContent: "center",
    alignItems: "center"
  },
  buttonsDiv: {
    display: "flex",
    justifyContent: "center",
    width: "100%"
  },
  customCircularPropgress: {
    position: "absolute",
    top: "43%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12
  }
});

export default styles;
