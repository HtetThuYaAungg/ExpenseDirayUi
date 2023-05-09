import React from "react";
import ExpenseDate from "../ExpenseDate/ExpenseDate";
import "./ExpenseList.css";

const ExpenseList = ({ filterExpenses }) => {
  if (filterExpenses.length === 0) {
    return <h2 className="expense-list__fallback"> No Expense Found.</h2>;
  }

  return (
    <ul className="expense-list">
      {filterExpenses.map((data) => {
        return (
          <div key={data.id}>
            <div className="expense-item">
              <div className="expense-date">
                <ExpenseDate data={data.date} />
              </div>

              <div className="expense-item__description">
                <h2>{data.title}</h2>
                <div className="expense-item__price">${data.price}</div>
              </div>
            </div>
          </div>
        );
      })}
    </ul>
  );
};

export default ExpenseList;
