const styles = (theme) => ({
  margin: {
    margin: theme.spacing.unit,
  },
  withoutLabel: {
    marginTop: theme.spacing.unit * 3,
  },
  textField: {
    flexBasis: 200,
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },

  button: {
    margin: theme.spacing.unit,
    textTransform: "none",
    borderRadius: 0,
    paddingBottom: 0,
    color: theme.palette.text.main,
    borderBottom: "1px solid " + theme.palette.text.main,
    "&:hover": {
      background: "transparent",
      borderBottom: "1px solid " + theme.palette.primary.main,
    },
  },
  extendedIcon: {
    marginRight: theme.spacing.unit,
  },
});

export default styles;
