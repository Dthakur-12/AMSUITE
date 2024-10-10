const styles = (theme) => ({
  paper: {
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${
      theme.spacing.unit * 3
    }px`,
    [theme.breakpoints.up(900 + theme.spacing.unit * 3 * 2)]: {
      //marginBottom: theme.spacing.unit * 6
      padding: theme.spacing.unit * 3,
    },
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  paperNotShadow: {
    boxShadow: "none",
    width: "100%",
    padding: "33px",
    [theme.breakpoints.up(900 + theme.spacing.unit * 3 * 2)]: {
      //marginBottom: theme.spacing.unit * 6
      padding: theme.spacing.unit * 3,
    },
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  reactDatePicker: {
    background: theme.palette.backgroundSecondary.main,
    boxShadow: "-1px -1px 14px -1px rgba(0,0,0,0.75)",
    color: theme.palette.text.main + " !important",
    border: "none",
    "& *": {
      color: theme.palette.text.main,
    },
    "& .react-datepicker__day--disabled": {
      color: theme.palette.textSecondary.main,
    },
    "& .react-datepicker__time, .react-datepicker__year-dropdown": {
      background: theme.palette.backgroundSecondary.main,
    },
    "& .react-datepicker__header": {
      background: theme.palette.background.main,
    },
    "& .react-datepicker__day:not(.react-datepicker__day--disabled)": {
      "&:hover": {
        background: theme.palette.textSecondary.main,
      },
    },
    "& react-datepicker__time-list > li": {
      "&:hover": {
        background: "red",
      },
    },
    "& .react-datepicker__triangle": {
      borderBottomColor: theme.palette.background.main + " !important",
    },
    "& .react-datepicker__day--selected": {
      background: theme.palette.primary.main,
    },
  },
  customFab: {
    marginTop: "10px",
    color: theme.palette.text.main,
    background: theme.palette.primary.main,
  },
  submit: {
    position: "relative",
    display: "flex",
    width: "100%",
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});
export default styles;
