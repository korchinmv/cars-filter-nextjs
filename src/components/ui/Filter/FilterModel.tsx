import { FormControl, FormGroup, FormLabel } from "@mui/material";
import { filterBrandCheckboxesSelector } from "@/redux/features/filter/filterBrandCheckboxes/filterBrandCheckboxesSelector";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/redux/hooks";
import FilterGroupModel from "./FilterGroupModel";

interface IFilterItemProps {
  data: any;
}

export interface ICar {
  brand: string;
  models: string[];
}

const FilterModel = ({ data }: IFilterItemProps) => {
  const [cars, setCars] = useState<ICar[]>(data.values);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const filterBrand = useAppSelector(filterBrandCheckboxesSelector);

  //Проверяем если в фильтре брэндов есть хоть один элемент то фильтруем чекбоксы по этому элементу в фильтре моделей
  useEffect(() => {
    if (filterBrand.checkboxes.length > 0) {
      const filtredCheckboxes = data.values.filter((car: ICar) =>
        filterBrand.checkboxes.includes(car.brand)
      );
      setCars(filtredCheckboxes);
    } else {
      setCars(data.values);
    }
  }, [filterBrand.checkboxes, data.values]);

  return (
    <FormControl sx={{ m: 3 }} component='fieldset'>
      <FormLabel
        sx={{
          color: "#fff",
          cursor: "pointer",
          marginBottom: "20px",
        }}
        onClick={() => setIsOpen(!isOpen)}
      >
        {`${data.name} ↓ ↓ ↓`}
      </FormLabel>
      {isOpen && (
        <FormGroup>
          {cars.map((value: any, i: number) => {
            return (
              <FilterGroupModel
                key={i}
                brand={value.brand}
                models={value.models}
                type={data.type}
              />
            );
          })}
        </FormGroup>
      )}
    </FormControl>
  );
};

export default FilterModel;
