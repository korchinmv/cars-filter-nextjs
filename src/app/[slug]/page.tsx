import { fetchData } from "@/utils/fetchData";
import { Suspense } from "react";
import Loading from "@/components/Loading/Loading";
import Slider from "@/components/Slider/Slider";

interface ICarPageProps {
  params: { slug: "string" };
}

const CarPage = async ({ params: { slug } }: ICarPageProps) => {
  const car = await fetchData(`?w=catalog-car&id=${slug}`);

  return (
    <div className='flex flex-col justify-center items-center h-screen'>
      <Suspense fallback={<Loading text='Загружаем данные о машине...' />}>
        <div className='border rounded-md p-10 w-[500px] flex flex-col items-center'>
          <Slider data={car.item.images} />

          <div className='content'>
            <ul className='mb-[15px]'>
              <li className='mb-[15px]'>Марка: {car.item.brand}</li>
              <li className='mb-[15px]'>Модель: {car.item.model}</li>
              <li className='mb-[15px]'>Номер: {car.item.number}</li>
              <li className='mb-[15px]'>Цена: {car.item.price} руб.</li>
            </ul>

            <ul>
              Тариф:
              {car.item.tarif.map((tarif: string, i: number) => {
                return <li key={i}>{tarif}</li>;
              })}
            </ul>
          </div>
        </div>
      </Suspense>
    </div>
  );
};

export default CarPage;
