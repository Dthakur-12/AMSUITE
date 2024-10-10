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

export const styles = (theme) => ({
  pagination: {
    // background: theme.palette.background.main + " !important",
    color: theme.palette.text.main + " !important",
  },
  deleteIcon: {
    cursor: "pointer",
    color: theme.palette.text.main,
  },
  tableHead: {
    background: "#0f0c0c4f !important",
    color: theme.palette.text.main + " !important",
  },
  elementTable: {
    background: "#ffffff12 !important",
    color: theme.palette.text.main + " !important",
  },
  leftIcon: {
    color: theme.palette.text.main + " !important",
  },
  inputButton: {
    backgroundColor: theme.palette.primary.main + " !important",
    color: theme.palette.text.main + " !important",
  },
  listInput: {
    width: "100%",
    "&& input": {
      background: "#ffffff17",
      color: "#fff",
    },
    "&& i": {
      color: "white",
    },
    "&& button": {
      background: theme.palette.primary.main,
      color: "#fff",
      "&:hover": {
        color: "#fff !important",
      },
      "&:focus": {
        background: theme.palette.primary.main + " !important",
      },
    },
    "&& :focus": {
      background: "#ffffff17 !important",
      color: theme.palette.text.main + " !important",
    },
  },
  customDivider: {
    marginTop: 10,
    width: "100%",
    marginBottom: 10,
    backgroundColor: theme.palette.textSecondary.main,
  },
  paperList: {
    boxShadow: "-1px -1px 14px -1px rgba(0,0,0,0.75)",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${
      theme.spacing.unit * 3
    }px`,
    [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
      padding: theme.spacing.unit * 3,
    },
    display: "flex",
    width: "95%",
    flexDirection: "column",
    alignItems: "center",
  },
  inputContainer: {
    padding: 24,
  },
});

export default styles;
