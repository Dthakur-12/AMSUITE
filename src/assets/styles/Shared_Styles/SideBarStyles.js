import { emphasize } from "@mui/system";
const styles = (theme) => ({
  sidebar: {
    position: "absolute",
    top: 0,
    width: "100%",
    overflow: "hidden",
    zIndex: 2000,
    boxShadow: "none",
    [theme.breakpoints.up("md")]: {
      width: "305px",
    },
    [theme.breakpoints.up("lg")]: {
      width: "260px",
    },
    [theme.breakpoints.down('md')]: {
      top: 10,
      bottom: 10,
      transition: "width 0.5s",
    },
    "& collapsed": {
      width: "19px",
      "& > sideBarContent": {
        overflowY: "hidden",
      },
    },
  },
  sidebarLeft: {
    left: 0,
    "& sideBarContent": {
      left: 19,
      right: 0,
    },
    "& sidebarHeader": {
      paddingRight: 60,
    },
    "& sidebarClose": {
      right: 0,
    },
  },
  sidebarRight: {
    right: 0,
    "& sideBarContent": {
      left: 0,
      right: 19,
    },
    "& sidebarHeader": {
      paddingLeft: 60,
    },
    "& sidebarClose": {
      left: 0,
    },
  },
  sidebarTabs: {
    position: "absolute",
    top: 0,
    bottom: 0,
    height: 80,
    backgroundColor: theme.palette.background.main,
    width: 19,
    margin: 0,
    padding: 0,
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    boxShadow: "0 1px 5px rgba(0, 0, 0, 0.65)",
    border: "2px solid rgba(0, 0, 0, 0.2)",
    '& > svg':{
        color: theme.palette.text.main
    }
  },
  sidebarContent: {
    position: "absolute",
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.background.main,
    overflowX: "hidden",
    overflowY: "auto",
  },
  sidebarPane: {
    display: "none",
    left: 0,
    right: 0,
    boxSizing: "border-box",
    "&$active": {
      display: "block",
    },
    /* padding: 10px 20px, */
  },

  sidebarHeader: {
    margin: "-10px -20px 0",
    height: "40px",
    padding: "0 20px",
    lineHeight: "40px",
    fontSize: "14.4pt",
    color: theme.palette.text.main,
    backgroundColor: theme.palette.background.main,
  },

  sidebarClose: {
    position: "absolute",
    top: 0,
    width: 40,
    height: 40,
    textAlign: "center",
    cursor: "pointer",
  },

  //   sidebarLeft ~ sidebar-map {
  //     marginLeft: 19px,
  //   },
  //   sidebarRight ~ sidebar-map {
  //     marginRight: 19px,
  //   },
  //   sidebar.leafletTouch {
  //     boxShadow: none,
  //   },
  //   @media (minWidth: 768px) and (maxWidth: 991px) {
  //     sidebarLeft ~ sidebar-map .leafletLeft {
  //       left: 315px,
  //     },
  //     sidebarRight ~ sidebar-map .leafletRight {
  //       right: 315px,
  //     },
  //   },
  //   @media (minWidth: 992px) and (maxWidth: 1199px) {
  //     sidebarPane {
  //       minWidth: 260px,
  //     },
  //     sidebarLeft ~ sidebar-map .leafletLeft {
  //       left: 400px,
  //     },
  //     sidebarRight ~ sidebar-map .leafletRight {
  //       right: 400px,
  //     },
  //   },
  //   @media (minWidth: 1200px) {
  //     sidebarPane {
  //       minWidth: 260px,
  //     },
  //     sidebarLeft ~ sidebar-map .leafletLeft {
  //       left: 470px,
  //     },
  //     sidebarRight ~ sidebar-map .leafletRight {
  //       right: 470px,
  //     },
  //   },
  //   @media (minWidth: 768px) {
  //     sidebarLeft ~ sidebar-map {
  //       marginLeft: 0,
  //     },
  //     sidebarRight ~ sidebar-map {
  //       marginRight: 0,
  //     },
  //     sidebar {
  //       borderRadius: 4px,
  //     },
  //     sidebarLeft ~ sidebar-map .leafletLeft {
  //       transition: left 0.5s,
  //     },
  //     sidebarLeft.collapsed ~ sidebar-map .leafletLeft {
  //       left: 50px,
  //     },
  //     sidebarRight ~ sidebar-map .leafletRight {
  //       transition: right 0.5s,
  //     },
  //     sidebarRight.collapsed ~ sidebar-map .leafletRight {
  //       right: 50px,
  //     },
  //   },
});
export default styles;
