"use client";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { filterBrandCheckboxesSelector } from "@/redux/features/filter/filterBrandCheckboxes/filterBrandCheckboxesSelector";
import { filterTarifCheckboxesSelector } from "@/redux/features/filter/filterTarifCheckboxes/filterTarifCheckboxesSelector";
import { ChangeEvent, useEffect } from "react";
import { queryStringSelector } from "@/redux/features/queryString/queryStringSelector";
import { TFilterResponse } from "@/types/Filter";
import { updateString } from "@/redux/features/queryString/queryStringSlice";
import { updatePage } from "@/redux/features/pagination/paginationSlice";
import { useRouter } from "next/navigation";
import { getCars } from "@/redux/features/cars/carsSlice";
import {
  addBrandCheckbox,
  filterBrandCheckbox,
} from "@/redux/features/filter/filterBrandCheckboxes/filterBrandCheckboxesSlice";
import {
  addTarifCheckbox,
  filterTarifCheckbox,
} from "@/redux/features/filter/filterTarifCheckboxes/filterTarifCheckboxesSlice";
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
  const filterTarif = useAppSelector(filterTarifCheckboxesSelector);
  const dispatch = useAppDispatch();
  const router = useRouter();
  let newQueryString: string = "";

  //Получаем массив активных чекбоксов в фильтре брендов, реализуем удаление активного чекбокса из массива с помощью редакс
  const getSelectedBrandCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    if (filterBrand.checkboxes.includes(value)) {
      dispatch(filterBrandCheckbox(value));
    } else {
      dispatch(addBrandCheckbox(value));
    }
  };

  //Получаем массив активных чекбоксов в фильтре тарифов, реализуем удаление активного чекбокса из массива с помощью редакс
  const getSelectedTarifCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    if (filterTarif.checkboxes.includes(value)) {
      dispatch(filterTarifCheckbox(value));
    } else {
      dispatch(addTarifCheckbox(value));
    }
  };

  useEffect(() => {
    //Проверяем есть ли в фильтре брендов активные чекбоксы, если есть то добавляем из массива данные в новую строку запроса
    if (filterBrand.checkboxes.length > 0) {
      for (let i = 0; i < filterBrand.checkboxes.length; i++) {
        newQueryString += `&brand[]=${filterBrand.checkboxes[i]}`;
        dispatch(updateString(`${newQueryString}`));
      }
    }

    //Проверяем есть ли в фильтре тарифов активные чекбоксы, если есть то добавляем из массива данные в новую строку запроса
    if (filterTarif.checkboxes.length > 0) {
      for (let i = 0; i < filterTarif.checkboxes.length; i++) {
        newQueryString += `&tarif[]=${filterTarif.checkboxes[i]}`;
        dispatch(updateString(`${newQueryString}`));
      }
    }

    //Если длина всех выбранных чекбоксов = 0, то строку запроса обнуляем
    if (
      filterBrand.checkboxes.length === 0 &&
      filterTarif.checkboxes.length === 0
    ) {
      dispatch(updateString(""));
    }

    //Добавляем в URL текущую строку запроса
    router.push(`/?${currentQueryString.string}`);

    //Если строка запроса !НЕ! равна пустой строке, то делаем запрос на сервер с актуальной стракой запроса, получаем данные и сохроняем в состояние машин редакс
    if (currentQueryString.string !== "") {
      fetchData(`?w=catalog-cars${currentQueryString.string}`).then((res) => {
        dispatch(getCars(res.success));
      });
    } else {
      //Если строка запроса !РАВНА! пустой строке, получаем от сервера список всех машин и сохроняем в состояние машин редакс, обнуляем пагинацию
      fetchData("?w=catalog-cars").then((res) => {
        dispatch(getCars(res.success));
        dispatch(updatePage(1));
      });
    }
  }, [
    filterBrand.checkboxes,
    filterTarif.checkboxes,
    currentQueryString.string,
    router,
  ]);

  return (
    <form className='border rounded-md p-4 mr-[30px] max-w-[250px] w-full flex flex-col self-start color-white'>
      <FilterBrand
        data={filterData.brands}
        getSelectedCheckbox={getSelectedBrandCheckbox}
      />
      <FilterModel data={filterData.models} />
      <FilterTarif
        data={filterData.tarif}
        getSelectedCheckbox={getSelectedTarifCheckbox}
      />
    </form>
  );
};

export default Filter;
