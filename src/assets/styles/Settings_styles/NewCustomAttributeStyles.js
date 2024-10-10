import { emphasize } from "@mui/system";
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
    paddingBottom: 20,
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
    padding: 16,
  },

  layout: {
    //   width:
    //   backgroundColor: "red",
    padding: "2%",
    //marginLeft: theme.spacing.unit * 2,
    //marginRight: theme.spacing.unit * 2,
    // [theme.breakpoints.up(900 + theme.spacing.unit * 2 * 2)]: {
    //     width: 800,
    //marginLeft: "auto",
    //arginRight: "auto",
    //},
  },
  paper: {
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${
      theme.spacing.unit * 3
    }px`,
    [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
      marginBottom: theme.spacing.unit * 6,
      padding: theme.spacing.unit * 3,
    },
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  primaryButton: {
    [theme.breakpoints.down(650)]: {
      marginBottom: "21%",
      marginTop: "21%",
    },
  },
  attributeAvatar: {
    margin: theme.spacing.unit,
    color: theme.palette.text.main,
    backgroundColor: theme.palette.primary.main,
    [theme.breakpoints.down(650)]: {
      marginTop: "15%",
    },
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
    width: "100%",
  },
  formControlLabel: {
    marginTop: "10px",
    //   left: 0,
    //   position: "absolute",
    color: theme.palette.text.main,
    padding: 0,
    fontSize: "0.8rem",
    fontFamily: "'Lato', sans-serif",
    lineHeight: 1,
  },
  alignmentGrid: {
    display: "flex",
    flexDirection: "left",
    alignItems: "left",
    marginTop: "14px",
  },
  alignmentGridTypography: {
    display: "flex",
    flexDirection: "left",
    alignItems: "left",
  },
  customStepper: {
    padding: "0px",
    width: "100%",
  },
  circleDos: {
    color: theme.palette.textSecondary.main,
  },
  circle: {
    color: theme.palette.primary.main,
  },
  customStepButton: {
    margin: "0px",
    padding: "0px",
  },

  customTypo: {
    fontSize: "0.8rem",
    fontFamily: "'Lato', sans-serif",
    lineHeight: 1,
  },

  //---------select stylesss--------------------------------------
  input: {
    display: "flex",
    padding: 0,
    "& span": {
      background: theme.palette.text.main,
    },
  },

  valueContainer: {
    display: "flex",
    flex: 1,
    alignItems: "center",
    overflow: "hidden",
  },
  chip: {
    margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`,
  },
  chipFocused: {
    backgroundColor: emphasize(
      theme.palette.mode === "light"
        ? theme.palette.grey[300]
        : theme.palette.grey[700],
      0.08
    ),
  },
  noOptionsMessage: {
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
  },
  singleValue: {
    fontSize: 16,
    width: "100%",
  },
  placeholder: {
    position: "absolute",
    left: 2,
    fontSize: 16,
  },
  paperSelect: {
    position: "absolute",
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.grey[300],
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  listRoot: {
    width: "100%",
    backgroundColor: theme.palette.backgroundSecondary.main,
    padding: 0,
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
  grid: {
    paddingBottom: "0px !important",
    paddingTop: "0px !important",
  },
  expand: {
    transform: "rotate(0deg)",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  withError: {
    color: "#f44336 !important",
  },
  // customDivider: {
  //   marginTop: 10,
  //   width: "100%",
  //   marginBottom: 10,
  //   backgroundColor: theme.palette.textSecondary.main,
  // },
  customFab: {
    color: theme.palette.text.main,
    backgroundColor: theme.palette.primary.main,
  },
  //-----------------------------------------------------------------------
});

export default styles;
