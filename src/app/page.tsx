import { fetchData } from "@/utils/fetchData";
import Content from "@/components/Content/Content";
import Error from "@/components/Error/Error";

export default async function Home() {
  const { success: successCarsData, error: errorCarsData } = await fetchData(
    "?w=catalog-cars"
  );

  const { success: successFilterData } = await fetchData(`?w=catalog-filter`);

  return (
    <main className='flex flex-col items-center justify-between p-24'>
      {errorCarsData ? (
        <Error text='Произошла ошибка' />
      ) : (
        <Content carsData={successCarsData} filterData={successFilterData} />
      )}
    </main>
  );
}
