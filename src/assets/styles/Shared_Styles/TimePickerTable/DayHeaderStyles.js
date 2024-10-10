const styles = theme => ({
  dayHeader: {
    background: theme.palette.background.main,
    color: theme.palette.text.main
  },
  headerElement: {
    height: "30px",
    marginLeft: "20px"
  },
  headerDays: {
    height: "30px",
    position: "relative"
  },
  headerDayButtonRight: {
    cursor: "pointer",
    textAlign: "center",
    margin: 0,
    fontSize: "1.5em",
    fontWeight: "bold",
    borderLeft: "solid 2px " + theme.palette.backgroundSecondary.main,
    borderBottom: "solid 2px " + theme.palette.backgroundSecondary.main,
    "&:hover": {
      backgroundColor: theme.palette.backgroundSecondary.main,
      color: theme.palette.textSecondary.main,
      borderBottom: "solid 2px " + theme.palette.text.main
    }
  },
  headerDayButtonLeft: {
    cursor: "pointer",
    textAlign: "center",
    margin: 0,
    fontSize: "1.5em",
    fontWeight: "bold",
    borderLeft: "solid 2px " + theme.palette.backgroundSecondary.main,
    borderBottom: "solid 2px " + theme.palette.backgroundSecondary.main,
    "&:hover": {
      backgroundColor: theme.palette.backgroundSecondary.main,
      color: theme.palette.textSecondary.main,
      borderBottom: "solid 2px " + theme.palette.text.main
    }
  },

  selectedHeaderOption: {
    background: theme.palette.background.main,
    color: theme.palette.primary.main,
    cursor: "pointer",
    textAlign: "center",
    margin: 0,
    fontSize: "1.5em",
    fontWeight: "bold",
    borderBottom: "solid 2px " + theme.palette.primary.main
  }
});

export default styles;
