import { TCar } from "./Car";

export type TCarsResponse = {
  list: TCar[];
  page: number | null;
  pages: number | null;
  per_page: number | null;
  result: number | null;
};
