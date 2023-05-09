import React from "react";
import "./ExpenseItem.css";
import ExpenseChart from "../ExpenseChart/ExpenseChart";
import ExpenseList from "../List/ExpenseList";
import Card from "../Card/Card";


const ExpenseItem = ({ data, filterYear }) => {
  const filterExpenses = data.filter((expense) => {
    return expense.date.getFullYear().toString() === filterYear;
  });

  return (
    <>
      <ExpenseChart expenses={filterExpenses} />
      <div className="expense">
        <Card>
          <ExpenseList filterExpenses={filterExpenses} />
        </Card>
      </div>
    </>
  );
};

export default ExpenseItem;
