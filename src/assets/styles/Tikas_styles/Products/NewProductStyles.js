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
  },
  paper: {
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${
      theme.spacing.unit * 3
    }px`,
    [theme.breakpoints.up(900 + theme.spacing.unit * 3 * 2)]: {
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
    width: "100%",
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
  customButton: {
    color: theme.palette.primary.main,
    backgroundColor: theme.palette.textSecondary.main,
  },
  customCircularProgress: {
    top: "50%",
    left: "50%",
    color: theme.palette.text.main,
  },
  customAccountCircle: {
    fontSize: 150,
    color: theme.palette.text.main,
  },
  customLinearProgress: {
    width: "100%",
    background: "none",
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },
  customDivider: {
    width: "100%",
    marginTop: 10,
    marginBottom: 24,
  },
  customGrid: {
    height: 200,
    width: "100%",
    display: "flex",
    marginTop: 12,
    justifyContent: "center",
  },
  bigAFstyle: {
    width: "100%",
    display: "flex",
    marginRight: "12px",
    paddingTop: "0px",
    paddingLeft: "0px",
    paddingRight: "0px",
    paddingBottom: "0px",
    justifyContent: "flex-end",
  },
  customCircularProgress2: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
    color: "white",
  },
  body: {
    verticalAlign: "inherit",
    backgroundColor: theme.palette.backgroundSecondary.main,
    color: theme.palette.text.main,
    lineHeight: "1.8",
  },
  header: {
    backgroundColor: "#011F71 !important", // theme.palette.background.main + "!important",
    color: theme.palette.textSecondary.main + "!important",
  },
  headerOne: {
    backgroundColor: "#0A44E4 !important", //"#3B3A3A !important",
    color: theme.palette.textSecondary.main + "!important",
  },
  headerTwo: {
    backgroundColor: "#3667F0 !important", // "#585453 !important",
    color: theme.palette.textSecondary.main + "!important",
  },
  headerThree: {
    backgroundColor: "#5E88FD !important", // "#7A7777 !important",

    color: theme.palette.textSecondary.main + "!important",
  },
  row: { color: theme.palette.textSecondary.main, verticalAlign: "inherit" },
  rowPair: { color: theme.palette.text.main, verticalAlign: "inherit" },
});

export default styles;
