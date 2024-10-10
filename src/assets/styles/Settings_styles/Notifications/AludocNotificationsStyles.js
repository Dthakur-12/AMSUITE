import Pagination from "@mui/material/Pagination";
import { withStyles } from "@mui/styles";
;
import { alpha } from "@mui/system";

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
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    background:
      alpha(theme.palette.backgroundSecondary.main, 0.4) + " !important",
    "&:hover": {
      backgroundColor:
        alpha(theme.palette.backgroundSecondary.main, 0.5) + " !important"
    },
    width: "100%"
  },
  searchInput: {
    width: "100%",
    "&& input": {
      background: theme.palette.backgroundSecondary.main,
      borderColor: theme.palette.textSecondary.main,
      "&:focus": {
        background: alpha(theme.palette.backgroundSecondary.main, 0.5),
        color: theme.palette.text.main,
        borderColor: theme.palette.primary.main
      }
    },
    "&& i": {
      color: theme.palette.text.main
    }
  },
  checkBox: {
    margin: 5,
    // color: "#fff !important",
    "&&.checked": {
      color: theme.palette.secondary.main + " !important",
      "&& label": {
        color: theme.palette.text.main + " !important",
        "&::before": {
          backgroundColor: theme.palette.primary.main + " !important"
        }
      }
    },
    "&& *": {
      // backgroundColor: theme.palette.secondary.main + " !important",
      color: theme.palette.text.main + " !important"
    }
  },
  emailsContainer: {
    padding: 20,
    background: theme.palette.background.main,
    borderRadius: "10px"
  },
  message: {
    paddingBottom: "15px !important",
    fontSize: "1.08em"

    // "&&": {
    //   padding: 10,
    //   background: "#f9f6f600  !important",
    //   color: "#fff !important",
    //   border: "0px !important",
    //   boxShadow: "0 0 0 0 !important"
    //}
  },
  customDivider: {
    marginTop: 10,
    marginBottom: 10,
    width: "100%",
    background: theme.palette.textSecondary.main
  },
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
  paper: {
    width: "auto",
    marginTop: theme.spacing.unit * 6,
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    [theme.breakpoints.up(900 + theme.spacing.unit * 2 * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto"
    },
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`,
    [theme.breakpoints.up(900 + theme.spacing.unit * 3 * 2)]: {
      //marginBottom: theme.spacing.unit * 6
      padding: theme.spacing.unit * 3
    },
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  }
  //   ///////
  //   input: {
  //     display: "flex",
  //     padding: 0,
  //     "& span": {
  //       background: theme.palette.text.main
  //     }
  //   },
  //   //Select css
  //   valueContainer: {
  //     display: "flex",
  //     flex: 1,
  //     alignItems: "center",
  //     overflow: "hidden"
  //   },

  //   chip: {
  //     margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`
  //   },
  //   chipFocused: {
  //     backgroundColor: emphasize(
  //       theme.palette.mode === "light"
  //         ? theme.palette.grey[300]
  //         : theme.palette.grey[700],
  //       0.08
  //     )
  //   },
  //   noOptionsMessage: {
  //     padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`
  //   },
  //   singleValue: {
  //     fontSize: 16,
  //     width: "100%"
  //   },
  //   placeholder: {
  //     position: "absolute",
  //     left: 2,
  //     fontSize: 16
  //   },
  //   paperSelect: {
  //     position: "absolute",
  //     zIndex: 1,
  //     marginTop: theme.spacing.unit,
  //     left: 0,
  //     right: 0
  //   },
  //   avatar: {
  //     margin: theme.spacing.unit,
  //     color: theme.palette.text.main,
  //     backgroundColor: theme.palette.primary.main
  //   },
  //   submit: {
  //     marginTop: theme.spacing.unit * 3
  //   },
  //   rightIcon: {
  //     marginLeft: theme.spacing.unit
  //   },
  //   listRoot: {
  //     width: "100%",
  //     backgroundColor: theme.palette.backgroundSecondary.main,
  //     padding: 0
  //   },
  //   nested: {
  //     paddingLeft: theme.spacing.unit * 4
  //   },
  //   grid: {
  //     paddingBottom: "0px !important",
  //     paddingTop: "0px !important"
  //   },
  //   expand: {
  //     transform: "rotate(0deg)",
  //     transition: theme.transitions.create("transform", {
  //       duration: theme.transitions.duration.shortest
  //     })
  //   },
  //   expandOpen: {
  //     transform: "rotate(180deg)"
  //   },
  //   formControl: {
  //     margin: 0,
  //     border: 0,
  //     display: "inline-flex",
  //     padding: 0,
  //     position: "relative",
  //     minWidth: 0,
  //     flexDirection: "column",
  //     verticalAlign: "top",
  //     width: "100%"
  //   },
  //   formControlLabel: {
  //     top: 0,
  //     left: 0,
  //     position: "absolute",
  //     color: theme.palette.text.main,
  //     padding: 0,
  //     fontSize: "0.8rem",
  //     fontFamily: "'Lato', sans-serif",
  //     lineHeight: 1
  //   },
  //   select: {
  //     marginTop: 9
  //   },
  //   icon: {
  //     marginBottom: "5px"
  //   },
  //   confirmTitle: {
  //     "& h6": {
  //       display: "flex"
  //     }
  //   }
});

export default styles;
