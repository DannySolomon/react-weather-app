import axios from "axios";
import { formatDate } from "../utils/dateStringConversion";

//const API_KEY = "VwxFk9F2sQMm4STZ9z74B3mGTYrVD8IX";
const API_KEY = "9m2apZ8bXY3gRND4k1nrinF3J3qIur64";

export const fetchCurrentWeather = async (location) => {
  console.log("API hit current");
  try {
    const response = await axios.get(
      `https://api.tomorrow.io/v4/weather/realtime`,
      {
        params: {
          location: location,
          units: "metric",
          apikey: API_KEY,
        },
      }
    );

    const responseData = response.data;
    //convert the dateTime string to required format
    responseData.data.time = formatDate(responseData.data.time);
    return responseData;
  } catch (error) {
    console.error("Error fetching current weather data:", error);
    throw error;
  }
};

export const fetchFutureWeather = async (location) => {
  console.log("API hit future");
  try {
    const response = await axios.get(
      `https://api.tomorrow.io/v4/weather/forecast`,
      {
        params: {
          location: location,
          units: "metric",
          timestep: "1d",
          apikey: API_KEY,
        },
      }
    );
    const responseData = response.data;
    //convert the dateTime string to required format
    responseData.timelines.daily.map((item) => ({
      ...item,
      time: formatDate(item.time),
    }));
    return responseData;
  } catch (error) {
    console.error("Error fetching future weather forecast:", error);
    throw error;
  }
};
