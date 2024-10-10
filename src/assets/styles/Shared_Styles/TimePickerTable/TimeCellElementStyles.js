const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    textAlign: "center",
    color: theme.palette.textSecondary.main,
    backgroundColor: theme.palette.backgroundSecondary.main,
    padding: theme.spacing.unit
  },
  cell: {
    border: "1px solid " + theme.palette.background.main,
    backgroundColor: theme.palette.backgroundSecondary.main,
    padding: "5px",
    height: "100%",
    pointerEvent: "none"
  }
});

export default styles;
