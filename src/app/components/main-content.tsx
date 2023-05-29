import { forecastGroupArray } from "../weather.types";
export const MainContent = ({
  forecastData,
}: {
  forecastData: forecastGroupArray;
}) => (
  <section className=" w-11/12 bg-white shadow-md justify-start md:justify-center rounded-lg overflow-x-scroll mx-auto py-4 px-2  md:mx-12 mb-10">
    {forecastData.map((day) => {
      return (
        <div
          key={day.date}
          className="max-full p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
        >
          <h2 className="font-bold">{day.date}</h2>
          <div className="flex gap-4">
            {day.forecast.map((fore) => {
              const dat = new Date(fore.dt * 1000);
              const hs = dat.getHours();
              return (
                <div key={fore.dt} className="">
                  <span className="text-sm">{hs} hs</span>
                  <p className="text-xl">
                    {fore?.main?.temp
                      ? parseInt(fore?.main?.temp?.toString())
                      : fore?.main?.temp?.toString()}
                    °C
                  </p>
                  <p className="text-lg">
                    <span className="text-sm">feels like: </span> <br></br>
                    {fore?.main?.feels_like
                      ? parseInt(fore?.main?.feels_like.toString())
                      : fore?.main?.feels_like.toString()}
                    °C
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      );
    })}
  </section>
);
