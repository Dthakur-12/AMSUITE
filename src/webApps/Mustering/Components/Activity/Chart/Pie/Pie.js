import React, { Component } from "react";
import { PieChart, Pie } from "recharts";
import CustomizedContent from "./CustomizedContentPie";

//const data = [{ name: 'Safe', value: 400, Id:0 }, { name: 'Unsafe', value: 300, Id:1 }];

const ChartPie = (props) => {
  const { data, options, filter, coreState, onPieEnter } = props;
  const { isDesktop, activeIndex } = coreState;
  console.log("ChartPie/Props",{props})
  return (
    <PieChart
      width={
        isDesktop
          ? window.innerWidth - window.innerWidth * 0.6
          : window.innerWidth
      }
      height={
        isDesktop
          ? window.innerHeight - window.innerHeight * 0.45
          : window.innerHeight - window.innerHeight * 0.7
      }
    >
      <Pie
        dataKey="value"
        activeIndex={activeIndex}
        activeShape={<CustomizedContent />}
        data={data}
        option={options}
        style={{cursor: "pointer"}}
        cx={
          isDesktop
            ? window.innerWidth - window.innerWidth * 0.8
            : window.innerWidth - window.innerWidth * 0.6
        }
        cy={
          isDesktop
            ? window.innerWidth - window.innerWidth * 0.88
            : window.innerWidth - window.innerWidth * 0.78
        }
        innerRadius={
          isDesktop
            ? window.innerWidth - window.innerWidth * 0.93
            : window.innerWidth - window.innerWidth * 0.85
        }
        outerRadius={
          isDesktop
            ? window.innerWidth - window.innerWidth * 0.92
            : window.innerWidth - window.innerWidth * 0.81
        }
        //fill={"#8884d8"}
        onMouseEnter={onPieEnter}
        onClick={(index) => {
          filter(index.Id === 0);
        }}
      />
    </PieChart>
  );
};

export default ChartPie;
