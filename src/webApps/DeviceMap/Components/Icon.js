import React, { Component } from "react";
import { iconPerson } from "./CustomIcons";
export default class SVGIconComponent extends Component {
  render() {
    const perc = this.props.perc || 0;
    return perc != this.props.id ? (
      <svg
        version="1.1"
        id="Layer_1"
        x="0px"
        y="0px"
        viewBox="0 0 365 560"
        enable-background="new 0 0 365 560"
      >
        <g>
          <path
            fill="#00AEEF"
            d="M182.9,551.7c0,0.1,0.2,0.3,0.2,0.3S358.3,283,358.3,194.6c0-130.1-88.8-186.7-175.4-186.9   C96.3,7.9,7.5,64.5,7.5,194.6c0,88.4,175.3,357.4,175.3,357.4S182.9,551.7,182.9,551.7z M122.2,187.2c0-33.6,27.2-60.8,60.8-60.8   c33.6,0,60.8,27.2,60.8,60.8S216.5,248,182.9,248C149.4,248,122.2,220.8,122.2,187.2z"
          />
        </g>
      </svg>
    ) : (
      <svg
        width="40px"
        height="40px"
        viewBox="0 0 42 42"
        className="donut"
        aria-labelledby="beers-title beers-desc"
        role="img"
      >
        <circle
          className="donut-hole"
          cx="21"
          cy="21"
          r="15.91549430918954"
          fill={perc == this.props.id ? "red" : "white"}
          role="presentation"
        ></circle>
        <circle
          className="donut-ring"
          cx="21"
          cy="21"
          r="15.91549430918954"
          fill="transparent"
          stroke="#d2d3d4"
          strokeWidth="3"
          role="presentation"
        ></circle>
        <circle
          className="donut-segment"
          cx="21"
          cy="21"
          r="15.91549430918954"
          fill="transparent"
          stroke="#ce4b99"
          strokeWidth="3"
          strokeDasharray={`${perc} ${100 - perc}`}
          strokeDashoffset="25"
          aria-labelledby="donut-segment-1-title donut-segment-1-desc"
        ></circle>
        <g className="chart-text">
          <text className="chart-number" x="35%" y="60%">
            {perc}
          </text>
        </g>
      </svg>
    );
  }
}
