const styles = theme => ({
  paper: {},
  avatar: {
    margin: theme.spacing.unit + " !important",
    color: theme.palette.text.main + " !important",
    backgroundColor: theme.palette.primary.main + " !important"
  },

  customButton: {
    color: theme.palette.text.main + " !important"
  },
  customDivider: {
    marginTop: 10,
    width: "100%",
    marginBottom: 10,
    backgroundColor: theme.palette.textSecondary.main
  },
  customtable: {
    background: theme.palette.background.main + " !important",
    color: theme.palette.text.main + " !important"
  },
  customColor: {
    color: theme.palette.text.main + " !important",
    background: theme.palette.background.main + " !important"
  },
  customDropDown: {
    background: theme.palette.backgroundSecondary.main + " !important",
    color: theme.palette.text.main + " !important",
    borderColor: theme.palette.textSecondary.main + " !important",
    "&:hover": {
      borderColor: theme.palette.primary.main + " !important"
    },
    "&:-webkit-input-placeholder": {
      /* Chrome, Firefox, Opera, Safari 10.1+ */
      color: "red",
      opacity: 1 /* Firefox */
    }
  },
  customTitle: {
    textAlign: "center"
  },
  avatarDiv: {
    display: "flex",
    justifyContent: "center"
  }
});
export default styles;
