import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getLocalStorage } from "@/utils/getLocalStorage";

const currentFilterTarifCheckboxes =
  getLocalStorage("filterTarifCheckboxes") !== null
    ? getLocalStorage("filterTarifCheckboxes")
    : [];

const setItemFunc = (string: string[]): void => {
  localStorage.setItem("filterTarifCheckboxes", JSON.stringify(string));
};

interface InitialState {
  checkboxes: string[];
}

const initialState: InitialState = {
  checkboxes: currentFilterTarifCheckboxes,
};

export const filterTarifCheckboxesReducer = createSlice({
  name: "filterTarifCheckboxes",
  initialState,
  reducers: {
    addTarifCheckbox: (state, action: PayloadAction<string>) => {
      state.checkboxes.push(action.payload);
      setItemFunc(state.checkboxes);
    },
    filterTarifCheckbox: (state, action: PayloadAction<string>) => {
      const filtred = state.checkboxes.filter(
        (item) => item !== action.payload
      );
      state.checkboxes = filtred;
      setItemFunc(filtred);
    },
  },
});

export const { addTarifCheckbox, filterTarifCheckbox } =
  filterTarifCheckboxesReducer.actions;

export default filterTarifCheckboxesReducer.reducer;
