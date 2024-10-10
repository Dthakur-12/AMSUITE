import React from "react";
import "./ContextMenu.css";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import { withStyles } from '@mui/styles';
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import SendIcon from "@mui/icons-material/Send";
class CustomContext extends React.Component {
  constructor(props) {
    super(props);

    this.props = {
      visible: true,
      x: 0,
      y: 0,
    };
    this.contextRef = React.createRef();
  }

  componentDidMount() {
    var self = this;
    document.addEventListener("click", function (event) {
      //   if (self.contextRef.current.id == "customcontext") {
      //     self.click(event.target.getAttribute("index"));
      //   }
      event.preventDefault();
      self.setState({ visible: false, x: 0, y: 0 });
    });
  }

  click(index) {
    if (this.props.items[index].callback) this.props.items[index].callback();
    else {
      console.log("callback not registered for the menu item");
    }
  }

  returnMenu = (items) => {
    var myStyle = {
      position: "absolute",
      zIndex: 10000,
      top: `${this.props.y}px`,
      left: `${this.props.x + 5}px`,
    };
    const { classes } = this.props;
    return (
      <Paper
        className="custom-context"
        id="customcontext"
        style={myStyle}
        ref={this.contextRef}
      >
        <MenuList>
          {items.map((item, index, arr) => {
            //   if (arr.length - 1 == index) {
            return (
              <MenuItem
                key={index}
                className="custom-context-item-last"
                index={index}
                onClick={item.callback}
              >
                <ListItemIcon className={classes.icon}>
                  <SendIcon />
                </ListItemIcon>
                <ListItemText
                  classes={{ primary: classes.primary }}
                  inset
                  primary={item.label}
                />
              </MenuItem>
            );
            //   } else {
            //     return (
            //       <div key={index} className="custom-context-item" index={index}>
            //         {item.label}
            //       </div>
            //     );
            //   }
          })}
        </MenuList>
      </Paper>
    );
  };
  render() {
    return (
      <div id="cmenu">
        {this.props.visible ? this.returnMenu(this.props.items) : null}
      </div>
    );
  }
}

export default withStyles({}, { withTheme: true })(CustomContext);
