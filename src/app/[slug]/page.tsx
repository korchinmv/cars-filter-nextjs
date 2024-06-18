import { fetchData } from "@/utils/fetchData";
import { Metadata } from "next";
import { Suspense } from "react";
import Loading from "@/components/Loading/Loading";
import Slider from "@/components/ui/Slider/Slider";
import noPicImage from "@/../public/no-pic.jpg";
import Image from "next/image";
import Link from "next/link";
import Error from "@/components/Error/Error";

interface ICarPageProps {
  params: { slug: "string" };
}

export async function generateMetadata({
  params: { slug },
}: ICarPageProps): Promise<Metadata> {
  const { success, error } = await fetchData(`?w=catalog-car&id=${slug}`);

  if (error) {
    return {
      title: `${error}`,
    };
  }

  return {
    title: `Страница машины ${success.item.brand} ${success.item.model}`,
  };
}

const CarPage = async ({ params: { slug } }: ICarPageProps) => {
  const { success, error } = await fetchData(`?w=catalog-car&id=${slug}`);

  if (error) {
    return (
      <div className='flex flex-col justify-center items-center h-screen'>
        <Error text='Произошла ошибка' />;
      </div>
    );
  }

  return (
    <div className='flex flex-col justify-center items-center h-screen'>
      <Suspense fallback={<Loading text='Загружаем данные о машине...' />}>
        <div className='border rounded-md p-10 w-[500px] mb-[30px]'>
          {success.item.images !== null ? (
            <Slider data={success.item.images} />
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
              {success.item.brand && (
                <li className='mb-[15px]'>Марка: {success.item.brand}</li>
              )}
              {success.item.model && (
                <li className='mb-[15px]'>Модель: {success.item.model}</li>
              )}
              {success.item.number && (
                <li className='mb-[15px]'>Номер: {success.item.number}</li>
              )}
              {success.item.price !== 0 ? (
                <li className='mb-[15px]'>Цена: {success.item.price} руб.</li>
              ) : null}
            </ul>

            {success.item.tarif.length > 0 && (
              <ul>
                Тариф:
                {success.item.tarif.map((tarif: string, i: number) => {
                  return <li key={i}>{tarif}</li>;
                })}
              </ul>
            )}
          </div>
        </div>
        <Link
          className='bg-[#ed5564] text-black rounded-lg py-2 px-3 text-white'
          href='/'
        >
          Назад
        </Link>
      </Suspense>
    </div>
  );
};

export default CarPage;
