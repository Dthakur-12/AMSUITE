import { emphasize } from "@mui/system";
const styles = theme => ({
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
    // background: "rgba(20,20,20, .95) !important"
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
    margin: theme.spacing.unit
    // backgroundColor: theme.palette.primary.main,
    // color: "white"
  },
  // submit: {
  //   marginTop: theme.spacing.unit * 3
  // },
  rightIcon: {
    marginLeft: theme.spacing.unit
  },
  listRoot: {
    width: "100%",
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
  formControl: {
    margin: 0,
    border: 0,
    display: "inline-flex",
    padding: 0,
    position: "relative",
    minWidth: 0,
    flexDirection: "column",
    verticalAlign: "top",
    width: "100%"
  },
  formControlLabel: {
    top: 0,
    left: 0,
    position: "absolute",
    color: theme.palette.textSecondary.main,
    padding: 0,
    fontSize: "0.8rem",
    fontFamily: "'Lato', sans-serif",
    lineHeight: 1
  },
  select: {
    marginTop: 9
  },
  icon: {
    marginBottom: "5px"
  },
  confirmTitle: {
    "& h6": {
      display: "flex"
    }
  },
  fab: {
    minWidth:40,
    backgroundColor: theme.palette.primary.main
  },
  fabIcon: {
    color: theme.palette.text.main
  },
  primaryButton: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.text.main
  },
  //

  // fab: {
  //   backgroundColor: theme.palette.primary.main,
  //   color: theme.palette.text.main,
  //   "&:hover": {
  //     backgroundColor: theme.palette.text.main,
  //     color: theme.palette.primary.main
  //   }
  // },

  // paper: {
  //   padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
  //     .spacing.unit * 3}px`,
  //   [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
  //     marginBottom: theme.spacing.unit * 6
  //   },
  //   display: "flex",
  //   flexDirection: "column",
  //   alignItems: "center"
  // },

  submit: {
    position: "relative",
    display: "flex",
    width: "100%",
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "flex-end"
  },
  tablePagination: {
    "& *": {
      background: theme.palette.backgroundSecondary.main + " !important"
    }
  }
});
export default styles;
