const styles = theme => ({
  skeletonLoader: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    width: "100%",
    padding: 80
  },
  circularProgress: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -25,
    marginLeft: -50
  },
  contentLoader: {
    display: "flex",
    position: "fixed",
    top: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "#d0d0d080"
  },
  popover: {
    pointerEvents: "none",
    position: "absolute",
    marginTop: 14
  },
  paper: {
    width: "100%",
    height: 48,
    background: "none",
    justifyContent: "flex-end",
    display: "flex",
    alignItems: "center"
  },
  primaryButton: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.text.main
  }
});
export default styles;
