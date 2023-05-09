import React, { useState } from "react";
import "./NewExpense.css";

const ExpenseForm = (props) => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [date, setDate] = useState("");

  // const [userInput, setUserInput] = useState({
  //     title: '',
  //     price: '',
  //     date: '',
  // });

  const titleChangeHandler = (e) => {
    setTitle(e.target.value);
    // setUserInput({
    //     ...userInput,
    //     title: e.target.value,

    // })
    // setUserInput((prevState) => {
    //     return {
    //         ...prevState,
    //         title: e.target.value
    //     };
    // });
  };

  const priceChangeHandler = (e) => {
    setPrice(e.target.value);
    // setUserInput({
    //     ...userInput,
    //     price :e.target.value,
    // })
  };

  const dateChangeHandler = (e) => {
    setDate(e.target.value);
    // setUserInput({
    //     ...userInput,
    //     date :e.target.value,
    // })
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const expenseData = {
      title: title,
      price: price,
      date: new Date(date),
    };
    props.onSaveExpenseData(expenseData);

    setTitle("");
    setPrice("");
    setDate("");
  };

  return (
    <form className="new-expense" onSubmit={submitHandler}>
      <div className="new-expense__controls">
        <div className="new-expense__control">
          <label>Title</label>
          <input type="text" value={title} onChange={titleChangeHandler} />
        </div>
        <div className="new-expense__control">
          <label>Price</label>
          <input
            type="number"
            min="1"
            step="1"
            value={price}
            onChange={priceChangeHandler}
          />
        </div>
        <div className="new-expense__control">
          <label>Date</label>
          <input
            type="date"
            min="2020-01-01"
            max="2023-12-31"
            value={date}
            onChange={dateChangeHandler}
          />
        </div>
      </div>
      <div className="new-expense__actions">
        <button onClick={props.onClose}>Cancel</button>
        <button type="submit">Add Expense</button>
      </div>
    </form>
  );
};

export default ExpenseForm;
