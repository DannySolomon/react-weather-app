import { useEffect, useState } from "react";
import Loading from "./components/Loading";

import { fetchCurrentWeather, fetchFutureWeather } from "./api/weatherAPI";

function App() {
  const [loading, setLoading] = useState(true);
  const [searchLocationInput, setSearchLocationInput] = useState("");
  const [location, setLocation] = useState("Chennai");
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forcastWeather, setForcastWeather] = useState([]);
  const [weatherLocation, setWeatherLocation] = useState({
    lat: "13.21321",
    lon: "132998.21321",
    // city: "Chennai",
  });

  //get geolocation only once on load
  useEffect(() => {
    //get current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation(
            `${position.coords.latitude},${position.coords.longitude}`
          );
        },
        (error) => {
          console.log("Error in retriving Geolocation: ", error);
        }
      );
    } else {
      console.log("Geolocation is not available in your browser");
    }
    console.log("Use Effect Geo Location");
  }, []);

  // whenever the location is changed get current and forcast weather
  useEffect(() => {
    const fetchData = async () => {
      if (location) {
        try {
          // const currentWeatherResponse = await fetchCurrentWeather(location);
          // const forecastWeatherResponse = await fetchFutureWeather(location);
          const [currentWeatherResponse, forecastWeatherResponse] =
            await Promise.all([
              fetchCurrentWeather(location),
              fetchFutureWeather(location),
            ]);
          setLoading(false);
          setCurrentWeather(currentWeatherResponse.data);
          setWeatherLocation(currentWeatherResponse.location);
          setForcastWeather(forecastWeatherResponse.timelines.daily);
          console.log("Location details", location);
        } catch (error) {
          console.error("Error fetching weather data:", error);
        }
      }
    };

    fetchData();
  }, [location]);

  //update realtime location every hour
  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     // fetchCurrentWeather(location).then((data) => {
  //     //   setCurrentWeather(data);
  //     // });
  //     fetchData();
  //   }, 60 * 60 * 1000); // 1 hour interval

  //   // Run the initial fetch immediately
  //   fetchCurrentWeather(location).then((currentWeatherResponse) => {
  //     setCurrentWeather(currentWeatherResponse.data);
  //   });

  //   return () => clearInterval(intervalId);
  // }, []);

  //when searchLocationForm is submitted
  const handleLocationSearchSubmit = async (event) => {
    //prevent page refresh from submitted form
    event.preventDefault();

    //if search input is null
    if (searchLocationInput == "") {
      return;
    }

    //set the location to the new input location given by the user
    setLocation(searchLocationInput);

    //make the serch input blank
    setSearchLocationInput("");

    console.log("Handle Location Search Button");
  };

  return (
    <>
      <div id="searchLocationContainer">
        <form id="searchLocationForm" onSubmit={handleLocationSearchSubmit}>
          <input
            id="searchTextBox"
            type="text"
            value={searchLocationInput}
            onChange={(e) => setSearchLocationInput(e.target.value)}
            placeholder="Enter location"
          />
          <button type="submit">Search</button>
        </form>
      </div>
      {loading ? (
        <div>
          <h2 id="weather-location">
            {weatherLocation.city ? <>City: {weatherLocation.city}</> : <></>}
            Latitude: {weatherLocation.lat}
            Longitude: {weatherLocation.lon}
          </h2>
          <div id="current-weather" className="weather-box-large">
            <div id="day-date">{currentWeather?.time}</div>
            {currentWeather?.time}
          </div>
          <div id="forcasted-weather">
            {forcastWeather?.map((day, index) => (
              <div key={index} className="weather-box-small">
                {day.values.temperatureAvg}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}

export default App;
