const styles = theme => ({
  card: {
    "& .content": {
      padding: "8px !important"
    },
    background: "#0f3e5dc7  !important",
    cursor: "context-menu !important",
    maxHeight: "100px",
    "& .header": { color: "#fff !important", fontSize: "1em !important" },
    "& .meta": { color: "#ffffff8c !important" },
    "& .description": { color: "#ffffff8c !important" }
  },
  error: {
    color: "#bf5e5e"
  }
});

export default styles;
