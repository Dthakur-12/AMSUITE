
import { alpha } from "@mui/system";

const styles = theme => ({
  root: {
    position: "relative",
    backgroundColor: theme.palette.backgroundSecondary.main,
    MozUserSelect: "none",
    WebkitUserSelect: "none"
  },
  paper: {
    padding: theme.spacing.unit,
    textAlign: "center",
    color: theme.palette.textSecondary.main
  },
  tableRow: {
    margin: "0 !important"
  },
  overlay: {
    position: "absolute",
    backgroundColor: alpha(theme.palette.primary.main,0.4),
    pointerEvents: "none"
  },
  headerTime: {
    background: theme.palette.background.main,
    heigth: "60px",
    height: "30px",
    color: theme.palette.text.main
  }
});

export default styles;
