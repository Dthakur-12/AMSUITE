import { alpha } from "@mui/system";
const styles = theme => ({
  layout: {
    width: "auto",
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    [theme.breakpoints.up(400 + theme.spacing.unit * 2 * 2)]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
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
    backgroundColor: theme.palette.grey[300]
  },
  avatarCreate: {
    backgroundColor: theme.palette.primary.main
  },
  avatarList: {
    backgroundColor: theme.palette.grey[300],
    width: 30,
    height: 30
  },
  submit: {
    marginTop: theme.spacing.unit * 3
  },
  rightIcon: {
    marginLeft: theme.spacing.unit
  },
  grid: {
    paddingBottom: "0px !important",
    paddingTop: "0px !important",
    marginTop: "30px !important"
  },
  listRoot: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    padding: 0
  },
  nested: {
    padding: 0
  },
  disabledColor: {
    color: "white !important"
  },
  skeletonLoader: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    width: "100%"
  },
  buttonProgress: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
    color: "white"
  },
  wrapper: {
    margin: theme.spacing.unit,
    position: "relative"
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.background.main, 0.4),
    "&:hover": {
      backgroundColor: alpha(theme.palette.background.main, 0.5)
    },
    width: "100%"
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit",
    width: "100%"
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create("width"),
    width: "100%",
    color: "white"
  },
  errorButton: {
    backgroundColor: theme.palette.error.main,
    "&:hover": {
      backgroundColor: theme.palette.error.dark
    }
  }
});

export default styles;
