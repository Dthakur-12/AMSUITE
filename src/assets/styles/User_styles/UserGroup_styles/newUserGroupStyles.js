const styles = theme => ({
  layout: {
    width: "auto",
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 2 * 2)]: {
      // width: 600
    }
  },
  paper: {
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`,
    [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
      marginBottom: theme.spacing.unit * 2,
      padding: theme.spacing.unit * 3
    },
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  customTitle: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center"
    // paddingRight: 15
  },
  fill: {
    marginTop: theme.spacing.unit * 10
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end"
  },
  avatarDiv: {
    display: "flex",
    justifyContent: "center"
  },
  chip: {
    margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`
  },
  button: {
    marginTop: theme.spacing.unit * 3,
    marginLeft: theme.spacing.unit
  },
  input: {
    display: "flex",
    padding: 0
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.grey[300]
  },
  submit: {
    marginTop: theme.spacing.unit * 3
  },
  submitNext: {
    position: "relative",
    display: "flex",
    width: "100%",
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    paddingBottom: theme.spacing.unit * 3
  },
  rightIcon: {
    marginLeft: theme.spacing.unit
  },
  grid: {
    paddingBottom: "0px !important",
    paddingTop: "0px !important"
  },
  appBar: {
    position: "fixed"
  },
  flex: {
    flex: 1
  },
  expand: {
    transform: "rotate(0deg)",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  customButton: {
    color: theme.palette.text.main + " !important"
  },
  customButtonNext: {
    color: theme.palette.text.main + " !important",
    background: theme.palette.background.main,
    "&:hover": {
      background: theme.palette.primary.main
    }
  }
});
export default styles;
