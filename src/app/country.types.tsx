export type CountryData = {
  name: string;
  iso2: string;
  long: number;
  lat: number;
};

export type ApiResponse = {
  error: boolean;
  msg: string;
  data: CountryData[];
};
