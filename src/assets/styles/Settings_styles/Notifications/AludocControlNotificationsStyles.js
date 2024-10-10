import green from "@mui/material/colors/green";
const styles = (theme) => ({
  checkBox: {
    margin: 5,
    "&&.checked": {
      color: theme.palette.primary.main + " !important",
      "&& label": {
        color: theme.palette.text.main + " !important",
        "&::before": {
          backgroundColor: theme.palette.primary.main + " !important",
        },
      },
    },
    "&& *": {
      color: theme.palette.text.main + " !important",
    },
  },
  notificationsContainer: {
    width: "100%",
    padding: "15px",
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "column",
    alignContent: "stretch",
    paddingLeft: "5%",
  },
  container: {
    background: theme.palette.background.main,
    borderRadius: "10px",
    marginLeft: "20px",
    paddingTop: "20px",
    position: "relative",
    [theme.breakpoints.down(900)]: {
      marginLeft: 0,
    },
  },
  circularProgress: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -25,
    marginLeft: -30,
  },
  contentLoader: {
    borderRadius: "10px",
    position: "absolute",
    top: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "#d0d0d080",
    zIndex: 9,
  },
  button: {
    color: theme.palette.text.main,
    backgroundColor: theme.palette.primary.main,
    "&:hover": {
      backgroundColor: theme.palette.textSecondary.main,
    },
  },
  buttonSuccess: {
    color: theme.palette.text.main,
    backgroundColor: green[600],
    "&:hover": {
      backgroundColor: theme.palette.textSecondary.main,
    },
  },
});

export default styles;
