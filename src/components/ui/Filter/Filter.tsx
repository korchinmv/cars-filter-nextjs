"use client";
import { TFilterResponse } from "@/types/Filter";
import FilterBrand from "./FilterBrand";
import FilterTarif from "./FilterTarif";
import FilterModel from "./FilterModel";

interface IFilterProps {
  filterData: TFilterResponse;
}

const Filter = ({ filterData }: IFilterProps) => {
  console.log(filterData);

  return (
    <form className='border rounded-md p-4 mr-[30px] max-w-[250px] w-full flex flex-col self-start color-white'>
      <FilterBrand data={filterData.brands} />
      <FilterModel data={filterData.models} />
      <FilterTarif data={filterData.tarif} />
    </form>
  );
};

export default Filter;
