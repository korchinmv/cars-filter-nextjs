import { TCar } from "./Car";

export type CarsResponse = {
  list: TCar[];
  page: number;
  pages: number;
  per_page: number;
  result: number;
};
