import React from "react";
import "./ExpenseItem.css";
import ExpenseChart from "../ExpenseChart/ExpenseChart";
import ExpenseList from "../List/ExpenseList";
import Card from "../Card/Card";


const ExpenseItem = ({ data, filterYear, setUpdateExpense, setIsAddForm }) => {


  const filterExpenses = data.filter((expense) => {
    // console.log("data", expense.date);
    const dateObj = new Date(expense.date);

    return dateObj.getFullYear() === parseInt(filterYear);

  });

  return (
    <>
      <ExpenseChart expenses={filterExpenses} />
      <div className="expense">
        <Card>
          <ExpenseList filterExpenses={filterExpenses} setUpdateExpense={setUpdateExpense} setIsAddForm={setIsAddForm} />
        </Card>
      </div>
    </>
  );
};

export default ExpenseItem;
