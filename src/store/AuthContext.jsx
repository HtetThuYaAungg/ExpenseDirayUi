import React, { useEffect, useState } from "react";
import { createContext } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext({
  isLoggedIn: false,
  onLogout: () => { },
  onLogin: (email, password) => { },
});

export const AuthContextProvider = (props) => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const storeUserLoggedInInformation = localStorage.getItem('isLoggedIn');
    if (storeUserLoggedInInformation === '1') {
      setIsLoggedIn(true);
    }
  }, [])

  const logoutHandler = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    navigate('/login')
  };

  const logInHandler = () => {
    localStorage.setItem("isLoggedIn", '1');
    setIsLoggedIn(true);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        onLogout: logoutHandler,
        onLogin: logInHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext