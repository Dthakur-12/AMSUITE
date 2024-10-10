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
    backgroundColor: "#d0d0d080",
  },
  button: {
    color: theme.palette.text.main + " !important",
    backgroundColor: theme.palette.background.main + " !important",
  },
  bottomActions: {
    position: "fixed",
    bottom: 10,
    right: 20,
    zIndex: 101,
  },
  fab: {
    margin: theme.spacing.unit,
  },
});

export default styles;
