import { createContext } from "react";
import { CountryData } from "./country.types";

export interface MyContextType {
  country: CountryData;
  setCountry: (value: CountryData) => void;
}

const defaultMyContext: MyContextType = {
  country: { name: "", iso2: "", long: 0, lat: 0 },
  setCountry: () => {},
};

export const MyContext = createContext<MyContextType>(defaultMyContext);
