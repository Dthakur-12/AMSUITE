import Pagination from "@mui/material/Pagination";
import { alpha } from "@mui/system";
import { withStyles } from '@mui/styles';
import { InputBase } from "@mui/material";

export const BootstrapInput = withStyles(theme => ({
  root: {
    "label + &": {},
    marginLeft: "10px"
  },
  input: {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.backgroundSecondary.main,
    border: "1px solid " + theme.palette.backgroundSecondary.main,
    fontSize: 16,
    width: "auto",
    padding: "10px 26px 10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(","),
    "&:focus": {
      borderRadius: 4,
      borderColor: theme.palette.primary.main,
      boxShadow: "0 0 0 0.2rem " + theme.palette.primary.main,
      backgroundColor: theme.palette.backgroundSecondary.main
    }
  }
}))(InputBase);

export const StyledPagination = withStyles(
  theme => ({
    colorInheritCurrent: {
      backgroundColor: theme.palette.primary.main + "!important",
      color: theme.palette.text.main + "!important"
    },
    colorInheritOther: {
      color: theme.palette.text.main + "!important",
      "&:hover": {
        backgroundColor: theme.palette.primary.main + "!important",
        color: theme.palette.text.main + "!important"
      }
    }
  }),
  { withTheme: true }
)(Pagination);

const styles = theme => ({
  layout: {
    width: "auto",
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2
  },
  paper: {
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
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

  input: {
    display: "flex",
    padding: 0
  },
  avatar: {
    color: theme.palette.text.main,
    backgroundColor: theme.palette.primary.main
  },
  avatarCreate: {
    color: theme.palette.text.main,
    backgroundColor: theme.palette.primary.main
  },
  avatarList: {
    backgroundColor: theme.palette.background.main + " !important",
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
    paddingLeft: theme.spacing.unit * 4
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
    justifyContent: "center",
    color: theme.palette.text.main
  },
  inputRoot: {
    color: theme.palette.text.main,
    width: "100%"
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create("width"),
    width: "100%",
    color: theme.palette.text.main
  },
  errorButton: {
    backgroundColor: theme.palette.error.main,
    "&:hover": {
      backgroundColor: theme.palette.error.dark
    }
  },
  toolbar: {},

  fab: {
    margin: theme.spacing.unit
  },
  toggleContainer: {
    height: 56,
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
    display: "flex",
    justifyContent: "flex-start",
    margin: `${theme.spacing.unit}px 0`,
    background: theme.palette.backgroundSecondary.main,
    flexWrap: "wrap",
    flexDirection: "column"
  },
  rightMenu: {
    display: "inline-flex",
    alignSelf: "flex-end",
    height: "100%"
  },

  toggleButton: {
    backgroundColor: theme.palette.backgroundSecondary.main,
    color: theme.palette.primary.main,
    height: "32px",
    alignSelf: "center"
  },

  checkBox: {
    position: "absolute",
    top: 10,
    padding: 0
  },
  checked: {},
  checkRoot: {
    "&$checked": {
      color: "#0962b9"
    }
  },
  listItem: {
    paddingLeft: 4,
    paddingTop: 5,
    paddingRight: 5,
    paddingBottom: 5,
    "&:hover": {
      background: alpha(theme.palette.primary.main, 0.5) + " !important"
    }
  },
  bottomActions: {
    position: "fixed",
    bottom: 10,
    right: 20,
    zIndex: 101
  },
  icon: {
    margin: "0px !important",
    fontSize: "2em !important",
    lineHeight: "25px !important"
  },
  customDivider: {
    backgroundColor: theme.palette.textSecondary.main,
    width: "100%",
    marginTop: 10,
    marginBottom: 10
  },
  customIcon: {
    color: theme.palette.text.main
  },
  customHover: {
    "&:hover": {
      backgroundColor: theme.palette.primary.main
    }
  },
  customButton: {
    color: theme.palette.text.main
  }
});

export default styles;
