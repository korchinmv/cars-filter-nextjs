import { useEffect, useState } from "react";
import { getKeysAndValuesInObj } from "@/utils/getKeysAndValuesInObj";
import { getLocalStorage } from "@/utils/getLocalStorage";
import { TTarif } from "@/types/Filter";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
} from "@mui/material";

interface IFilterItemProps {
  data: TTarif;
  getSelectedCheckbox: any;
}

const FilterTarif = ({ data, getSelectedCheckbox }: IFilterItemProps) => {
  const [checkedState, setCheckedState] = useState(
    new Array(Object.keys(data.values).length).fill(false)
  );
  const [isOpen, setIsOpen] = useState<boolean>(false);

  //Получаем состояния фильтра тарифов из локалсторэдж, если данные есть то записываем в стейт компонента
  useEffect(() => {
    const localTarifFilter = getLocalStorage("stateTarifFilter");

    if (localTarifFilter) {
      setCheckedState(localTarifFilter);
    }
  }, []);

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
