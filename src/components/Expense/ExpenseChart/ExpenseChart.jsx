import React from "react";
import Chart from "../Chart/Chart";

const ExpenseChart = (props) => {
  const chartDataPoints = [
    { label: "Jan", value: 0 },
    { label: "Feb", value: 0 },
    { label: "Mar", value: 0 },
    { label: "Apr", value: 0 },
    { label: "May", value: 0 },
    { label: "Jun", value: 0 },
    { label: "Jul", value: 0 },
    { label: "Arg", value: 0 },
    { label: "Sep", value: 0 },
    { label: "Oct", value: 0 },
    { label: "Nov", value: 0 },
    { label: "Dec", value: 0 },
  ];

  for (const expense of props.expenses) {
    const dateObj = new Date(expense.date);
    const expenseMonth = dateObj.getMonth();

    chartDataPoints[expenseMonth].value += Number(expense.price);
  }

  return (
    <div>
      <Chart dataPoints={chartDataPoints} />
    </div>
  );
};

export default ExpenseChart;
