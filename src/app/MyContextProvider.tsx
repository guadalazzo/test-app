import { useState } from "react";
import { MyContext, MyContextType } from "./MyContext";

interface MyContextProviderProps {
  children: React.ReactNode;
}

export const MyContextProvider = ({ children }: MyContextProviderProps) => {
  const [country, setCountry] = useState({
    name: "",
    iso2: "",
    long: 0,
    lat: 0,
  });

  const contextValue: MyContextType = {
    country,
    setCountry,
  };

  return (
    <MyContext.Provider value={contextValue}>{children}</MyContext.Provider>
  );
};
