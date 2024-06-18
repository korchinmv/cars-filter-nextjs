"use client";
import { filterBrandCheckboxesSelector } from "@/redux/features/filter/filterBrandCheckboxes/filterBrandCheckboxesSelector";
import { usePathname, useSearchParams } from "next/navigation";
import { ChangeEvent, useEffect } from "react";
import { queryStringSelector } from "@/redux/features/queryString/queryStringSelector";
import { TFilterResponse } from "@/types/Filter";
import { updateString } from "@/redux/features/queryString/queryStringSlice";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getCars } from "@/redux/features/cars/carsSlice";
import {
  addCheckbox,
  filterCheckbox,
} from "@/redux/features/filter/filterBrandCheckboxes/filterBrandCheckboxesSlice";
import { fetchData } from "@/utils/fetchData";
import FilterBrand from "./FilterBrand";
import FilterTarif from "./FilterTarif";
import FilterModel from "./FilterModel";

interface IFilterProps {
  filterData: TFilterResponse;
}

const Filter = ({ filterData }: IFilterProps) => {
  const currentQueryString = useAppSelector(queryStringSelector);
  const filterBrand = useAppSelector(filterBrandCheckboxesSelector);
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  let newQueryString = "";

  const getSelectedCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    if (filterBrand.checkboxes.includes(value)) {
      dispatch(filterCheckbox(value));
    } else {
      dispatch(addCheckbox(value));
    }
  };

  useEffect(() => {
    if (filterBrand.checkboxes.length > 0) {
      for (let i = 0; i < filterBrand.checkboxes.length; i++) {
        newQueryString += `&brand[]=${filterBrand.checkboxes[i]}`;
        dispatch(updateString(`${newQueryString}`));
      }
    } else {
      dispatch(updateString(""));
    }

    router.push(`/?${currentQueryString.string}`);

    if (currentQueryString.string !== "") {
      fetchData(`?w=catalog-cars${currentQueryString.string}`).then((res) => {
        dispatch(getCars(res.success));
      });
    }
  }, [filterBrand.checkboxes, router, currentQueryString.string]);

  return (
    <form className='border rounded-md p-4 mr-[30px] max-w-[250px] w-full flex flex-col self-start color-white'>
      <FilterBrand
        data={filterData.brands}
        getSelectedCheckbox={getSelectedCheckbox}
      />
      <FilterModel data={filterData.models} />
      <FilterTarif data={filterData.tarif} />
    </form>
  );
};

export default Filter;
