const styles = theme => ({
  root: {
    position: "fixed",
    width: "100%",
    bottom: 10,
    zIndex: 1,
    justifyContent: "flex-end",
    pointerEvents: "none"
  },
  margin: {
    margin: theme.spacing.unit
  },
  speedDial: {},
  speedIcon: {
    color: theme.palette.text.main
  },
  icon: {
    color: theme.palette.background.main
  }
});
export default styles;
