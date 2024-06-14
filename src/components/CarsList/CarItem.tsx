import { TCar } from "@/types/Car";
import Image from "next/image";
import noPicImage from "@/../public/no-pic.jpg";
import Link from "next/link";

interface ICarItem {
  car: TCar;
}

const CarItem = ({ car }: ICarItem) => {
  return (
    <li className='border rounded-md p-4'>
      {
        <>
          <Link href={`/${car.id}`}>
            <Image
              className='mb-[15px]'
              src={car.image ? car.image : noPicImage}
              width={250}
              height={100}
              alt='Картинка машины'
              priority
            />
          </Link>

          <ul className='mb-[15px]'>
            <li>Марка: {car.brand}</li>
            <li>Модель: {car.model}</li>
            <li>Номер: {car.number}</li>
            <li>Цена: {car.price} руб.</li>
          </ul>

          {car.tarif.length > 0 && (
            <>
              <span>Тариф:</span>
              <ul>
                {car.tarif.map((tarif, i) => {
                  return <li key={i}>{tarif}</li>;
                })}
              </ul>
            </>
          )}
        </>
      }
    </li>
  );
};

export default CarItem;
