const styles = (theme) => ({
  withError: {
    color: "red !important",
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    marginTop: "5%",
    [theme.breakpoints.up(600 + theme.spacing.unit * 2 * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  fab: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.text.main,
    "&:hover": {
      backgroundColor: theme.palette.text.main,
      color: theme.palette.primary.main,
    },
  },

  paper: {
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${
      theme.spacing.unit * 3
    }px`,
    [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
      marginBottom: theme.spacing.unit * 6,
    },
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  noOptionsMessage: {
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
  },
  fill: {
    marginTop: "-1%",
    alignItems: "center",
  },

  fill: {
    marginTop: "-1%",
  },
  singleValue: {
    fontSize: 16,
    width: "100%",
  },
  valueContainer: {
    display: "flex",
    flex: 1,
    alignItems: "center",
    overflow: "hidden",
  },
  paperSelect: {
    position: "absolute",
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0,
  },
  fillMobile: {
    marginTop: "15%",
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
  },
  button: {
    marginTop: theme.spacing.unit * 3,
    marginLeft: theme.spacing.unit,
  },
  placeholder: {
    position: "absolute",
    left: 2,
    fontSize: 16,
  },
  input: {
    display: "flex",
    padding: 0,

    marginLeft: theme.spacing.unit,
  },
  input: {
    display: "flex",
    padding: 0,

    "& span": {
      background: theme.palette.text.main,
    },
  },
  submit: {
    position: "relative",
    display: "flex",
    width: "100%",
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  grid: {
    paddingBottom: "0px !important",
    paddingTop: "0px !important",
  },
  tablePagination: {
    "& *": {
      backgroundColor: "transparent",
    },
  },
});

export default styles;
