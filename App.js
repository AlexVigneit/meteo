import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ActivityIndicator, ScrollView } from 'react-native';
import * as Location from 'expo-location';
import Weather from './components/Weather';
import ForecastList from './components/ForecastList';
import PhotoManager from './components/PhotoManager';
import { fetchWeatherData, fetchForecastData } from './services/api';

export default function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setError('Permission to access location was denied');
        setLoading(false);
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      try {
        const weatherResponse = await fetchWeatherData(latitude, longitude);
        const forecastResponse = await fetchForecastData(latitude, longitude);

        setWeatherData(weatherResponse.data);
        setForecastData(forecastResponse.data.list);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch weather data');
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>{error}</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {weatherData && <Weather weatherData={weatherData} />}
      <PhotoManager photos={photos} setPhotos={setPhotos} />
      <ForecastList forecastData={forecastData} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
});
