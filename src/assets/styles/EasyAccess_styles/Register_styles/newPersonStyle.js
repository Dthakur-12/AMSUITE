import { emphasize } from "@mui/system";
import { red } from "@mui/material/colors";
import { NONE } from "apisauce";
const styles = (theme) => ({
  // dateTime: {
  buttonEnd: {
    margin: "10px",
    width: "40%",
    display: "flex",
    justifyContent: "center",
  },

  buttonAdd: {
    width: "100%",
    paddingLeft: 0,
    paddingRight: 0,
  },

  iconButton: {
    marginLeft: "55px",
  },
  //     backgroundColor: "red",
  //     color: "red"
  //   }
  // },
  datePicker: { width: "100%", color: "red" },
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
  closeButton: {
    position: "absolute",
    right: "2%",
    top: "2%",
    color: theme.palette.text.main,
  },
  customInput: {
    backgroundColor: theme.palette.backgroundSecondary.main,
  },
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
    "& span": {
      background: theme.palette.text.main,
    },
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
    color: theme.palette.text.main,
    backgroundColor: theme.palette.primary.main,
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
    padding: 0,
    //paddingLeft: theme.spacing.unit * 4
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
  formControl: {
    margin: 0,
    border: 0,
    display: "inline-flex",
    padding: 0,
    position: "relative",
    minWidth: 0,
    flexDirection: "column",
    verticalAlign: "top",
    width: "100%",
    paddingTop: 17,
  },
  formControlLabel: {
    top: 0,
    left: 0,
    position: "absolute",
    color: theme.palette.text.main,
    padding: 0,
    fontSize: "0.8rem",
    fontFamily: "'Lato', sans-serif",
    lineHeight: 1,
  },
  select: {
    marginTop: 9,
  },
  icon: {
    marginBottom: "5px",
  },
  confirmTitle: {
    "& h6": {
      display: "flex",
    },
  },
  eventDescription: {
    "& label": { zIndex: 0 },
  },
  primaryButton: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.text.main,
  },
  customFab: {
    color: theme.palette.text.main,
    backgroundColor: theme.palette.primary.main,
  },
  fabIcon: {
    color: theme.palette.text.main,
  },
  withError: {
    color: "red !important",
  },
  margin: {
    "& span": {
      top: 10,
      right: 10,
      height: 15,
      minWidth: 15,
    },
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  //styles para newVisitorEvent
  customSelectStyles: {
    "& > div > div > div > div": {
      height: 32,
    },
    paddingLeft: 10,
  },
  smallButton: {
    height: 30,
    width: 30,
    minWidth: "30px !important",
    minHeight: 30,
    color: theme.palette.text.main,
    backgroundColor: theme.palette.primary.main,
    "& >span > svg": {
      height: 18,
      width: 18,
    },
  },
  smallIconButton: {
    height: 30,
    width: 30,
    minWidth: "30px !important",
    minHeight: 30,
    color: theme.palette.text.main,
    "& >span > svg": {
      height: 18,
      width: 18,
    },
    margin: "0 10px",
    padding: 0,
  },
  uploadPersonsContaienr: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 10,
  },
  fileInput: {
    paddingRight: 10,
    borderRadius: 15,
    height: 25,
  },
  dwTemplateDescription: {
    padding: "0 10px",
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.text.main,
  },
});
export default styles;
