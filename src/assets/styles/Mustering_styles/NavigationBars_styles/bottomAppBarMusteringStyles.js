const styles = theme => ({
  root: {
    position: "fixed",
    width: "100%",
    bottom: 10,
    zIndex: 1,
    justifyContent: "flex-end",
    pointerEvents: "none"
  },
  icon: {
    color: theme.palette.background.main
  },
  margin: {
    margin: theme.spacing.unit
  },
  speedDial: {}
});

export default styles;
