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
  fill: {
    marginTop: theme.spacing.unit * 6,
    [theme.breakpoints.down('lg')]: {
      margin: 0,
    },
  },
  paper: {
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit}px ${
      theme.spacing.unit * 3
    }px`,
    [theme.breakpoints.down(900)]: {
      padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit}px ${
        theme.spacing.unit * 2
      }px`,
    },
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
  circle: {
    color: theme.palette.primary.main,
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
    backgroundColor: theme.palette.background.paper,
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
  rangeContainer: {
    flexFlow: "row wrap",
    display: "flex",
    flexWrap: "wrap",
    width: "80%",
    justifyContent: "center",
  },
  startRangeInput: {
    width: "40% !important",
    position: "absolute !important",
    left: 5,
    bottom: 0,
  },
  endRangeInput: {
    width: "40% !important ",
    position: "absolute !important",
    right: 5,
    bottom: 0,
  },
  circleDos: {
    color: theme.palette.textSecondary.main,
  },
  customDivider: {
    width: "100%",
    marginTop: 10,
    marginBottom: 24,
  },
  customLinearProgress: {
    width: "100%",
    background: "none",
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },
  customCircularProgress: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
    color: "white !important",
  },
  customGrid: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  customTypo: {
    fontSize: "20px",
    textAlign: "center",
  },
  customStepper: {
    padding: "0px",
    width: "80%",
    [theme.breakpoints.down(900)]: {
      width: "100%",
    },
  },
  customStep: {
    margin: "0px",
    padding: "0px",
  },
  customStepButton: {
    margin: "0px",
    padding: "0px",
  },
  cardRange: {
    position: "relative",
    width: "100%",
    height: 80,
    marginTop: "15px",
    display: "flex",
    justifyContent: "center",
  },
  cardRangeTextField: {
    width: "100%",
    height: "80px",
  },
});

export default styles;
