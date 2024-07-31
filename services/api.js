import axios from 'axios';

const API_KEY = '36ecfe4e0c3c2389d2baa6f8cbdfb116';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/';

export const fetchWeatherData = (latitude, longitude) => {
  return axios.get(`${BASE_URL}weather`, {
    params: {
      lat: latitude,
      lon: longitude,
      units: 'metric',
      appid: API_KEY,
    },
  });
};

export const fetchForecastData = (latitude, longitude) => {
  return axios.get(`${BASE_URL}forecast`, {
    params: {
      lat: latitude,
      lon: longitude,
      units: 'metric',
      appid: API_KEY,
    },
  });
};
