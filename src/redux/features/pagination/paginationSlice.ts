import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getLocalStorage } from "@/utils/getLocalStorage";

const currentPage =
  getLocalStorage("paginationPage") !== null
    ? getLocalStorage("paginationPage")
    : 0;

const setItemFunc = (page: number): void => {
  localStorage.setItem("paginationPage", JSON.stringify(page));
};

interface InitialState {
  page: number;
}

const initialState: InitialState = {
  page: currentPage,
};

export const paginationReducer = createSlice({
  name: "pagination",
  initialState,
  reducers: {
    updatePage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
      setItemFunc(state.page);
    },
  },
});

export const { updatePage } = paginationReducer.actions;

export default paginationReducer.reducer;
