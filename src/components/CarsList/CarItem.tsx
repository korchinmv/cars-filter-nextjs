import { useState } from "react";
import { TCar } from "@/types/Car";
import Image from "next/image";
import noPicImage from "@/../public/no-pic.jpg";
import Link from "next/link";

interface ICarItem {
  car: TCar;
}

const CarItem = ({ car }: ICarItem) => {
  const [errorImage, setErrorImage] = useState<string | null>(null);

  return (
    <li className='border rounded-md p-4'>
      {
        <>
          <Link href={`/${car.id}`}>
            <Image
              className='mb-[15px] h-[150px] object-cover'
              src={
                errorImage !== null
                  ? errorImage
                  : car.image
                  ? car.image
                  : noPicImage
              }
              width={250}
              height={0}
              alt='Картинка машины'
              priority
              onError={() => {
                setErrorImage(noPicImage.src);
              }}
            />
          </Link>

          <ul className='mb-[15px]'>
            <li className='flex justify-between'>
              <span>Марка:</span>
              <span className='w-[100px] text-left'>{car.brand}</span>
            </li>
            <li className='flex justify-between'>
              <span>Модель:</span>
              <span className='w-[100px] text-left'>{car.model}</span>
            </li>
            <li className='flex justify-between'>
              <span>Номер:</span>
              <span className='w-[100px] text-left'>{car.number}</span>
            </li>
            <li className='flex justify-between'>
              <span>Цена:</span>
              <span className='w-[100px] text-left'>{`${car.price}руб.`}</span>
            </li>
          </ul>

          {car.tarif.length > 0 && (
            <div className='flex justify-around'>
              <span>Тариф:</span>
              <ul>
                {car.tarif.map((tarif, i) => {
                  return <li key={i}>{tarif}</li>;
                })}
              </ul>
            </div>
          )}
        </>
      }
    </li>
  );
};

export default CarItem;
