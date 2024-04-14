// import { toast } from "react-toastify";
import { apiConnector } from "../apiconnector";
import { API_KEY, weatherEndpoints } from "../apis";

const {
    FETCH_CURRENT_WEATHER_API,
    FETCH_FORECAST_API,
} = weatherEndpoints;

export const fetchCurrentWeatherData = async (latitude, longitude) => {
    try {
        const response = await apiConnector("GET", FETCH_CURRENT_WEATHER_API, null, null, {
            lat: latitude,
            lon: longitude,
            units: "metric",
            appId: API_KEY
        });

        return response.data;

    } catch (error) {
        console.error("Error occured while updating breathing activity data!");
        // if (error.response) {
        //     console.log("ERROR RESPONSE>>> ", error.response.data);
        // }
        // if (error.response.data.message) {
        //     toast.error(error.response.data.message)
        // }
        // else {
        //     toast.error("Failed to update breathing data!")
        // }
    }
}

export const fetchForecastData = async (latitude, longitude) => {
    try {
        const response = await apiConnector("GET", FETCH_FORECAST_API, null, null, {
            lat: latitude,
            lon: latitude,
            units: "metric",
            appId: API_KEY
        });

        return response.data;

    } catch (error) {
        console.error("Error occured while updating breathing activity data!");
        // if (error.response) {
        //     console.log("ERROR RESPONSE>>> ", error.response.data);
        // }
        // if (error.response.data.message) {
        //     toast.error(error.response.data.message)
        // }
        // else {
        //     toast.error("Failed to update breathing data!")
        // }
    }
}