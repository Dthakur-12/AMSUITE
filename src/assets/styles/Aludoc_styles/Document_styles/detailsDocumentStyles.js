const styles = theme => ({
  layout: {
    width: "auto",
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    [theme.breakpoints.up(900 + theme.spacing.unit * 2 * 2)]: {
      width: 800,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  fill: {
    marginTop: theme.spacing.unit * 4,
    marginBottom: theme.spacing.unit * 4
  },
  paper: {
    [theme.breakpoints.up(900 + theme.spacing.unit * 3 * 2)]: {
      padding: theme.spacing.unit * 3
    },
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },

  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },

  textFieldLabel: {
    fontSize: "1.7vw"
  },
  textFieldInput: {
    marginTop: "4vh !important"
  },
  fileContainer: {
    display: "flex",
    flexWrap: "wrap",
    padding: 20
  }
});

export default styles;
