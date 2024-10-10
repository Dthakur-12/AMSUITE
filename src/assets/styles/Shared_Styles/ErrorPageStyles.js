const styles = theme => ({
  mianDiv: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    verticalAlign: "center",
    flex: 1,
    flexGrow: 1,
    minHeight: "100vh"
  },
  customCircularProgress: {
    position: "absolute",
    top: "43%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12
  },
  customDiv: {
    display: "flex",
    flexDirection: "column",
    verticalAlign: "center",
    justifyContent: "center",
    alignItems: "center"
  },
  customDiv2: {
    display: "flex",
    flexDirection: "row",
    verticalAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 25
  },
  customErrorIcon: {
    fontSize: 50,
    color: "gray",
    marginBottom: 25
  },
  buttonsDiv: { display: "flex", justifyContent: "center", width: "100%" }
});

export default styles;
