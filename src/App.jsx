import React from 'react'
import { useState } from "react";
import ExpenseItem from "./components/Expense/ExpenseItem/ExpenseItem";
import ExpenseFilter from "./components/Expense/Filter/ExpenseFilter";
import NewExpense from "./components/NewExpense/NewExpense";
import "./App.css";

const App = () => {

  const [filterYear, setFilterYear] = useState("2023");

  const data = [
    {
      id: "e1",
      title: "Toilet Paper",
      price: 94.12,
      date: new Date(2020, 7, 14),
    },
    { id: "e2", title: "New TV", price: 799.49, date: new Date(2021, 2, 12) },
    {
      id: "e3",
      title: "Car Insurance",
      price: 294.67,
      date: new Date(2021, 2, 28),
    },
    {
      id: "e4",
      title: "New Desk (Wooden)",
      price: 450,
      date: new Date(2021, 5, 12),
    },
  ];

  const [expenses, setExpenses] = useState(data);

  const onAddExpense = (expense) => {
    setExpenses((prevExpenses) => {
      return [expense, ...prevExpenses];
    });
    console.log("expense", expense);
  };

  const filterChangeHandler = (selectedYear) => {
    setFilterYear(selectedYear);
  };


  return (
    <div>
      <h2 className="text">Let's get started!</h2>
      <NewExpense onAddExpense={onAddExpense} />
      <ExpenseFilter
        selected={filterYear}
        onChangeFilter={filterChangeHandler}
      />
      <ExpenseItem data={expenses} filterYear={filterYear} />
    </div>
  )
}

export default App

