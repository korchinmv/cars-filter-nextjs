import { fetchData } from "@/utils/fetchData";
import CarsList from "@/components/CarsList/CarsList";
import Title from "@/components/Title/Title";
import Content from "@/components/Content/Content";

export default async function Home() {
  const carsData = await fetchData("?w=catalog-cars");

  // const filters = await fetchData(`${URL}?w=catalog-filter`);

  return (
    <main className='flex flex-col items-center justify-between p-24'>
      <Title text='Выбери свой автомобиль!' />
      <Content carsData={carsData} />
    </main>
  );
}
