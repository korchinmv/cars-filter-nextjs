import { RootState } from "@/redux/store";

export const filterBrandCheckboxesSelector = (state: RootState) =>
  state.filterBrandCheckboxesReducer;
