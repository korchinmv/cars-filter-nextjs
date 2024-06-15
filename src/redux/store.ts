import { configureStore } from "@reduxjs/toolkit";
import paginationReducer from "./features/pagination/paginationSlice";
import carsReducer from "./features/cars/carsSlice";

export const store = () => {
  return configureStore({
    reducer: { carsReducer, paginationReducer },
  });
};

export type AppStore = ReturnType<typeof store>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
