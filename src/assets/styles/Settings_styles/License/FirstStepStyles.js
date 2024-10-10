const styles = theme => ({
  button: {
    height: 80,
    width: "100%",
    padding: 15,
    background: theme.palette.primary.main,
    color: theme.palette.text.main
  },

  inputButton: {
    borderRight: "solid 1px rgb(29, 165, 136)",
    borderRadius: 0,
    background: theme.palette.primary.main,
    color: theme.palette.text.main
    // "&:hover": {
    //   background: "#1a5945 !important"
    // }
  },

  tokenInput: {
    marginTop: 10,
    width: "100%",
    "& .button": {
      padding: 5,
      background: "#00b5ad",
      color: "#fff"
    }
  }
});

export default styles;
