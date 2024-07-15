import React, { useState, useEffect } from "react";
import "./NewExpense.css";
import { API_URL } from "../../../api/api";
import axios from "axios";
import Swal from "sweetalert2";
import { ImSpinner2 } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";
import { addExpenses, editExpenses, fetchExpenses, selectAddExpensesStatus, selectEditExpensesStatus } from "../../../features/expenses/expensesSlice";
import Button from "../../UI/Button/Button";


const ExpenseForm = ({ onClose, updateExpense, setUpdateExpense }) => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [date, setDate] = useState("");
  const [image, setImage] = useState([]);
  const [isLoading, setIsLoading] = useState(false);


  // const [userInput, setUserInput] = useState({
  //     title: '',
  //     price: '',
  //     date: '',
  // });
  const dispatch = useDispatch();
  const addStatus = useSelector(selectAddExpensesStatus);
  const status = useSelector(selectEditExpensesStatus);




  useEffect(() => {
    if (status === "succeeded") {
      dispatch(fetchExpenses());
    }
  }, [status]);

  console.log({ status })

  useEffect(() => {
    if (addStatus === "succeeded") {
      dispatch(fetchExpenses());
    }
  }, [addStatus]);


  const imageFromInputChange = (e) => {
    // console.log(e.target.files[0]);
    setImage(e.target.files);
  };

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

  const canSave = [title, price, date, image].every(Boolean);

  const resetHandle = (event) => {
    event.preventDefault();
    onClose();
    setImage(""), setTitle(""), setPrice(""), setDate("");
  };

  const resetEditHandle = (event) => {
    event.preventDefault();
    onClose();
    setUpdateExpense("");
  };

  const editHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData();
      for (let i = 0; i < image.length; i++) {
        formData.append("photos", image[i] ? image[i] : updateExpense.imgpath);
      }

      formData.append("title", updateExpense.title);
      formData.append("price", updateExpense.price);
      formData.append("date", date ? date : updateExpense.date);

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      // const res = await axios.put(
      //   `${API_URL}/expense/${updateExpense.id}`,
      //   formData,
      //   config
      // );
      ;
      const res = dispatch(editExpenses({ id: updateExpense.id, expense: formData }, config));

      if (res) {
        setIsLoading(false);
        Swal.fire({
          toast: true,
          icon: "success",
          title: "Success!",
          position: "top",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      if (
        error.statusCode === 401 ||
        error.statusCode === 404 ||
        error.statusCode === 403
      ) {
        Swal.fire({
          toast: true,
          icon: "error",
          title: "Failed!",
          position: "top",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        // alert(error);
        Swal.fire({
          toast: true,
          icon: "error",
          title: "Lost Connection!",
          position: "top",
          showConfirmButton: false,
          timer: 1500,
        });
      }
      setIsLoading(false);
    }
    setUpdateExpense("");

  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      var formData = new FormData();
      formData.append("title", title);
      formData.append("price", price);
      formData.append("date", date);
      for (let i = 0; i < image.length; i++) {
        formData.append("photos", image[i]);
      }

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };


      // const res = await axios.post(`${API_URL}/expense`, formData, config);
      const res = dispatch(addExpenses(formData, config));


      if (res) {
        setIsLoading(false);
        Swal.fire({
          toast: true,
          icon: "success",
          title: "Success!",
          position: "top",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      if (
        error.statusCode === 401 ||
        error.statusCode === 404 ||
        error.statusCode === 403
      ) {
        Swal.fire({
          toast: true,
          icon: "error",
          title: "Failed!",
          position: "top",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        // alert(error);
        Swal.fire({
          toast: true,
          icon: "error",
          title: "Lost Connection!",
          position: "top",
          showConfirmButton: false,
          timer: 1500,
        });
      }
      setIsLoading(false);
    }

    setImage(""), setPrice(""), setDate(""), setTitle("");
  };

  // const submitHandler = (e) => {
  //   e.preventDefault();
  //   const expenseData = {
  //     title: title,
  //     price: price,
  //     date: new Date(date),
  //     photos: image
  //   };
  //   props.onSaveExpenseData(expenseData);

  //   setTitle("");
  //   setPrice("");
  //   setDate("");
  // };

  return (
    <>
      {updateExpense ? (
        <form className="new-expense" onSubmit={editHandler}>
          <div className="new-expense__controls">
            <div className="new-expense__control">
              <label>Title</label>
              <input type="text" value={updateExpense && updateExpense.title} onChange={(e) => setUpdateExpense({ ...updateExpense, title: e.target.value })} />
            </div>
            <div className="new-expense__control">
              <label>Price</label>
              <input
                type="number"
                min="1"
                step="1"
                value={updateExpense && updateExpense.price}
                onChange={(e) => setUpdateExpense({ ...updateExpense, price: e.target.value })}

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
            <div className="new-expense__control">
              <label>Photos</label>
              <input
                type="file"
                id="image"
                name="image"
                accept="image/png, image/gif, image/jpeg"
                onChange={imageFromInputChange}
                placeholder=""
                multiple
              />
            </div>
          </div>
          <div className="new-expense__actions">
            <button onClick={resetEditHandle}>Cancel</button>
            <button type="submit">
              {isLoading ? <ImSpinner2 className="animate-spin" /> : "Update"}
            </button>
          </div>
        </form>
      ) : (
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
                max={new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000).toISOString().split("T")[0]}
                id="dt"
                value={date}
                onChange={dateChangeHandler}
              />
            </div>
            <div className="new-expense__control">
              <label>Photos</label>
              <input
                type="file"
                id="image"
                name="image"
                accept="image/png, image/gif, image/jpeg"
                onChange={imageFromInputChange}
                placeholder=""
                required
                multiple
              />
            </div>
          </div>
          <div className="new-expense__actions">

            <Button onClick={resetHandle}>Cancel</Button>
            <Button disabled={!canSave} type="submit">
              {isLoading ? <ImSpinner2 className="animate-spin" /> : "ADDED"}
            </Button>
          </div>
        </form>
      )
      }
    </>
    // <>
    //   <form className="new-expense" onSubmit={submitHandler} >
    //     <div className="new-expense__controls">
    //       <div className="new-expense__control">
    //         <label>Title</label>
    //         <input type="text" value={title} onChange={titleChangeHandler} />
    //       </div>
    //       <div className="new-expense__control">
    //         <label>Price</label>
    //         <input
    //           type="number"
    //           min="1"
    //           step="1"
    //           value={price}
    //           onChange={priceChangeHandler}
    //         />
    //       </div>
    //       <div className="new-expense__control">
    //         <label>Date</label>
    //         <input
    //           type="date"
    //           min="2020-01-01"
    //           max="2023-12-31"
    //           value={date}
    //           onChange={dateChangeHandler}
    //         />
    //       </div>
    //       <div className="new-expense__control">
    //         <label>Photos</label>
    //         <input
    //           type="file"
    //           id="image"
    //           name="image"
    //           accept="image/png, image/gif, image/jpeg"
    //           onChange={imageFromInputChange}
    //           placeholder=""
    //           required
    //           multiple
    //         />
    //       </div>
    //     </div>
    //     <div className="new-expense__actions">
    //       {updateExpense ? (
    //         <div>
    //           <button onClick={resetEditHandle}>Cancel</button>
    //           <button onClick={editHandler}>
    //             {isLoading ? <ImSpinner2 className="animate-spin" /> : "Update"}
    //           </button>
    //         </div>

    //       ) : (
    //         <div>
    //           <button onClick={resetHandle}>Cancel</button>
    //           <button disabled={!canSave} type="submit">
    //             {isLoading ? <ImSpinner2 className="animate-spin" /> : "ADDED"}
    //           </button>
    //         </div>
    //       )}
    //     </div>
    //   </form >
    // </>
  );
};

export default ExpenseForm;
