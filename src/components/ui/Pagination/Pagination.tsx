"use client";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { queryStringSelector } from "@/redux/features/queryString/queryStringSelector";
import { paginationSelector } from "@/redux/features/pagination/paginationSelector";
import { carsSelector } from "@/redux/features/cars/carsSelector";
import { updatePage } from "@/redux/features/pagination/paginationSlice";
import { useRouter } from "next/navigation";
import { fetchData } from "@/utils/fetchData";
import { getCars } from "@/redux/features/cars/carsSlice";
import Pagination from "@mui/material/Pagination";
import Theme from "@/styles/muiStyles";

const PaginationComponent = () => {
  const queryString = useAppSelector(queryStringSelector);
  const currentPage = useAppSelector(paginationSelector);
  const currentCars = useAppSelector(carsSelector);
  const dispatch = useAppDispatch();
  const router = useRouter();
  return (
    <Theme>
      <Pagination
        className='mt-auto'
        count={currentCars.cars.pages !== null ? currentCars.cars.pages : 1}
        page={currentPage.page}
        variant='outlined'
        size='large'
        defaultPage={1}
        //При смене страницы делаем запрос на сервер с текущей строкой запроса + номер новой страницы, результат записываем в состояния редакса и пушим новую строку в URL
        onChange={(_, num) => {
          fetchData(`?w=catalog-cars&${queryString.string}&page=${num}`).then(
            (data) => {
              dispatch(getCars(data.success));
              dispatch(updatePage(parseInt(data.success.page)));
              router.push(`/?${queryString.string}&page=${num}`);
            }
          );
        }}
        sx={{
          ".Mui-selected": {
            backgroundColor: "#fff !important",
            color: "#000 !important",
          },
          ".MuiPagination-ul li": {
            margin: "2px",
          },

          ".MuiPagination-ul li button": {
            color: "#fff",
          },
        }}
      />
    </Theme>
  );
};

export default PaginationComponent;
