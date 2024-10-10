import { alpha } from "@mui/system";
const styles = theme => ({
  customStepActive: {
    background: theme.palette.primary.main + " !important",
    color: theme.palette.text.main + " !important",
    "&:after": {
      background: theme.palette.primary.main + " !important"
    },
    "&:hover": {
      background: theme.palette.textSecondary.main + " !important",
      "&:after": {
        background: theme.palette.textSecondary.main + " !important"
      }
    }
  },
  customStep: {
    background: theme.palette.background.main + " !important",
    color: theme.palette.textSecondary.main + " !important",
    "&:hover": { background: theme.palette.primary.main + " !important" }
  },
  customIcon: {
    color: theme.palette.text.main + " !important"
  },
  customGroup: {
    borderColor: alpha(theme.palette.primary.main, 0.2) + " !important"
  },
  customText: {
    color: theme.palette.text.main + " !important"
  }
});
export default styles;
