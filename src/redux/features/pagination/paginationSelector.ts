import { RootState } from "@/redux/store";

export const paginationSelector = (state: RootState) => state.paginationReducer;
