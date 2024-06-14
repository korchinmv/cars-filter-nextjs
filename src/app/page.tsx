import { Suspense } from "react";
import CarsList from "@/components/CarsList/CarsList";
import Loading from "@/components/Loading/Loading";
import Title from "@/components/Title/Title";

export default async function Home() {
  // const filters = await fetch(`${URL}?w=catalog-filter`);

  return (
    <main className='flex flex-col items-center justify-between p-24'>
      <Title text='Выбери свой автомобиль!' />
      <Suspense fallback={<Loading text='Сейчас загрузятся машины...' />}>
        <CarsList />
      </Suspense>
    </main>
  );
}
