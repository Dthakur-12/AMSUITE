const styles = theme => ({
  margin: {
    margin: theme.spacing.unit
  },
  withoutLabel: {
    marginTop: theme.spacing.unit * 3
  },
  textField: {
    flexBasis: 200
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120
  },
  button: {
    margin: theme.spacing.unit,
    textTransform: "none",
    borderRadius: 0,
    paddingBottom: 0,
    color: "white",

    borderBottom: "1px solid #FFFFFF",
    "&:hover": {
      background: "transparent",
      borderBottom: "1px solid " + theme.palette.primary.light
    }
  },
  extendedIcon: {
    marginRight: theme.spacing.unit
  }
});
export default styles;
