export const getDayOfTheWeek = (dateUnix: number) => {
  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const d = new Date(dateUnix * 1000);
  return weekday[d.getDay()];
};
