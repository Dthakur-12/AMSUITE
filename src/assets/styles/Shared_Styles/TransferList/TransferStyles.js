const styles = (theme) => ({
  segment: {
    background: theme.palette.background.main + " !important",
  },
  inputsContainer: {
    display: "flex",
    flexDirection: "column",
    marginTop: "-30%",
  },
  button: {
    zIndex: "100",
  },
  customButtonNext: {
    zIndex: "100",
    color: theme.palette.text.main + " !important",
    background: theme.palette.background.main + " !important",
    "&:hover": {
      background: theme.palette.primary.main + " !important",
    },
  },
});

export default styles;
