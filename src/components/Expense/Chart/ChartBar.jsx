import React from "react";
import "./ChartBar.css";

const ChartBar = (props) => {
  let chartBarHeight = "0%";

  if (props.maxValue > 0) {
    chartBarHeight = Math.round((props.value / props.maxValue) * 100) + "%";
    // console.log("chart", chartBarHeight);
  }

  // console.log("value", props.value);

  return (
    <div className="chart-bar">
      <div className="chart-bar__inner">
        <div
          className="chart-bar__fill"
          style={{ height: chartBarHeight }}
        ></div>
      </div>
      <div className="chart-bar__label">{props.label}</div>
    </div>
  );
};

export default ChartBar;
