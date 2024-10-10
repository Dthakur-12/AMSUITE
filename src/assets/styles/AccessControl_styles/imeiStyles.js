import Pagination from "@mui/material/Pagination";
import { withStyles } from "@mui/styles";
;

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
  fill: {
    marginTop: theme.spacing.unit * 6
  },
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
  elementTable: {
    background: theme.palette.backgroundSecondary.main + " !important",
    color: theme.palette.text.main + " !important"
  },
  tableHead: {
    background: theme.palette.background.main + " !important",
    color: theme.palette.text.main + " !important"
  },

  imeiInput: {
    width: "100%",
    "&& input": {
      background: theme.palette.backgroundSecondary.main + " !important",
      color: theme.palette.text.main + " !important"
    },
    "&& i": {
      color: theme.palette.text.main + " !important"
    },
    "&& button": {
      background: theme.palette.primary.main + " !important",
      color: theme.palette.text.main + " !important",
      "&:hover": {
        color: theme.palette.text.main + " !important"
      },
      "&:focus": {
        background: theme.palette.text.main + " !important"
      }
    },
    "&& :focus": {
      background: theme.palette.backgroundSecondary.main + " !important",
      color: theme.palette.text.main + " !important"
    }
  },
  deleteIcon: {
    cursor: "pointer",
    color: theme.palette.text.main + " !important"
  },
  editIcon: {
    cursor: "pointer",
    color: theme.palette.text.main + " !important"
  },
  customFab: {
    color: theme.palette.text.main,
    backgroundColor: theme.palette.primary.main
  },
  customDivider: {
    marginTop: 10,
    backgroundColor: theme.palette.textSecondary.main,
    width: "100%",
    marginBottom: 0
  },
  confirmButton: {
    backgroundColor: theme.palette.primary.main + " !important",
    color: theme.palette.text.main + " !important"
  },
  cancelButton: {
    backgroundColor: theme.palette.backgroundSecondary.main + " !important",
    color: theme.palette.text.main + " !important"
  }
});
export default styles;
