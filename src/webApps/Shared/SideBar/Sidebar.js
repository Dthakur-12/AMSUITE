// import React from "react";
// import { PropTypes } from "prop-types";
// import Tab from "./Tab";
// import MenuButton from "./MenuButton";
// import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
// import { withStyles } from "@mui/styles";
// import customStyles from "../../../assets/styles/Shared_Styles/SideBarStyles";
// import "./sidebar.css";

// const { MapComponent } = require("react-leaflet");

// const TabType = PropTypes.shape({
//   type: PropTypes.oneOf([Tab]),
// });

// class Sidebar extends MapComponent {
//   onClose(e) {
//     e.preventDefault();
//     e.stopPropagation();
//     this.props.onClose && this.props.onClose(e);
//   }

//   onOpen(e, tabid) {
//     e.preventDefault();
//     e.stopPropagation();
//     this.props.onOpen && this.props.onOpen(tabid);
//   }

//   handleClick = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     this.props.collapsed
//       ? this.props.onOpen && this.props.onOpen()
//       : this.props.onClose && this.props.onClose();
//   };

//   renderPanes(children) {
//     return React.Children.map(children, (p) =>
//       React.cloneElement(p, {
//         onClose: this.onClose.bind(this),
//         closeIcon: this.props.closeIcon,
//         active: !this.props.collapsed,
//         position: this.props.position || "left",
//       })
//     );
//   }

//   render() {
//     const { classes } = this.props;
//     const position = `${classes.sidebar} ${classes.sidebarRight} sidebar-${
//       this.props.position || "left"
//     }`;
//     const collapsed = this.props.collapsed ? " collapsed" : "";
//     // const tabs = React.Children.toArray(this.props.children);
//     // const bottomtabs = tabs.filter((t) => t.props.anchor === "bottom");
//     // const toptabs = tabs.filter((t) => t.props.anchor !== "bottom");

//     return (
//       <div
//         id={this.props.id}
//         className={`${classes.sidebar} sidebar leaflet-touch${position}${collapsed}`}
//         ref={(el) => {
//           this.rootElement = el;
//         }}
//       >
//         <div
//           className={`${classes.sidebarTabs} sidebar-tabs`}
//           onClick={this.handleClick}
//         >
//           {this.props.collapsed && (
//             <KeyboardArrowLeft
//               style={{
//                 width: "30px",
//                 paddingRight: 5,
//                 marginLeft: -5,
//               }}
//             />
//           )}
//           {!this.props.collapsed && (
//             <KeyboardArrowRight
//               style={{
//                 width: "30px",
//                 paddingRight: 5,
//                 marginLeft: -5,
//               }}
//             />
//           )}
//           {/* <ul role='tablist'>
//             {toptabs.map(t =>
//               <MenuButton
//                 key={t.props.id}
//                 id={t.props.id}
//                 icon={t.props.icon}
//                 disabled={t.props.disabled}
//                 selected={this.props.selected}
//                 collapsed={this.props.collapsed}
//                 onClose={this.props.onClose}
//                 onOpen={this.props.onOpen} />)}
//           </ul>
//           <ul role='tablist'>
//             {bottomtabs.map(t =>
//               <MenuButton
//                 key={t.props.id}
//                 id={t.props.id}
//                 icon={t.props.icon}
//                 disabled={t.props.disabled}
//                 selected={this.props.selected}
//                 collapsed={this.props.collapsed}
//                 onClose={this.props.onClose}
//                 onOpen={this.props.onOpen} />)}
//           </ul> */}
//         </div>
//         <div className={`${classes.sidebarContent} sidebar-content`}>
//           {this.renderPanes(this.props.children)}
//         </div>
//       </div>
//     );
//   }
// }

// Sidebar.propTypes = {
//   id: PropTypes.string.isRequired,
//   collapsed: PropTypes.bool,
//   position: PropTypes.oneOf(["left", "right"]),
//   selected: PropTypes.string,
//   closeIcon: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
//   onClose: PropTypes.func,
//   onOpen: PropTypes.func,
//   children: PropTypes.oneOfType([PropTypes.arrayOf(TabType), TabType]),
// };

// export default withStyles(customStyles, { withTheme: true })(Sidebar);

import React from "react";
import { PropTypes } from "prop-types";
import Tab from "./Tab";
import MenuButton from "./MenuButton";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import { withStyles } from "@mui/styles";
import customStyles from "../../../assets/styles/Shared_Styles/SideBarStyles";
import { useMap } from "react-leaflet"; // React Leaflet hook for accessing the map instance
import "./sidebar.css";

const TabType = PropTypes.shape({
  type: PropTypes.oneOf([Tab]),
});

const Sidebar = (props) => {
  const map = useMap(); // Access the map instance if needed

  const onClose = (e) => {
    e.preventDefault();
    e.stopPropagation();
    props.onClose && props.onClose(e);
  };

  const onOpen = (e, tabid) => {
    e.preventDefault();
    e.stopPropagation();
    props.onOpen && props.onOpen(tabid);
  };

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    props.collapsed
      ? props.onOpen && props.onOpen()
      : props.onClose && props.onClose();
  };

  const renderPanes = (children) => {
    return React.Children.map(children, (p) =>
      React.cloneElement(p, {
        onClose: onClose,
        closeIcon: props.closeIcon,
        active: !props.collapsed,
        position: props.position || "left",
      })
    );
  };

  const { classes } = props;
  const position = `${classes.sidebar} ${classes.sidebarRight} sidebar-${
    props.position || "left"
  }`;
  const collapsed = props.collapsed ? " collapsed" : "";

  return (
    <div
      id={props.id}
      className={`${classes.sidebar} sidebar leaflet-touch${position}${collapsed}`}
      ref={(el) => {
        this.rootElement = el;
      }}
    >
      <div
        className={`${classes.sidebarTabs} sidebar-tabs`}
        onClick={handleClick}
      >
        {props.collapsed && (
          <KeyboardArrowLeft
            style={{
              width: "30px",
              paddingRight: 5,
              marginLeft: -5,
            }}
          />
        )}
        {!props.collapsed && (
          <KeyboardArrowRight
            style={{
              width: "30px",
              paddingRight: 5,
              marginLeft: -5,
            }}
          />
        )}
      </div>
      <div className={`${classes.sidebarContent} sidebar-content`}>
        {renderPanes(props.children)}
      </div>
    </div>
  );
};

Sidebar.propTypes = {
  id: PropTypes.string.isRequired,
  collapsed: PropTypes.bool,
  position: PropTypes.oneOf(["left", "right"]),
  selected: PropTypes.string,
  closeIcon: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  onClose: PropTypes.func,
  onOpen: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.arrayOf(TabType), TabType]),
};

export default withStyles(customStyles, { withTheme: true })(Sidebar);
