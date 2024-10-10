import { emphasize } from "@mui/system";

const styles = theme => ({
  layout: {
    width: "auto",
    // backgroundColor: "red",
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
  textTab: {
    color: theme.palette.text.main
  },
  paper: {
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`,
    [theme.breakpoints.up(900 + theme.spacing.unit * 3 * 2)]: {
      marginBottom: theme.spacing.unit * 6,
      padding: theme.spacing.unit * 3
    },
    backgroundColor: theme.palette.backgroundSecondary.main,
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
    color: theme.palette.text.main,
    backgroundColor: theme.palette.primary.main
  },
  checkBox: {
    margin: 5,
    color: "#fff !important",
    "&&.checked": {
      "&& label": {
        color: "#fff !important"
      }
    },
    "&& *": {
      color: "#fff !important"
    }
  },
  customDivider: {
    marginTop: 10,
    width: "100%",
    marginBottom: 10,
    backgroundColor: theme.palette.textSecondary.main
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
    paddingBottom: "10px !important",
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
  cropContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: "80px"
  },
  cropper: {
    height: "100%",
    width: "100%",
    display: "flex",
    justifyContent: "center"
  },
  customLinearProgress: {
    width: "100%",
    background: "none",
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50
  },
  customCircularProgress: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
    color: "white"
  },
  dropzone: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    width: "80%",
    height: 130,
    borderWidth: 2,
    borderColor: theme.palette.text.main,
    borderStyle: "dashed",
    borderRadius: 5,
    padding: 5,
    flexDirection: "column",
    marginRight: 12,
    cursor: "pointer"
  },
  licenseIcon: {
    height: "95px",
    width: "100%"
  },
  button: {
    height: 80,
    width: "100%",
    padding: 15,
    background: theme.palette.primary.main,
    marginTop: 30,
    "&:disabled": {
      backgroundColor: "#797b7a33"
    }
    // "&:hover": {
    //   backgroundColor: "#053e6380"
    // }
  },
  licenseName: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    paddingLeft: 10
  },
  checkIcon: {
    position: "absolute",
    top: "-4px",
    right: "-10px",
    fontSize: "3em !important",
    color: "#0cb10c"
  },
  divAlignment: { width: "20%", height: 130, position: "relative" }
});

export default styles;
