const styles = theme => ({
  root: {
    MozUserSelect: "none",
    WebkitUserSelect: "none"
  },
  paper: {
    padding: theme.spacing.unit,
    textAlign: "center",
    color: theme.palette.textSecondary.main
  },
  timeCell: {
    padding: "0 !important",
    height: "30px",
    margin: "0 !important",
    borderLeft: "1px solid " + theme.palette.background.main,
    borderRight: "1px solid " + theme.palette.background.main,
    pointerEvent: "none"
  }
});

export default styles;
