import React, { useEffect, useState } from "react";
import ExpenseDate from "../ExpenseDate/ExpenseDate";
import "./ExpenseList.css";
import { FaArrowAltCircleDown, FaRegTimesCircle, FaChevronRight } from "react-icons/fa";
import { FaRegArrowAltCircleUp } from "react-icons/fa";
import axios from "axios";
import Swal from "sweetalert2";
import { API_URL } from "../../../api/api";
import { useDispatch, useSelector } from "react-redux";
import { deleteExpenses, fetchExpenses, selectDeleteExpensesStatus } from "../../../features/expenses/expensesSlice";
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import { Avatar, Box } from "@mui/material";
import { green } from "@mui/material/colors";
import SimpleImageSlider from "react-simple-image-slider";
import Card from "../Card/Card";
import ImageSlider from "./ImageSlider";




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


  const [isVisible, setIsVisible] = useState(false);


  useEffect(() => {
    // Show the button when the user scrolls 500px down from the top
    const handleScroll = () => {
      if (window.pageYOffset > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener when the component is unmounted
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };


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
                {/* <Slide>
                  {data.imgpath.map((fadeImage, index) => (
                    <div key={index}>
                      <img style={{ width: '100%' }} src={fadeImage.url} />
                      <h2>{fadeImage.caption}</h2>
                    </div>
                  ))}
                </Slide> */}


                {/* <Card className={classes.card}>
                    <SimpleImageSlider
                      className="expense-item__slide"
                      width={50}
                      height={50}
                      overflow={'hidden'}
                      border={4}
                      borderRadius={50}
                      images={data.imgpath}
                      showBullets={false}
                      showBulletsSize={1}
                      showNavs={true}
                      loop={true}
                      autoPlay={true}
                      autoPlayDelay={5}
                      startIndex={true}
                      // useGPURender={useGPURender}
                      // navStyle={navStyle}
                      navSize={10}
                      navMargin={1}
                      navPadding={5}
                      bulletMargin={6}
                    // slideDuration={duration}
                    // onClick={onClick}
                    // onClickNav={onClickNav}
                    // onClickBullets={onClickBullets}
                    // onStartSlide={onStartSlide}
                    // onCompleteSlide={onCompleteSlide}
                    />
                  </Card> */}

                <ImageSlider data={data} />





                {/* <div className="">

                  <Box padding={0} display="flex">
                    {data.imgpath.map((image, index) => (
                      <Box key={index} mr={1}>

                        <Avatar
                          sx={{
                            width: 30,
                            height: 30,
                            border: 0.8,
                            borderColor: green[900],
                            boxShadow: 10,
                          }}
                          src={image}
                        />

                      </Box>
                    ))}
                  </Box>

                </div> */}
                <div className="expense-item__price">${data.price}</div>
                <div className="expense-btn">
                  <button><FaRegArrowAltCircleUp className=" text-blue-700"
                    onClick={() => {
                      scrollToTop();
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
