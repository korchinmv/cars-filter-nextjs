export type TBrands = {
  name: string;
  code: string;
  values: string[];
};

export type TModels = {
  name: string;
  type: string;
  values: { brand: string; models: string[] };
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
