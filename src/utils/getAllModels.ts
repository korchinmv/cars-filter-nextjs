import { TModels } from "@/types/Filter";

export const getAllModels = (data: TModels) => {
  let newArr: string[] = [];

  for (let i = 0; i < data.values.length; i++) {
    for (let j = 0; j < data.values[i].models.length; j++) {
      newArr.push(data.values[i].models[j]);
    }
  }
  return newArr;
};
