import { ChangeEvent, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { filterModelCheckboxesSelector } from "@/redux/features/filter/filterModelCheckboxes/filterModelCheckboxesSelector";
import { Checkbox, FormControlLabel } from "@mui/material";
import {
  addModelCheckbox,
  filterModelCheckbox,
} from "@/redux/features/filter/filterModelCheckboxes/filterModelCheckboxesSlice";
import { getLocalStorage } from "@/utils/getLocalStorage";

interface IFilterGroupModelProps {
  models: string[];
  brand: string;
  type: string;
}

const FilterGroupModel = ({ brand, models, type }: IFilterGroupModelProps) => {
  const [checkedState, setCheckedState] = useState(
    new Array(models.length).fill(false)
  );
  const filterModel = useAppSelector(filterModelCheckboxesSelector);
  const dispatch = useAppDispatch();

  //Получаем массив активных чекбоксов в фильтре моделей, реализуем удаление активного чекбокса из массива с помощью редакс
  const getSelectedCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    if (filterModel.checkboxes.includes(value)) {
      dispatch(filterModelCheckbox(value));
    } else {
      dispatch(addModelCheckbox(value));
    }
  };

  //Делаем инпуты управляемыми и записывает состояния инпутов в локалсторэдж
  const handleOnChange = (position: number) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );
    setCheckedState(updatedCheckedState);

    localStorage.setItem(
      `state${brand}Filter`,
      JSON.stringify(updatedCheckedState)
    );
  };

  //Получаем состояния фильтра брэндов из локалсторэдж, если данные есть то записываем в стейт компонента
  useEffect(() => {
    const localModelFilter = getLocalStorage(`state${brand}Filter`);

    if (localModelFilter) {
      setCheckedState(localModelFilter);
    }
  }, [brand]);

  return (
    <div className='flex flex-col mb-[30px]  border-[#ed5564] border-t-2 py-2'>
      <p className='block text-right'>{brand}</p>

      {models.map((model: string, i: number) => {
        return (
          <FormControlLabel
            key={i}
            label={model}
            labelPlacement='start'
            control={
              <Checkbox
                onChange={(e) => {
                  getSelectedCheckbox(e);
                  handleOnChange(i);
                }}
                checked={checkedState[i]}
                name={type}
                value={model}
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
    </div>
  );
};

export default FilterGroupModel;
