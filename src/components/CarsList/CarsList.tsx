import { fetchData } from "@/utils/fetchData";
import { TCar } from "@/types/Car";
import CarItem from "./CarItem";

const CarsList = async () => {
  const cars = await fetchData("?w=catalog-cars");

  return (
    <ul className='grid grid-cols-2 gap-4'>
      {cars.list.map((car: TCar) => {
        return <CarItem key={car.id} car={car} />;
      })}
    </ul>
  );
};

export default CarsList;
