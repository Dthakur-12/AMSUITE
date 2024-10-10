import { alpha } from "@mui/system";
const styles = (theme) => ({
  circleDos: {
    color: theme.palette.textSecondary.main,
  },
  circle: {
    color: theme.palette.primary.main,
  },
  layout: {
    width: "auto",
    // backgroundColor: "red",
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
  avatarCreate: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.text.main,
  },
  avatarList: {
    width: 30,
    height: 30,
    color: theme.palette.text.main,
    backgroundColor: theme.palette.primary.main,
  },
  customDivider: {
    marginTop: 10,
    width: "100%",
    marginBottom: 10,
    backgroundColor: theme.palette.textSecondary.main,
  },
  paper: {
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${
      theme.spacing.unit * 3
    }px`,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      marginBottom: theme.spacing.unit * 6,
      padding: theme.spacing.unit * 3,
    },
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    color: theme.palette.text.main,
    backgroundColor: theme.palette.primary.main,
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: theme.palette.text.main,
  },

  errorButton: {
    backgroundColor: theme.palette.error.main,
    "&:hover": {
      backgroundColor: theme.palette.error.dark,
    },
  },

  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create("width"),
    width: "100%",
    color: theme.palette.text.main,
  },
  inputRoot: {
    color: "inherit",
    width: "100%",
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.background.main, 0.4),
    "&:hover": {
      backgroundColor: alpha(theme.palette.background.main, 0.5),
    },
    width: "100%",
  },
  customPagination: {
    "& *": {
      backgroundColor: "transparent",
    },
  },
});

export default styles;
