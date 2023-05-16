import React, { useEffect, useState } from "react";
import ExpenseDate from "../ExpenseDate/ExpenseDate";
import "./ExpenseList.css";
import { FaRegTimesCircle } from "react-icons/fa";
import { FaRegArrowAltCircleUp } from "react-icons/fa";
import axios from "axios";
import Swal from "sweetalert2";
import { API_URL } from "../../../api/api";
import { useDispatch, useSelector } from "react-redux";
import { deleteExpenses, fetchExpenses, selectDeleteExpensesStatus } from "../../../features/expenses/expensesSlice";


const ExpenseList = ({ filterExpenses, setUpdateExpense, setIsAddForm }) => {
  if (filterExpenses.length === 0) {
    return <h2 className="expense-list__fallback"> No Expense Found.</h2>;
  }

  const dispatch = useDispatch();
  const status = useSelector(selectDeleteExpensesStatus);


  useEffect(() => {
    if (status === "succeeded") {
      dispatch(fetchExpenses());
    }
  }, [status])

  //delete expenses
  const delExpense = async (id) => {
    Swal.fire({
      width: "230",
      text: "Permanently Delete!",
      showCancelButton: true,
      confirmButtonColor: "red",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.value) {

        dispatch(deleteExpenses(id));

        Swal.fire({
          toast: true,
          icon: "success",
          title: "Deleted!",
          position: "top",
          showConfirmButton: false,
          timer: 1500,
        });
      } else if (
        // Read more about handling dismissals
        result.dismiss === Swal.DismissReason.cancel
      ) {
        Swal.fire({
          toast: true,
          icon: "success",
          title: "Cancel!",
          position: "top",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  const openEditForm = () => {
    setIsAddForm(true);
  }


  return (
    <ul className="expense-list">
      {filterExpenses.map((data) => {
        return (
          <div key={data._id}>
            <div className="expense-item">
              <div className="expense-date">
                <ExpenseDate data={data.date} />
              </div>

              <div className="expense-item__description">
                <h2>{data.title}</h2>

                <div className="expense-item__price">${data.price}</div>
                <div className="expense-btn">
                  <button><FaRegArrowAltCircleUp className=" text-blue-700"
                    onClick={() => {

                      setUpdateExpense({
                        id: data._id,
                        date: data.date,
                        title: data.title,
                        price: data.price,
                        imgpath: data.imgpath
                      });
                      openEditForm();
                    }} /></button>
                  <button><FaRegTimesCircle onClick={() => delExpense(data._id)} className="text-red-700" /></button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </ul>
  );
};

export default ExpenseList;
