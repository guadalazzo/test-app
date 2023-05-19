"use client";
import React, { useContext } from "react";
import { CountryData } from "../country.types";
import { MyContext } from "../MyContext";
function Select({
  countries,
  onChange,
}: {
  countries: CountryData[];
  onChange: (val: CountryData) => void;
}) {
  const { country, setCountry } = useContext(MyContext);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectValue = countries.find((elem) => elem.name === e.target.value);
    if (selectValue) {
      setCountry(selectValue);
      onChange(selectValue);
    }
  };
  return (
    <>
      <select
        value={country.name}
        onChange={handleChange}
        className="mt-4 w-full p-1 m-5 rounded"
      >
        {countries.map((countryElem: CountryData) => {
          return (
            <option key={countryElem.iso2} value={countryElem.name}>
              {countryElem.name}
            </option>
          );
        })}
      </select>
    </>
  );
}

export default Select;
