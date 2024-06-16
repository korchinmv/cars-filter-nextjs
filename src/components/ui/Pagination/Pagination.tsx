"use client";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { paginationSelector } from "@/redux/features/pagination/paginationSelector";
import { updatePage } from "@/redux/features/pagination/paginationSlice";
import { fetchData } from "@/utils/fetchData";
import { getCars } from "@/redux/features/cars/carsSlice";
import Pagination from "@mui/material/Pagination";
import Theme from "@/styles/muiStyles";

interface IPaginationComponentProps {
  pageQty: number;
  page: number;
}

const PaginationComponent = ({ pageQty }: IPaginationComponentProps) => {
  const currentPage = useAppSelector(paginationSelector);
  const dispatch = useAppDispatch();
  return (
    <Theme>
      <Pagination
        count={pageQty}
        page={currentPage.page}
        variant='outlined'
        size='large'
        defaultPage={1}
        onChange={(_, num) => {
          fetchData(`?w=catalog-cars&page=${num}`).then((data) => {
            dispatch(getCars(data.success.list));
            dispatch(updatePage(parseInt(data.success.page)));
          });
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
