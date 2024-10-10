import { emphasize } from "@mui/system";

const styles = (theme) => ({
  layout: {
    [theme.breakpoints.down(900 + theme.spacing.unit * 2 * 2)]: {
      width: "auto",
    },
    [theme.breakpoints.up(900 + theme.spacing.unit * 2 * 2)]: {
      width: 800,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  fill: {
    marginTop: theme.spacing.unit * 6,
  },
  paper: {
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${
      theme.spacing.unit * 3
    }px`,
    [theme.breakpoints.up(900 + theme.spacing.unit * 3 * 2)]: {
      marginBottom: theme.spacing.unit * 6,
      padding: theme.spacing.unit * 3,
    },
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
  },
  button: {
    marginTop: theme.spacing.unit * 3,
    marginLeft: theme.spacing.unit,
  },
  buttonSemantic: {
    backgroundColor: theme.palette.primary.main + " !important",
    color: theme.palette.text.main + " !important",
  },
  tikasSettingsContainer: {
    display: "flex",
    justifyContent: "center",
    padding: 4,
    marginBottom: 15,
  },
  printersContainer: {
    padding: 20,
    background: theme.palette.background.main,
    borderRadius: "10px",
  },
  customDivider: {
    marginTop: 10,
    marginBottom: 10,
    width: "100%",
    background: theme.palette.textSecondary.main,
  },
});

export default styles;
