import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getLocalStorage } from "@/utils/getLocalStorage";
import { TCarsResponse } from "@/types/CarsResponse";

const cars =
  getLocalStorage("carsList") !== null
    ? getLocalStorage("carsList")
    : {
        list: [],
        page: null,
        pages: null,
        per_page: null,
        result: null,
      };

const setItemFunc = (cars: TCarsResponse): void => {
  localStorage.setItem("carsList", JSON.stringify(cars));
};

interface InitialState {
  cars: TCarsResponse;
}

const initialState: InitialState = {
  cars,
};

export const carsReducer = createSlice({
  name: "cars",
  initialState,
  reducers: {
    getCars: (state, action: PayloadAction<TCarsResponse>) => {
      state.cars = action.payload;
      setItemFunc(state.cars);
    },
  },
});

export const { getCars } = carsReducer.actions;

export default carsReducer.reducer;
