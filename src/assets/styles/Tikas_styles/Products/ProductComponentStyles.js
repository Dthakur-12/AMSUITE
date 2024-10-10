const styles = theme => ({
  card: {
    display: "flex",
    width: "100%"
  },
  details: {
    display: "flex",
    flexDirection: "column",
    height: "130px"
  },
  content: {
    flex: "1 0 auto",
    padding: 5,
    maxHeight: "55px"
  },
  cover: {
    width: "100%",
    height: "150px"
  },
  controls: {
    display: "flex",
    alignItems: "center",
    paddingLeft: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    "& button": {
      padding: 5,
      marginRight: 5
    }
  },
  editIcon: {
    color: theme.palette.primary.main,
    height: 20,
    width: 20
  },
  detailsListView: {
    display: "flex",
    height: "40px"
  },
  title: {
    textOverflow: "ellipsis",
    overFlow: "hidden"
  },
  customColorIcon: {
    color: theme.palette.primary.main
  }
});

export default styles;
