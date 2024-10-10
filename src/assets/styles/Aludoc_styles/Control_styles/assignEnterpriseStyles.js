const styles = (theme) => ({
  withError: {
    color: "red !important",
  },
  badge: {
    width: "100%",
    backgroundColor: theme.palette.primary.main,
  },
  confirmedCard: {
    backgroundColor: theme.palette.secondary.main,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  actions: {
    display: "flex",
    justifyContent: "flex-end",
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
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.grey[300],
  },
  switch: {
    colorSecondary: {
      color: "red",
    },
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
  submit: {
    position: "relative",
    display: "flex",
    width: "100%",
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  bigAvatar: {
    width: 60,
    height: 60,
  },
  fab: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.text.main,
    "&:hover": {
      backgroundColor: theme.palette.text.main,
      color: theme.palette.primary.main,
    },
  },
});

export default styles;
