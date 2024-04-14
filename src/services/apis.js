const URL = "https://api.openweathermap.org"
const BASE_URL = URL + "/data/2.5"

export const API_KEY = "f66ee501203aa53c3a22968748ae5216";

// current API ENDPOINTS
export const weatherEndpoints = {
    FETCH_CURRENT_WEATHER_API: BASE_URL + "/weather",
    FETCH_FORECAST_API: BASE_URL + "/forecast",
}