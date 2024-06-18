"use client";
import { useAppSelector } from "@/redux/hooks";
import { carsSelector } from "@/redux/features/cars/carsSelector";
import { TCar } from "@/types/Car";
import CarItem from "./CarItem";

const CarsList = () => {
  const currentCars = useAppSelector(carsSelector);

  return (
    <>
      <ul className='grid grid-cols-3 gap-4 mb-[20px]'>
        {currentCars.cars.list.map((car: TCar) => {
          return <CarItem key={car.id} car={car} />;
        })}
      </ul>
    </>
  );
};

export default CarsList;
