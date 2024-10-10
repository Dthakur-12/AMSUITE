import { alpha } from "@mui/system";
import { withStyles } from "@mui/styles";
;
import Pagination from "@mui/material/Pagination";

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
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.backgroundSecondary.main, 0.4),
    "&:hover": {
      backgroundColor: alpha(theme.palette.backgroundSecondary.main, 0.5),
    },
    width: "100%",
  },
  searchInput: {
    width: "100%",
    "&& input": {
      color: theme.palette.text.main + " !important",
      background: theme.palette.backgroundSecondary.main,
      "&:focus": {
        background: alpha(theme.palette.backgroundSecondary.main, 0.5),
        color: theme.palette.text.main + " !important",
        borderColor: theme.palette.primary.main,
      },
    },
    "&& i": {
      color: theme.palette.text.main + " !important",
    },
    "&& button":{
      background: theme.palette.primary.main,
    }
  },
  listContainer: {
    width: "100%",
  },
  loader: {
    width: "100%",
    height: "100%",
    position: "absolute",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: alpha(theme.palette.backgroundSecondary.main, 0.5),
  },
  paginationContainer: {
    // display: "flex",
    // alignSelf: "flex-end"
    marginBottom: 20,
  },
  listContainer: {
    // display: "flex",
    // flexWrap: "wrap",
    width: "100%",
    height: "100%",
    position:'relative',
    minHeight: 400,
    display: 'flex',
    flexDirection: 'column',
    justifyContent:'space-between'
  },
  itemText: {
    "&& span": {
      textOverflow: "ellipsis",
      overflow: "hidden",
      whiteSpace: "nowrap",
    },
  },
  customButtonNext: {
    color: theme.palette.text.main + " !important",
    background: theme.palette.background.main,
    "&:hover": {
      background: theme.palette.primary.main,
    },
  },
  // root: {
  //   color: "red",
  //   '&$checked': {
  //     color: "blue",
  //   },
  // },
  // checked: {},
});

export default styles;
