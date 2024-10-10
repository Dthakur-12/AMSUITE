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
  InputTest: {
    backgroundColor: "red",
  },
  pagination: {
    // background: theme.palette.background.main + " !important",
    color: theme.palette.text.main + " !important",
  },
  emailTable: {
    background: "#ffffff12 !important",
    color: theme.palette.text.main + " !important",
  },
  tableHead: {
    background: "#0f0c0c4f !important",
    color: theme.palette.text.main + " !important",
    paddingTop: 0,
  },
  emailInput: {
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
  inputButton: {
    backgroundColor: theme.palette.primary.main + " !important",
    color: theme.palette.text.main + " !important",
  },
  addEmail: {
    color: theme.palette.text.main + " !important",
    "&:hover": {
      color: "#fff !important",
    },
  },
  leftIcon: {
    color: theme.palette.text.main + " !important",
  },
  deleteIcon: {
    cursor: "pointer",
    color: "#7b7b7b",
  },
  customDivider: {
    marginTop: 10,
    marginBottom: 10,
    width: "100%",
    background: theme.palette.textSecondary.main,
  },
});

export default styles;
