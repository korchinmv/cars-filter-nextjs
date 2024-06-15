import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getLocalStorage } from "@/utils/getLocalStorage";
import { TCar } from "@/types/Car";

const cars =
  getLocalStorage("carsList") !== null ? getLocalStorage("carsList") : [];

const setItemFunc = (cars: TCar[]): void => {
  localStorage.setItem("carsList", JSON.stringify(cars));
};

interface InitialState {
  cars: TCar[];
}

const initialState: InitialState = {
  cars,
};

export const carsReducer = createSlice({
  name: "cars",
  initialState,
  reducers: {
    getCars: (state, action: PayloadAction<TCar[]>) => {
      state.cars = action.payload;
      setItemFunc(state.cars);
    },
  },
});

export const { getCars } = carsReducer.actions;

export default carsReducer.reducer;
