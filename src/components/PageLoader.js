import React, { Component } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import LinearProgress from "@mui/material/LinearProgress";

let mounted = false;

class PageLoader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      completed: 0,
      buffer: 10
    };
  }

  componentDidMount() {
    mounted = true;
    this.timer = setInterval(this.progress, 200);
  }

  componentWillUnmount() {
    mounted = false;
  }

  progress = () => {
    if (mounted) {
      const { completed } = this.state;
      if (completed > 100) {
        this.setState({ completed: 0, buffer: 10 });
      } else {
        const diff = Math.random() * 10;
        const diff2 = Math.random() * 10;
        this.setState({
          completed: completed + diff,
          buffer: completed + diff + diff2
        });
      }
    }
  };

  render() {
    const { completed, buffer } = this.state;
    return (
      <div
        style={{
          display: "flex",
          flex: 1,
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh"
        }}
      >
        <CircularProgress size={50} style={{ marginBottom: 50 }} />
        <br />
        <LinearProgress
          variant="buffer"
          value={completed}
          valueBuffer={buffer}
          style={{ width: "50%" }}
        />
      </div>
    );
  }
}

export default PageLoader;
