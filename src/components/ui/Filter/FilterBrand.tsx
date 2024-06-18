import { ChangeEvent, useEffect, useState } from "react";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
} from "@mui/material";
import { getLocalStorage } from "@/utils/getLocalStorage";

interface IFilterItemProps {
  data: any;
  getSelectedCheckbox: any;
}

const FilterBrand = ({ data, getSelectedCheckbox }: IFilterItemProps) => {
  const [checkedState, setCheckedState] = useState(
    new Array(data.values.length).fill(false)
  );
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const stateBrandFilter = getLocalStorage("stateBrandFilter");

  // useEffect(() => {
  //   if (!stateBrandFilter) {
  //     localStorage.setItem("stateBrandFilter", JSON.stringify(checkedState));
  //   } else {
  //     setCheckedState(stateBrandFilter);
  //   }
  // }, [stateBrandFilter]);

  console.log(checkedState);

  const handleOnChange = (
    position: number,
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );
    setCheckedState(updatedCheckedState);
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
                      handleOnChange(i, e);
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
