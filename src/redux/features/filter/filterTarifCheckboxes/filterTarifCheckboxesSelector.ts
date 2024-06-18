import { RootState } from "@/redux/store";

export const filterTarifCheckboxesSelector = (state: RootState) =>
  state.filterTarifCheckboxesReducer;
