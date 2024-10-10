const drawerWidth = 240;
const styles = (theme) => ({
  root: {
    display: "flex",
    backgroundColor: theme.palette.background.main + " !important",
  },
  badge: {
    margin: theme.spacing.unit * 2,
    // height:"10px !important",
    // width:"10px !important"
  },
  appBar: {
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    background: theme.palette.background.main,
    zIndex: 1401,
  },
  appBarShift: {
    marginLeft: drawerWidth,
    paddingLeft: "0px !important",
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    color: theme.palette.text.main,
    marginLeft: 12,
    marginRight: 16,
    padding: "6px",
  },
  hide: {
    display: "none",
  },
  iconButton: {
    color: theme.palette.text.main,
  },
  drawerPaper: {
    overflowX: "hidden",
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    display: "flex",
    flexGrow: 1,
    flex: 1,
    minHeight: "100vh",
    zIndex: 1400,
    backgroundColor: theme.palette.secondary.main,
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing.unit * 9,
    },
    display: "flex",
    flexGrow: 1,
    flex: 1,
    minHeight: "100vh",
    minWidth: "70px",
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  bottomToolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    flex: 1,
    "& > div:nth-child(2)": {
      height: "100%",
    },
  },
  avatar: {
    color: theme.palette.text.main,
    backgroundColor: theme.palette.primary.main,
    margin: 0,
    width: 35,
    height: 35,
  },
  appLogoNavBar: {
    width: "60px",
    marginRight: 15,
  },
  appLogo: {
    width: "30%",
  },
});
export default styles;
