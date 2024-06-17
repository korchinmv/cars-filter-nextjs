"use client";
import { usePathname, useSearchParams } from "next/navigation";
import { TFilterResponse } from "@/types/Filter";
import { useRouter } from "next/navigation";
import FilterBrand from "./FilterBrand";
import FilterTarif from "./FilterTarif";
import FilterModel from "./FilterModel";
import React, { useEffect, useState } from "react";

interface IFilterProps {
  filterData: TFilterResponse;
}

const Filter = ({ filterData }: IFilterProps) => {
  const [selectedCheckbox, setSelectedCheckbox] = useState<string[]>([]);
  const searchParams = useSearchParams();
  const checkboxParams = searchParams.getAll("selected");
  const pathname = usePathname();
  const router = useRouter();

  const getSelectedCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (selectedCheckbox.includes(e.target.value)) {
      setSelectedCheckbox(
        selectedCheckbox.filter((item) => item !== e.target.value)
      );
      return;
    }

    setSelectedCheckbox([...selectedCheckbox, e.target.value]);
  };

  useEffect(() => {
    // console.log(selectedCheckbox);
  }, [selectedCheckbox]);

  return (
    <form className='border rounded-md p-4 mr-[30px] max-w-[250px] w-full flex flex-col self-start color-white'>
      <FilterBrand
        data={filterData.brands}
        getSelectedCheckbox={getSelectedCheckbox}
      />
      <FilterModel
        data={filterData.models}
        selectedCheckbox={selectedCheckbox}
      />
      <FilterTarif data={filterData.tarif} />
    </form>
  );
};

export default Filter;
