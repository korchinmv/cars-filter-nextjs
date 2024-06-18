import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getLocalStorage } from "@/utils/getLocalStorage";

const currentQueryString =
  getLocalStorage("queryString") !== null ? getLocalStorage("queryString") : "";

const setItemFunc = (string: string): void => {
  localStorage.setItem("queryString", JSON.stringify(string));
};

interface InitialState {
  string: string;
}

const initialState: InitialState = {
  string: currentQueryString,
};

export const queryStringReducer = createSlice({
  name: "queryString",
  initialState,
  reducers: {
    updateString: (state, action: PayloadAction<string>) => {
      state.string = action.payload;
      setItemFunc(state.string);
    },
  },
});

export const { updateString } = queryStringReducer.actions;

export default queryStringReducer.reducer;
