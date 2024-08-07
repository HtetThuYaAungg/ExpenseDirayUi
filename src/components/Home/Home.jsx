// import React from 'react';

// import Card from '../UI/Card/Card';
// import classes from './Home.module.css';

// const Home = (props) => {
//   return (
//     <Card className={classes.home}>
//       <h1>Welcome back!</h1>
//     </Card>
//   );
// };

// export default Home;


import React, { useEffect, useRef } from "react";
import { useState } from "react";
import ExpenseItem from "./../Expense/ExpenseItem/ExpenseItem"
import NewExpense from "../Expense/NewExpense/NewExpense"
import ExpenseFilter from "./../Expense/Filter/ExpenseFilter"
import classes from './Home.module.css';
// import "./App.css";
// import { API_URL } from "./api/api";
// import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { selectExpenses } from "../../features/expenses/expensesSlice";
import { fetchExpenses } from "../../features/expenses/expensesSlice";
import { selectExpensesStatus } from "../../features/expenses/expensesSlice";
import Card from "../UI/Card/Card";


const Home = (props) => {
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

  const dispatch = useDispatch();
  const data1 = useSelector(selectExpenses);
  const status = useSelector(selectExpensesStatus);
  const expenses = data1.getexpenses;

  const [updateExpense, setUpdateExpense] = useState("");
  const [isAddForm, setIsAddForm] = useState(false);

  useEffect(() => {
    dispatch(fetchExpenses());
  }, []);

  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     dispatch(fetchExpenses());
  //   },);
  //   return () => {
  //     clearInterval(timer);
  //   }
  // }, []);

  if (!expenses && status === 'loading') {
    return <div>Loading expenses...</div>;
  } else if (!expenses || status === 'failed') {
    return <div>Network Error....</div>;
  }


  // const [user, setUser] = useState([]);

  // const getUserData = async () => {
  //   try {
  //     const res = await axios.get("http://localhost:3000/api/todos", {
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });
  //     console.log("res", res.data);
  //     setUser(res.data);
  //   } catch (err) {

  //   }
  // };

  // useEffect(() => {
  //   const timeId = setInterval(() => {
  //     getUserData();
  //   }, 6000);
  //   return () => clearInterval(timeId);
  // }, []);

  // console.log("user", user)

  // useEffect(() => {
  //   getExpenseData();
  // }, []);

  //callback function new expense object
  const onAddExpense = async (expense) => {
    setExpenses((prevExpenses) => {
      return [expense, ...prevExpenses];
    });
    console.log("expense", expense);
  };

  const onEditExpense = async (expense) => {
    setUpdateExpense(expense);
    console.log("expense", expense);
  };
  //callback function new expense object

  const filterChangeHandler = (selectedYear) => {
    setFilterYear(selectedYear);
  };



  return (
    <main className="Home">
      <div className={classes.home}>
        <h2 className="text">Let's get started!</h2>
        <NewExpense onAddExpense={onAddExpense} isAddForm={isAddForm} setIsAddForm={setIsAddForm} setUpdateExpense={setUpdateExpense} updateExpense={updateExpense} />
        <ExpenseFilter
          selected={filterYear}
          onChangeFilter={filterChangeHandler}
          expenses={expenses}
        />
        <ExpenseItem data={expenses} filterYear={filterYear} setUpdateExpense={setUpdateExpense} setIsAddForm={setIsAddForm} />
      </div>
    </main>

  );
};

export default Home;