const styles = theme => ({
  customAlignment: { display: "flex", flexWrap: "wrap" },
  customTypo: { width: "100%", paddingLeft: 38 },
  licenseIcon: {
    height: "140px",
    width: "100%"
  },
  label: {
    background: theme.palette.background.main + " !important", //"#727b81 !important",
    color: theme.palette.text.main + " !important",
    cursor: "context-menu !important",
    marginTop: "5px !important"
  },
  button: {
    height: 40,
    width: "80px",
    padding: 15,
    background: theme.palette.primary.main,
    position: "absolute",
    bottom: 5,
    right: 5,
    color: theme.palette.text.main
  }
});

export default styles;
