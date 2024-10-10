import { alpha } from "@mui/system";

const styles = (theme) => ({
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

  drawerOpen: {
    width: 240,
    transition: theme.transitions.create("all", {
      easing: theme.transitions.easing.sharp,
      duration: 500,
    }),
    left: 72,
    top: 62,
  },

  drawerClose: {
    transition: theme.transitions.create("all", {
      easing: theme.transitions.easing.sharp,
      duration: 500,
    }),
    width: 240,
    left: 72,
    top: 62,
    transform: "translate(-250px,0)",
  },
  table: {
    background: theme.palette.backgroundSecondary.main + "!important",
    color: theme.palette.text.main + " !important",
  },
  progress: {
    position: "absolute",
    top: "15%",
    right: "5%",
  },
  title: {
    background: theme.palette.backgroundSecondary.main + "!important",
    color: theme.palette.primary.main + " !important",
    padding: "0 0 5px 0 !important",
  },
  selected: {
    backgroundColor: theme.palette.primary.main + " !important",
    color: theme.palette.text.main + " !important",
  },
  fab: {
    position: "absolute",
  },
  filterContainerFixed: {
    position: "fixed",
    background: theme.palette.backgroundSecondary.main,
    bottom: 0,
    padding: 10,
  },
  filterContainer: {
    background: theme.palette.backgroundSecondary.main,
    minHeight: 400,
    padding: 10,
    width: "70%",
  },
  filterContainerSmall: { background: theme.palette.backgroundSecondary.main },
  paginationContainer: {
    position: "absolute",
    bottom: "10px",
    display: "flex",
    justifyContent: "center",
    width: "100%",
    maxWidth: 240,
  },
  paginationContainerSmall: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
  tabRoot: {
    minWidth: 50,
    backgroundColor: theme.palette.background.main,
  },
});

export default styles;
