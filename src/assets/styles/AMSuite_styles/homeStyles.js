const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    minWidth: 300,
    width: "100%",
    alignItems: "center",
    padding: "5% 5% 0 10%",
    justifyContent: "center"
  },
  image: {
    position: "relative",
    height: 180,
    minWidth: 180,
    [theme.breakpoints.down('sm')]: {
      width: "60% !important", // Overrides inline-style
      height: 180
    },
    "&:hover, &$focusVisible": {
      zIndex: 1,
      "& $imageBackdrop": {
        opacity: 0.15
      },
      "& $imageMarked": {
        opacity: 0
      }
    },
    margin: "0 5% 5% 0",
    borderRadius: 25
  },
  focusVisible: {},
  imageButton: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: theme.palette.common.white,
    borderRadius: 25
  },
  imageSrc: {
    position: "relative",
    backgroundSize: "inherit",
    backgroundPosition: "center 40%",
    width: "100%",
    height: 180,
    borderRadius: 25
  },
  imageBackdrop: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
    transition: theme.transitions.create("opacity"),
    borderRadius: 25
  },
  imageTitle: {
    position: "relative",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 4}px ${theme
      .spacing.unit + 6}px`
  },
  imageMarked: {
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: "absolute",
    bottom: -2,
    left: "calc(50% - 9px)",
    transition: theme.transitions.create("opacity"),
    borderRadius: 25
  }
});
export default styles;
