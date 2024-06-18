import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getLocalStorage } from "@/utils/getLocalStorage";

const currentFilterBrandCheckboxes =
  getLocalStorage("filterBrandCheckboxes") !== null
    ? getLocalStorage("filterBrandCheckboxes")
    : [];

const setItemFunc = (string: string[]): void => {
  localStorage.setItem("filterBrandCheckboxes", JSON.stringify(string));
};

interface InitialState {
  checkboxes: string[];
}

const initialState: InitialState = {
  checkboxes: currentFilterBrandCheckboxes,
};

export const filterBrandCheckboxesReducer = createSlice({
  name: "filterBrandCheckboxes",
  initialState,
  reducers: {
    addBrandCheckbox: (state, action: PayloadAction<string>) => {
      state.checkboxes.push(action.payload);
      setItemFunc(state.checkboxes);
    },
    filterBrandCheckbox: (state, action: PayloadAction<string>) => {
      const filtred = state.checkboxes.filter(
        (item) => item !== action.payload
      );
      state.checkboxes = filtred;
      setItemFunc(filtred);
    },
  },
});

export const { addBrandCheckbox, filterBrandCheckbox } =
  filterBrandCheckboxesReducer.actions;

export default filterBrandCheckboxesReducer.reducer;
