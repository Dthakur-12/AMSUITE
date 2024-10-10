const styles = (theme) => ({
  layout: {
    width: "auto",
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 2 * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  paper: {
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 2}px ${
      theme.spacing.unit * 3
    }px`,
    [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
      marginBottom: theme.spacing.unit * 6,
      padding: theme.spacing.unit * 2,
    },
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    boxShadow: "none",
  },
  fill: {
    marginTop: theme.spacing.unit * 6,
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
  },
  button: {
    marginTop: theme.spacing.unit * 3,
    marginLeft: theme.spacing.unit,
  },
  input: {
    display: "flex",
    padding: 0,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.grey[300],
  },
  submit: {
    //marginTop: theme.spacing.unit * 3
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  grid: {
    paddingBottom: "0px !important",
    paddingTop: "0px !important",
  },
  customPagination: {
    paddingLeft: 0,
    "& *": {
      backgroundColor: "transparent !important",
      paddingLeft: 0,
    },
  },
  expandOpen: { transform: "rotate(180deg)" },
});

export default styles;
