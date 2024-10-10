import React, { Component } from "react";
import NavBarMustering from "../../../../utils/NavBarMustering";

class CustomizedContent extends Component {
  constructor(props) {
    super(props);
    const { options } = props;
    this.state = {
      options,
      selectedItem: -1
    };
  }

  componentDidMount() {
    NavBarMustering.hideLoader();
  }

  render() {
    const {
      root,
      depth,
      x,
      y,
      width,
      height,
      index,
      colors,
      name,
      value,
      selectedId,
      zonesInResults
    } = this.props;
    console.log("customizedContent.js/props",{props: this.props})
    const fillColor = colors[Math.floor((index / root.children.length) * 6)];
    const showFillColor = zonesInResults.includes(this.props.Id) 
        ? fillColor
        : "#404040";
    return (
      <g>
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          style={{
            cursor: "pointer",
            fill:
              // selectedId == this.props.Id ? "white" :
              depth < 2
                ? root.children != null
                  ?  showFillColor
                  : "none"
                : "none",
            stroke: "#fff",
            strokeWidth: 2 / (depth + 1e-10),
            strokeOpacity: 1 / (depth + 1e-10),
            // fillOpacity: zonesInResults.includes(this.props.Id) ? 1 : .6,
            
            
          }}
        />
        {depth === 1 ? (
          <text
            x={x + width / 2}
            y={y + height / 2 + 7}
            textAnchor="middle"
            fill={"#fff"}
            fontSize={14}
            stroke={"none"}
            color={ "#fff"}
          >
            {name}
          </text>
        ) : null}
        {depth === 1 ? (
          <text
            x={x + 4}
            y={y + 18}
            fill={"#fff"}
            fontSize={16}
            fillOpacity={0.9}
            stroke={"none"}
            color={"#fff"}
          >
            {/* {index + 1} */}
            {value}
          </text>
        ) : null}
      </g>
    );
  }
}

export default CustomizedContent;
