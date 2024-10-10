import React, { Component } from "react";
import NavBarMustering from "../../../../utils/NavBarMustering";
import { Sector } from "recharts";
import { withTranslation } from "react-i18next";
class CustomizedContentPie extends Component {
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
    //const { root, depth, x, y, width, height, index, payload, colors, rank, name } = this.props;
    const { t } = this.props;
    const RADIAN = Math.PI / 180;
    const {
      cx,
      cy,
      midAngle,
      innerRadius,
      outerRadius,
      startAngle,
      endAngle,
      fill,
      payload,
      percent,
      value
    } = this.props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const COLORS = ["#1365AC", "#FF0000"];
    const textAnchor = cos >= 0 ? "start" : "end";
    return (
      <g>
        <text
          x={cx}
          y={cy}
          dy={8}
          textAnchor="middle"
          fill={COLORS[payload.Id]}
        >
          {payload.name}
        </text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={COLORS[payload.Id]}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 10}
          fill={COLORS[payload.Id]}
        />
        <path
          d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
          stroke={COLORS[payload.Id]}
          fill="none"
        />
        <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
        <text
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey}
          textAnchor={textAnchor}
          fill="#999"
        >{`${value} ${t("Persons")}`}</text>
        <text
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey}
          dy={18}
          textAnchor={textAnchor}
          fill="#999"
        >
          {`${(percent * 100).toFixed(0)}%`}
        </text>
      </g>
    );
  }
}

export default withTranslation()(CustomizedContentPie);
