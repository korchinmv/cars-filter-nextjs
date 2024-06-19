import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getLocalStorage } from "@/utils/getLocalStorage";

const currentModelBrandCheckboxes =
  getLocalStorage("filterModelCheckboxes") !== null
    ? getLocalStorage("filterModelCheckboxes")
    : [];

const setItemFunc = (string: string[]): void => {
  localStorage.setItem("filterModelCheckboxes", JSON.stringify(string));
};

interface InitialState {
  checkboxes: string[];
}

const initialState: InitialState = {
  checkboxes: currentModelBrandCheckboxes,
};

export const filterModelCheckboxesReducer = createSlice({
  name: "filterModelCheckboxes",
  initialState,
  reducers: {
    addModelCheckbox: (state, action: PayloadAction<string>) => {
      state.checkboxes.push(action.payload);
      setItemFunc(state.checkboxes);
    },
    filterModelCheckbox: (state, action: PayloadAction<string>) => {
      const filtred = state.checkboxes.filter(
        (item) => item !== action.payload
      );
      state.checkboxes = filtred;
      setItemFunc(filtred);
    },
  },
});

export const { addModelCheckbox, filterModelCheckbox } =
  filterModelCheckboxesReducer.actions;

export default filterModelCheckboxesReducer.reducer;
