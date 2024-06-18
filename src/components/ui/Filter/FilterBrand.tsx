import { useEffect, useState } from "react";
import { getLocalStorage } from "@/utils/getLocalStorage";
import { TBrands } from "@/types/Filter";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
} from "@mui/material";

interface IFilterItemProps {
  data: TBrands;
  getSelectedCheckbox: any;
}

const FilterBrand = ({ data, getSelectedCheckbox }: IFilterItemProps) => {
  const [checkedState, setCheckedState] = useState(
    new Array(data.values.length).fill(false)
  );
  const [isOpen, setIsOpen] = useState<boolean>(false);

  //Получаем состояния фильтра брэндов из локалсторэдж, если данные есть то записываем в стейт компонента
  useEffect(() => {
    const localBrandFilter = getLocalStorage("stateBrandFilter");

    if (localBrandFilter) {
      setCheckedState(localBrandFilter);
    }
  }, []);

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
