const styles = theme => ({
  badge: {
    backgroundColor: theme.palette.secondary.main
  },
  cardHeader: {
    paddingLeft: 10,
    paddingBottom: 0,
    paddingTop: 10
  },
  cardContent: {
    paddingTop: 0,
    paddingBottom: "10px !important"
  },
  actions: {
    display: "flex",
    justifyContent: "flex-end"
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.grey[300],
    width: 60,
    height: 60
  }
});

export default styles;
