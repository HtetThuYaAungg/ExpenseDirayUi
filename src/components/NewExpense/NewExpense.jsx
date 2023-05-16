import React, { useState } from "react";
import "./NewExpense.css";
import ExpenseForm from "./ExpenseForm";

const NewExpense = ({ updateExpense, setUpdateExpense, isAddForm, setIsAddForm }) => {
  // const [isAddForm, setIsAddForm] = useState(false);

  // const saveExpenseDataHandler = (enteredExpenseData) => {
  //   const expenseData = {
  //     ...enteredExpenseData,
  //     id: Math.random().toString(),
  //   };
  //   props.onAddExpense(expenseData);
  // };


  const openAddForm = () => {
    setIsAddForm(true);
  };

  const closeAddForm = () => {
    setIsAddForm(false);
  };

  return (
    <>
      <div className="btnlayout">
        {!isAddForm && (
          <button className="openbutton" onClick={openAddForm}>
            Add New Expense
          </button>
        )}
      </div>
      {isAddForm && (
        <ExpenseForm
          // onSaveExpenseData={saveExpenseDataHandler}
          onClose={closeAddForm}
          setUpdateExpense={setUpdateExpense} updateExpense={updateExpense}
        />
      )}
    </>
  );
};

export default NewExpense;
