import { ChangeEvent, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { filterBrandCheckboxesSelector } from "@/redux/features/filter/filterBrandCheckboxes/filterBrandCheckboxesSelector";
import { getLocalStorage } from "@/utils/getLocalStorage";
import { TBrands } from "@/types/Filter";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
} from "@mui/material";
import {
  addBrandCheckbox,
  filterBrandCheckbox,
} from "@/redux/features/filter/filterBrandCheckboxes/filterBrandCheckboxesSlice";

interface IFilterItemProps {
  data: TBrands;
}

const FilterBrand = ({ data }: IFilterItemProps) => {
  const [checkedState, setCheckedState] = useState(
    new Array(data.values.length).fill(false)
  );
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const filterBrand = useAppSelector(filterBrandCheckboxesSelector);
  const dispatch = useAppDispatch();

  //Получаем массив активных чекбоксов в фильтре брендов, реализуем удаление активного чекбокса из массива с помощью редакс
  const getSelectedCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    if (filterBrand.checkboxes.includes(value)) {
      dispatch(filterBrandCheckbox(value));
    } else {
      dispatch(addBrandCheckbox(value));
    }
  };

  //Делаем инпуты управляемыми и записывает состояния инпутов в локалсторэдж
  const handleOnChange = (position: number) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );
    setCheckedState(updatedCheckedState);

    localStorage.setItem(
      "stateBrandFilter",
      JSON.stringify(updatedCheckedState)
    );
  };

  //Получаем состояния фильтра брэндов из локалсторэдж, если данные есть то записываем в стейт компонента
  useEffect(() => {
    const localBrandFilter = getLocalStorage("stateBrandFilter");

    if (localBrandFilter) {
      setCheckedState(localBrandFilter);
    }
  }, []);

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
        <FormGroup
          sx={{
            borderTop: "2px solid #ed5564",
          }}
        >
          {data.values.map((value: string, i: number) => {
            return (
              <FormControlLabel
                key={i}
                label={value}
                labelPlacement='start'
                control={
                  <Checkbox
                    onChange={(e) => {
                      getSelectedCheckbox(e);
                      handleOnChange(i);
                    }}
                    name={data.code}
                    value={value}
                    checked={checkedState[i]}
                    sx={{
                      color: "#fff",
                      right: "0",
                      "&.Mui-checked": {
                        color: "#ed5564",
                      },
                    }}
                  />
                }
              />
            );
          })}
        </FormGroup>
      )}
    </FormControl>
  );
};

export default FilterBrand;
