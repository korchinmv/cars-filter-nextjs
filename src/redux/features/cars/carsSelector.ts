import { RootState } from "@/redux/store";

export const carsSelector = (state: RootState) => state.carsReducer;
