const styles = theme => ({
  root: {
    position: "fixed",
    width: "100%",
    bottom: 10,
    zIndex: 1,
    justifyContent: "flex-end",
    pointerEvents: "none",
    flexDirection: "initial",
    alignItems: "flex-end"
  },
  margin: {
    margin: theme.spacing.unit
  },
  speedDial: {
    marginTop: 0
  },
  icon: {
    color: theme.palette.background.main
  }
});
export default styles;
