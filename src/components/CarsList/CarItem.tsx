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
    <li className='border rounded-md p-4 flex flex-col'>
      {
        <>
          <Link href={`/${car.id}`}>
            <Image
              className='mb-[15px] h-[150px] object-cover w-full'
              src={
                errorImage !== null
                  ? errorImage
                  : car.image
                  ? car.image
                  : noPicImage
              }
              width={250}
              height={100}
              alt='Картинка машины'
              priority
              onError={() => {
                setErrorImage(noPicImage.src);
              }}
            />
          </Link>

          <ul className='mb-[15px]'>
            {car.brand && (
              <li className='flex justify-between'>
                <span>Марка:</span>
                <span className='w-[100px] text-left'>{car.brand}</span>
              </li>
            )}
            {car.model && (
              <li className='flex justify-between'>
                <span>Модель:</span>
                <span className='w-[100px] text-left'>{car.model}</span>
              </li>
            )}
            {car.number && (
              <li className='flex justify-between'>
                <span>Номер:</span>
                <span className='w-[100px] text-left'>{car.number}</span>
              </li>
            )}
            {car.price !== 0 ? (
              <li className='flex justify-between'>
                <span>Цена:</span>
                <span className='w-[100px] text-left'>{`${car.price}руб.`}</span>
              </li>
            ) : null}
          </ul>

          {car.tarif.length > 0 && (
            <div className='flex justify-around mt-auto'>
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
