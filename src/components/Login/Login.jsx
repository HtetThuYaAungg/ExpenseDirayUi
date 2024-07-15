import React, { useContext, useEffect, useReducer, useState } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from '../../store/AuthContext';
import Input from '../UI/Input/Input';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const emailReducer = (state, action) => {
  if (action.type === 'USER_INPUT') {
    return { value: action.val, isValid: action.val.includes('@') };
  }
  if (action.type === 'INPUT_BLUR') {
    return { value: state.value, isValid: state.value.includes('@') };

  }
  return { value: '', isValid: false };
}

const passwordReducer = (state, action) => {
  if (action.type === 'USER_INPUT') {
    return { value: action.val, isValid: action.val.trim().length > 6 }
  }
  if (action.type === 'INPUT_BLUR') {
    return { value: state.value, isValid: state.value.trim().length > 6 }
  }
  return { vlaue: '', isValid: false };
}

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);



  const [emailState, emailDispatch] = useReducer(emailReducer, { value: '', isValid: null });

  const [passwordState, passwordDispatch] = useReducer(passwordReducer, { value: '', isValid: null });


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

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const navigate = useNavigate();

  const ctx = useContext(AuthContext)


  useEffect(() => {
    console.log("Effect Running")
    return () => {
      console.log("Effect CleanUP")
    }
  }, []);

  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;

  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log("checking for valid");
      setFormIsValid(
        emailIsValid && passwordIsValid
      );
    }, 500);
    return () => {

      console.log("cleanup");
      clearTimeout(identifier)
    }
  }, [emailIsValid, passwordIsValid])

  const emailChangeHandler = (event) => {
    emailDispatch({ type: 'USER_INPUT', val: event.target.value });
    // setFormIsValid(
    //   event.target.value.includes('@') && passwordState.isValid
    // );

  };

  const passwordChangeHandler = (event) => {
    passwordDispatch({ type: 'USER_INPUT', val: event.target.value });

    // setFormIsValid(
    //   event.target.value.trim().length > 6 && emailState.isValid
    // );
  };

  const validateEmailHandler = () => {
    // setEmailIsValid(emailState.isValid);
    emailDispatch({ type: 'INPUT_BLUR' })

  };

  const validatePasswordHandler = () => {
    passwordDispatch({ type: 'INPUT_BLUR' })
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (formIsValid) {
      ctx.onLogin(emailState.value, passwordState.value);
      navigate('/')
    } else if (!emailIsValid) {
      emailInputRef.current.focus();
    } else {
      passwordInputRef.current.focus();
    }


  };

  return (
    <>
      <Card className={classes.login}>
        <form onSubmit={submitHandler}>

          <Input placeholder="Example@gmail.com" ref={emailInputRef} label="E-Mail" id="email" type="emial" isValid={emailIsValid} value={emailState.value} onChange={emailChangeHandler} onBlur={validateEmailHandler} />


          <Input placeholder="Password must be any 8 character long!" ref={passwordInputRef} label="Password" id="password" type="password" isValid={passwordIsValid} value={passwordState.value} onChange={passwordChangeHandler} onBlur={validatePasswordHandler} />

          <div className={classes.actions}>
            <Button type="submit" className={classes.button} >
              Login
            </Button>
          </div>
        </form>
      </Card>
    </>
  );
};

export default Login;
