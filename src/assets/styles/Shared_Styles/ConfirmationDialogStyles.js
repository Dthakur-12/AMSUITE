const styles = theme => ({
  customCircularProgress: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
    color: "white"
  },
  confirmButton: {
    backgroundColor: theme.palette.primary.main + " !important",
    color: theme.palette.text.main + " !important"
  },
  cancelButton: {
    backgroundColor: theme.palette.text.main + " !important",
    color: theme.palette.primary.main + " !important"
  }
});

export default styles;
