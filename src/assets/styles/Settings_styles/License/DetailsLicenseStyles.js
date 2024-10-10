const styles = theme => ({
  customTypo: { textAlign: "center" },
  customGrid: { padding: 10 },
  layout: {
    width: "auto",
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    [theme.breakpoints.up(900 + theme.spacing.unit * 2 * 2)]: {
      width: "90%",
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`,
    [theme.breakpoints.up(900 + theme.spacing.unit * 3 * 2)]: {
      marginBottom: theme.spacing.unit * 6,
      padding: theme.spacing.unit * 3
    },
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  licenseIcon: {
    height: "140px",
    width: "100%"
  },
  label: {
    background: "#727b81 !important",
    color: "#ffffff8c  !important",
    cursor: "context-menu !important"
  },
  button: {
    height: 40,
    width: "80px",
    padding: 15,
    background: "#296084",
    position: "absolute",
    bottom: 5,
    right: 5
  },
  productContainer: {
    display: "flex",
    justifyContent: "center",
    marginTop: 10,
    flexWrap: "wrap"
  }
});

export default styles;
