import { fetchData } from "@/utils/fetchData";
import Title from "@/components/Title/Title";
import Content from "@/components/Content/Content";
import Link from "next/link";

export default async function Home() {
  const carsData = await fetchData("?w=catalog-cars");

  // const filters = await fetchData(`${URL}?w=catalog-filter`);

  return (
    <main className='flex flex-col items-center justify-between p-24'>
      <Title text='Выбери свой автомобиль!' />
      <div className='flex justify-between items-center mb-[30px]'>
        <Link
          className='bg-white text-black rounded-lg py-2 px-3 text-[18px]'
          href='/about'
        >
          О проекте
        </Link>
      </div>
      <Content carsData={carsData} />
    </main>
  );
}
