import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { filterTarifCheckboxesSelector } from "@/redux/features/filter/filterTarifCheckboxes/filterTarifCheckboxesSelector";
import { getKeysAndValuesInObj } from "@/utils/getKeysAndValuesInObj";
import { useEffect, useState } from "react";
import { getLocalStorage } from "@/utils/getLocalStorage";
import { TTarif } from "@/types/Filter";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
} from "@mui/material";
import {
  addTarifCheckbox,
  filterTarifCheckbox,
} from "@/redux/features/filter/filterTarifCheckboxes/filterTarifCheckboxesSlice";

interface IFilterItemProps {
  data: TTarif;
}

const FilterTarif = ({ data }: IFilterItemProps) => {
  const [checkedState, setCheckedState] = useState(
    new Array(Object.keys(data.values).length).fill(false)
  );
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const filterTarif = useAppSelector(filterTarifCheckboxesSelector);
  const dispatch = useAppDispatch();

  //Получаем массив активных чекбоксов в фильтре тарифов, реализуем удаление активного чекбокса из массива с помощью редакс
  const getSelectedCheckbox = (e: any) => {
    const { value } = e.target;

    if (filterTarif.checkboxes.includes(value)) {
      dispatch(filterTarifCheckbox(value));
    } else {
      dispatch(addTarifCheckbox(value));
    }
  };

  //Делаем инпуты управляемыми и записывает состояния инпутов в локалсторэдж
  const handleOnChange = (position: number) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );
    setCheckedState(updatedCheckedState);

    localStorage.setItem(
      "stateTarifFilter",
      JSON.stringify(updatedCheckedState)
    );
  };

  //Получаем состояния фильтра тарифов из локалсторэдж, если данные есть то записываем в стейт компонента
  useEffect(() => {
    const localTarifFilter = getLocalStorage("stateTarifFilter");

    if (localTarifFilter) {
      setCheckedState(localTarifFilter);
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
          {getKeysAndValuesInObj(data.values).map((value: any, i: number) => {
            return (
              <FormControlLabel
                key={i}
                label={data.values[value]}
                labelPlacement='start'
                checked={checkedState[i]}
                onChange={(e) => {
                  getSelectedCheckbox(e);
                  handleOnChange(i);
                }}
                control={
                  <Checkbox
                    name={data.type}
                    value={value}
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

export default FilterTarif;
