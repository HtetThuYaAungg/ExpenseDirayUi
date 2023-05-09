import React from 'react'
import './ExpenseDate.css'

const ExpenseDate = ({data}) => {

    const dateObj = new Date(data);
    const month = dateObj.toLocaleString('en-US', { month: 'long' });
    const year = dateObj.getFullYear();
    const day = dateObj.toLocaleString('en-US', { day: '2-digit' });

  return (
    <div>
          <div className="expense-date__month">{month}</div>
          <div className="expense-date__year">{year}</div>
          <div className="expense-date__day">{day}</div>
    </div>
  )
}

export default ExpenseDate
