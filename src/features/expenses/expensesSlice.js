import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../api/api";

const initialState = {
  expenses: [],
  status: "idle",
  addStatus: "idle",
  deleStatus: "idle",
  editStatus: "idle",
  error: null,
};

export const fetchExpenses = createAsyncThunk(
  "expenses/fetchExpenses",
  async () => {
    try {
      const response = await axios.get(`${API_URL}/getexpenses`);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }
);

export const deleteExpenses = createAsyncThunk(
  "expenses/deleteExpenses",
  async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/${id}/deleteExpense`);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }
);

export const addExpenses = createAsyncThunk(
  "expenses/addExpenses",
  async (expense) => {
    try {
      const response = await axios.post(`${API_URL}/expense`, expense);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }
);

export const editExpenses = createAsyncThunk(
  "expenses/editExpenses",
  async ({ id, expense }) => {
    try {
      const response = await axios.put(
        `${API_URL}/expense/${id}/updateExpense`,
        expense
      );
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }
);

export const expensesSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //fetching data
      .addCase(fetchExpenses.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchExpenses.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.expenses = action.payload;
      })
      .addCase(fetchExpenses.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      //delete data
      .addCase(deleteExpenses.pending, (state) => {
        state.deleStatus = "loading";
      })
      .addCase(deleteExpenses.fulfilled, (state, action) => {
        state.deleStatus = "succeeded";
        state.expenses.getexpenses.filter(
          (expense) => expense.id !== action.payload
        );
      })
      .addCase(deleteExpenses.rejected, (state, action) => {
        state.deleStatus = "failed";
        state.error = action.error.message;
      })
      //add data
      .addCase(addExpenses.pending, (state) => {
        state.addStatus = "loading";
      })
      .addCase(addExpenses.fulfilled, (state, action) => {
        state.addStatus = "succeeded";
        state.expenses.getexpenses.push(action.payload);
      })
      .addCase(addExpenses.rejected, (state, action) => {
        state.addStatus = "failed";
        state.error = action.error.message;
      })
      //edit data
      .addCase(editExpenses.pending, (state) => {
        state.editStatus = "loading";
      })
      .addCase(editExpenses.fulfilled, (state, action) => {
        state.editStatus = "succeeded";
        const updateExpense = action.payload;
        const index = state.expenses.getexpenses.findIndex(
          (expense) => expense.id === updateExpense.id
        );
        if (index !== -1) {
          state.expenses.getexpenses[index] = updateExpense;
        }
      })
      .addCase(editExpenses.rejected, (state, action) => {
        state.editStatus = "failed";
        state.error = action.error.message;
      });
  },
});

export const selectExpenses = (state) => state.expenses.expenses;
export const selectExpensesStatus = (state) => state.expenses.status;
export const selectDeleteExpensesStatus = (state) => state.expenses.deleStatus;
export const selectAddExpensesStatus = (state) => state.expenses.addStatus;
export const selectEditExpensesStatus = (state) => state.expenses.editStatus;

export const selectExpensesError = (state) => state.expenses.error;

export default expensesSlice.reducer;
