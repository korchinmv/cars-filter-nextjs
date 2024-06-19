import { RootState } from "@/redux/store";

export const filterModelCheckboxesSelector = (state: RootState) =>
  state.filterModelCheckboxesReducer;
