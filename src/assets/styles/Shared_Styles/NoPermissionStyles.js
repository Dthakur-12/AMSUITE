const styles = theme => ({
  customCircularProgress: {
    position: "absolute",
    top: "43%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12
  },
  customdiv: {
    display: "flex",
    flexDirection: "column",
    verticalAlign: "center",
    justifyContent: "center",
    alignItems: "center"
  },
  mainDiv: {
    backgroundColor: theme.palette.background.main,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    verticalAlign: "center",
    flex: 1,
    flexGrow: 1,
    minHeight: "100vh"
  },
  buttonsDiv: {
    display: "flex",
    justifyContent: "center",
    width: "100%"
  },
  customdiv2: {
    display: "flex",
    flexDirection: "row",
    verticalAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 25
  }
});

export default styles;
