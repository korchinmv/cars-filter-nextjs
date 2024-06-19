import { configureStore } from "@reduxjs/toolkit";
import filterBrandCheckboxesReducer from "./features/filter/filterBrandCheckboxes/filterBrandCheckboxesSlice";
import filterTarifCheckboxesReducer from "./features/filter/filterTarifCheckboxes/filterTarifCheckboxesSlice";
import filterModelCheckboxesReducer from "./features/filter/filterModelCheckboxes/filterModelCheckboxesSlice";
import queryStringReducer from "./features/queryString/queryStringSlice";
import paginationReducer from "./features/pagination/paginationSlice";
import carsReducer from "./features/cars/carsSlice";

export const store = () => {
  return configureStore({
    reducer: {
      carsReducer,
      paginationReducer,
      queryStringReducer,
      filterBrandCheckboxesReducer,
      filterTarifCheckboxesReducer,
      filterModelCheckboxesReducer,
    },
  });
};

export type AppStore = ReturnType<typeof store>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
