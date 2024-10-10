import { emphasize } from "@mui/system";
const styles = (theme) => ({
  layout: {
    width: "auto",
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    [theme.breakpoints.up(900 + theme.spacing.unit * 2 * 2)]: {
      width: 800,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  circularProgress: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -25,
    marginLeft: -50,
  },
  fill: {
    marginTop: theme.spacing.unit * 6,
  },
  paper: {
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${
      theme.spacing.unit * 3
    }px`,
    [theme.breakpoints.up(900 + theme.spacing.unit * 3 * 2)]: {
      marginBottom: theme.spacing.unit * 6,
      padding: theme.spacing.unit * 3,
    },
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
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
  //Select css
  valueContainer: {
    display: "flex",
    flex: 1,
    alignItems: "center",
    overflow: "hidden",
  },
  chip: {
    margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`,
  },
  chipFocused: {
    backgroundColor: emphasize(
      theme.palette.mode === "light"
        ? theme.palette.grey[300]
        : theme.palette.grey[700],
      0.08
    ),
  },
  noOptionsMessage: {
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
  },
  singleValue: {
    fontSize: 16,
    width: "100%",
  },
  placeholder: {
    position: "absolute",
    left: 2,
    fontSize: 16,
  },
  paperSelect: {
    position: "absolute",
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.grey[300],
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  listRoot: {
    width: "100%",
    backgroundColor: theme.palette.backgroundSecondary.main,
    padding: 0,
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
  grid: {
    paddingBottom: "0px !important",
    paddingTop: "0px !important",
  },
  expand: {
    transform: "rotate(0deg)",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  reactDatePicker: {
    background: theme.palette.backgroundSecondary.main,
    boxShadow: "-1px -1px 14px -1px rgba(0,0,0,0.75)",
    color: theme.palette.text.main + " !important",
    marginTop: 9,
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
});

export default styles;
