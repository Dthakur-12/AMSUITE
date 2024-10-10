const styles = (theme) => ({
  dataTable: {
    boxShadow: "0px 0px 0px 0px",
  },
  customPagination: {
    "& *": {
      backgroundColor: "transparent",
    },
    boxShadow:
      "0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)",
  },
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
  popover: {
    pointerEvents: "none",
    position: "absolute",
    marginTop: 14,
  },
  paper: {
    width: "100%",
    height: 48,
    background: "none",
    justifyContent: "flex-end",
    display: "flex",
    alignItems: "center",
  },
  primaryButton: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.text.main,
  },
  confirmButton: {
    backgroundColor: theme.palette.primary.main + " !important",
    color: theme.palette.text.main + " !important",
  },
  cancelButton: {
    backgroundColor: theme.palette.backgroundSecondary.main + " !important",
    color: theme.palette.text.main + " !important",
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
