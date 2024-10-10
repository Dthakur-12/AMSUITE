import { emphasize } from "@mui/system";

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    [theme.breakpoints.up(900 + theme.spacing.unit * 2 * 2)]: {
      width: 800,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  fill: {
    marginTop: theme.spacing.unit * 6
  },
  infoDomain: {
    fontSize: 12,
    color: theme.palette.textSecondary.main
  },
  paper: {
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`,
    [theme.breakpoints.up(900 + theme.spacing.unit * 3 * 2)]: {
      marginBottom: theme.spacing.unit * 6,
      padding: theme.spacing.unit * 3
    },
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end"
  },
  button: {
    marginTop: theme.spacing.unit * 3,
    marginLeft: theme.spacing.unit
  },
  buttonSemantic: {
    backgroundColor: theme.palette.primary.main + " !important",
    color: theme.palette.text.main + " !important"
  },
  input: {
    display: "flex",
    padding: 0
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
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.grey[300]
  },
  checkBox: {
    margin: 5,
    "&&.checked": {
      color: theme.palette.secondary.main + " !important",
      "&& label": {
        color: theme.palette.text.main + " !important",
        "&::before": {
          backgroundColor: theme.palette.primary.main + " !important"
        }
      }
    },
    "&& *": {
      // backgroundColor: theme.palette.secondary.main + " !important",
      color: theme.palette.text.main + " !important"
    }
  },
  formControlLabel: {
    marginLeft: 0,
    "&& span": {
      marginLeft: 10
    }
  },
  formControl: {
    width: "100%"
  },
  submit: {
    marginTop: theme.spacing.unit * 3
  },
  rightIcon: {
    marginLeft: theme.spacing.unit
  },
  listRoot: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    padding: 0
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4
  },
  grid: {
    paddingBottom: "0px !important",
    paddingTop: "0px !important"
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
  dropZoneGrid: {
    height: 200,
    width: "100%",
    display: "flex"
  },
  customInpuntLabel: {
    margin: "10px",
    width: "100%"
  },
  customLinearProgress: {
    width: "100%",
    background: "none",
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50
  },
  customTypo: {
    fontSize: 18,
    marginBottom: 5
  },
  buttonShadow: {
    boxShadow: "1px 1px 8px rgba(0, 0, 0, 0.2) !important"
  }
});

export default styles;
