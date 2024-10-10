const styles = theme => ({
  progress: {
    position: "absolute",
    top: "15%",
    right: "5%"
  },
  title: {
    background: theme.palette.backgroundSecondary.main + "!important",
    color: theme.palette.text.main + " !important"
  },
  selected: {
    backgroundColor: theme.palette.primary.main + " !important",
    color: theme.palette.text.main + " !important"
  },
  table: {
    background: theme.palette.backgroundSecondary.main + "!important",
    color: theme.palette.text.main + " !important"
  }
});

export default styles;
