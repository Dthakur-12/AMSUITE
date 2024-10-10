import { alpha } from "@mui/system";
import Pagination from "@mui/material/Pagination";
import { withStyles } from "@mui/styles";
;

export const StyledPagination = withStyles(
  (theme) => ({
    colorInheritCurrent: {
      backgroundColor: theme.palette.primary.main + "!important",
      color: theme.palette.text.main + "!important",
    },
    colorInheritOther: {
      color: theme.palette.text.main + "!important",
      "&:hover": {
        backgroundColor: theme.palette.primary.main + "!important",
        color: theme.palette.text.main + "!important",
      },
    },
  }),
  { withTheme: true }
)(Pagination);

const styles = (theme) => ({
  customCircularProgress2: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
    color: "white",
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
  searchInput: {
    width: "100%",
    "&& input": {
      background: theme.palette.backgroundSecondary.main,
      borderColor: theme.palette.textSecondary.main,
      "&:focus": {
        background: alpha(theme.palette.backgroundSecondary.main, 0.5),
        color: theme.palette.text.main,
        borderColor: theme.palette.primary.main,
      },
    },
    "&& i": {
      color: theme.palette.text.main,
    },
  },
  progress: {
    position: "absolute",
    top: "15%",
    right: "5%",
  },
  title: {
    background: theme.palette.backgroundSecondary.main + "!important",
    color: theme.palette.text.main + " !important",
  },
  selected: {
    backgroundColor: theme.palette.primary.main + " !important",
    color: theme.palette.text.main + " !important",
  },
  table: {
    background: theme.palette.backgroundSecondary.main + "!important",
    color: theme.palette.text.main + " !important",
  },
  row: { color: theme.palette.textSecondary.main },
  rowPair: { color: theme.palette.text.main },
  body: {
    verticalAlign: "inherit",
    backgroundColor: theme.palette.backgroundSecondary.main,
    color: theme.palette.text.main,
    lineHeight: "1.8",
    width: "auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    background: theme.palette.backgroundSecondary.main + "!important",
    color: theme.palette.text.main + " !important",
    fontSize: "1.5em",
  },
  backgroundHeader: {
    justifyContent: "center",
    display: "flex",
    backgroundColor: theme.palette.backgroundSecondary.main + "!important",
  },
});

export default styles;
