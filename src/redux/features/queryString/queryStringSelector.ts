import { RootState } from "@/redux/store";

export const queryStringSelector = (state: RootState) =>
  state.queryStringReducer;
