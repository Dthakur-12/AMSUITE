const styles = theme => ({
  checkBox: {
    margin: 5,
    "&&.checked": {
      color: theme.palette.secondary.main + " !important",
      "&& label": {
        color: theme.palette.text.main + " !important",
        "&::before": {
          backgroundColor: theme.palette.primary.main + " !important"
        }
      }
    },
    "&& *": {
      color: theme.palette.text.main + " !important"
    }
  },
  customButton: {
    color: theme.palette.text.main + " !important"
  }
});

export default styles;
