import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import expensesReducer from "../features/expenses/expensesSlice";
import thunkMiddleware from "redux-thunk";

const middleware = [...getDefaultMiddleware(), thunkMiddleware];

export const store = configureStore({
  reducer: {
    expenses: expensesReducer,
  },
  middleware,
});
