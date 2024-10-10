const styles = theme => ({
  appBar: {
    position: "relative"
  },
  flex: {
    flex: 1
  },
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
  chip: {
    margin: 0
  },
  customButton: {
    color: theme.palette.text.main + " !important"
  },
  customLinearProgress: {
    width: "90%",
    background: "none",
    marginLeft: "-50%",
    padding: 0,
    position: "absolute",
    zIndex: 1
  },
  searchGrid: {
    zIndex: 1,
    position: "absolute",
    right: "10em"
  }
});

export default styles;
