"use client";
import { useAppSelector } from "@/redux/hooks";
import { carsSelector } from "@/redux/features/cars/carsSelector";
import { TCar } from "@/types/Car";
import CarItem from "./CarItem";
import { TCarsResponse } from "@/types/CarsResponse";
import { queryStringSelector } from "@/redux/features/queryString/queryStringSelector";

interface ICarsListProps {
  allCars: TCarsResponse | undefined;
}

const CarsList = ({ allCars }: ICarsListProps) => {
  const currentQueryString = useAppSelector(queryStringSelector);
  const currentCars = useAppSelector(carsSelector);

  return (
    <>
      <ul className='grid grid-cols-3 gap-4 mb-[20px]'>
        {currentQueryString.string !== ""
          ? currentCars.cars.list.map((car: TCar) => {
              return <CarItem key={car.id} car={car} />;
            })
          : allCars &&
            allCars.list.map((car: TCar) => {
              return <CarItem key={car.id} car={car} />;
            })}
      </ul>
    </>
  );
};

export default CarsList;
