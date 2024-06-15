"use client";
import { useAppDispatch } from "@/redux/hooks";
import { useEffect, useState } from "react";
import { getLocalStorage } from "@/utils/getLocalStorage";
import { CarsResponse } from "@/types/CarsResponse";
import { getCars } from "@/redux/features/cars/carsSlice";
import PaginationComponent from "../Pagination/Pagination";
import Loading from "@/components/Loading/Loading";
import CarItem from "../CarsList/CarItem";
import CarsList from "../CarsList/CarsList";

interface ICarsListProps {
  carsData: CarsResponse;
}

const Content = ({ carsData }: ICarsListProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const dispatch = useAppDispatch();
  const carsListStorage = getLocalStorage("carsList");

  useEffect(() => {
    if (!carsListStorage) {
      dispatch(getCars(carsData.list));
    }

    setIsLoading(false);
  }, [dispatch, carsData.list, carsListStorage]);

  if (isLoading) {
    return <Loading text='Список машин загружается..' />;
  }

  return (
    <>
      <CarsList />
      <PaginationComponent pageQty={carsData.pages} page={carsData.page} />
    </>
  );
};

export default Content;
