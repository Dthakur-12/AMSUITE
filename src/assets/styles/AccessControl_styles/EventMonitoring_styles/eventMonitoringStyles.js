const styles = (theme) => ({
  skeletonLoader: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    width: "100%",
    padding: 80,
  },
  circularProgress: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -25,
    marginLeft: -50,
  },
  contentLoader: {
    display: "flex",
    position: "fixed",
    top: 0,
    width: "100%",
    height: "100%",
    backgroundColor: theme.palette.background.main,
  },
  chip: {
    marginLeft: "-8%",
  },
  searchIcon: {
    color: theme.palette.text.main,
    margin: "0px !important",
    opacity: 1,
  },
  newDataButtonContainer: {
    display: "flex",
    marginLeft: "0",
    justifyContent: "center",
    [theme.breakpoints.up("md")]: {
      justifyContent: "flex-start",
      marginLeft: "-78px",
      position: "absolute",
      top: 20,
    },
  },
});

export default styles;
