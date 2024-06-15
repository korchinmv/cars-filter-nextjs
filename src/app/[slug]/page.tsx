import { fetchData } from "@/utils/fetchData";
import { Metadata } from "next";
import { Suspense } from "react";
import Loading from "@/components/Loading/Loading";
import Slider from "@/components/Slider/Slider";
import noPicImage from "@/../public/no-pic.jpg";
import Image from "next/image";
import Link from "next/link";

interface ICarPageProps {
  params: { slug: "string" };
}

export async function generateMetadata({
  params: { slug },
}: ICarPageProps): Promise<Metadata> {
  const car = await fetchData(`?w=catalog-car&id=${slug}`);

  return {
    title: `Страница машины ${car.item.brand} ${car.item.model}`,
  };
}

const CarPage = async ({ params: { slug } }: ICarPageProps) => {
  const car = await fetchData(`?w=catalog-car&id=${slug}`);

  return (
    <div className='flex flex-col justify-center items-center h-screen'>
      <Suspense fallback={<Loading text='Загружаем данные о машине...' />}>
        <div className='border rounded-md p-10 w-[500px] mb-[30px]'>
          {car.item.images !== null ? (
            <Slider data={car.item.images} />
          ) : (
            <Image
              className='mb-[30px] w-full rounded-xl'
              src={noPicImage}
              width={0}
              height={0}
              alt='Картинка машины'
              priority
            />
          )}

          <div className='content text-center'>
            <ul className='mb-[15px]'>
              <li className='mb-[15px]'>Марка: {car.item.brand}</li>
              <li className='mb-[15px]'>Модель: {car.item.model}</li>
              <li className='mb-[15px]'>Номер: {car.item.number}</li>
              <li className='mb-[15px]'>Цена: {car.item.price} руб.</li>
            </ul>

            {car.item.tarif.length > 0 && (
              <ul>
                Тариф:
                {car.item.tarif.map((tarif: string, i: number) => {
                  return <li key={i}>{tarif}</li>;
                })}
              </ul>
            )}
          </div>
        </div>
        <Link className='bg-white text-black rounded-lg py-2 px-3' href='/'>
          Назад
        </Link>
      </Suspense>
    </div>
  );
};

export default CarPage;
