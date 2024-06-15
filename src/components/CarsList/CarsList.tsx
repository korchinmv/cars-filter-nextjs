"use client";
import { useAppSelector } from "@/redux/hooks";
import { carsSelector } from "@/redux/features/cars/carsSelector";
import { TCar } from "@/types/Car";
import CarItem from "./CarItem";

const CarsList = () => {
  const currentCars = useAppSelector(carsSelector);
  return (
    <>
      <ul className='grid grid-cols-5 gap-4 mb-[20px]'>
        {currentCars.cars.map((car: TCar) => {
          return <CarItem key={car.id} car={car} />;
        })}
      </ul>
    </>
  );
};

export default CarsList;
