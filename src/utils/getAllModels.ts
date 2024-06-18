import { TModels } from "@/types/Filter";

export const getAllModels = (data: TModels) => {
  let newArr: string[] = [];

  for (let i = 0; i < data.values.length; i++) {
    for (let j = 0; j < data.values.length; j++) data.values[i];
  }
  return newArr;
};
