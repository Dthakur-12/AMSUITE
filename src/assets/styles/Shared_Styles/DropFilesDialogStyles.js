const styles = theme => ({
  thumbsContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    width: "50%",
    marginLeft: "12px"
  },
  thumb: {
    display: "inline-flex",
    borderRadius: 2,
    border: "1px solid " + theme.plaette.text.main,
    margin: 0,
    width: "100%",
    padding: 4,
    boxSizing: "border-box",
    justifyContent: "center",
    alignItems: "center"
  },
  thumbInner: {
    minWidth: 0,
    overflow: "hidden",
    "& *": {
      color: theme.plaette.text.main + " !important"
    }
  },
  img: {
    display: "block",
    maxHeight: 150,
    maxWidth: "100%"
  },
  dropzone: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    width: "50%",
    borderWidth: 2,
    borderColor: theme.plaette.text.main + " !important",
    borderStyle: "dashed",
    borderRadius: 5,
    padding: 5,
    flexDirection: "column",
    cursor: "pointer"
  },
  customUploadCloudIcon: {
    color: theme.plaette.text.main + " !important"
  }
});

export default styles;
