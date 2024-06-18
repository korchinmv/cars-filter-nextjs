import { ICar } from "@/components/ui/Filter/FilterModel";

export type TBrands = {
  name: string;
  code: string;
  values: string[];
};

export type TModels = {
  name: string;
  type: string;
  values: ICar;
};

export type TTarif = {
  name: string;
  type: string;
  values: string[];
};

export type TFilterResponse = {
  result: number;
  brands: TBrands;
  models: TModels;
  tarif: TTarif;
};
