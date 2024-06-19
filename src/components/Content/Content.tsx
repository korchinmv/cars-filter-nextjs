"use client";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useEffect, useState } from "react";
import { getLocalStorage } from "@/utils/getLocalStorage";
import { TFilterResponse } from "@/types/Filter";
import { TCarsResponse } from "@/types/CarsResponse";
import { carsSelector } from "@/redux/features/cars/carsSelector";
import { getCars } from "@/redux/features/cars/carsSlice";
import PaginationComponent from "../ui/Pagination/Pagination";
import Loading from "@/components/Loading/Loading";
import CarsList from "../CarsList/CarsList";
import Filter from "../ui/Filter/Filter";
import Error from "@/components/Error/Error";
import Title from "../Title/Title";
import Link from "next/link";

interface ICarsListProps {
  carsData: TCarsResponse;
  filterData: TFilterResponse;
}

const Content = ({ carsData, filterData }: ICarsListProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const carsListStorage = getLocalStorage("carsList");
  const currentCars = useAppSelector(carsSelector);
  const dispatch = useAppDispatch();

  //Проверяем есть ли в локалсторэдже список машин, если нету то добавляем в состояние редакс
  useEffect(() => {
    if (!carsListStorage) {
      dispatch(getCars(carsData));
    }

    setIsLoading(false);
  }, [dispatch, carsData, carsListStorage]);

  //Если список машин грузится то показывает прелоадер
  if (isLoading) {
    return (
      <div className='flex flex-col justify-between items-center h-screen'>
        <Loading text='Список машин загружается..' />
      </div>
    );
  }

  return (
    <>
      <Title text='Выбери свой автомобиль!' />
      <Link
        className='bg-[#ed5564] text-black rounded-lg py-2 px-3 text-[18px] mb-[40px] text-white'
        href='/about'
      >
        О проекте
      </Link>
      <div className='flex justify-between max-w-[1200px] w-full'>
        <Filter filterData={filterData} />

        <div className='flex flex-col items-center w-full'>
          {currentCars.cars.list.length !== 0 ? (
            <>
              <CarsList />
              {currentCars.cars.pages !== 1 ? <PaginationComponent /> : null}
            </>
          ) : (
            <Error text='Ничего не найдено' css='w-full text-center' />
          )}
        </div>
      </div>
    </>
  );
};

export default Content;
