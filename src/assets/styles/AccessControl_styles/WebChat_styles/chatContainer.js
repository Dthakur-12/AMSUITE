import { emphasize } from "@mui/system";
const styles = (theme) => ({
  messageContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    height: "100%",
    background: theme.palette.background.main,
    overflowY: "scroll",
    padding: 5,
    width: "100%",
    position: "relative",
  },
  chatBody: {
    position: "relative",
    height: "82%",
  },
  input: {
    width: "100%",
    height: "100%",
    "& input": {
      borderRadius: "0 0 10px 10px !important",
      border: 0,
      background: theme.palette.backgroundSecondary.main + " !important",
      color: theme.palette.text.main + " !important",
      border: 0 + " !important",
      "&:focus": {
        border: 0,
      },
    },
  },
  chatHeader: {
    height: "80px",
    background: theme.palette.primary.main,
    borderRadius: "10px 10px 0 0",
    display: "flex",
    alignItems: "center",
    height: "10%",
  },
  title: {
    textAlign: "center",
    width: "100%",
  },
  chatContainer: {
    zIndex: 10000,
    boxShadow: "0px 1px 5px #888888",
    borderRadius: 10,
    position: "fixed",
    bottom: 100,
    right: 20,
    width: "20%",
    height: "60%",
  },
  typingLoader: {
    position: "absolute",
    bottom: 0,
  },
  historyLoader: {
    marginLeft: "45%",
  },
  dateDivider: {
    margin: "10px !important",
    textAlign: "center",
    color: theme.palette.textSecondary.main,
  },
});

export default styles;
