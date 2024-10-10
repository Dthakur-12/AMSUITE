const styles = theme => ({
  dropzone: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    width: "80%",
    height: 130,
    borderWidth: 2,
    borderColor: theme.palette.text.main,
    borderStyle: "dashed",
    borderRadius: 5,
    padding: 5,
    flexDirection: "column",
    marginRight: 12,
    cursor: "pointer"
  },
  licenseIcon: {
    height: "95px",
    width: "100%"
  },
  button: {
    height: 80,
    width: "100%",
    padding: 15,
    background: theme.palette.primary.main,
    marginTop: 30,
    "&:disabled": {
      backgroundColor: "#797b7a33"
    }
    // "&:hover": {
    //   backgroundColor: "#053e6380"
    // }
  },
  licenseName: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    paddingLeft: 10
  },
  checkIcon: {
    position: "absolute",
    top: "-4px",
    right: "-10px",
    fontSize: "3em !important",
    color: "#0cb10c"
  },
  divAlignment: { width: "20%", height: 130, position: "relative" }
});

export default styles;
