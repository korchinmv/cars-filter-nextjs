import { useState } from "react";
import { getKeysAndValuesInObj } from "@/utils/getKeysAndValuesInObj";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
} from "@mui/material";

interface IFilterItemProps {
  data: any;
}

const FilterBrand = ({ data }: IFilterItemProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

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
                    name={data.code}
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

export default FilterBrand;
