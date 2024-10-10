import { emphasize } from "@mui/system";
const styles = theme => ({
  layout: {
    width: "auto",
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 2 * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`,
    [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
      marginBottom: theme.spacing.unit * 6,
      padding: theme.spacing.unit * 3
    },
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  fill: {
    marginTop: theme.spacing.unit * 6
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end"
  },
  button: {
    marginTop: theme.spacing.unit * 3,
    marginLeft: theme.spacing.unit
  },
  input: {
    display: "flex",
    padding: 0
  },
  avatar: {
    margin: theme.spacing.unit,
    color: theme.palette.text.main,
    backgroundColor: theme.palette.primary.main
  },
  submit: {
    marginTop: theme.spacing.unit * 5
  },
  rightIcon: {
    marginLeft: theme.spacing.unit
  },
  grid: {
    paddingBottom: "0px !important",
    paddingTop: "20px"
  },
  expand: {
    transform: "rotate(0deg)",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  listRoot: {
    width: "100%",
    backgroundColor: theme.palette.backgroundSecondary.main,
    padding: 0
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4
  },
  innerForm: {
    border: "1px solid",
    borderColor: theme.palette.secondary.light,
    padding: 5,
    borderRadius: 7
  },
  //Select css
  valueContainer: {
    display: "flex",
    flex: 1,
    alignItems: "center",
    overflow: "hidden"
  },
  chip: {
    margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`
  },
  chipFocused: {
    backgroundColor: emphasize(
      theme.palette.mode === "light"
        ? theme.palette.grey[300]
        : theme.palette.grey[700],
      0.08
    )
  },
  noOptionsMessage: {
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`
  },
  singleValue: {
    fontSize: 16,
    width: "100%"
  },
  placeholder: {
    position: "absolute",
    left: 2,
    fontSize: 16
  },
  paperSelect: {
    position: "absolute",
    zIndex: "3600 !important",
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0
  },
  progress: {
    margin: theme.spacing.unit * 2
  },
  fab: {
    backgroundColor: theme.palette.primary.main
  },
  fabIcon: {
    color: theme.palette.text.main
  }
});
export default styles;
