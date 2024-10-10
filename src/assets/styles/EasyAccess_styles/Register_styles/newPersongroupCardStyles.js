const styles = theme => ({
  badge: {
    width: "100%",
    backgroundColor: theme.palette.primary.main
  },
  confirmedCard: {
    backgroundColor: theme.palette.secondary.main
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  actions: {
    display: "flex",
    justifyContent: "flex-end"
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
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.grey[300]
  },
  bigAvatar: {
    width: 60,
    height: 60
  },
  fab: {
    minWidth:40,
    backgroundColor: theme.palette.primary.main
  },
  fabIcon: {
    color: theme.palette.text.main
  },
  primaryButton: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.text.main
  }
});
export default styles;
