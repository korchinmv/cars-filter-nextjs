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

const FilterModel = ({ data }: IFilterItemProps) => {
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
        <FormGroup>
          {data.values.map((value: any, i: number) => {
            return (
              <div
                className='flex flex-col mb-[30px]  border-[#ed5564] border-t-2 py-2'
                key={i}
              >
                <p className='block text-right'>{value.brand}</p>

                {value.models.map((model: any, i: number) => {
                  return (
                    <FormControlLabel
                      key={i}
                      label={model}
                      labelPlacement='start'
                      control={
                        <Checkbox
                          name={data.type}
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
          })}
        </FormGroup>
      )}
    </FormControl>
  );
};

export default FilterModel;
