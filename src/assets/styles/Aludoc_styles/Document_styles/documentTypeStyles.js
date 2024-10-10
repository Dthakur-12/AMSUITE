import { relativeTimeRounding } from "moment";

const styles = theme => ({
  skeletonLoader: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    width: "100%",
    padding: 80
  },
  circularProgress: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -25,
    marginLeft: -50
  },
  contentLoader: {
    display: "flex",
    position: "fixed",
    top: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "#d0d0d080"
  },
  contentShift: {
    [theme.breakpoints.down('lg')]: {
      width: "100% !important"
    },
    [theme.breakpoints.up("md")]: {
      width: `calc(100% - ${240 }px) !important`,
      transform: 'translate(240px,0)',
      transition: theme.transitions.create("all", {
        easing: theme.transitions.easing.sharp,
        duration: 500
      })
    },
    
  },
  content: {
    paddingLeft:20,
    position:"relative",
    width: "100%",
    [theme.breakpoints.down('lg')]: {
      width: "100%"
    },
    transition: theme.transitions.create("all", {
      easing: theme.transitions.easing.sharp,
      duration: 500
    })
  },
  fab:{
    position:"absolute",
    height:48,
    width:48,
    zIndex: 1,
    right:120,
    top:8

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
