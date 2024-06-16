"use client";
import { useAppDispatch } from "@/redux/hooks";
import { useEffect, useState } from "react";
import { getLocalStorage } from "@/utils/getLocalStorage";
import { TFilterResponse } from "@/types/Filter";
import { CarsResponse } from "@/types/CarsResponse";
import { getCars } from "@/redux/features/cars/carsSlice";
import PaginationComponent from "../ui/Pagination/Pagination";
import Loading from "@/components/Loading/Loading";
import CarsList from "../CarsList/CarsList";
import Filter from "../ui/Filter/Filter";
import Title from "../Title/Title";
import Link from "next/link";

interface ICarsListProps {
  carsData: CarsResponse;
  filterData: TFilterResponse;
}

const Content = ({ carsData, filterData }: ICarsListProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const dispatch = useAppDispatch();
  const carsListStorage = getLocalStorage("carsList");
  console.log(filterData);

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
      <Title text='Выбери свой автомобиль!' />
      <Link
        className='bg-[#ed5564] text-black rounded-lg py-2 px-3 text-[18px] mb-[40px] text-white'
        href='/about'
      >
        О проекте
      </Link>
      <div className='flex justify-between max-w-[1200px] w-full'>
        <Filter filterData={filterData} />

        <div className='flex flex-col items-center'>
          <CarsList />
          <PaginationComponent pageQty={carsData.pages} page={carsData.page} />
        </div>
      </div>
    </>
  );
};

export default Content;
